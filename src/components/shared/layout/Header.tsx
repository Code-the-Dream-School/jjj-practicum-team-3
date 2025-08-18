const Header = () => {
    return (
        <header className="fixed top-0 left-0 w-full bg-gray-900 text-white shadow-lg z-50">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">

                <div className="flex items-center space-x-8">
                    <h1 className="text-3xl font-bold font-sans">ComeAndSee</h1>
                    <nav className="hidden md:flex space-x-6">
                        <a href="#" className="hover:text-blue-400 transition-colors">Movies</a>
                        <a href="#" className="hover:text-blue-400 transition-colors">Gaming Store</a>
                    </nav>
                </div>


                <div className="flex items-center space-x-4">
                    <button className="bg-transparent border border-white text-white px-4 py-2 rounded-lg hover:bg-white hover:text-gray-900 transition-colors">
                        Login
                    </button>
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors">
                        Sign Up
                    </button>
                </div>
            </div>
        </header>
    );
};
export default Header;
