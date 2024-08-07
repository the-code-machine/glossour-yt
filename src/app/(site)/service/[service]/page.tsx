'use client';
import { AuroraBackgroundDemo } from '@/components/service/Hero';
import { TextParallaxContentExample } from '@/components/service/Services';
import { usePathname } from 'next/navigation';
import React from 'react';

interface pageProps { }

type ServiceKeys = 'youtube-promotion' | 'spotify-promotion' | 'instagram-promotion';

interface Word {
    text: string;
    className?: string;
}
interface innerServices {

    imgUrl: string;
    subheading: string;
    heading: string;
    innerHeading: string;
    description: string;
    buttonText: string;
    color: string;
    link: string;
}
const words: Record<ServiceKeys, Word[]> = {
    "youtube-promotion": [
        { text: "Boost" },
        { text: "your" },
        { text: "video" },
        { text: "views" },
        { text: "with" },
        { text: "our" },
        { text: "promotion.", className: "text-red-primary" }
    ],
    "spotify-promotion": [
        { text: "Stream" },
        { text: "your" },
        { text: "favorite" },
        { text: "music" },
        { text: "with " },
        { text: "Spotify.", className: "text-green-primary" }
    ],
    "instagram-promotion": [
        { text: "Share" },
        { text: "moments" },
        { text: "with" },
        { text: "the" },
        { text: "world", },
        { text: "on" },
        { text: "Instagram.", className: "bg-clip-text text-transparent bg-gradient-to-r from-[#F58529] via-[#DD2A7B] to-[#833AB4] " }
    ]
};

const innerServicesData: Record<ServiceKeys, innerServices[]> =
{

    "youtube-promotion": [
        {
            imgUrl: '/videos/yt-1.mp4',
            subheading: 'Boost Your Channel',
            heading: 'YouTube Views',
            innerHeading: 'Get More Views',
            description: 'Increase your YouTube views significantly with our targeted promotion services. Our strategies are designed to enhance your visibility on the platform, attract a larger audience, and improve your channel’s overall performance. Leverage our expertise to gain more views and drive higher engagement for your content.',
            buttonText: 'Learn More',
            color: '#FF0000',
            link: '/services/youtube-views'
        },
        {
            imgUrl: '/videos/yt-2.mp4',
            subheading: 'Enhance Engagement',
            heading: 'YouTube Likes',
            innerHeading: 'Get More Likes',
            description: 'Boost your video likes to enhance engagement and credibility. Our promotion services are tailored to increase likes on your videos, which helps in building a more engaged audience. More likes not only improve your video’s ranking but also contribute to greater viewer trust and interaction.',
            buttonText: 'Learn More',
            color: '#FF0000',
            link: '/services/youtube-likes'
        },
        {
            imgUrl: '/videos/yt-3.mp4',
            subheading: 'Grow Your Audience',
            heading: 'YouTube Followers',
            innerHeading: 'Gain More Followers',
            description: 'Attract more followers to your YouTube channel with our specialized growth strategies. Our services focus on organic growth, ensuring you gain followers who are genuinely interested in your content. A larger follower base enhances your channel’s authority and reach.',
            buttonText: 'Learn More',
            color: '#FF0000',
            link: '/services/youtube-followers'
        },
        {
            imgUrl: '/videos/yt-4.mp4',
            subheading: 'Expand Reach',
            heading: 'Reel Promotion',
            innerHeading: 'Promote Your Reels',
            description: 'Promote your YouTube reels effectively to reach a wider audience. Our promotion services are designed to increase the visibility of your reels, helping you gain more exposure and attract new viewers. Stand out and make your reels go viral with our targeted strategies.',
            buttonText: 'Learn More',
            color: '#FF0000',
            link: '/services/reel-promotion'
        },
        {
            imgUrl: '/videos/yt-5.mp4',
            subheading: 'Get Noticed',
            heading: 'Music Press Release',
            innerHeading: 'Music Press Release',
            description: 'Distribute your music press release to industry insiders and media outlets with our expert services. Gain recognition and increase your chances of getting noticed in the music industry. Our distribution network ensures your press release reaches key players and potential fans.',
            buttonText: 'Learn More',
            color: '#FF0000',
            link: '/services/music-press-release'
        }
    ]
    ,
    "spotify-promotion": [
        {
            imgUrl: 'path/to/image1.jpg',
            subheading: 'Boost Your Tracks',
            heading: 'Spotify Streams',
            innerHeading: 'Get More Streams',
            description: 'Enhance your Spotify streams with our specialized promotion services. We focus on increasing the number of streams for your tracks, helping you achieve greater visibility and reach on the platform. Our strategies are aimed at attracting more listeners and boosting your track’s performance.',
            buttonText: 'Learn More',
            color: 'green-500',
            link: '/services/spotify-streams'
        },
        {
            imgUrl: 'path/to/image2.jpg',
            subheading: 'Enhance Engagement',
            heading: 'Spotify Followers',
            innerHeading: 'Gain More Followers',
            description: 'Grow your follower base on Spotify to boost your reach and credibility. Our services are designed to attract genuine followers who are interested in your music. A larger follower count enhances your presence on the platform and increases engagement with your tracks.',
            buttonText: 'Learn More',
            color: 'blue-500',
            link: '/services/spotify-followers'
        },
        {
            imgUrl: 'path/to/image3.jpg',
            subheading: 'Expand Reach',
            heading: 'Spotify Playlist Placement',
            innerHeading: 'Get on Playlists',
            description: 'Feature your tracks on popular Spotify playlists with our expert placement services. Being on playlists can significantly increase your track’s exposure and attract a broader audience. Our network and strategies ensure that your music reaches influential playlist curators.',
            buttonText: 'Learn More',
            color: 'purple-500',
            link: '/services/spotify-playlist-placement'
        },
        {
            imgUrl: 'path/to/image4.jpg',
            subheading: 'Get Noticed',
            heading: 'Spotify Press Release',
            innerHeading: 'Music Press Release',
            description: 'Gain industry recognition by distributing your Spotify press release through our network. We help you reach media outlets and industry professionals to ensure your music gets the attention it deserves. Elevate your presence and make a mark in the music world.',
            buttonText: 'Learn More',
            color: 'yellow-500',
            link: '/services/spotify-press-release'
        },
        {
            imgUrl: 'path/to/image5.jpg',
            subheading: 'Enhance Engagement',
            heading: 'Spotify Monthly Listeners',
            innerHeading: 'Increase Monthly Listeners',
            description: 'Boost your Spotify monthly listeners with our targeted promotion services. Our approach focuses on increasing the number of listeners each month, helping you build a steady and engaged audience. Enhance your music career with a growing listener base.',
            buttonText: 'Learn More',
            color: 'red-500',
            link: '/services/spotify-monthly-listeners'
        }
    ]
    ,
    "instagram-promotion": [
        {
            imgUrl: 'path/to/image1.jpg',
            subheading: 'Boost Your Profile',
            heading: 'Instagram Followers',
            innerHeading: 'Gain More Followers',
            description: 'Increase your Instagram followers with our expert services. We focus on growing your profile organically, attracting followers who are genuinely interested in your content. A larger follower base enhances your profile’s visibility and credibility on the platform.',
            buttonText: 'Learn More',
            color: 'blue-500',
            link: '/services/instagram-followers'
        },
        {
            imgUrl: 'path/to/image2.jpg',
            subheading: 'Enhance Engagement',
            heading: 'Instagram Likes',
            innerHeading: 'Get More Likes',
            description: 'Boost the number of likes on your Instagram posts to increase engagement and visibility. Our services are tailored to improve your post interactions, helping you gain more visibility and attract more engagement from your audience.',
            buttonText: 'Learn More',
            color: 'red-500',
            link: '/services/instagram-likes'
        },
        {
            imgUrl: 'path/to/image3.jpg',
            subheading: 'Expand Reach',
            heading: 'Instagram Impressions',
            innerHeading: 'Increase Impressions',
            description: 'Increase impressions on your Instagram posts with our targeted strategies. More impressions mean a broader audience and higher visibility for your content. We focus on improving your reach and ensuring your posts are seen by more users.',
            buttonText: 'Learn More',
            color: 'green-500',
            link: '/services/instagram-impressions'
        },
        {
            imgUrl: 'path/to/image4.jpg',
            subheading: 'Get Noticed',
            heading: 'Instagram Verification',
            innerHeading: 'Get Verified',
            description: 'Obtain the coveted blue tick on Instagram to gain credibility and recognition. Our services help you navigate the verification process, ensuring that your profile stands out and is verified for authenticity.',
            buttonText: 'Learn More',
            color: 'purple-500',
            link: '/services/instagram-verification'
        },
        {
            imgUrl: 'path/to/image5.jpg',
            subheading: 'Enhance Engagement',
            heading: 'Instagram Comments',
            innerHeading: 'Get More Comments',
            description: 'Boost the number of comments on your Instagram posts to enhance engagement. Our services are designed to increase interactions, helping you build a more active and engaged community around your content.',
            buttonText: 'Learn More',
            color: 'yellow-500',
            link: '/services/instagram-comments'
        }
    ]

};

const subtitles: Record<ServiceKeys, string> = {
    "youtube-promotion": "Promote your videos effectively.",
    "spotify-promotion": "Listen to your favorite tracks.",
    "instagram-promotion": "Showcase your life visually."
};

const buttonTexts: Record<ServiceKeys, string> = {
    "youtube-promotion": "Start Promoting",
    "spotify-promotion": "Start Listening",
    "instagram-promotion": "Start Sharing"
};

const links: Record<ServiceKeys, string> = {
    "youtube-promotion": "/services/youtube-promotion",
    "spotify-promotion": "/services/spotify",
    "instagram-promotion": "/services/instagram"
};

const colors: Record<ServiceKeys, string> = {
    "youtube-promotion": "bg-red-primary",
    "spotify-promotion": "bg-green-primary",
    "instagram-promotion": "bg-instagram-gradient"
};


const Page: React.FC<pageProps> = () => {
    const service = usePathname().split('/')[2] as ServiceKeys;

    const currentWords = words[service] || [];
    const currentSubtitle = subtitles[service] || "";
    const currentButtonText = buttonTexts[service] || "";
    const currentLink = links[service] || "#";
    const currentColor = colors[service] || "";
    const currentInnerServices = innerServicesData[service] || [];

    return (
        <div>
            <AuroraBackgroundDemo
                words={currentWords}
                subtitle={currentSubtitle}
                buttonText={currentButtonText}
                link={currentLink}
                color={currentColor}
            />
            <TextParallaxContentExample innerServices={currentInnerServices} />
        </div>
    );
};

export default Page;
