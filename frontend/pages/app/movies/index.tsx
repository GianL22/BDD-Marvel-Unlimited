import type { NextPage } from 'next'
import { Grid, Loading, Text } from '@nextui-org/react';
import { AppLayout } from '../../../layouts/AppLayout';
import { MedioCard } from '@/components/medio/MedioCard';
import { Flex } from '@/components/containers';
import { useQuery } from '@apollo/client';
import { GetAllMovies } from '@/graphql/Medio';
import { Rating } from '@/models/Medio';

interface DataResponse {
  media: Media;
}

interface Media {
  movies: Movie[];
}

interface Movie {
  medioId: string;
  title: string;
  poster: string;
  medio: {rating: Rating};
}

const MoviesHome: NextPage = () => {
  const { data, error } = useQuery<DataResponse>(GetAllMovies);
  if (error) return <Text>Imposible Cargar</Text>

  return (
    <AppLayout
      title='Movies Home'
      description='Marvel Unlimited - Mejor lugar'
    >
      <Flex
        css={{ 'mt': '$5', 'px': '$6', '@sm': { mt: '$10', px: '$16', } }}
        justify='between'
        align='center'
      >
        <Text h1>
          Desata el poder de las películas de Marvel
        </Text>
      </Flex>
      <Flex>
        {
          !data
            ? (<Loading />)
            : (
              <Grid.Container gap={2} css={{ w: '100vw', px: '$12' }}>
                {
                  data.media.movies.map((movie) => (
                    <Grid xs={12} sm={6} md={3} key={movie.medioId}>
                      <MedioCard
                        img={`/medios/${movie.poster}`}
                        rating={(!movie.medio.rating.ratingAvg) ? 'N.C. ' : movie.medio.rating.ratingAvg.toFixed(2)}
                        title={movie.title}
                        url={'/app/movies'}
                        id={movie.medioId}
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

export default MoviesHome
