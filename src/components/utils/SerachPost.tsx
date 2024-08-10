"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "./use-outside-click";
import Link from "next/link";

export function ExpandableCardDemo({ cards }: { cards: { title: string, src: string, description: string, ctaLink: string, content: string | (() => JSX.Element), views: string, likes: string, comments: string }[] }) {
    const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
        null
    );
    const ref = useRef<HTMLDivElement>(null);
    const id = useId();

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                setActive(false);
            }
        }

        if (active && typeof active === "object") {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [active]);

    useOutsideClick(ref, () => setActive(null));

    function multiplyViews(views: string | string[]) {
        let num: string;
        if (Array.isArray(views)) {
            num = views[0]; // Assuming the first element of the array is the desired string
        } else {
            num = views;
        }

        let numValue = parseFloat(num); // Convert the string to a float
        if (num.includes('k')) {
            numValue *= 1000; // Convert 'k' to a full number
        } else if (num.includes('m')) {
            numValue *= 1000000; // Convert 'm' to a full number
        }

        numValue *= 2; // Multiply the number by 2

        // Convert the number back to 'k' or 'm' format
        if (numValue >= 1000000) {
            return (numValue / 1000000).toFixed(1) + 'm';
        } else if (numValue >= 1000) {
            return (numValue / 1000).toFixed(1) + 'k';
        } else {
            return numValue.toString();
        }
    }
    return (
        <>
            <AnimatePresence>
                {active && typeof active === "object" && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/20 h-full w-full z-10"
                    />
                )}
            </AnimatePresence>
            <AnimatePresence>
                {active && typeof active === "object" ? (
                    <div className="fixed inset-0  grid place-items-center z-[1000000]">
                        <motion.button
                            key={`button-${active.title}-${id}`}
                            layout
                            initial={{
                                opacity: 0,
                            }}
                            animate={{
                                opacity: 1,
                            }}
                            exit={{
                                opacity: 0,
                                transition: {
                                    duration: 0.05,
                                },
                            }}
                            className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
                            onClick={() => setActive(null)}
                        >
                            <CloseIcon />
                        </motion.button>
                        <motion.div
                            layoutId={`card-${active.title}-${id}`}
                            ref={ref}
                            className="w-full max-w-[500px]  h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
                        >
                            <motion.div layoutId={`image-${active.title}-${id}`}>
                                <img

                                    width={200}
                                    height={200}
                                    src={active.src}
                                    alt={active.title}
                                    className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                                />
                            </motion.div>

                            <div>
                                <div className="flex justify-between items-start p-4">
                                    <div className="">
                                        <motion.h3
                                            layoutId={`title-${active.title}-${id}`}
                                            className="font-bold text-neutral-700 dark:text-neutral-200"
                                        >
                                            {active.title}
                                        </motion.h3>
                                        <motion.p
                                            layoutId={`description-${active.description}-${id}`}
                                            className="text-neutral-600 dark:text-neutral-400"
                                        >
                                            {active.description.slice(0, 100)}...
                                        </motion.p>
                                    </div>


                                </div>

                            </div>
                        </motion.div>
                    </div>
                ) : null}
            </AnimatePresence>
            <ul className="max-w-2xl mx-auto w-full gap-4 p-4">
                {cards.map((card, index) => (
                    <motion.div
                        layoutId={`card-${card.title}-${id}`}
                        key={`card-${card.title}-${id}`}

                        className="p-4 flex flex-col   md:flex-row gap-4 justify-between  bg-white hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer"
                    >
                        <motion.div onClick={() => setActive(card)} layoutId={`image-${card.title}-${id}`}>
                            <img

                                src={card.src}
                                alt={card.title}
                                className=" w-full h-full md:w-32  rounded-lg object-cover  object-center"
                            />
                        </motion.div>
                        <div className="flex gap-4 flex-col   justify-start items-start">

                            <div className="">
                                <motion.h3 onClick={() => setActive(card)}
                                    layoutId={`title-${card.title}-${id}`}
                                    className=" text-black font-bold dark:text-neutral-200 text-center md:text-left"
                                >
                                    {card.title}
                                </motion.h3>
                                <motion.p onClick={() => setActive(card)}
                                    layoutId={`description-${card.description}-${id}`}
                                    className="text-neutral-600 dark:text-neutral-400 text-center text-xs md:text-left"
                                >
                                    {card.description.slice(0, 100)}...
                                </motion.p>
                            </div>
                            <div className=" flex gap-1 md:justify-start flex-wrap justify-center w-full items-center">
                                <button

                                    className="px-4 py-2 text-sm rounded-full w-full  md:w-auto flex space-x-3 justify-center items-center font-bold opacity-100 bg-green-primary  text-black mt-1  md:mt-0"
                                >
                                    <span className="mr-1"><svg width="24" height="14" viewBox="0 0 77 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M38.262 15.3281C37.4339 15.3281 36.6331 15.4492 35.8831 15.668C36.3948 16.3594 36.7034 17.2071 36.7034 18.1368C36.7034 20.4376 34.844 22.297 32.5432 22.297C31.6213 22.297 30.7737 21.9884 30.0744 21.4767C29.8556 22.2384 29.7346 23.0353 29.7346 23.8556C29.7346 28.5665 33.5549 32.3868 38.2658 32.3868C42.9767 32.3868 46.797 28.5665 46.797 23.8556C46.7891 19.1486 42.9808 15.3281 38.262 15.3281Z" fill="black" />
                                        <path d="M37.121 0.129823C15.711 0.918883 1.32002 21.6998 0.723022 22.5908C0.203492 23.3604 0.203492 24.372 0.723022 25.1299C1.32458 26.0088 15.711 46.8019 37.121 47.5909C37.5429 47.6105 37.9491 47.6105 38.371 47.6105C51.359 47.6105 63.922 40.0988 75.711 25.2585C76.3595 24.4381 76.3595 23.2702 75.711 22.4499C63.539 7.14886 50.559 -0.359177 37.121 0.129823ZM38.2616 39.8918C29.4218 39.8918 22.2306 32.7004 22.2306 23.8608C22.2306 15.0212 29.422 7.82982 38.2616 7.82982C47.1014 7.82982 54.2926 15.0212 54.2926 23.8608C54.2887 32.7006 47.1012 39.8918 38.2616 39.8918Z" fill="black" />
                                    </svg>
                                    </span>   {card.views}
                                </button>
                                <button

                                    className="px-4 py-2 text-sm flex justify-center w-full md:w-auto items-center rounded-full font-bold  opacity-100  bg-green-primary  text-black mt-1  md:mt-0"
                                >
                                    <span className="mr-1"><svg width="18" height="14" viewBox="0 0 91 87" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M86.088 44.7699C85.7983 44.8511 85.5397 45.0174 85.3458 45.2474C85.1519 45.4774 85.0316 45.7603 85.0005 46.0595C84.9695 46.3587 85.0291 46.6604 85.1717 46.9253C85.3142 47.1902 85.5332 47.4061 85.8 47.5449C87.0067 48.1728 88.0114 49.129 88.6982 50.3032C89.3849 51.4774 89.7258 52.8218 89.6815 54.1814C89.6371 55.541 89.2094 56.8603 88.4476 57.9873C87.6859 59.1143 86.6211 60.003 85.376 60.5509C85.1598 60.6457 84.969 60.7901 84.8191 60.9724C84.6693 61.1548 84.5645 61.3699 84.5135 61.6004C84.4624 61.8308 84.4665 62.0701 84.5253 62.2987C84.5841 62.5273 84.696 62.7388 84.852 62.9159C85.6586 63.8289 86.2098 64.9388 86.4496 66.1332C86.6895 67.3276 86.6097 68.5642 86.2181 69.7178C85.8266 70.8715 85.1373 71.9012 84.2199 72.7028C83.3025 73.5045 82.1897 74.0496 80.994 74.2829C80.727 74.3356 80.4793 74.4599 80.2775 74.6425C80.0757 74.8251 79.9274 75.0592 79.8484 75.3197C79.7695 75.5802 79.763 75.8573 79.8295 76.1212C79.896 76.3851 80.0331 76.626 80.226 76.8179C81.0423 77.6325 81.602 78.6684 81.8359 79.7976C82.0698 80.9268 81.9676 82.0998 81.5421 83.1716C81.1165 84.2434 80.3862 85.167 79.4414 85.8282C78.4966 86.4894 77.3787 86.8592 76.226 86.8919H40.833L30.847 81.4509V37.8259L34.009 36.4619C34.3414 36.3209 34.6109 36.0635 34.767 35.7379L44.478 15.6179C44.575 15.4142 44.6258 15.1916 44.627 14.9659V3.41195C44.6272 2.84618 44.7736 2.29006 45.052 1.79756C45.3305 1.30506 45.7315 0.892905 46.2162 0.601095C46.7009 0.309285 47.2528 0.147731 47.8184 0.132111C48.3839 0.116491 48.9439 0.247335 49.444 0.511946C54.006 2.91995 56.493 6.37295 56.844 10.7719C56.6324 17.7946 55.0102 24.703 52.074 31.0859C51.9715 31.3139 51.9276 31.5639 51.9463 31.8131C51.965 32.0623 52.0457 32.303 52.181 32.5131C52.3163 32.7232 52.502 32.8962 52.7212 33.0163C52.9403 33.1365 53.1861 33.1999 53.436 33.2009H86.274C87.5152 33.591 88.5971 34.3717 89.3585 35.4267C90.1198 36.4817 90.5199 37.7545 90.4989 39.0554C90.478 40.3562 90.0373 41.6155 89.2424 42.6455C88.4475 43.6755 87.3411 44.42 86.088 44.7699ZM27.847 82.6839C27.8449 83.4503 27.5395 84.1847 26.9976 84.7266C26.4557 85.2685 25.7214 85.5738 24.955 85.5759H3.391C2.62482 85.5736 1.89071 85.2681 1.34902 84.7262C0.807342 84.1843 0.50211 83.4501 0.5 82.6839V34.6219C0.50211 33.8558 0.807342 33.1215 1.34902 32.5797C1.89071 32.0378 2.62482 31.7323 3.391 31.7299H24.955C25.7214 31.7321 26.4557 32.0374 26.9976 32.5793C27.5395 33.1212 27.8449 33.8556 27.847 34.6219V82.6839Z" fill="black" />
                                    </svg>


                                    </span> {card.likes}
                                </button>
                                <button

                                    className="px-4 py-2 text-sm flex justify-center w-full md:w-auto items-center rounded-full font-bold  opacity-100  bg-green-primary  text-black mt-1  md:mt-0"
                                >
                                    <span className="mr-1">
                                        <svg width="24" height="14" viewBox="0 0 98 88" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.00399411 57.2619C0.00399411 60.133 1.17589 62.7385 3.06259 64.6291C4.95319 66.5158 7.55479 67.6877 10.4298 67.6877H52.5238C54.1293 67.6877 55.5824 68.3439 56.641 69.4025C57.6957 70.4572 58.3558 71.9181 58.3558 73.5197V76.6174C58.3558 78.5119 58.8363 80.2893 59.7347 81.8479L59.7386 81.8439C60.6331 83.3908 61.93 84.6916 63.5784 85.6408C65.2346 86.5979 67.0081 87.0744 68.7815 87.0744C70.5081 87.0744 72.2346 86.6213 73.8479 85.7189L73.9924 85.6408L92.7814 74.7928L92.7775 74.785C94.3713 73.8631 95.6408 72.6131 96.5314 71.1327L96.6174 70.996C97.5158 69.4413 97.9963 67.664 97.9963 65.7655V11.3555C97.9963 8.48439 96.8244 5.87889 94.9377 3.98829C93.051 2.10159 90.4455 0.929688 87.5705 0.929688H10.4295C7.55836 0.929688 4.95286 2.10159 3.06226 3.98829C1.17556 5.87889 0.00366211 8.48049 0.00366211 11.3555L0.00399411 57.2619ZM46.617 48.9454H18.781C17.5115 48.9454 16.4841 47.9182 16.4841 46.6486C16.4841 45.383 17.5114 44.3517 18.781 44.3517H46.617C47.8865 44.3517 48.9139 45.379 48.9139 46.6486C48.9139 47.9181 47.8866 48.9454 46.617 48.9454ZM79.215 48.9454H68.477C67.2075 48.9454 66.1801 47.9182 66.1801 46.6486C66.1801 45.383 67.2074 44.3517 68.477 44.3517H79.215C80.4845 44.3517 81.5119 45.379 81.5119 46.6486C81.5119 47.9181 80.4846 48.9454 79.215 48.9454ZM79.215 24.6875H18.781C17.5115 24.6875 16.4841 23.6602 16.4841 22.3906C16.4841 21.125 17.5114 20.0937 18.781 20.0937H79.215C80.4845 20.0937 81.5119 21.121 81.5119 22.3906C81.5119 23.6602 80.4846 24.6875 79.215 24.6875Z" fill="black" />
                                        </svg>



                                    </span> {card.comments}
                                </button>
                                <Link href={"/checkout/youtube"}>
                                    <button
                                        className="px-3 py-2 text-sm flex justify-center items-center w-full md:w-auto rounded-full font-bold opacity-100 bg-red-primary text-white mt-3 md:mt-0"
                                    >
                                        Get Upto {multiplyViews(card.views)} Views
                                        <span className="ml-1 text-white">
                                            <svg width="12" height="12" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M41.2116 38.9722C41.2216 25.1607 41.1716 13.07 41.2226 0.777344C27.4222 0.787344 15.2999 0.82733 3.02778 0.78833C3.01278 4.44903 3.00778 7.25204 2.99378 10.8127C10.2257 10.8317 17.8048 10.8127 24.0828 10.8134L1.60488 33.2913C0.496283 34.4003 0.502583 36.4243 1.61788 37.5402L4.45948 40.3818C5.57548 41.4976 7.59948 41.5041 8.70838 40.3958L31.1862 17.9178C31.1762 24.9404 31.1962 31.9626 31.1652 38.9848C34.5482 38.9658 38.2324 38.9844 41.2116 38.9722Z" fill="currentcolor" />
                                            </svg>
                                        </span>
                                    </button></Link>
                            </div>
                        </div>

                    </motion.div>
                ))}
            </ul>
        </>
    );
}

export const CloseIcon = () => {
    return (
        <motion.svg
            initial={{
                opacity: 0,
            }}
            animate={{
                opacity: 1,
            }}
            exit={{
                opacity: 0,
                transition: {
                    duration: 0.05,
                },
            }}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4 text-black"
        >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M18 6l-12 12" />
            <path d="M6 6l12 12" />
        </motion.svg>
    );
};


