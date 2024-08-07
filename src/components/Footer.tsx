'use client';

import React from "react";
import { BackgroundBeams } from "../components/utils/background-beams";

export function Footer() {
    return (
        <div className="md:h-[30rem] w-full bg-black relative flex flex-col items-center justify-center antialiased">
            <div className="max-w-4xl mx-auto p-4 text-center">
                <h1 className="relative z-10 text-3xl md:text-5xl mb-8   text-white font-sans font-bold">
                    Subscribe for the <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#833AB4] font-sans font-bold">Latest Updates</span>
                </h1>
                <p className="text-neutral-500 max-w-2xl mx-auto my-2 text-sm relative z-10">
                    Stay up-to-date with our latest promotions and services. Whether you are looking to boost your YouTube channel, grow your Spotify followers, or enhance your Instagram presence, we have got the best deals and tips for you. Join our waitlist to never miss out!
                </p>
                <div className=" md:flex-row flex-col flex gap-4">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="rounded-lg border border-neutral-800 focus:ring-2 p-3 focus:ring-white w-full relative z-10 mt-4 bg-neutral-950 text-white placeholder:text-neutral-700"
                    />
                    <button className=" mt-4 bg-instagram-gradient text-white py-2 px-6 rounded-lg focus:ring-2 focus:ring-white">
                        Subscribe
                    </button></div>
            </div>
            <div className=" w-full flex justify-center py-4 text-neutral-500 text-sm">
                &copy; {new Date().getFullYear()} Glossour All rights reserved.
            </div>
            <BackgroundBeams />
        </div>
    );
}
