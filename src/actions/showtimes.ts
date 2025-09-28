'use server';

import supabase from "@/config/supabase-config";
import { IShowtimes } from "@/interfaces/index";

export const AddShowtimes = async (show: Partial<IShowtimes>) => {
	const { data, error } = await supabase
		.from("showtimes")
		.insert(show)
		.select('*');

	if (error) {
		return {
			success: false,
			message: error.message,
		};
	}

	return {
		success: true,
		message: 'Showtime added successfully',
	};
};

export const updateShowtimes = async (id: string, show: Partial<IShowtimes>) => {
	const { data, error } = await supabase
		.from('showtimes')
		.update(show)
		.eq('id', id);

	if (error) {
		return {
			success: false,
			message: error.message,
		};
	}

	return {
		success: true,
		message: 'Showtime updated successfully',
	};
};

export const deleteShowtimes = async (id: string) => {
	const { data, error } = await supabase
		.from("showtimes")
		.delete()
		.eq("id", id);

	if (error) {
		return {
			success: false,
			message: error.message,
		};
	}

	return {
		success: true,
		message: "Showtime deleted successfully",
	};
};

export const getAllShowtimes = async () => {
	const { data, error } = await supabase
		.from('showtimes')
		.select("*, movie:movies(*)")
		.order("created_at", { ascending: false });

	if (error) {
		return {
			success: false,
			message: error.message,
		};
	}

	return {
		success: true,
		message: "Showtime fetched successfully",
		data: data as IShowtimes[],
	};
};

export const getShowtimesById = async (id: string) => {
	const { data, error } = await supabase
		.from('showtimes')
		.select('*, movie:movies(*)')
		.eq("id", id);

	if (error) {
		return {
			success: false,
			message: error.message,
		};
	}

	if (data.length === 0) {
		return {
			success: false,
			message: "Showtime not found!",
		};
	}

	const showtime = data[0];

	return {
		success: true,
		message: "Showtime fetched successfully",
		data: showtime as IShowtimes,
	};
};

export const getShowtimesByMovieId = async (movieId: string, dateFilter?: string) => {
	try {
		let query = supabase
			.from("showtimes")
			.select("id, date, time, ticket_price, theater:theaters(*)")
			.eq("movie_id", movieId);

		if (dateFilter) {
			query = query.eq("date", dateFilter);
		}

		const { data: showtimes, error } = await query;

		if (error) {
			return {
				success: false,
				message: error.message,
			};
		}

		if (!showtimes || showtimes.length === 0) {
			return {
				success: true,
				message: "No showtimes found for this movie",
				data: [],
			};
		}

		const groupedData: any[] = [];
		const theaterIdsObject: Record<string, boolean> = {};

		showtimes.forEach((show) => {
			const theaterId = show.theater.id;
			if (theaterIdsObject[theaterId]) {
				const group = groupedData.find((g) => g.theater.id === theaterId);
				if (group) {
					group.shows.push({ id: show.id, date: show.date, time: show.time, ticket_price: show.ticket_price });
				}
			} else {
				theaterIdsObject[theaterId] = true;
				groupedData.push({
					theater: show.theater,
					shows: [{ id: show.id, date: show.date, time: show.time, ticket_price: show.ticket_price }],
				});
			}
		});

		return {
			success: true,
			message: "Shows fetched successfully",
			data: groupedData,
		};
	} catch (error) {
		return {
			success: false,
			message: "Failed to fetch showtimes for the movie",
		};
	}
};
