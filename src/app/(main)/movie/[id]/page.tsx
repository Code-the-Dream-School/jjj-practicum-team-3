"use client";

import CalendarStrip from "@/components/shared/layout/CalendarStrip";
import Footer from "@/components/shared/layout/Footer";
import React, { useState } from "react";

/* PLACEHOLDER TYPE, WHEN API DONE, CHANGE */
type Movie = {
    id: string;
    Title: string;
    Year: string;
    RunTime: string;
    Genre: string;
    Poster: string; // "/posters/1.png"
    ComingSoon: boolean;
};

/* STATIC SEED DATA — replace with API later */
const movieData = {
    "movies": [
        { "id": "1", "Title": "Nobody 2", "Year": "2025", "RunTime": "1 hr 29 min", "Genre": "Action", "Director": "Timo Tjahjanto", "Actors": "Bob Odenkirk, Connie Nielsen, John Ortiz", "Description": "Workaholic assassin Hutch Mansell takes his family on a much-needed vacation to the small tourist town of Plummerville. However, he soon finds himself in the crosshairs of a corrupt theme-park operator, a shady sheriff, and a bloodthirsty crime boss.", "Country": "United States", "Poster": "/posters/1.png", "ComingSoon": false },
        { "id": "2", "Title": "Weapons", "Year": "2025", "RunTime": "2 hr 8 min", "Genre": "Horror", "Director": "Zach Cregger", "Actors": "Josh Brolin, Julia Garner, Alden Ehrenreich", "Description": "An interrelated, multistory horror epic about the disappearance of high school students in a small town.", "Country": "United States", "Poster": "/posters/2.png", "ComingSoon": false },
        { "id": "3", "Title": "Highest 2 Lowest", "Year": "2025", "RunTime": "2 hr 13 min", "Genre": "Drama", "Director": "Spike Lee", "Actors": "Denzel Washington, Jeffrey Wright, Ilfenesh Hadera", "Description": "When a titan music mogul (Denzel Washington), widely known as having the “best ears in the business”, is targeted with a ransom plot, he is jammed up in a life-or-death moral dilemma. Brothers Denzel Washington and Spike Lee reunite for the 5th in their long working relationship for a reinterpretation of the great filmmaker Akira Kurosawa’s crime thriller High and Low, now played out on the mean streets of modern day New York City.", "Country": "United States", "Poster": "/posters/3.png", "ComingSoon": false },
        { "id": "4", "Title": "F1 The Movie", "Year": "2025", "RunTime": "2 hr 35 min", "Genre": "Drama", "Director": "Joseph Kosinski", "Actors": "Brad Pitt, Kerry Condon, Javier Bardem", "Description": "Dubbed “the greatest that never was,” Sonny Hayes (Brad Pitt) was FORMULA 1’s most promising phenom of the 1990s until an accident on the track nearly ended his career. Thirty years later, he’s a nomadic racer-for-hire when he’s approached by his former teammate Ruben Cervantes (Javier Bardem), owner of a struggling FORMULA 1 team that is on the verge of collapse. Ruben convinces Sonny to come back to FORMULA 1 for one last shot at saving the team and being the best in the world. He’ll drive alongside Joshua Pearce (Damson Idris), the team's hotshot rookie intent on setting his own pace. But as the engines roar, Sonny’s past catches up with him and he finds that in FORMULA 1, your teammate is your fiercest competition—and the road to redemption is not something you can travel alone.", "Country": "United States", "Poster": "/posters/4.png", "ComingSoon": false },
        { "id": "5", "Title": "Freakier Friday", "Year": "2025", "RunTime": "2 hr 51 min", "Genre": "Comedy", "Director": "Nisha Ganatra", "Actors": "Jamie Lee Curtis, Lindsay Lohan, Mark Harmon", "Description": "Tess, and Anna discover that lightning may indeed strike twice as they navigate the myriad challenges that come when two families merge.", "Country": "United States", "Poster": "/posters/5.png", "ComingSoon": false },
        { "id": "6", "Title": "The Fantastic Four: First Steps", "Year": "2025", "RunTime": "1 hr 55 min", "Genre": "Action", "Director": "Matt Shakman", "Actors": "Pedro Pascal, Vanessa Kirby, Ebon Moss-Bachrach", "Description": "Set against the vibrant backdrop of a 1960s-inspired, retro-futuristic world, Marvel Studios’ “The Fantastic Four: First Steps” introduces Marvel’s First Family—Reed Richards/Mister Fantastic, Sue Storm/Invisible Woman, Johnny Storm/Human Torch and Ben Grimm/The Thing as they face their most daunting challenge yet.", "Country": "United States", "Poster": "/posters/6.png", "ComingSoon": false },
        { "id": "7", "Title": "Americana", "Year": "2025", "RunTime": "1 hr 47 min", "Genre": "Thriller", "Director": "Tony Tost", "Actors": "Sydney Sweeney, Paul Walter Hauser, Zahn McClarnon", "Description": "A gallery of dynamic characters clash over the possession of a rare Native American artifact in this wildly entertaining modern-day western. After the artifact falls onto the black market, a shy waitress with big dreams (Sydney Sweeney) teams up with a lovelorn military veteran (Paul Walter Hauser) to gain possession of it, putting them in the crosshairs of a ruthless criminal (Eric Dane) working on behalf of a Western antiquities dealer (Simon Rex). Bloodshed ensues when others join the battle, including the leader of an indigenous group (Zahn McClarnon) and a desperate woman fleeing her mysterious past (Halsey).", "Country": "United States", "Poster": "/posters/7.png", "ComingSoon": false },
        { "id": "8", "Title": "The Bad Guys 2", "Year": "2025", "RunTime": "1 hr 44 min", "Genre": "Animated", "Director": "Pierre Perifel", "Actors": "Sam Rockwell, Marc Maron, Awkwafina", "Description": "Everyone’s favorite felons are back, and this time, they’ve got company. In the new action-packed chapter from DreamWorks Animation’s acclaimed comedy smash about a crackerjack crew of animal outlaws, our now-reformed Bad Guys are trying (very, very hard) to be good, but instead find themselves hijacked into a high-stakes, globe-trotting heist, masterminded by a new team of criminals they never saw coming: The Bad Girls.", "Country": "United States", "Poster": "/posters/8.png", "ComingSoon": false },
        { "id": "9", "Title": "Shin Godzilla 4K", "Year": "2025", "RunTime": "2 hr", "Genre": "Action", "Director": "Hideaki Anno and Shinji Higuchi", "Actors": "Hiroki Hasegawa, Yutaka Takenouchi, Satomi Ishihara", "Description": "Something has surfaced in Tokyo Bay. As the Prime Minister of Japan pleads with the public to remain calm, a horrific creature of tremendous size makes landfall in the city, leaving death and destruction in its wake. Then it evolves. The government assembles a motley task force to combat the monster when an envoy from the US Department of State delivers a folder of classified documents. On its cover is written: “GODZILLA.” From visionary directors Hideaki Anno and Shinji Higuchi, Shin Godzilla offers a thrilling origin story to one of cinema’s greatest creations. Propelled by astounding visual effects and rapid-fire dialogue, Shin Godzilla is equal parts pulse-pounding action film and venomous political satire, worthy of the franchise’s towering history.", "Country": "United States", "Poster": "/posters/9.png", "ComingSoon": false },
        { "id": "10", "Title": "The Naked Gun", "Year": "2025", "RunTime": "1 hr 25 min", "Genre": "Comedy", "Director": "Akiva Schaffer", "Actors": "Liam Neeson, Pamela Anderson, Paul Walter Hauser", "Description": "Only one man has the particular set of skills... to lead Police Squad and save the world! Lt. Frank Drebin Jr. (Liam Neeson) follows in his father's footsteps in THE NAKED GUN, directed by Akiva Schaffer (Saturday Night Live, Popstar: Never Stop Never Stopping) and from producer Seth MacFarlane (Ted, Family Guy). Joining the case are cast Pamela Anderson, Paul Walter Hauser, CCH Pounder, Kevin Durand, Cody Rhodes, Liza Koshy, Eddie Yu, with Danny Huston.", "Country": "United States", "Poster": "/posters/10.png", "ComingSoon": false },
        { "id": "11", "Title": "Captain America: Brave New World", "Year": "2025", "RunTime": "2 hr 10 min", "Genre": "Action", "Director": "Julius Onah", "Actors": "Anthony Mackie, Danny Ramirez, Shira Haas", "Description": "Sam Wilson, the new Captain America, faces an international crisis sparked by a shadowy conspiracy. Teaming up with allies old and new, he must unravel the truth before it destabilizes the world.", "Country": "United States", "Poster": "/posters/11.png", "ComingSoon": false },
        { "id": "12", "Title": "Mufasa: The Lion King", "Year": "2025", "RunTime": "1 hr 59 min", "Genre": "Animated", "Director": "Barry Jenkins", "Actors": "Aaron Pierre, Kelvin Harrison Jr., Tiffany Boone", "Description": "A prequel to The Lion King, this film explores Mufasa’s rise to becoming the king of the Pride Lands, delving into his early life, rivalries, and the events that shaped him into a legendary leader.", "Country": "United States", "Poster": "/posters/12.png", "ComingSoon": true },
        { "id": "13", "Title": "A Complete Unknown", "Year": "2025", "RunTime": "2 hr 21 min", "Genre": "Drama", "Director": "James Mangold", "Actors": "Timothée Chalamet, Elle Fanning, Boyd Holbrook", "Description": "A biographical drama chronicling Bob Dylan’s meteoric rise in the early 1960s New York folk scene, capturing his struggles, triumphs, and the cultural impact of his music.", "Country": "United States", "Poster": "/posters/13.png", "ComingSoon": true },
        { "id": "14", "Title": "Thunderbolts", "Year": "2025", "RunTime": "2 hr 5 min", "Genre": "Action", "Director": "Jake Schreier", "Actors": "Sebastian Stan, Florence Pugh, David Harbour", "Description": "A team of antiheroes, led by Bucky Barnes and Yelena Belova, is assembled for a high-stakes mission, navigating moral gray areas and their own volatile dynamics to save or doom the world.", "Country": "United States", "Poster": "/posters/14.png", "ComingSoon": true },
        { "id": "15", "Title": "The Gorge", "Year": "2025", "RunTime": "1 hr 50 min", "Genre": "Sci-Fi", "Director": "Scott Derrickson", "Actors": "Anya Taylor-Joy, Miles Teller, Sigourney Weaver", "Description": "Two soldiers stationed on opposite sides of a mysterious chasm uncover a sinister extraterrestrial secret that threatens humanity, forcing them to work together despite their divided loyalties.", "Country": "United States", "Poster": "/posters/15.png", "ComingSoon": true },
        { "id": "16", "Title": "Den of Thieves 2: Pantera", "Year": "2025", "RunTime": "2 hr", "Genre": "Action", "Director": "Christian Gudegast", "Actors": "Gerard Butler, O’Shea Jackson Jr., Meadow Williams", "Description": "Big Nick O’Brien leads his elite crew on a high-octane heist across Europe, chasing a legendary diamond thief while grappling with betrayal and law enforcement closing in.", "Country": "United States", "Poster": "/posters/16.png", "ComingSoon": true },
        { "id": "17", "Title": "Presence", "Year": "2025", "RunTime": "1 hr 45 min", "Genre": "Horror", "Director": "Steven Soderbergh", "Actors": "Lucy Liu", "Description": "A woman discovers that a ghostly presence is haunting her family, but when she starts to communicate with the entity, she learns that it is a witness to a horrific crime.", "Country": "United States", "Poster": "/posters/17.png", "ComingSoon": true },
        { "id": "18", "Title": "Sketch", "Year": "2025", "RunTime": "1 hr 55 min", "Genre": "Horror", "Director": "Alex O'Loughlin", "Actors": "Alex O'Loughlin, Jason Clarke", "Description": "The film follows a talented but haunted artist who is pursued by a dark entity that manifests from her sketches.", "Country": "United States", "Poster": "/posters/18.png", "ComingSoon": true },
        { "id": "19", "Title": "The Bad Guys 2", "Year": "2025", "RunTime": "1 hr 44 min", "Genre": "Animated", "Director": "Pierre Perifel", "Actors": "Sam Rockwell, Marc Maron, Awkwafina", "Description": "Everyone’s favorite felons are back, and this time, they’ve got company. In the new action-packed chapter from DreamWorks Animation’s acclaimed comedy smash about a crackerjack crew of animal outlaws, our now-reformed Bad Guys are trying (very, very hard) to be good, but instead find themselves hijacked into a high-stakes, globe-trotting heist, masterminded by a new team of criminals they never saw coming: The Bad Girls.", "Country": "United States", "Poster": "/posters/8.png", "ComingSoon": false },
        { "id": "20", "Title": "Clixk", "Year": "2025", "RunTime": "1 hr 44 min", "Genre": "Thriller", "Director": "Unknown", "Actors": "Unknown", "Description": "A social media influencer's life turns into a nightmare when she discovers that her every move is being watched and controlled by a mysterious person through her phone.", "Country": "United States", "Poster": "/posters/19.png", "ComingSoon": true },
        { "id": "21", "Title": "Freakier Friday Double Feature", "Year": "2025", "RunTime": "3 hr 30 min", "Genre": "Comedy", "Director": "Nisha Ganatra", "Actors": "Jamie Lee Curtis, Lindsay Lohan", "Description": "Tess, and Anna discover that lightning may indeed strike twice as they navigate the myriad challenges that come when two families merge.", "Country": "United States", "Poster": "/posters/20.png", "ComingSoon": true },
        { "id": "22", "Title": "Stans", "Year": "2025", "RunTime": "2 hr 5 min", "Genre": "Horror", "Director": "Unknown", "Actors": "Unknown", "Description": "A group of fans goes to extreme lengths to meet their favorite celebrity, only to find out that their idol is a monster hiding in plain sight.", "Country": "United States", "Poster": "/posters/21.png", "ComingSoon": true }
    ]
};

const theaters = [
    {
        name: "Cinemark Century Mountain View 16",
        address: "1500 N. Shoreline Blvd., Mountain View, CA 94043",
        times: ["2:00p", "4:00p", "6:00p"],
    },
    {
        name: "Alamo Drafthouse Mountain View",
        address: "2575 California St., Mountain View, CA 94040",
        times: ["2:00p", "4:00p", "6:00p"],
    },
];

/* LOGIC OF PAGINATION, WHEN API DONE, CHANGE */
type PageProps = { params: { id: string } };

export default function MoviePage({ params }: PageProps) {
    const [movieFilter, setMovieFilter] = useState<string>("");

    const movie = movieData.movies.find((m) => m.id === params.id);
    if (!movie) {
        return (
            <main className="min-h-screen bg-[#0f121a] text-[#e7eaf3] px-4 py-10 md:px-6 lg:px-8">
                <div className="mx-auto max-w-6xl rounded-2xl border border-[#2b3450] bg-[#1b2030] p-8">
                    <h1 className="text-2xl font-extrabold">Movie not found</h1>
                    <p className="mt-2 text-[#a3acc2]">
                        We couldn’t find a movie with id <span className="font-mono">{params.id}</span>.
                    </p>
                </div>
                <Footer />
            </main>
        );
    }

    /* LOGIC OF FILTRATION, WHEN API DONE, CHANGE */
    const filteredMovies = movieData.movies.filter((m) =>
        m.Title.toLowerCase().includes(movieFilter.toLowerCase())
    );
    const comingSoonMovies = filteredMovies.filter((m) => m.ComingSoon);

    return (
        <main className="min-h-screen bg-[#0f121a] text-[#e7eaf3] px-4 py-8 md:px-6 lg:px-8 space-y-8">
            {/* Input section placeholder */}
            <div className="bg-gray-800 p-6 rounded-xl shadow-lg mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                <input type="text" placeholder="Enter Location" className="w-full md:w-1/3 bg-gray-700 text-gray-200 p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                <input
                    type="text"
                    placeholder="Movie"
                    className="w-full md:w-1/3 bg-gray-700 text-gray-200 p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={movieFilter}
                    onChange={(e) => setMovieFilter(e.target.value)}
                />
                <input type="text" placeholder="Theater" className="w-full md:w-1/3 bg-gray-700 text-gray-200 p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-2 focus:ring-blue-500"/>
            </div>

            {/* CALENDAR PLACEHOLDER, WHEN CALENDAR LAYOUT DONE, CHANGE */}
            <section className="mx-auto max-w-6xl">
                <CalendarStrip
                    days={14}
                    onChange={(d) => console.log("selected:", d)}
                    className="mt-2"
                />
            </section>
            {/* ABOUT THE MOVIE */}
            <section className="mx-auto max-w-6xl rounded-2xl border border-[#2b3450] bg-[#1b2030] p-6 md:p-8">
                <div className="flex flex-col md:flex-row">
                    {/* Poster */}
                    <div className="md:w-1/3 w-full">
                        <img
                            src={movie.Poster}
                            alt={movie.Title}
                            className="w-full h-full object-cover md:rounded-l-2xl md:rounded-tr-none"
                        />
                    </div>

                    {/* Info */}
                    <div className="p-6 md:p-8 flex-1 space-y-3">
                        <h1 className="text-2xl font-extrabold leading-tight">
                            {movie.Title} <span className="font-semibold text-[#8b93a7]">({movie.Year})</span>
                        </h1>
                        <p className="text-sm font-medium text-[#a3acc2]">{movie.RunTime}</p>
                        <p className="leading-relaxed text-[#cfd5e6]">{movie.Description}</p>
                        <div className="grid gap-1 pt-1 text-[#cfd5e6]">
                            <p><span className="font-semibold">GENRE:</span> {movie.Genre}</p>
                        </div>
                    </div>
                </div>

                {/* SHOWTIMES PLACEHOLDER, WHEN SHOWTIMES LAYOUT DONE, CHANGE */}
                <div className="mb-4 flex items-center justify-between">
                    <h2 className="text-lg font-extrabold tracking-tight">Showtimes</h2>
                    <span className="rounded-full bg-[#e8eefc] px-3 py-1 text-xs font-extrabold text-[#0c1222]">
      coming soon
    </span>
                </div>

                <div className="divide-y divide-[#2b3450]">
                    {theaters.map((t) => (
                        <div key={t.name} className="flex flex-col gap-3 py-4 md:grid md:grid-cols-[1fr,auto] md:items-start">
                            {/* LEFT PART ADRESS*/}
                            <div>
                                <p className="m-0 text-base font-extrabold text-[#e7eaf3]">{t.name}</p>
                                <p className="m-0 text-sm text-[#a3acc2]">{t.address}</p>
                            </div>

                            {/* RIGHT PART TIME*/}
                            <div className="flex flex-wrap gap-4 md:justify-end">
                                {t.times.map((time) => (
                                    <a
                                        key={time}
                                        href="#"
                                        className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-extrabold text-white transition-transform"
                                        style={{
                                            backgroundColor: "#F05A3B",
                                            boxShadow: "0 4px 0 0 #B8402B",
                                        }}
                                        onMouseDown={(e) => {
                                            (e.currentTarget.style.transform = "translateY(1px)");
                                            (e.currentTarget.style.boxShadow = "0 2px 0 0 #B8402B");
                                        }}
                                        onMouseUp={(e) => {
                                            (e.currentTarget.style.transform = "");
                                            (e.currentTarget.style.boxShadow = "0 4px 0 0 #B8402B");
                                        }}
                                        onMouseLeave={(e) => {
                                            (e.currentTarget.style.transform = "");
                                            (e.currentTarget.style.boxShadow = "0 4px 0 0 #B8402B");
                                        }}
                                    >
                                        {time}
                                    </a>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <div className="w-full mt-8 mb-8">
                <img src="/footerStrip.png" alt="Footer strip" className="w-full h-auto object-cover rounded-xl shadow-lg" />
            </div>
        </main>
    );
}
