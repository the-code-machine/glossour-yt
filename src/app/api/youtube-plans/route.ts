import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { generatePlans } from "@/controller/plans";

interface VideoDetails {
  title: string;
  description: string;
  src: string;
  uploadDate: string;
  author: string;
  views: number;
  likes: number;
  subscribers: number;
  videoLength: number;
  category: string;
  country: string;
}

interface Plan {
  name: string;
  desc: string;
  price: number;
  isMostPop: boolean;
  features: string[];
}

interface RequestBody {
  input: string;
}

// Helper functions for analysis
const formatNumber = (num: number) => {
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "m";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "k";
  return num.toString();
};

const formatVideoLength = (duration: string): number => {
  const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
  if (!match) return 0;

  const hours = match[1] ? parseInt(match[1].replace("H", "")) : 0;
  const minutes = match[2] ? parseInt(match[2].replace("M", "")) : 0;
  const seconds = match[3] ? parseInt(match[3].replace("S", "")) : 0;

  return hours * 60 + minutes + seconds / 60;
};

const getChannelDetails = async (channelId: string, apiKey: string | null) => {
  const channelDetailsUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=${channelId}&key=${
    apiKey ?? ""
  }`;
  const channelResponse = await axios.get(channelDetailsUrl);
  return channelResponse.data.items[0];
};

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();

    if (!body.input) {
      return NextResponse.json({ error: "Input is required" }, { status: 400 });
    }

    const apiKey: string | null = process.env.YOUTUBE_API_KEY ?? null; // Store your API key in an environment variable

    // Extract or find video ID
    let videoId: string | null = null;
    const videoIdMatch = body.input.match(
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    if (videoIdMatch) {
      videoId = videoIdMatch[1];
    } else {
      const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=video&q=${encodeURIComponent(
        body.input
      )}&key=${apiKey}`;
      const searchResponse = await axios.get(searchUrl);
      videoId = searchResponse.data.items[0]?.id?.videoId;
      if (!videoId) {
        return NextResponse.json(
          { error: "No video found with that title" },
          { status: 404 }
        );
      }
    }

    // Fetch video details
    const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${apiKey}`;
    const videoResponse = await axios.get(videoDetailsUrl);
    const videoData = videoResponse.data.items[0];

    if (!videoData) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    // Fetch channel details
    const channelId = videoData.snippet.channelId;
    const channelData = await getChannelDetails(channelId, apiKey);

    const videoDetails: VideoDetails = {
      title: videoData.snippet.title,
      description: videoData.snippet.description,
      src: videoData.snippet.thumbnails.high.url,
      uploadDate: videoData.snippet.publishedAt,
      author: videoData.snippet.channelTitle,
      views: parseInt(videoData.statistics.viewCount),
      likes: parseInt(videoData.statistics.likeCount),
      subscribers: parseInt(channelData.statistics.subscriberCount),
      videoLength: formatVideoLength(videoData.contentDetails.duration),
      category: videoData.snippet.categoryId,
      country: channelData.snippet.country || "Unknown", // Default to "Unknown" if country is not available
    };

    // Generate plans based on the video details
    const plans = generatePlans(videoDetails);

    return NextResponse.json({ plans, videoDetails });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch video details" },
      { status: 500 }
    );
  }
}
