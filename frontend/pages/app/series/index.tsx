import type { NextPage } from 'next'
import { Grid, Loading, Text } from '@nextui-org/react';
import { AppLayout } from '../../../layouts/AppLayout';
import { MedioCard } from '@/components/medio/MedioCard';
import { Flex } from '@/components/containers';
import { useQuery } from '@apollo/client';
import { GetAllSeries } from '@/graphql/Medio';
import { Rating } from '@/models/Medio';

interface DataResponse {
    media: Media;
}

interface Media {
    series: Serie[];
}

interface Serie {
    medioId: string;
    title: string;
    poster: string;
    medio: { rating: Rating };
}

const SeriesHome: NextPage = () => {
    const { data, error } = useQuery<DataResponse>(GetAllSeries);
    if (error) return <Text>Imposible Cargar</Text>
    return (
        <AppLayout
            title='Series Home'
            description='Marvel Unlimited - Mejor herramienta'
        >
            <Flex
                css={{ 'mt': '$5', 'px': '$6', '@sm': { mt: '$10', px: '$16', } }}
                justify='between'
                align='center'
            >
                <Text h1>
                    Explora el universo de series de Marvel
                </Text>
            </Flex>
            <Flex>
                {
                    !data
                        ? (<Loading />)
                        : (
                            <Grid.Container gap={2} css={{ w: '100vw', px: '$12' }}>
                                {
                                    data.media.series.map((serie) => (
                                        <Grid xs={12} sm={6} md={3} key={serie.medioId}>
                                            <MedioCard
                                                img={`/medios/${serie.poster}`}
                                                rating={(!serie.medio.rating.ratingAvg) ? 'N.C. ' : serie.medio.rating.ratingAvg.toFixed(2)}
                                                title={serie.title}
                                                url={'/app/series'}
                                                id={serie.medioId}
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

export default SeriesHome
