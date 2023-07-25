export interface DataResponse {
    topRatedMedia:   TopRatedMedia[];
    profileProgress: ProfileProgress;
    profileRecommendation: ProfileRecommendation[];
    bestRatingMedia : ProfileRecommendation[]
}

export interface ProfileRecommendation {
    id:     string;
    title:  string;
    poster: string;
    type:   string;
    rating: Rating;
}

export interface ProfileProgress {
    movies: MovieElement[];
    series: Series[];
}

export interface MovieElement {
    timeWatched: number;
    movie:       SerieClass;
}

export interface SerieClass {
    medioId:   string;
    title:     string;
    poster:    string;
    duration?: number;
    episodes?: string;
}

export interface Series {
    viewedEpisodes: number;
    serie:          SerieClass;
}

export interface TopRatedMedia {
    medio: Medio;
}

export interface Medio {
    id:     string;
    poster: string;
    title:  string;
    type:   string;
    rating: Rating;
}

export interface Rating {
    ratingAvg: number;
}