"use client";

import React, { useMemo, useState } from "react";

type Movie = {
  id: string;
  Title: string;
  Year: string;
  RunTime: string;
  Genre: string;
  Director: string;
  Actors: string;
  Description: string;
  Country: string;
  Poster: string;
  ComingSoon: boolean;
};

/* STATIC SEED DATA — replace with API later */
const movieData = {
  movies: [
    { "id": "1", "Title": "Nobody 2", "Year": "2025", "RunTime": "1 hr 29 min", "Genre": "Action", "Director": "Timo Tjahjanto", "Actors": "Bob Odenkirk, Connie Nielsen, John Ortiz", "Description": "Workaholic assassin Hutch Mansell takes his family on a much-needed vacation...", "Country": "United States", "Poster": "/posters/1.png", "ComingSoon": false },
    { "id": "2", "Title": "Weapons", "Year": "2025", "RunTime": "2 hr 8 min", "Genre": "Horror", "Director": "Zach Cregger", "Actors": "Josh Brolin, Julia Garner, Alden Ehrenreich", "Description": "An interrelated, multistory horror epic...", "Country": "United States", "Poster": "/posters/2.png", "ComingSoon": false },
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

/*TO CHANGE GENRAS, CHANGE THIS VARIABLE*/
const ALL_GENRES = [
"ACTION","DRAMA","COMEDY","KIDS","HORROR","ROMANCE","SCI-FI","ANIMATED",
"DOCUMENTARIES","IMAX","3D","SUSPENSE","INDIE","FOREIGN","SPECIAL EVENTS","WESTERN",
"SPY FILM","HISTORICAL FILM","CLASSIC","WAR","DANCE","FILM, TV & RADIO","MUSIC/PERFORMING ARTS"
] as const;

/*TO CHANGE AMOUNT OF MOVIES ON PAGE, CHANGE THIS VARIABLE */
const PER_PAGE = 12;

export default function AllMoviesPage() {
  const [activeGenre, setActiveGenre] = useState<string | "All">("All");
  const [page, setPage] = useState(1);

  const movies: Movie[] = movieData.movies;

  function selectGenre(g: string | "All") {
    setActiveGenre(g);
    setPage(1);
  }

  const filtered = useMemo(() => {
    if (activeGenre === "All") return movies;
    return movies.filter(m => m.Genre.toLowerCase() === activeGenre.toLowerCase());
  }, [activeGenre, movies]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const start = (page - 1) * PER_PAGE;
  const current = filtered.slice(start, start + PER_PAGE);

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
            active={activeGenre === "All"}
            onClick={() => selectGenre("All")}
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
                      ? "bg-[#e8eefc] text-[#0c1222]"
                      : "bg-[#1b2030] text-[#cfd5e6] border border-[#2b3450] hover:border-[#3a4669]"
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
      "rounded-lg px-3 py-1.5 text-[11px] font-extrabold tracking-wide transition-colors outline-none",
      "focus-visible:ring-2 focus-visible:ring-[#6AA6FF]/40",

      active
        ? "text-[#6AA6FF] bg-[#16243B] border border-[#3D5A8C]"
        : "text-[#6AA6FF] bg-transparent border border-[#2B3450] hover:bg-[#111726] hover:border-[#3A4669]",
    ].join(" ")}
    >
    {label.toUpperCase()}
  </button>
  );
  }

function MovieCard({ movie }: { movie: Movie }) {
  return (
    <a
      href={`/movie/${movie.id}`}
      className="group block rounded-lg"
      aria-label={`${movie.Title} (${movie.Year})`}
    >
      <div className="overflow-hidden rounded-lg bg-[#111726]">
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="aspect-[2/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
      </div>

      <div className="mt-2">
        <div className="text-xs font-extrabold tracking-wide text-[#cfd5e6]">
          {movie.Title.toUpperCase()}{" "}
          <span className="opacity-80">({movie.Year})</span>
        </div>
        {movie.ComingSoon && (
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
          ? "cursor-not-allowed bg-[#111726] text-[#555e77]"
          : "bg-[#1b2030] text-[#cfd5e6] border border-[#2b3450] hover:border-[#3a4669]"
      }`}
    >
      {children}
    </button>
  );
}