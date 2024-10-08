'use client';

import React from 'react';
import { PlaceholdersAndVanishInput } from "../utils/placeholders-and-vanish-input";
import axios from 'axios';

export function PlaceholdersAndVanishInputDemo({ setPost, setLoader }: { setPost: React.Dispatch<React.SetStateAction<Array<any>>>, setLoader: React.Dispatch<React.SetStateAction<boolean>> }) {
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
        const response = axios.post('/api/youtube-details', { input: value });
        console.log(value, "url");
        console.log((await response).data, "response");

        setPost((await response).data);
        setLoader(false);
    };

    return (
        <div className=" flex flex-col justify-center items-center px-4">
            <h2 className="mb-4 text-2xl text-center sm:text-5xl font-extrabold text-black md:w-3/4 w-full">
                Get Real-Time Analysis of Your YouTube Video
            </h2>
            <p className="mb-5 sm:mb-10 text-center text-white max-w-2xl">
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
