'use client'
import { PlaceholdersAndVanishInput } from "@/components/utils/placeholders-and-vanish-input";
import axios from "axios";
import React, { useState } from "react";

function InstgramPayment() {
    const [post, setPost] = useState<any[]>([]);
    const [loader, setLoader] = useState(false);
    return (
        <div className="min-h-[50rem] w-full  max-h-max  md:py-48 py-28   bg-gray-200  dark:bg-grid-white/[0.2] bg-grid-black/[0.2] relative flex items-center flex-col justify-center">

            <div className="absolute pointer-events-none inset-0 flex items-center justify-center  bg-gray-200 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <PlaceholdersAndVanishInputDemo setPost={setPost} setLoader={setLoader} />

            {loader && <div className='text-2xl mt-5'>Loading...</div>}
            {post && <CheckOutCard plans={post} />}
        </div>
    );
}
export default InstgramPayment;


function PlaceholdersAndVanishInputDemo({ setPost, setLoader }: { setPost: React.Dispatch<React.SetStateAction<Array<any>>>, setLoader: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [value, setValue] = React.useState("");
    const placeholders = [
        "Enter the Instgram Post link...",
        "Enter the Instgram username...",
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
    };
    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        setLoader(true);
        e.preventDefault();


        try {
            const response = await axios.post('/api/instagram-plans', { input: value });
            const data = response.data;
            const plans = GeneratePlan(data);
            setPost(plans)
        } catch (error) {
            console.error(error);
        }

        setLoader(false);
    };

    return (
        <div className="flex flex-col justify-center items-center px-4">
            <h2 className="mb-4 text-2xl text-center sm:text-5xl font-extrabold text-black md:w-3/4 w-full">
                Get Customized Pricing for Your YouTube Video Analysis
            </h2>
            <p className="mb-5 sm:mb-10 text-center text-black md:text-sm text-xs max-w-2xl">
                Our pricing is tailored to the specific attributes of your video, including its length, your location, and your subscriber count. Factors such as video duration and geographic adjustments are considered to provide a personalized and accurate quote.
            </p>
            <PlaceholdersAndVanishInput
                placeholders={placeholders}
                onChange={handleChange}
                onSubmit={onSubmit}
            />
        </div>

    );
}
interface Plan {
    isMostPop: boolean;
    name: string;
    username: string;
    desc: string;
    price: string
    title: string
    src: string
    followers: number
    features: string[]
}

const CheckOutCard = ({ plans }: { plans: Plan[] }) => {

    const handlePayment = async ({ pay }: { pay: string }) => {
        try {
            const amount = parseInt(pay);

            // Call your API to create an order
            const { data: order } = await axios.post('/api/payment', { amount });

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // Razorpay Key ID
                amount: order.amount,
                currency: order.currency,
                name: 'Your Company Name',
                description: 'Payment for your product/service',
                image: '/your_logo.png', // Optional - Your logo URL
                order_id: order.id,
                handler: function (response: { razorpay_payment_id: any; razorpay_order_id: any; razorpay_signature: any; }) {
                    console.log(response.razorpay_payment_id);
                    console.log(response.razorpay_order_id);
                    console.log(response.razorpay_signature);
                    // Handle post-payment actions here, like saving the response to the backend
                },
                prefill: {
                    name: 'Customer Name',
                    email: 'customer@example.com',
                    contact: '9876543210',
                },
                theme: {
                    color: '#F37254',
                },
            };

            const razorpay = new (window as any).Razorpay(options);
            razorpay.open();
        } catch (error) {
            console.error('Payment Error:', error);
        }
    };
    return (
        <section className='relative py-5'>
            <div className="relative max-w-screen-xl mx-auto text-gray-300 sm:px-4 md:px-8">

                <div className='mt-16 justify-center md:space-x-3 space-x-0 sm:flex'>
                    {
                        plans.map((item, idx) => (
                            <div key={idx} className={`relative flex-1 flex items-stretch flex-col mt-6 border-2 sm:mt-0 sm:rounded-xl sm:max-w-md ${item.isMostPop ? "bg-white border-red-primary border-x-0 sm:border-x-2" : "border-transparent"}`}>
                                <div className='p-3 w-full flex flex-col space-y-2'>
                                    <img src={item.src} alt="" className=' w-full h-40 object-cover rounded-xl' />
                                    <h1 className=' text-black text-sm font-semibold'>{item.username}</h1>
                                    <h1 className=' text-black text-lg font-semibold'>{item.name}</h1>

                                    <h1 className=' text-black text-sm font-semibold'>Followers {item.followers}</h1>
                                </div>
                                <div className="px-4 py-8 space-y-4 border-b border-gray-700 md:px-8">
                                    <span className='text-black font-medium'>
                                        {item.title}
                                    </span>
                                    <div className='text-red-primary text-3xl font-semibold'>
                                        ${item.price} <span className="text-xl font-normal">/mo</span>
                                    </div>
                                    <p className="text-gray-700">
                                        {item.desc}
                                    </p>
                                    <button onClick={() => handlePayment({ pay: item.price })} className='px-3 py-3 rounded-lg w-full font-semibold text-sm duration-150 text-white bg-red-primary hover:opacity-70 '>
                                        Get Started
                                    </button>
                                </div>
                                <ul className='p-4 py-8 space-y-3 md:p-8'>
                                    {
                                        item.features.map((featureItem, idx) => (
                                            <li key={idx} className='flex items-center gap-5 text-gray-900'>
                                                <svg
                                                    xmlns='http://www.w3.org/2000/svg'
                                                    className={`h-5 w-5 ${item.isMostPop ? "text-red-primary" : ""}`}
                                                    viewBox='0 0 20 20'
                                                    fill='currentColor'>
                                                    <path
                                                        fill-rule='evenodd'
                                                        d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                                        clip-rule='evenodd'></path>
                                                </svg>
                                                {featureItem}
                                            </li>
                                        ))
                                    }
                                </ul>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    );
};

const GeneratePlan = (item: any) => {
    let src = '';


    return [{
        username: item.username,
        followers: item.edge_followed_by.count,
        isMostPop: true,
        name: item.name,
        desc: item.biography,
        price: 10,
        title: "Basic Plan",
        src: src,
        features: []
    }]
}
