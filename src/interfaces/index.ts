

export interface IUser {
    id : string;
    email: string;
    password: string;
    username: string;
    role: "user" | "admin";
    updated_at: string;
    created_at: string;
    is_active: boolean;
}

export interface IMovie {
    id : string; 
    title : string;
    year : string;
    runtime : string;
    genre : string[];
    director : string;
    actors : string;
    description : string;
    country : string; 
    poster : string;
    comingsoon : boolean;
    is_active : boolean, 
    release_date : string;
}

export interface IShowtimes {
	id: string;
	movie_id: string;
	theater_id: string;
	date: string;
	time: string;
	ticket_price: number;
	booked_seats: number[];
	available_seats_count: number;
	created_at: string;
	updated_at: string;
	is_active: boolean;
	
	//run-time properties
	movie: IMovie;
	// theatre?: ITheatre;
}