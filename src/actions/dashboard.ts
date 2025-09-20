'use server'

import supabase from "@/config/supabase-config"

export const getUserDashboardData = async (userId: string) => {
try {

const { data, error } = await supabase
			.from('bookings')
			.select('*')
			.eq("users", userId)
			.eq("status", "booked");
			
			if (error) {
				throw new Error(error.message);
				}
				
				let totalBookings = data.length;
				let totalMoviesWatched = 0;
				let totalTicketsBooked = 0;
				let totalAmountSpent = 0;
				
				let movieIdsObject: any = {};
				
				data.forEach((booking) => {
					totalTicketsBooked += booking.total_tickets;
					totalAmountSpent += booking.total_amount;
					
					if(!movieIdsObject[booking.movie_id]){
					movieIdsObject[booking.movie_id] = true;
						totalMoviesWatched += 1;
						}
				})
				
				return {
					success: true, 
					message: "Dashboard data fetched successfully",
					data: {
						totalBookings,
						totalMoviesWatched, 
						totalTicketsBooked, 
						totalAmountSpent,
						},
				};
	
	}catch (error: any) {
			return {
				success: false, 
				message: error.message,
				data: null
				};
			}
		}