'use client'
import InstagramPayment from "@/components/utils/InstagramPayment";
import YoutubePayment from "@/components/utils/YoutubePayment";
import { usePathname } from "next/navigation";
import React from "react";

function Page() {
    const pathname = usePathname().split("/")[2];

    return (
        <div>
            {
                pathname.includes("youtube") && <YoutubePayment />
            }
            {
                pathname.includes("instagram") && <InstagramPayment />
            }


        </div>
    );
}
export default Page;


