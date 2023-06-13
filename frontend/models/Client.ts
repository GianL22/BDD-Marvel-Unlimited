
export interface Client{
    id: string;
    username: string;
    isActive: boolean;
    name: string;
    lastName: string;
    profiles:Profile[],
}

export interface Profile{
    id:string;
    userId: string
    nickname: string;
    language: string;
    hourConexion: number;
    device: string;
    timeWatched: number;
    emailProfile: string;
    avatar: string;
}