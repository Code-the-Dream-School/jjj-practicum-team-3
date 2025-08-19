const Header = () => {
    return (
        <header className="bg-[#151925] p-4 shadow-md flex justify-between items-center">
            <div className="flex-shrink-0">
                <img src="/logo.png" alt="ComeAndSee Logo" className="h-20 w-auto"/>
            </div>
            <nav className="hidden sm:flex space-x-4">
                <a href="#" className="hover:text-blue-400">Movies</a>
                <a href="#" className="hover:text-blue-400">Coming Soon</a>
            </nav>
            <div className="flex items-center space-x-4">
                <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full">Log In</button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-full">Sign Up</button>
            </div>
        </header>
    );
};
export default Header;
