const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start text-center lg:text-left space-y-8 lg:space-y-0">

                    {/* Logo */}
                    <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
                        <h1 className="text-4xl font-bold font-sans">ComeAndSee</h1>
                    </div>

                    {/* Navigation Links */}
                    <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start">
                        <h3 className="font-bold text-lg mb-4">Navigation</h3>
                        <ul className="space-y-2 text-sm">
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Movies</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Theater Listings</a></li>
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Pricing</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-start">
                        <h3 className="font-bold text-lg mb-4">Contact Us</h3>
                        <ul className="space-y-2 text-sm">
                            <li>(555) 555-5555</li>
                            <li>contact@comeandsee.com</li>
                            <li>123 Theater St, City, ST 12345</li>
                        </ul>
                    </div>
                </div>
                <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-400">
                    &copy; 2025 ComeAndSee. All rights reserved.
                </div>
            </div>
        </footer>
    );
};
export default Footer;
