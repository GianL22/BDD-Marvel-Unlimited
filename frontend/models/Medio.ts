export interface Media {
    series:     Medio[];
    movies:     Medio[];
    videoGames: Medio[];
}

export interface Medio {
    id:     string;
    title:       string;
    releaseDate: string;
    based:       string;
}