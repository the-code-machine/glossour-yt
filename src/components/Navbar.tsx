'use client';
import React, { useEffect, useRef, useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./utils/navbar-menu";
import { cn } from "./utils/cn";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import { usePathname } from "next/navigation";

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    const [active1, setActive1] = useState(false)
    const [navbarColor, setNavbarColor] = useState("bg-white  text-black");
    const pathname = usePathname();
    const [activeDropdown, setActiveDropdown] = useState({

        pricing: false,
        services: false,
    });
    useEffect(() => {
        const whiteBgDivs = document.querySelectorAll('.bg-white');

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setNavbarColor("bg-black  text-white");
                    } else {
                        setNavbarColor("bg-white text-black");
                    }
                });
            },
            { threshold: 0.1 }
        );

        whiteBgDivs.forEach((div) => observer.observe(div));

        return () => {
            whiteBgDivs.forEach((div) => observer.unobserve(div));
        };
    }, [pathname]);
    type DropdownKeys = keyof typeof activeDropdown;

    const handleDropdownToggle = (dropdown: DropdownKeys) => {
        setActiveDropdown((prev) => ({
            ...prev,
            [dropdown]: !prev[dropdown],
        }));
    };


    const navbarRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (navbarRef.current && !navbarRef.current.contains(event.target as Node)) {
                setActive1(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [navbarRef]);


    return (
        <>
            <div
                className={cn(` absolute top-5 inset-x-0 md:max-w-5xl  items-center  justify-between  rounded-full md:px-10 px-6 boder z-[1000] border-transparent dark:bg-black dark:border-white/[0.2]  shadow-input  md:mx-auto mx-4  ${navbarColor}`, className)}
            >       <div className="sm:flex hidden  justify-between items-center">
                    <Link href={'/'} className=" text-xl text-red-primary font-bold">Glossour</Link>
                    <Menu setActive={setActive}>

                        <MenuItem setActive={setActive} active={active} item="Services">
                            <div className="flex flex-col space-y-4 text-sm">
                                <HoveredLink href="/service/youtube-promotion">YouTube Promotion</HoveredLink>
                                <HoveredLink href="/service/spotify-promotion">Spotify Promotion</HoveredLink>
                                <HoveredLink href="/service/instagram-promotion">Instagram Promotion</HoveredLink>

                            </div>
                        </MenuItem>
                        <MenuItem setActive={setActive} active={active} item="Case Studies">
                            <div className="text-sm grid md:grid-cols-2 grid-cols-1 gap-3  p-4">
                                <ProductItem
                                    title="Music Video Campaign"
                                    href="/case-studies/music-video-campaign"
                                    src="https://s3-prod.adage.com/s3fs-public/20190913_youtube_pageviews_3x2.jpg"
                                    description="Boosted YouTube views and engagement."
                                />
                                <ProductItem
                                    title="Subscriber Growth Strategy"
                                    href="/case-studies/subscriber-growth-strategy"
                                    src="https://www.tubebuddy.com/wp-content/uploads/2023/03/Untitled-1048-x-250-px-900-x-250-px-4.png"
                                    description="Gained significant subscriber growth."
                                />
                                <ProductItem
                                    title="Social Media Expansion"
                                    href="/case-studies/social-media-expansion"
                                    src="https://media.licdn.com/dms/image/C5112AQFskASreP9XLA/article-cover_image-shrink_600_2000/0/1520081738499?e=2147483647&v=beta&t=YOtymNiXfMzNtWelR9Dja00aDeU1DSxzn_8HAAsZx2M"
                                    description="Increased social media presence."
                                />
                                <ProductItem
                                    title="Brand Recognition Enhancement"
                                    href="/case-studies/brand-recognition-enhancement"
                                    src="https://media.licdn.com/dms/image/D4D12AQGZ6Kb0C0aXBA/article-cover_image-shrink_600_2000/0/1686569870953?e=2147483647&v=beta&t=tJVKODeNTlC6DrpLmtam_pqcxKIaEMaEq1IQgomitk0"
                                    description="Enhanced brand recognition and reach."
                                />
                            </div>
                        </MenuItem>
                        <MenuItem setActive={setActive} active={active} item="Pricing">
                            <div className="flex flex-col space-y-4 text-sm">
                                <HoveredLink href="/starter-plan">Starter Plan</HoveredLink>

                                < HoveredLink href="/business-plan">Business Plan</ HoveredLink>
                                <HoveredLink href="/enterprise-plan">Enterprise Plan</HoveredLink>
                            </div>
                        </MenuItem>
                    </Menu>
                    <button className="p-[3px] relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-primary to-black rounded-full" />
                        <div className="px-8 py-2   bg-white  relative group transition duration-200 text-black font-bold hover:text-white hover:bg-transparent rounded-full">
                            Start
                        </div>
                    </button>

                </div>
                <div className='  sm:hidden flex justify-between w-full py-4'>
                    <Link href={'/'} className=" text-xl text-red-primary font-bold">Glossour</Link>

                    <button className=' ' onClick={() => setActive1(!active1)}><FaBars color='#FF0000' size={15} /></button>

                </div>
            </div>
            <div ref={navbarRef} className={`bg-white w-4/5 fixed top-0 md:hidden left-0 h-screen p-3 flex justify-between flex-col z-[1001] transition-all duration-300 ${active1 ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className='flex flex-col'>
                    <Link href={'/'} className=" text-3xl text-red-primary font-bold">Glossour</Link>


                    <div className='mt-8 bg-black  text-white rounded font-semibold'>
                        <div onClick={() => handleDropdownToggle('services')}
                            className="flex  text-xl cursor-pointer items-center px-2 py-1.5 justify-between rounded-lg"
                        >
                            <span>Services</span>
                            <span className={`shrink-0 transition duration-300 ${activeDropdown.services ? "-rotate-180" : "rotate-0"}`}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                        </div>

                        <ul className={`overflow-hidden transition-all duration-300 text-sm   px-3 ${activeDropdown.services ? 'max-h-screen' : 'max-h-0'}`}>
                            <Link href={'/service/youtube-promotion'}><li className='py-1'>YouTube Promotion</li></Link>
                            <Link href={'/service/spotify-promotion'}><li className='py-1'>Spotify Promotion</li></Link>
                            <Link href={'/service/instagram-promotion'}><li className='pt-1 pb-3'>Instagram Promotion</li></Link>
                        </ul>
                    </div>

                    <div className='mt-2 bg-black  text-white rounded font-semibold'>
                        <div onClick={() => handleDropdownToggle('pricing')}
                            className="flex  text-xl cursor-pointer items-center px-2 py-1.5 justify-between rounded-lg"
                        >
                            <span>Pricing</span>
                            <span className={`shrink-0 transition duration-300 ${activeDropdown.pricing ? "-rotate-180" : "rotate-0"}`}>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-8 w-8"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </span>
                        </div>

                        <ul className={`overflow-hidden transition-all duration-300 text-sm   px-3 ${activeDropdown.pricing ? 'max-h-screen' : 'max-h-0'}`}>
                            <Link href={'/starter-plan'}><li className='py-1'>Starter Plan</li></Link>
                            <Link href={'/business-plan'}><li className='py-1'>Business Plan</li></Link>
                            <Link href={'/enterprise-plan'}><li className='pt-1 pb-3'>Enterprise Plan</li></Link>

                        </ul>
                    </div>

                </div>
                <div>

                    <button onClick={() => setActive1(!active1)} className="p-[3px] relative w-full">
                        <div className="absolute inset-0 bg-gradient-to-r from-red-primary to-black rounded-lg" />
                        <div className="px-8 py-2   bg-white  relative group transition duration-200 text-black font-bold hover:text-white hover:bg-transparent rounded-lg">
                            Start
                        </div>
                    </button>
                </div>
            </div>

        </>
    );
}

export default Navbar;
