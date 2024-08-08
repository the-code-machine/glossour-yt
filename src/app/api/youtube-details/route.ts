// app/api/youtube-details/route.ts
import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

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

    // Launch Puppeteer
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(body.url, { waitUntil: "networkidle2" });

    // Extract video details using Puppeteer
    const videoDetails: VideoDetails = await page.evaluate(() => {
      const title =
        document.querySelector('meta[name="title"]')?.getAttribute("content") ||
        document.title;
      const description = document
        .querySelector('meta[name="description"]')
        ?.getAttribute("content");
      const thumbnail = document
        .querySelector('meta[property="og:image"]')
        ?.getAttribute("content");
      const uploadDate = document
        .querySelector('meta[itemprop="uploadDate"]')
        ?.getAttribute("content");
      const author = document
        .querySelector('meta[itemprop="author"]')
        ?.getAttribute("content");
      const views = document
        .querySelector('meta[itemprop="interactionCount"]')
        ?.getAttribute("content");

      const likes = document
        .querySelector('button[aria-label*="like this video"]')
        ?.textContent?.trim();
      const subscribers = document
        .querySelector("yt-formatted-string#subscriber-count")
        ?.textContent?.trim();

      return {
        ctaLink: window.location.href,
        title: title ?? undefined,
        description: description ?? undefined,
        src: thumbnail ?? undefined,
        uploadDate: uploadDate ?? undefined,
        author: author ?? undefined,
        views: views ?? undefined,
        likes: likes ?? undefined,
        subscribers: subscribers ?? undefined,
        content: description ?? undefined,
      };
    });

    await browser.close();

    return NextResponse.json([videoDetails]);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch video details" },
      { status: 500 }
    );
  }
}
