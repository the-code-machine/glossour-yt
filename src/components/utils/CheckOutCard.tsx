import React from 'react';

interface Plan {
    isMostPop: boolean;
    name: string;
    desc: string;
    price: string
    src: string
    features: string[]
}

export default ({ plans }: { plans: Plan[] }) => {


    return (
        <section className='relative py-5'>
            <div className="relative max-w-screen-xl mx-auto text-gray-300 sm:px-4 md:px-8">

                <div className='mt-16 justify-center md:space-x-3 space-x-0 sm:flex'>
                    {
                        plans.map((item, idx) => (
                            <div key={idx} className={`relative flex-1 flex items-stretch flex-col mt-6 border-2 sm:mt-0 sm:rounded-xl sm:max-w-md ${item.isMostPop ? "bg-white border-red-primary border-x-0 sm:border-x-2" : "border-transparent"}`}>
                                <div className='p-3 w-full'><img src={item.src} alt="" className=' w-full h-40 object-cover rounded-xl' /></div>
                                <div className="px-4 py-8 space-y-4 border-b border-gray-700 md:px-8">
                                    <span className='text-black font-medium'>
                                        {item.name}
                                    </span>
                                    <div className='text-red-primary text-3xl font-semibold'>
                                        ${item.price} <span className="text-xl font-normal">/mo</span>
                                    </div>
                                    <p className="text-gray-700">
                                        {item.desc}
                                    </p>
                                    <button className='px-3 py-3 rounded-lg w-full font-semibold text-sm duration-150 text-white bg-red-primary hover:opacity-70 '>
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
