// app/api/youtube-details/route.ts
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import cheerio from "cheerio";

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

    const { data } = await axios.get(body.url);
    const $ = cheerio.load(data);

    const title = $('meta[name="title"]').attr("content") || $("title").text();
    const description = $('meta[name="description"]').attr("content");
    const thumbnail = $('meta[property="og:image"]').attr("content");
    const uploadDate = $('meta[itemprop="uploadDate"]').attr("content");
    const author = $('meta[itemprop="author"]').attr("content");
    const views = $('meta[itemprop="interactionCount"]').attr("content");

    // Attempting to scrape likes and subscribers (this is fragile and might break)
    const likes = $('button[aria-label*="like this video"]').text().trim();
    const subscribers = $("yt-formatted-string#subscriber-count").text().trim();

    const videoDetails: VideoDetails = {
      ctaLink: body.url,
      title,
      description,
      src: thumbnail,
      uploadDate,
      author,
      views,
      likes,
      subscribers,
      content: description,
    };

    return NextResponse.json([videoDetails]); // Return as an array
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch video details" },
      { status: 500 }
    );
  }
}
