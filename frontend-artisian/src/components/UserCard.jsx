import React from 'react';

const UserCard = () => {
    return (
        <div className="product-card w-[300px] rounded-md shadow-xl overflow-hidden z-[100] relative cursor-pointer snap-start shrink-0 py-8 px-6 bg-white flex flex-col items-center justify-center gap-3 transition-all duration-300 group">
            {/* Rotating SVG Star */}
            <div className="absolute -left-[40%] top-0 group-hover:rotate-12 transition-all duration-300 group-hover:scale-150">
                <div className="flex gap-1">
                    <svg
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        strokeWidth="1"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="fill-orange-800 rotate-[24deg]"
                        height="200"
                        width="200"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                    </svg>
                </div>
            </div>

            {/* Background Hover Effect */}
            <div className="absolute rounded-full bg-orange-800 z-20 left-1/2 top-[44%] h-[110%] w-[110%] -translate-x-1/2 group-hover:top-[58%] transition-all duration-300"></div>

            {/* Text */}
            <div className="para uppercase text-center leading-none z-40">
                <p className="text-black font-semibold text-xs font-serif">Best</p>
                <p className="font-bold text-xl tracking-wider text-orange-800">Fashion</p>
            </div>

            {/* Image Placeholder */}
            <div className="img w-[180px] aspect-square bg-orange-100 z-40 rounded-md">
                <svg viewBox="0 0 498.608 498.608" xmlns="http://www.w3.org/2000/svg">
                    {/* SVG content as per the original */}
                </svg>
            </div>
        </div>
    );
};

export default UserCard;
