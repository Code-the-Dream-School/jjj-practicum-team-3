import React from 'react';
import Header from '@/components/shared/layout/Header';
import Footer from '@/components/shared/layout/Footer';
import HomePage from '@/components/specific/HomePage'; // Example path

const App = () => {
    return (
        <div className="bg-[#151925] text-white font-sans">
            <Header />
            <HomePage />
            <Footer />
        </div>
    );
};

export default App;
