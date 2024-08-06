"use client";
import React from "react";
import { ContainerScroll } from "../utils/container-scroll-animation";
import Image from "next/image";

export function HeroScrollDemo() {
    return (
        <div className="flex flex-col overflow-hidden">
            <ContainerScroll
                titleComponent={
                    <>
                        <h1 className="md:text-4xl text-2xl font-semibold text-black dark:text-white">
                            Unleash the power of <br />
                            <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                                Our <span className=" text-red-primary">Youtube</span>  Marketing Services
                            </span>
                        </h1>
                    </>
                }
            >
                <video
                    src={`https://firebasestorage.googleapis.com/v0/b/glossour-43a64.appspot.com/o/WhatsApp%20Video%202024-07-28%20at%2019.54.45_df13f663%20(1)%20(1).mp4?alt=media&token=0d9867b0-3b14-4827-aaa9-87ea5479365c`}
                    autoPlay
                    loop
                    muted
                    height={720}
                    width={1400}
                    className="rounded-2xl object-cover h-full object-left-top"
                    draggable={false}
                />
            </ContainerScroll>
        </div>
    );
}
