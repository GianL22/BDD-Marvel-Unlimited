import { SaveMovieProgress, SaveSerieProgress, SaveVideoGameProgress } from '@/graphql/Profile';
import { useMutation } from '@apollo/client';
import { useContext, useState } from 'react';
import { AuthContext } from '@/context/auth';
import { useTheme } from '@nextui-org/react';
import Cookies from 'js-cookie';
import { Notification } from '@/notification';


export const useProgress = (movieProgressInitial: number, serieProgressInitial: number, videoGameProgressInitial: boolean) => {
    const { user } = useContext(AuthContext)
    const { isDark } = useTheme()
    const [movieProgress, setMovieProgress] = useState(movieProgressInitial)
    const [serieProgress, setSerieProgress] = useState(serieProgressInitial)
    const [played, setPlayed] = useState(videoGameProgressInitial)

    const [saveVideoGameProgress] = useMutation(SaveVideoGameProgress)
    const [saveMovieProgress] = useMutation(SaveMovieProgress)
    const [saveSerieProgress] = useMutation(SaveSerieProgress)


    const handleProgress = async (playedGame: boolean, videoGameId: string) => {
        await saveVideoGameProgress({
            variables: {
                videoGameProgressInput: {
                    profileId: Cookies.get('activeProfile'),
                    videoGameId: videoGameId,
                    userId: user?.id,
                    played: playedGame
                }
            }
        })
        setPlayed(!played)
    }

    const handleMovieProgress = async (medioId: string, progress: number) => {
        try {
            await saveMovieProgress({
                variables: {
                    movieProgressInput: {
                        userId: user?.id,
                        profileId: Cookies.get('activeProfile'),
                        movieId: medioId,
                        timeWatched: progress,
                    }
                }
            })
            setMovieProgress(progress)
            Notification(isDark).fire({
                title: 'Su progreso ha sido cargado',
                icon: 'success',
            })
        } catch (error: any) {
            Notification(isDark).fire({
                title: error.message,
                icon: 'error',
            })
        }
    }

    const handleSerieProgress = async (medioId: string, progress: number) => {
        try {
            await saveSerieProgress({
                variables: {
                    serieProgressInput: {
                        userId: user?.id,
                        profileId: Cookies.get('activeProfile'),
                        serieId: medioId,
                        viewedEpisodes: progress,
                    }
                }
            })
            setSerieProgress(progress)
            Notification(isDark).fire({
                title: 'Su progreso ha sido cargado',
                icon: 'success',
            })
        } catch (error: any) {
            Notification(isDark).fire({
                title: error.message,
                icon: 'error',
            })
        }
    }

    return {
        played,
        movieProgress,
        serieProgress,

        setMovieProgress,
        setSerieProgress,
        handleProgress,
        handleMovieProgress,
        handleSerieProgress
    }
}