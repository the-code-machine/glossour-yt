"use client";

import { color, motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "../utils/aurora-background";
import { TypewriterEffectSmooth } from "../utils/typewriter-effect";

export function AuroraBackgroundDemo({ words, subtitle, buttonText, link, color }: { words: { text: string, className?: string }[], subtitle: string, buttonText: string, link: string, color: string }) {

    return (
        <AuroraBackground>
            <motion.div
                initial={{ opacity: 0.0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                    delay: 0.3,
                    duration: 0.8,
                    ease: "easeInOut",
                }}
                className="relative flex flex-col md:gap-4 items-center justify-center px-4"
            >
                <div className="text-5xl md:text-7xl font-bold dark:text-white text-center">
                    <TypewriterEffectSmooth words={words} cursorClassName={color} />
                </div>
                <div className="font-extralight text-base md:text-4xl dark:text-neutral-200 py-2">
                    {subtitle}
                </div>
                <button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2">
                    {buttonText}
                </button>
            </motion.div>
        </AuroraBackground>
    );
}
