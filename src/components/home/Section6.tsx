'use client';

import React from 'react';
import Card from '../utils/PriceCard';

interface Section6Props { }

const Section6: React.FC<Section6Props> = ({ }) => {
    return (
        <div className='md:px-32 py-20 px-4 bg-black'>
            <div className='text-white font-extrabold sm:text-6xl md:mb-5 mb-5 text-4xl text-center'>
                Our <span className='text-green-primary'>Elite Packages</span>
            </div>
            <p className='text-center text-white max-w-2xl mx-auto mb-10'>
                Explore our exclusive packages tailored for different services. Get the best value and boost your online presence with our expert solutions.
            </p>
            <div className='grid md:grid-cols-3 grid-cols-1 gap-10 place-content-center'>
                <Card
                    title='YouTube Promotion'
                    color='bg-red-primary'
                    description='Enhance your YouTube channel visibility and engagement with our specialized promotion services.'
                    price='₹6000'
                    link='youtube-promotion'
                />
                <Card
                    title='Spotify Promotion'
                    color='bg-green-primary'
                    description='Grow your Spotify audience and increase your streams with our targeted promotion strategies.'
                    price='₹10000'
                    link='spotify-promotion'
                />
                <Card
                    title='Instagram Promotion'
                    color='bg-instagram-gradient'
                    description='Boost your Instagram presence and reach a wider audience with our effective promotion techniques.'
                    price='₹12000'
                    link='instagram-promotion'
                />
            </div>
        </div>
    );
};

export default Section6;
