"use client";
import React, {useEffect, useState} from 'react';
import Header from '@/components/shared/layout/Header';
import Footer from '@/components/shared/layout/Footer';
import HomePage from '@/components/specific/HomePage';
import TheatersByLocationPage from "@/app/(main)/theaters-by-location/page";
import TheaterResults from "@/app/(main)/theater-results/page";
const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const Page = () => {
    const [isMapsLoaded, setIsMapsLoaded] = useState(false);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`;
        script.async = true;
        script.onload = () => {
            setIsMapsLoaded(true);
        };
        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    const queryParams = new URLSearchParams(window.location.search);
    const page = queryParams.get('page') || 'home';

    const renderPage = () => {
        switch (page) {
            case 'theaters-by-location':
                return <TheatersByLocationPage />;
            case 'theater-results':
                return <TheaterResults />;
            case 'home':
            default:
                if (isMapsLoaded) {
                    return <HomePage isMapsLoaded={isMapsLoaded} />;
                } else {
                    return <div className="text-center text-white py-12">Loading...</div>;
                }
        }
    };

    return (
        <div className="min-h-screen bg-gray-900 font-sans text-gray-200 flex flex-col">
            <Header />
            {renderPage()}
            <Footer />
        </div>
    );
};

export default Page;

//<div className="bg-[#151925] text-white font-sans">
