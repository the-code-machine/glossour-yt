'use client'
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { PlaceholdersAndVanishInputDemo } from '../utils/search';

interface Section5Props {
}

const Section5: React.FC<Section5Props> = ({ }) => {
    return (
        <div className=' md:px-20 py-20 bg-red-primary text-white flex flex-col justify-center items-center'>
            <PlaceholdersAndVanishInputDemo />
        </div>
    );
};
export default Section5;