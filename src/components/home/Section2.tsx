'use client';
import React from "react";
import { HeroParallax } from "../utils/hero-parallax";

export function HeroParallaxDemo() {
    return <HeroParallax campaigns={campaigns} />;
}

export const campaigns = [
    {
        title: "Travel Vlogs",
        link: "https://youtube.com/travelvlogs",
        thumbnail: "https://cdn.prod.website-files.com/62ee76bf1cef28daf219984b/65a4cf07dfce87eef1523cef_Content%20Creator%20for%20Travel%20Vlogs.jpg",
    },
    {
        title: "Cooking with Passion",
        link: "https://youtube.com/cookingwithpassion",
        thumbnail: "https://foodindustryexecutive.com/wp-content/uploads/2020/09/bigstock-Happy-Family-In-The-Kitchen-Ha-338381443-696x438.jpg"
    },
    {
        title: "Tech Reviews",
        link: "https://youtube.com/techreviews",
        thumbnail: "https://imgix.ranker.com/list_img_v2/2570/1982570/original/best-tech-channels-youtube-u1",
    },
    {
        title: "Fitness Journey",
        link: "https://youtube.com/fitnessjourney",
        thumbnail: "data:image/jpeg;base64,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",
    },
    {
        title: "Daily Lifestyle",
        link: "https://youtube.com/dailylifestyle",
        thumbnail: "https://resize.indiatvnews.com/en/resize/newbucket/1200_-/2018/12/healthy-lifestyle-tips-1544074501.jpg",
    },
    {
        title: "Gaming World",
        link: "https://youtube.com/gamingworld",
        thumbnail: "https://images.inc.com/uploaded_files/image/1920x1080/getty_850493746_345788.jpg",
    },
    {
        title: "Music Covers",
        link: "https://youtube.com/musiccovers",
        thumbnail: "https://cdn-amz.woka.io/images/I/81zEBs-a14L.jpg",
    },

    {
        title: "Educational Content",
        link: "https://youtube.com/educationalcontent",
        thumbnail: "https://cdn-nyt-prd.nytlicensing.com/media/images/educationalcontent.jpg",
    },
    {
        title: "Movie Reviews",
        link: "https://youtube.com/moviereviews",
        thumbnail: "https://cdn.movieguide.org/wp-content/uploads/2019/12/Discover1280x720.jpg",
    },
    {
        title: "Gaming World",
        link: "https://youtube.com/gamingworld",
        thumbnail: "https://images.inc.com/uploaded_files/image/1920x1080/getty_850493746_345788.jpg",
    },
    {
        title: "Music Covers",
        link: "https://youtube.com/musiccovers",
        thumbnail: "https://cdn-amz.woka.io/images/I/81zEBs-a14L.jpg",
    },

    {
        title: "Educational Content",
        link: "https://youtube.com/educationalcontent",
        thumbnail: "https://cdn-nyt-prd.nytlicensing.com/media/images/educationalcontent.jpg",
    },
    {
        title: "Movie Reviews",
        link: "https://youtube.com/moviereviews",
        thumbnail: "https://cdn.movieguide.org/wp-content/uploads/2019/12/Discover1280x720.jpg",
    },



];
