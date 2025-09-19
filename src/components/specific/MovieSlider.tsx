import React, { useState } from 'react';
import MovieCardHomePage from "@/components/specific/MovieCardHomePage";
import { IMovie } from '@/types/IMovie';
const MovieSlider = ({ title, movies }: { title: string; movies: IMovie[] }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const moviesPerPage = 7;
    const numPages = Math.ceil(movies.length / moviesPerPage);
    const handlePrev = () => {
        setCurrentSlide((prev) => (prev - 1 + numPages) % numPages);
    };
    const handleNext = () => {
        setCurrentSlide((prev) => (prev + 1) % numPages);
    };

// Calculate the slice of movies to display on the current slide
    const startIndex = currentSlide * moviesPerPage;
    const endIndex = startIndex + moviesPerPage;
    const moviesToShow = movies.slice(startIndex, endIndex);
    return (
        <section className="mb-12">
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl sm:text-3xl font-bold">{title}</h2>
                <a href="#" className="text-blue-400 hover:underline">See All {title}</a>
            </div>
            {/* The main container uses relative positioning for the navigation arrows */}
            <div className="relative">
                <div className="flex justify-center md:justify-start gap-4 flex-wrap md:flex-nowrap">
                    {moviesToShow.map(movie => (
                        <MovieCardHomePage key={movie.id} movie={movie} />
                    ))}
                </div>
                {/* Navigation Arrows */}
                {movies.length > moviesPerPage && (
                    <>
                        <button
                            onClick={handlePrev}
                            className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Previous Slide"
                        >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                            </svg>
                        </button>
                        <button
                            onClick={handleNext}
                            className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            aria-label="Next Slide"
                        >
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                            </svg>
                        </button>
                    </>
                )}
            </div>
        </section>
    );
};

export default MovieSlider;
