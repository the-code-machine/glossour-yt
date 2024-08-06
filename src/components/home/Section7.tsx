'use client'
import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { InfiniteMovingCardsDemo } from '../utils/infinteCard';

interface Section7Props {
}

const Section7: React.FC<Section7Props> = ({ }) => {
    return (
        <div>
            <InfiniteMovingCardsDemo />
        </div>
    );
};
export default Section7;