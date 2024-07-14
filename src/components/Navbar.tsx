'use client';
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./utils/navbar-menu";
import { cn } from "./utils/cn";

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    return (
        <div
            className={cn("fixed top-5 inset-x-0 max-w-2xl mx-auto z-50", className)}
        >
            <Menu setActive={setActive}>
                <MenuItem setActive={setActive} active={active} item="Services">
                    <div className="flex flex-col space-y-4 text-sm">
                        <HoveredLink href="/youtube-promotion">YouTube Promotion</HoveredLink>
                        <HoveredLink href="/social-media-marketing">Social Media Marketing</HoveredLink>
                        <HoveredLink href="/content-creation">Content Creation</HoveredLink>
                        <HoveredLink href="/branding">Branding</HoveredLink>
                    </div>
                </MenuItem>
                <MenuItem setActive={setActive} active={active} item="Case Studies">
                    <div className="text-sm grid grid-cols-2 gap-10 p-4">
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
                        <HoveredLink href="/professional-plan">Professional Plan</HoveredLink>
                        < HoveredLink href="/business-plan">Business Plan</ HoveredLink>
                        <HoveredLink href="/enterprise-plan">Enterprise Plan</HoveredLink>
                    </div>
                </MenuItem>
            </Menu>
        </div>
    );
}

export default Navbar;
