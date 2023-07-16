import type { NextPage } from 'next'
import { Grid, Loading, Text } from '@nextui-org/react';
import { AppLayout } from '../../../layouts/AppLayout';
import { MedioCard } from '@/components/medio/MedioCard';
import { Flex } from '@/components/containers';
import { useQuery } from '@apollo/client';
import { GetAllVideoGames } from '@/graphql/Medio';
import { Rating } from '@/models/Medio';

interface DataResponse {
    media: Media;
}

interface Media {
    videoGames: VideoGame[];
}

interface VideoGame {
    medioId: string;
    title: string;
    poster: string;
    medio: {rating: Rating};
}

const VideoGamesHome: NextPage = () => {
    const { data, error } = useQuery<DataResponse>(GetAllVideoGames);
    if (error) return <Text>Imposible Cargar</Text>
    return (
        <AppLayout
            title='Video Games Home'
            description='Marvel Unlimited - Mejor herramienta'
        >
            <Flex
                css={{ 'mt': '$5', 'px': '$6', '@sm': { mt: '$10', px: '$16', } }}
                justify='between'
                align='center'
            >
                <Text h1>
                    Vive la acción con los videojuegos de Marvel
                </Text>
            </Flex>
            <Flex>
                {
                    !data
                        ? (<Loading />)
                        : (
                            <Grid.Container gap={2} css={{ w: '100vw', px: '$12' }}>
                                {
                                    data.media.videoGames.map((videoGame) => (
                                        <Grid xs={12} sm={6} md={3} key={videoGame.medioId}>
                                            <MedioCard
                                                img={`/medios/${videoGame.poster}`}
                                                rating={(!videoGame.medio.rating.ratingAvg) ? 'N.C. ' : videoGame.medio.rating.ratingAvg.toFixed(2)}
                                                title= {videoGame.title}
                                                url={'/app/videogames'}
                                                id={videoGame.medioId}
                                            />
                                        </Grid>
                                    ))
                                }
                            </Grid.Container>
                        )
                }
            </Flex>
        </AppLayout>
    )
}

export default VideoGamesHome
