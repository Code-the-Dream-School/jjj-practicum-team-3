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
    startOfWeek.setDate(startOfWeek.getDate() - 7);
    const { count: newUsersThisWeek, error: usersError } = await supabase
      .from("users")
      .select("*", { count: "exact", head: true })
      .gte("created_at", startOfWeek.toISOString());
    if (usersError) throw new Error(usersError.message);

    // 3. Movies list (needed for bar chart + fallback)
    const { data: moviesList, error: moviesListError } = await supabase
      .from("movies")
      .select("id, title, genre")
      .order("title", { ascending: true });
    if (moviesListError) throw new Error(moviesListError.message);

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

    // 4. Bookings (for revenue + most popular genre)
    const { data: bookings, error: bookingsError } = await supabase
      .from("bookings")
      .select(`
        id,
        total_amount,
        total_tickets,
        movie:movie_id (
          genre
        )
      `)
      .eq("status", "booked");
    if (bookingsError) throw new Error(bookingsError.message);

    let totalRevenue = 0;
    const genreCount: Record<string, number> = {};

    bookings?.forEach((b) => {
      // Sum revenue directly from bookings
      if (typeof b.total_amount === "number" && !Number.isNaN(b.total_amount)) {
        totalRevenue += b.total_amount;
      }

      // Handle movie relation safely (array or single object)
      if (Array.isArray(b.movie)) {
        b.movie.forEach((m) => {
          if (m?.genre) {
            genreCount[m.genre] = (genreCount[m.genre] || 0) + 1;
          }
        });
      } else if ((b.movie as any)?.genre) {
        const g = (b.movie as any).genre as string;
        genreCount[g] = (genreCount[g] || 0) + 1;
      }
    });

    // 5. Most popular genre: from bookings, fallback to catalog
    let mostPopularGenre = "";
    const sortedByBookings = Object.entries(genreCount).sort(
      (a, b) => b[1] - a[1]
    );
    if (sortedByBookings.length > 0) {
      mostPopularGenre = sortedByBookings[0][0];
    } else if (moviesByGenre.length > 0) {
      const sortedMoviesByGenre = [...moviesByGenre].sort(
        (a, b) => b.count - a.count
      );
      mostPopularGenre = sortedMoviesByGenre[0].genre;
    }

    // 6. Weekly signups
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
