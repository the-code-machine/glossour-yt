'use client'
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { PlaceholdersAndVanishInputDemo } from '../utils/search';
import { ExpandableCardDemo } from '../utils/SerachPost';

interface Section5Props {
}

const Section5: React.FC<Section5Props> = ({ }) => {
    const [post, setPost] = useState<any[]>([]);
    const [loader, setLoader] = useState(false);

    return (
        <div className=' md:px-20 py-20 bg-red-primary w-full text-white flex flex-col justify-center items-center'>
            <PlaceholdersAndVanishInputDemo setPost={setPost} setLoader={setLoader} />

            {loader && <div className='text-2xl'>Loading...</div>}
            {post && <ExpandableCardDemo cards={post} />}
        </div>
    );
};
export default Section5;