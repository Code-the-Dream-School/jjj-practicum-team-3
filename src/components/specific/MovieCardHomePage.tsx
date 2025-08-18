interface MovieCardProps {
    posterSrc: string;
    title: string;
}
const MovieCardHomePage = ({ posterSrc, title }: MovieCardProps) => (
    <div className="relative group w-48 mx-2 my-4">
        <img
            src={posterSrc}
            alt={title}
            className="rounded-lg shadow-lg transform group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-end p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="text-white text-sm font-semibold">{title}</span>
        </div>
    </div>
);
export default MovieCardHomePage;
