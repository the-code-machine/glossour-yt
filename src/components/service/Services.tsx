'use client'
import React, { ReactNode, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import Link from "next/link";

export const TextParallaxContentExample = ({ innerServices }: { innerServices: { imgUrl: string, subheading: string, heading: string, innerHeading: string, description: string, buttonText: string, color: string, link: string }[] }) => {

    return (
        <div className="bg-white">


            {innerServices.map((item, idx) => (
                <div key={idx}>
                    <TextParallaxContent
                        imgUrl={item.imgUrl}
                        subheading={item.subheading}
                        heading={item.heading}>
                        <Content heading={item.innerHeading} description={item.description} buttonText={item.buttonText} color={item.color} link={item.link} />
                    </TextParallaxContent>

                </div>
            ))
            }

        </div>
    );
};

const IMG_PADDING = 12;

const TextParallaxContent = ({ imgUrl, subheading, heading, children }: { imgUrl: string, subheading: string, heading: string, children: ReactNode },) => {
    return (
        <div
            style={{
                paddingLeft: IMG_PADDING,
                paddingRight: IMG_PADDING,
            }}
        >
            <div className="relative h-[150vh]">
                <StickyImage imgUrl={imgUrl} />
                <OverlayCopy heading={heading} subheading={subheading} />
            </div>
            {children}
        </div>
    );
};

const StickyImage = ({ imgUrl }: { imgUrl: string }) => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["end end", "end start"],
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);
    const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

    return (
        <motion.div
            style={{
                height: `calc(100vh - ${IMG_PADDING * 2}px)`,
                top: IMG_PADDING,
                scale,
            }}
            ref={targetRef}
            className="sticky z-0 overflow-hidden rounded-3xl"
        >
            <video
                src={imgUrl}
                autoPlay
                loop
                muted
                className="absolute inset-0 w-full h-full object-cover"
            />
            <motion.div
                className="absolute inset-0 bg-neutral-950/70"
                style={{
                    opacity,
                }}
            />
        </motion.div>
    );
};

const OverlayCopy = ({ subheading, heading }: { subheading: string, heading: string }) => {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start end", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], [250, -250]);
    const opacity = useTransform(scrollYProgress, [0.25, 0.5, 0.75], [0, 1, 0]);

    return (
        <motion.div
            style={{
                y,
                opacity,
            }}
            ref={targetRef}
            className="absolute left-0 top-0 flex h-screen w-full flex-col items-center justify-center text-white"
        >
            <p className="mb-2 text-center text-xl md:mb-4 md:text-3xl">
                {subheading}
            </p>
            <p className="text-center text-4xl font-bold md:text-7xl">{heading}</p>
        </motion.div>
    );
};

export const Content = ({ heading, description, buttonText, link, color }: { heading: string, description: string, buttonText: string, link: string, color: string }) => {
    return <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 px-4 pb-24 pt-12 md:grid-cols-12">
        <h2 className={`col-span-1 text-[${color}] text-3xl font-bold md:col-span-4   `}>
            {heading}
        </h2>
        <div className="col-span-1 md:col-span-8">
            <p className="mb-10 text-xl text-neutral-600 md:text-2xl">
                {description}
            </p>
            <Link href={link} className={`w-full rounded bg-[${color}] px-6  py-3 text-xl text-white transition-colors hover:bg-neutral-700 md:w-fit`}>
                {buttonText} <FiArrowUpRight className="inline" />
            </Link>
        </div>
    </div>
};