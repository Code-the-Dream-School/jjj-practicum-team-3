

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