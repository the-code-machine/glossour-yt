import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

interface VideoDetails {
  title: string | undefined;
  description: string | undefined;
  src: string | undefined;
  uploadDate: string | undefined;
  author: string | undefined;
  views: string | undefined;
  likes: string | undefined;
  subscribers: string | undefined;
  content: string | undefined;
  ctaLink: string;
}

interface RequestBody {
  input: string;
}

// Function to format numbers into k, m, etc.
const formatNumber = (num: number) => {
  if (num >= 1_000_000) {
    return (num / 1_000_000).toFixed(1) + "m";
  } else if (num >= 1_000) {
    return (num / 1_000).toFixed(1) + "k";
  }
  return num.toString();
};

// Function to trim the description to 30 words
const trimDescription = (description: string) => {
  return (
    description.split(" ").slice(0, 30).join(" ") +
    (description.split(" ").length > 30 ? "..." : "")
  );
};

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();

    if (!body.input) {
      return NextResponse.json({ error: "Input is required" }, { status: 400 });
    }

    const apiKey = process.env.YOUTUBE_API_KEY; // Store your API key in an environment variable

    let videoId: string | null = null;

    // Check if input is a YouTube URL
    const videoIdMatch = body.input.match(
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );

    if (videoIdMatch) {
      // If input is a URL, extract the video ID
      videoId = videoIdMatch[1];
    } else {
      // If input is not a URL, treat it as a channel name
      const searchUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&type=channel&q=${encodeURIComponent(
        body.input
      )}&key=${apiKey}`;
      const searchResponse = await axios.get(searchUrl);
      const channelId = searchResponse.data.items[0]?.id?.channelId;

      if (!channelId) {
        return NextResponse.json(
          { error: "Channel not found" },
          { status: 404 }
        );
      }

      // Fetch the latest video from the channel
      const videosUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=1&order=date&type=video&key=${apiKey}`;
      const videosResponse = await axios.get(videosUrl);
      videoId = videosResponse.data.items[0]?.id?.videoId;

      if (!videoId) {
        return NextResponse.json(
          { error: "No videos found for this channel" },
          { status: 404 }
        );
      }
    }

    // Fetch video details using the video ID
    const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${apiKey}`;
    const videoResponse = await axios.get(videoDetailsUrl);
    const videoData = videoResponse.data.items[0];

    if (!videoData) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    const videoDetails: VideoDetails = {
      ctaLink: `https://www.youtube.com/watch?v=${videoId}`,
      title: videoData.snippet.title ?? undefined,
      description: videoData.snippet.description
        ? trimDescription(videoData.snippet.description)
        : undefined,
      src: videoData.snippet.thumbnails.high.url ?? undefined,
      uploadDate: videoData.snippet.publishedAt ?? undefined,
      author: videoData.snippet.channelTitle ?? undefined,
      views: videoData.statistics.viewCount
        ? formatNumber(parseInt(videoData.statistics.viewCount))
        : undefined,
      likes: videoData.statistics.likeCount
        ? formatNumber(parseInt(videoData.statistics.likeCount))
        : undefined,
      subscribers: undefined, // YouTube API doesn't provide subscribers count with video details, need a separate request for the channel
      content: videoData.snippet.description
        ? trimDescription(videoData.snippet.description)
        : undefined,
    };

    return NextResponse.json([videoDetails]);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch video details" },
      { status: 500 }
    );
  }
}
