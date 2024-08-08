// app/api/youtube-details/route.ts
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
  url: string;
}

export async function POST(req: NextRequest) {
  try {
    const body: RequestBody = await req.json();

    if (!body.url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    // Extract video ID from the YouTube URL
    const videoIdMatch = body.url.match(
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    if (!videoIdMatch) {
      return NextResponse.json(
        { error: "Invalid YouTube URL" },
        { status: 400 }
      );
    }
    const videoId = videoIdMatch[1];

    // YouTube API Key (replace with your actual API key)
    const apiKey = process.env.YOUTUBE_API_KEY; // Store your API key in an environment variable

    // YouTube Data API endpoint
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${apiKey}`;

    const response = await axios.get(url);
    const videoData = response.data.items[0];

    if (!videoData) {
      return NextResponse.json({ error: "Video not found" }, { status: 404 });
    }

    const videoDetails: VideoDetails = {
      ctaLink: body.url,
      title: videoData.snippet.title ?? undefined,
      description: videoData.snippet.description ?? undefined,
      src: videoData.snippet.thumbnails.high.url ?? undefined,
      uploadDate: videoData.snippet.publishedAt ?? undefined,
      author: videoData.snippet.channelTitle ?? undefined,
      views: videoData.statistics.viewCount ?? undefined,
      likes: videoData.statistics.likeCount ?? undefined,
      subscribers: undefined, // YouTube API doesn't provide subscribers count with video details, need a separate request for the channel
      content: videoData.snippet.description ?? undefined,
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
