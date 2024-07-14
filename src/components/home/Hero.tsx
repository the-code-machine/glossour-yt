'use client'
import React from 'react';
import HeroSection from '../utils/FuzzyHero';

interface HeroProps {
}

const Hero: React.FC<HeroProps> = ({ }) => {
    return (
        <div>
            <HeroSection />
        </div>
    );
};
export default Hero;