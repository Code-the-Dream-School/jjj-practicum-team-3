"use server";

import supabase from "@/config/supabase-config";

export const getAdminDashboardData = async () => {
  try {
    // 1. Total movies
    const { count: totalMovies, error: moviesError } = await supabase
      .from("movies")
      .select("*", { count: "exact", head: true });
    if (moviesError) throw new Error(moviesError.message);

    // 2. New users this week
    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - 7); // last 7 days
    const { count: newUsersThisWeek, error: usersError } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true })
      .gte("created_at", startOfWeek.toISOString());
    if (usersError) throw new Error(usersError.message);

    // 3. Total revenue + most popular genre
    const { data: bookings, error: bookingsError } = await supabase
      .from("bookings")
      .select(`
        id,
        seat_id,
        showtimes:showtime_id (
          ticket_price,
          movies:movie_id (
            genre
          )
        )
      `)
      .eq("status", "booked");
    if (bookingsError) throw new Error(bookingsError.message);

    let totalRevenue = 0;
    const genreCount: Record<string, number> = {};

    bookings?.forEach((b) => {
      // seat_id is an array of seat labels
      const seatCount = Array.isArray(b.seat_id) ? b.seat_id.length : 0;
    
      const showtime = Array.isArray(b.showtimes) ? b.showtimes[0] : b.showtimes;
      const price = showtime?.ticket_price || 0;
      totalRevenue += seatCount * price;
    
      const movie = Array.isArray(showtime?.movies) ? showtime.movies[0] : showtime?.movies;
      const genre = movie?.genre;
      if (genre) {
        genreCount[genre] = (genreCount[genre] || 0) + 1;
      }
    });

    let mostPopularGenre = "N/A";
    const sortedGenres = Object.entries(genreCount).sort((a, b) => b[1] - a[1]);
    if (sortedGenres.length > 0) {
      mostPopularGenre = sortedGenres[0][0];
    }

    // 4. Movies list
    const { data: moviesList, error: moviesListError } = await supabase
      .from("movies")
      .select("id, title, genre")
      .order("title", { ascending: true });
    if (moviesListError) throw new Error(moviesListError.message);

    // 5. Movies by genre (for bar chart)
    const moviesByGenre: { genre: string; count: number }[] = [];
    if (moviesList) {
      const genreMap: Record<string, number> = {};
      moviesList.forEach((m) => {
        genreMap[m.genre] = (genreMap[m.genre] || 0) + 1;
      });
      for (const [genre, count] of Object.entries(genreMap)) {
        moviesByGenre.push({ genre, count });
      }
    }

    // 6. Weekly signups (last 7 days grouped by day)
    const { data: weeklyUsers, error: weeklyError } = await supabase
      .from("users")
      .select("id, created_at")
      .gte("created_at", startOfWeek.toISOString());
    if (weeklyError) throw new Error(weeklyError.message);

    const weeklySignups: { week: string; users: number }[] = [];
    if (weeklyUsers) {
      const dayMap: Record<string, number> = {};
      weeklyUsers.forEach((u) => {
        const day = new Date(u.created_at).toLocaleDateString("en-US", {
          weekday: "short",
        });
        dayMap[day] = (dayMap[day] || 0) + 1;
      });
      for (const [day, users] of Object.entries(dayMap)) {
        weeklySignups.push({ week: day, users });
      }
    }

    return {
      success: true,
      message: "Admin dashboard data fetched successfully",
      data: {
        totalMovies: totalMovies || 0,
        newUsersThisWeek: newUsersThisWeek || 0,
        totalRevenue,
        mostPopularGenre,
        movies: moviesList || [],
        moviesByGenre,
        weeklySignups,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
      data: null,
    };
  }
};