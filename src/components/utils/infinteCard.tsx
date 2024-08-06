'use client';

import React, { useEffect, useState } from "react";
import { InfiniteMovingCards } from "../utils/infinite-moving-cards";

export function InfiniteMovingCardsDemo() {
    return (
        <div className="h-[40rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
            <div className='font-extrabold sm:text-6xl md:mb-5 mb-5 text-4xl text-center text-black'>
                Customer <span className='bg-clip-text text-transparent bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#833AB4]'>Testimonials</span>
            </div>
            <p className='text-center  text-black max-w-2xl mx-auto mb-10 px-4'>
                Hear from our satisfied clients who have experienced significant growth and success with our YouTube, Spotify, and Instagram promotion services.
            </p>
            <InfiniteMovingCards
                items={testimonials}
                direction="right"
                speed="slow"
            />
        </div>
    );
}

const testimonials = [
    {
        quote:
            "Thanks to the YouTube promotion package, my channel's subscribers and engagement have skyrocketed. The service exceeded my expectations.",
        name: "John Doe",
        title: "YouTube Content Creator",
        color: "bg-red-primary"
    },
    {
        quote:
            "The Spotify promotion service helped my music reach a wider audience. My streams have significantly increased, and my fan base is growing steadily.",
        name: "Jane Smith",
        title: "Music Artist",
        color: "bg-green-primary"
    },
    {
        quote: "The Instagram promotion package has boosted my profile visibility and engagement. My posts are reaching more people than ever before.",
        name: "Alice Johnson",
        title: "Instagram Influencer",
        color: "bg-instagram-gradient"
    },
    {
        quote:
            "The YouTube promotion service provided a noticeable increase in views and interaction on my videos. Highly recommend!",
        name: "Mark Brown",
        title: "YouTube Vlogger",
        color: "bg-red-primary"
    },
    {
        quote:
            "With the Spotify promotion, my tracks are now reaching international listeners. It's been a game changer for my career.",
        name: "David Wilson",
        title: "Indie Musician",
        color: "bg-green-primary"
    },
];

export default InfiniteMovingCardsDemo;
