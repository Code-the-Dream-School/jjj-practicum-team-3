export interface IMovie {
    id: string;
    title: string;
    year: string;
    runTime: string;
    genre: string;
    director?: string;
    actors?: string;
    description?: string;
    country?: string;
    poster: string;
    comingsoon: boolean;
}
