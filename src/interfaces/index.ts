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

export interface ITheater {
    id: number;
    name: string;
    latitude: number;
    longitude: number;
    address: string;
    movies: ITheaterMovie[];
}

export interface ITheaterMovie {
    title: string;
    showtimes: IShowtimes[];
}

export interface IShowtimeGroup {
    theater: ITheater;
    shows: { id: string; date: string; time: string; ticket_price: number }[];
}
export interface IBooking {
    user_id?: string; // Optional if not authenticated yet
    user_email?: string; // Optional
    seat_id: string[]; // Array to match frontend 'seats'
    booking_date: string;
    payment_status: string;
    movie_title?: string;
    time?: string;
    theater?: string;
    total?: number;
    payment?: {
        brand?: string;
        last4?: string;
    };
}
