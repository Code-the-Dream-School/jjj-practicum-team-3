'use client';

import React, { useMemo, useState, useEffect } from 'react';
import { IMovie } from '@/interfaces';

/* TO CHANGE GENRES, CHANGE THIS VARIABLE */
const ALL_GENRES = [
    'ACTION',
    'DRAMA',
    'COMEDY',
    'KIDS',
    'HORROR',
    'ROMANCE',
    'SCI-FI',
    'ANIMATED',
    'DOCUMENTARIES',
    'IMAX',
    '3D',
    'SUSPENSE',
    'INDIE',
    'FOREIGN',
    'SPECIAL EVENTS',
    'WESTERN',
    'SPY FILM',
    'HISTORICAL FILM',
    'CLASSIC',
    'WAR',
    'DANCE',
    'FILM, TV & RADIO',
    'MUSIC/PERFORMING ARTS',
] as const;

/* TO CHANGE AMOUNT OF MOVIES ON PAGE, CHANGE THIS VARIABLE */
const PER_PAGE = 12;

export default function AllMoviesPage() {
    const [activeGenre, setActiveGenre] = useState<string | 'All'>('All');
    const [page, setPage] = useState(1);
    const [movies, setMovies] = useState<IMovie[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchMovies = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/movies');
                if (!response.ok) {
                    throw new Error('Failed to fetch movies');
                }
                const result = await response.json();
                console.log('API response:', result); // Debug log
                if (!result.success) {
                    throw new Error(result.message || 'Failed to fetch movies');
                }
                if (!Array.isArray(result.data)) {
                    throw new Error('API response data is not an array');
                }
                setMovies(result.data);
            } catch (err) {
                console.error('Error fetching movies:', err);
                setError('Failed to load movies. Please try again later.');
            } finally {
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);

    function selectGenre(g: string | 'All') {
        setActiveGenre(g);
        setPage(1);
    }

    const filtered = useMemo(() => {
        if (!Array.isArray(movies)) return [];
        if (activeGenre === 'All') return movies;
        return movies.filter((m) => m.genre?.toLowerCase() === activeGenre.toLowerCase());
    }, [activeGenre, movies]);

    const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
    const start = (page - 1) * PER_PAGE;
    const current = filtered.slice(start, start + PER_PAGE);

    if (loading) {
        return (
            <main className="min-h-screen bg-[#0f121a] text-[#e7eaf3] px-4 py-6 md:px-6 lg:px-8">
                <section className="mx-auto max-w-6xl">
                    <div className="text-center py-10">Loading movies...</div>
                </section>
            </main>
        );
    }

    if (error) {
        return (
            <main className="min-h-screen bg-[#0f121a] text-[#e7eaf3] px-4 py-6 md:px-6 lg:px-8">
                <section className="mx-auto max-w-6xl">
                    <div className="text-center py-10 text-red-500">{error}</div>
                </section>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-[#0f121a] text-[#e7eaf3] px-4 py-6 md:px-6 lg:px-8">
            {/* GENRE FILTER */}
            <section className="mx-auto max-w-6xl">
                <h2 className="mb-3 text-sm font-extrabold tracking-wide text-[#a3acc2]">
                    Filter by Movie Genres
                </h2>

                <div className="mb-6 flex flex-wrap gap-2">
                    <GenreTag
                        label="All"
                        active={activeGenre === 'All'}
                        onClick={() => selectGenre('All')}
                    />
                    {ALL_GENRES.map((g) => (
                        <GenreTag
                            key={g}
                            label={g}
                            active={activeGenre === g}
                            onClick={() => selectGenre(g)}
                        />
                    ))}
                </div>
            </section>

            {/* GRID */}
            <section className="mx-auto max-w-6xl">
                {current.length === 0 ? (
                    <div className="rounded-xl border border-[#2b3450] bg-[#1b2030] p-6 text-[#a3acc2]">
                        No movies for this genre yet.
                    </div>
                ) : (
                    <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                        {current.map((m) => (
                            <MovieCard key={m.id} movie={m} />
                        ))}
                    </div>
                )}

                {/* PAGINATION */}
                {totalPages > 1 && (
                    <div className="mt-6 flex items-center justify-center gap-2">
                        <PageBtn disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
                            Prev
                        </PageBtn>
                        {Array.from({ length: totalPages }).map((_, i) => {
                            const n = i + 1;
                            const isActive = n === page;
                            return (
                                <button
                                    key={n}
                                    onClick={() => setPage(n)}
                                    className={`h-9 min-w-9 rounded-md px-3 text-sm font-bold ${
                                        isActive
                                            ? 'bg-[#e8eefc] text-[#0c1222]'
                                            : 'bg-[#1b2030] text-[#cfd5e6] border border-[#2b3450] hover:border-[#3a4669]'
                                    }`}
                                >
                                    {n}
                                </button>
                            );
                        })}
                        <PageBtn
                            disabled={page === totalPages}
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        >
                            Next
                        </PageBtn>
                    </div>
                )}
            </section>
        </main>
    );
}

function GenreTag({
                      label,
                      active,
                      onClick,
                  }: {
    label: string;
    active?: boolean;
    onClick?: () => void;
}) {
    return (
        <button
            onClick={onClick}
            className={[
                'rounded-lg px-3 py-1.5 text-[11px] font-extrabold tracking-wide transition-colors outline-none',
                'focus-visible:ring-2 focus-visible:ring-[#6AA6FF]/40',
                active
                    ? 'text-[#6AA6FF] bg-[#16243B] border border-[#3D5A8C]'
                    : 'text-[#6AA6FF] bg-transparent border border-[#2B3450] hover:bg-[#111726] hover:border-[#3A4669]',
            ].join(' ')}
        >
            {label.toUpperCase()}
        </button>
    );
}

function MovieCard({ movie }: { movie: IMovie }) {
    return (
        <a
            href={`/movie/${movie.id}`}
            className="group block rounded-lg"
            aria-label={`${movie.title} (${movie.year})`}
        >
            <div className="overflow-hidden rounded-lg bg-[#111726]">
                <img
                    src={movie.poster}
                    alt={movie.title}
                    className="aspect-[2/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
            </div>

            <div className="mt-2">
                <div className="text-xs font-extrabold tracking-wide text-[#cfd5e6]">
                    {movie.title.toUpperCase()}{' '}
                    <span className="opacity-80">({movie.year})</span>
                </div>
                {movie.comingsoon && (
                    <div className="text-[11px] font-bold text-[#e8eefc] opacity-90">
            <span className="rounded-sm bg-[#F05A3B] px-1.5 py-0.5 text-[#0c1222]">
              Coming Soon
            </span>
                    </div>
                )}
            </div>
        </a>
    );
}

function PageBtn({
                     children,
                     disabled,
                     onClick,
                 }: React.PropsWithChildren<{ disabled?: boolean; onClick?: () => void }>) {
    return (
        <button
            disabled={disabled}
            onClick={onClick}
            className={`h-9 rounded-md px-3 text-sm font-bold ${
                disabled
                    ? 'cursor-not-allowed bg-[#111726] text-[#555e77]'
                    : 'bg-[#1b2030] text-[#cfd5e6] border border-[#2b3450] hover:border-[#3a4669]'
            }`}
        >
            {children}
        </button>
    );
}
