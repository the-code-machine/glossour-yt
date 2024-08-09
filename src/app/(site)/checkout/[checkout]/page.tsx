'use client'
import CheckOutCard from "@/components/utils/CheckOutCard";
import { PlaceholdersAndVanishInput } from "@/components/utils/placeholders-and-vanish-input";
import axios from "axios";
import React, { useState } from "react";

function GridBackgroundDemo() {
    const [post, setPost] = useState<any[]>([]);
    const [loader, setLoader] = useState(false);
    return (
        <div className="min-h-[50rem] w-full  max-h-max  md:py-48 py-28   bg-gray-200  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center flex-col justify-center">

            <div className="absolute pointer-events-none inset-0 flex items-center justify-center  bg-gray-200 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <PlaceholdersAndVanishInputDemo setPost={setPost} setLoader={setLoader} />

            {loader && <div className='text-2xl mt-5'>Loading...</div>}
            {post && <CheckOutCard plans={post} />}
        </div>
    );
}
export default GridBackgroundDemo;


function PlaceholdersAndVanishInputDemo({ setPost, setLoader }: { setPost: React.Dispatch<React.SetStateAction<Array<any>>>, setLoader: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [value, setValue] = React.useState("");
    const placeholders = [
        "Enter the YouTube video link...",
        "Enter the YouTube channel name...",
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoader(true);
        e.preventDefault();
        const response = axios.post('/api/youtube-plans', { input: value });
        console.log(value, "url");
        console.log((await response).data, "response");

        setPost((await response).data.plans);
        setLoader(false);
    };

    return (
        <div className=" flex flex-col justify-center items-center px-4">
            <h2 className="mb-4 text-2xl text-center sm:text-5xl font-extrabold text-black md:w-3/4 w-full">
                Get Real-Time Analysis of Your YouTube Video
            </h2>
            <p className="mb-5 sm:mb-10 text-center text-black max-w-2xl">
                Use the search box below to find videos on YouTube and receive real-time analysis of the video content.
            </p>
            <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={handleChange}
                onSubmit={onSubmit}
            />
        </div>
    );
}
