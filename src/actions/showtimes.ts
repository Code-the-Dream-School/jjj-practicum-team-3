'use server'

import supabase from "@/config/supabase-config"
import { IShowtimes } from "@/interfaces/index"

export const AddShowtimes = async (show: Partial<IShowtimes>) => {
	const { data, error } = await supabase
		.from("showtimes")
		.insert(show)
		.select('*')
		
		if (error) {
            return {
                success: false, 
                message: error.message,
             }
		}
		
		return{
			success: true,
			message: 'Showtime added successfully',
			}
}

export const updateShowtimes = async (id:string, show: Partial<IShowtimes>) => {
	const { data, error } = await supabase
		.from('showtimes')
		.update(show)
		.eq('id', id)
		
		if (error) {
            return {
                success: false, 
                message: error.message,
             }
		}
		
		return{
			success: true,
			message: 'Showtime updated successfully',
			}
}

export const deleteShowtimes = async (id: string) => {
    const { data, error } = await supabase
        .from("showtimes")
        .delete()
        .eq("id", id)

        if (error) {
            return {
                success: false, 
                message: error.message, 
            }
        }

        return{
            success: true,
            message: "Showtime deleted successfully",
            };

}

export const getAllShowtimes = async () => {
	const { data, error } = await supabase
		.from('showtimes')
		.select("*, movie:movies(*)") //add theatre: theatres(*) later
		.order("created_at", { ascending: false});
		
		if (error) {
		 return {
            success: false, 
            message: error.message,
         }
		}
		
		return{
			success: true,
			message: "Showtime fetched successfully",
			data: data as IShowtimes[],
		};
}

export const getShowtimesById = async (id: string) => {
	const { data, error } = await supabase
		.from('showtimes')
		.select('*')
		.eq("id", id)
		
		if (error) {
		throw new Error(error.message)
		}
		
		if(data.length === 0) {
			return {
				success: false, 
				message: "Showtime not found!"
				}
			}
			
		const showtime = data[0];
		
		return{
			success: true,
			message: "Showtime fetched successfully",
			data: showtime as IShowtimes
		};
}