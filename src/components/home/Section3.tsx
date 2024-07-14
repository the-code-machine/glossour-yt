'use client'
import React from 'react';

interface Section3Props {
}

const Section3: React.FC<Section3Props> = ({ }) => {
    return (
        <div>
            <section className=" w-full  bg-[#1A1919] flex flex-col space-y-5 md:px-32  px-4 justify-center items-center py-20 ">
                <h1 className=" md:text-6xl text-3xl text-white font-extrabold text-center">We provided India’s Best Youtube Promotion Services</h1>
                <p className=" md:text-xl text-sm  font-medium text-[#ADAAAA] text-center">You can pay to promote YouTube videos with YouTube Ads. Your videos will appear at the top of YouTube search results and
                    feature the “Ad” label. They can also appear in the “Up Next” or “Recommended” sections, or they'll appear when people
                    watch videos in your content category.</p>

                <div className=" grid md:grid-cols-2 grid-cols-1 gap-6 w-full  place-content-center py-10">

                    <div className="  w-full  flex justify-center items-center   flex-col">
                        <div className=" w-3/4 rounded-3xl bg-[#F9E355] p-8 space-y-3  flex justify-center flex-col items-center ">
                            <img src="/card.svg" alt="" />
                            <h1 className=" text-2xl font-bold  text-primary">Youtube Promotion</h1>
                            <p className=" text-sm font-medium text-[#ADAAAA]">You can pay to promote YouTube videos with YouTube Ads. You can pay to promote YouTube videos with YouTube Ads </p>
                        </div>
                    </div>
                    <div className="  w-full  flex justify-center items-center   flex-col">
                        <div className=" w-3/4 rounded-3xl bg-[#F9E355] p-8 space-y-3  flex justify-center flex-col items-center ">
                            <img src="/card.svg" alt="" />
                            <h1 className=" text-2xl font-bold  text-primary">Youtube Promotion</h1>
                            <p className=" text-sm font-medium text-[#ADAAAA]">You can pay to promote YouTube videos with YouTube Ads. You can pay to promote YouTube videos with YouTube Ads </p>
                        </div>
                    </div>
                    <div className="  w-full  flex justify-center items-center   flex-col">
                        <div className=" w-3/4 rounded-3xl bg-[#F9E355] p-8 space-y-3  flex justify-center flex-col items-center ">
                            <img src="/card.svg" alt="" />
                            <h1 className=" text-2xl font-bold  text-primary">Youtube Promotion</h1>
                            <p className=" text-sm font-medium text-[#ADAAAA]">You can pay to promote YouTube videos with YouTube Ads. You can pay to promote YouTube videos with YouTube Ads </p>
                        </div>
                    </div>
                    <div className="  w-full  flex justify-center items-center   flex-col">
                        <div className=" w-3/4 rounded-3xl bg-[#F9E355] p-8 space-y-3  flex justify-center flex-col items-center ">
                            <img src="/card.svg" alt="" />
                            <h1 className=" text-2xl font-bold  text-primary">Youtube Promotion</h1>
                            <p className=" text-sm font-medium text-[#ADAAAA]">You can pay to promote YouTube videos with YouTube Ads. You can pay to promote YouTube videos with YouTube Ads </p>
                        </div>
                    </div>

                </div>
            </section>
        </div>
    );
};
export default Section3;