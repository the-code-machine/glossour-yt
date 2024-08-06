'use client'
import React, { useState } from 'react';
import { cn } from '../utils/cn';
import { color, transform } from 'framer-motion';

interface Section4Props { }

const Services = [
    {
        title: "YouTube",
        subtitle: "Campaign",
        img: "/services/1.png",
        gif: '/services/1.gif',
        color: 'bg-[#FF0000]'
    },
    {
        title: "Spotify",
        subtitle: "Promotion",
        img: "/services/2.png",
        gif: '/services/2.gif',
        color: 'bg-[#69DB6C]'
    },

    {
        title: "Instagram",
        subtitle: "& Facebook",
        img: "/services/3.png",
        gif: '/services/3.gif',
        color: 'bg-instagram-gradient'
    },
    {
        title: "Reels",
        subtitle: "Marketing",
        img: "/services/4.png",
        gif: '/services/4.gif',
        color: 'bg-[#752EBC]'
    },
    {
        title: "Music",
        subtitle: "Press Release",
        img: "/services/5.png",
        gif: '/services/5.gif',
        color: 'bg-black'
    },
    {
        title: "Radio",
        subtitle: "Promotion",
        img: "/services/6.png",
        gif: '/services/6.gif',
        color: 'bg-[#000087]'
    },
];

const Section4: React.FC<Section4Props> = () => {
    return (
        <div className='md:px-20 py-20 px-4 bg-black'>
            <div className='text-white font-extrabold sm:text-6xl md:mb-10 mb-5 text-4xl'>Services</div>
            <div className='grid md:grid-cols-3 grid-cols-1 gap-8'>
                {Services.map(service => (
                    <CardDemo key={service.title} title={service.title} img={service.img} gif={service.gif} subtitle={service.subtitle} color={service.color} />
                ))}
            </div>
        </div>
    );
};

export default Section4;

function CardDemo({ title, img, gif, subtitle, color }: { title: string, img: string, gif: string, subtitle: string, color: string }) {
    const [hover, setHover] = useState(false);

    return (
        <div className="w-full">

            <div
                className={cn(
                    "group w-full cursor-pointer overflow-hidden  object-fill bg-no-repeat relative card h-48 rounded-md shadow-xl mx-auto flex flex-col justify-start p-4 border-white border-2 dark:border-neutral-800",
                    "transition-all duration-500"
                )}
                style={{
                    backgroundImage: `url(${hover ? gif : img})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',

                }}

                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
            >
                <div className=" z-50">
                    <h1 className={`font-bold text-2xl md:text-3xl  text-white `}>
                        {title}
                    </h1>
                    <h1 className={`font-bold text-2xl md:text-4xl text-white `}>
                        {subtitle}
                    </h1>
                </div>
                <div className={` ${hover ? 'bg-black' : `${color}`}  inset-0   opacity-30 z-10  w-full h-full absolute rounded-md`} />
            </div>
        </div>
    );
}
