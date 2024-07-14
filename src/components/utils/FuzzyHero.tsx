'use client'
import React from "react";
import { motion } from "framer-motion";

const HeroSection = () => {
    return (
        <div className="relative overflow-hidden">
            <Content />
            <FuzzyOverlay />
        </div>
    );
};

const FuzzyOverlay = () => {
    return (
        <motion.div
            initial={{ transform: "translateX(-10%) translateY(-10%)" }}
            animate={{
                transform: "translateX(10%) translateY(10%)",
            }}
            transition={{
                repeat: Infinity,
                duration: 0.2,
                ease: "linear",
                repeatType: "mirror",
            }}
            style={{
                backgroundImage: 'url("/black-noise.png")',
                // backgroundImage: 'url("/noise.png")',
            }}
            className="pointer-events-none absolute -inset-[100%] opacity-[15%]"
        />
    );
};

const Content = () => {
    return (
        <div className="relative grid h-screen place-content-center space-y-6 bg-neutral-950 p-8">
            <p className="text-center text-6xl font-black text-neutral-50">
                Promote Your Music on <span className=" text-[#FF0000]">YouTube</span>
            </p>
            <p className="text-center  text-neutral-400">
                Boost your visibility and grow your audience with our tailored digital marketing services for YouTube artists.
            </p>
            <div className="flex items-center justify-center gap-3">
                <button className="text-neutral-20 w-fit px-4 py-2 font-semibold text-neutral-200 transition-colors hover:bg-neutral-800">
                    Learn More
                </button>
                <button className="w-fit bg-neutral-200 px-4 py-2 font-semibold text-neutral-700 transition-colors hover:bg-neutral-50">
                    Get Started
                </button>
            </div>
        </div>
    );
};

export default HeroSection;
