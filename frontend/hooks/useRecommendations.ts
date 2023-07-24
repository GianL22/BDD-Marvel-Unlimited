import { ToggleMedioInMyList, ToggleMedioInMyPreference, ToggleRating } from '@/graphql/Profile';
import { useMutation } from '@apollo/client';
import { useContext, useState } from 'react';
import { AuthContext } from '@/context/auth';
import { useTheme } from '@nextui-org/react';
import Cookies from 'js-cookie';
import { Notification } from '@/notification';
import { useRouter } from 'next/router';


export const useRecommendations = (myListInitial: boolean, preferenceInitial: boolean, ratingInitial: number) => {
    const { user } = useContext(AuthContext)
    const { isDark } = useTheme()
    const { replace, asPath } = useRouter();
    const [myList, setMyList] = useState<boolean>(myListInitial);
    const [preference, setPreference] = useState<boolean>(preferenceInitial);
    const [rating, setRating] = useState<number>(ratingInitial);

    const [toggleMedioInMyList] = useMutation(ToggleMedioInMyList)
    const [toggleMedioInMyPreferenceList] = useMutation(ToggleMedioInMyPreference)
    const [toggleRating] = useMutation(ToggleRating)

    const handleMyList = async (medioId: string) => {
        await toggleMedioInMyList({
            variables: {
                profileRelationInput: {
                    profileId: Cookies.get('activeProfile'),
                    medioId: medioId,
                }
            }
        })
        setMyList(!myList)
    }

    const handleMyPreferences = async (medioId: string) => {
        await toggleMedioInMyPreferenceList({
            variables: {
                profileRelationInput: {
                    profileId: Cookies.get('activeProfile'),
                    medioId: medioId,
                }
            }
        })
        setPreference(!preference)
    }

    const handleRating = async (medioId: string, rating: number) => {
        if (rating < 1) {
            Notification(isDark).fire({
                title: 'El mínimo para calificar es ⭐',
                icon: 'error',
            })
            setRating(0)
        } else {
            try {
                await toggleRating({
                    variables: {
                        ratingRelationInput: {
                            userId: user?.id,
                            profileId: Cookies.get('activeProfile'),
                            medioId: medioId,
                            rating: rating,
                        }
                    }
                })
                setRating(rating)
                Notification(isDark).fire({
                    title: 'Su calificación ha sido cargada',
                    icon: 'success',
                })
                replace(asPath)
            } catch (error) {
                console.log(error)
            }
        }
    }

    return {
        myList,
        preference,
        rating,
        handleMyList,
        handleMyPreferences,
        handleRating,
    }
}