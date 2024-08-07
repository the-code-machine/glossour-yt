'use client'
import { usePathname } from 'next/navigation';
import React from 'react';

interface pageProps {
}

const Page: React.FC<pageProps> = ({ }) => {
    const packageName = usePathname().split('/')[2];

    return (
        <div>
            <h1>

            </h1>
        </div>
    );
};
export default Page;