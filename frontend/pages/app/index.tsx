import type { GetServerSideProps, NextPage } from 'next'
import { Box, Flex } from '@/components/containers'
import { AppLayout } from '@/layouts/AppLayout'
import { Text } from '@nextui-org/react'
import { Carousel } from '@/components/carousel/caruosel'
import { ApolloClient, InMemoryCache } from '@apollo/client'
import { Home } from '@/graphql/Home'
import { DataResponse, Medio } from '@/models/Home'
import { useContext } from 'react'
import { AuthContext } from '@/context/auth'
import Cookies from 'js-cookie'

interface CombinedMedia {
  id: string;
  title: string;
  poster: string;
  progress: number;
  maxProgress: number;
  type: "series";
}

interface Props {
  topRatedMedia: Medio[];
  progressMedia: CombinedMedia[];
  recommendationMedia: Medio[];
  bestMediaByType: Medio[]
}

const AppHome: NextPage<Props> = ({ topRatedMedia, progressMedia, recommendationMedia, bestMediaByType }) => {
  const { user } = useContext(AuthContext)
  const profile = user?.profiles.find(profile => profile.id === Cookies.get('activeProfile'))
  return (
    <AppLayout
      title='App'
      description='Aplicación Marvel'
    >
      <Flex direction={'column'} justify={'center'} css={{ gap: '$5', p: '$8' }}>
        <Box css={{ width: '100%', justifyContent: 'center' }}>
          <Text size={'$3xl'}>Tendencias </Text>
          <Carousel medios={topRatedMedia} />
        </Box>

        {
          progressMedia.length > 0 &&
          <Box css={{ width: '100%', justifyContent: 'center' }}>
            <Text size={'$3xl'}>Continuar viendo contenido de {profile?.nickname} </Text>
            <Carousel medios={progressMedia} />
          </Box>
        }
        {
          recommendationMedia.length > 0
            ? (
              <Box css={{ width: '100%', justifyContent: 'center' }}>
                <Text size={'$3xl'}>Para tí ❤ </Text>
                <Carousel medios={recommendationMedia} />
              </Box>
            )
            : (
              <Box css={{ width: '100%', justifyContent: 'center' }}>
                <Text size={'$3xl'}>Vive la aventura con Marvel viendo </Text>
                <Carousel medios={bestMediaByType} />
              </Box>
            )
        }

      </Flex>
    </AppLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { activeProfile, token } = ctx.req.cookies;
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
    cache: new InMemoryCache(),
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  try {
    const { data } = await client.query<DataResponse>({
      query: Home,
      variables: {
        profileId: activeProfile,
      },
    });
    const filteredMedia = data.topRatedMedia.map((media) => {
      return {
        id: media.medio.id,
        poster: media.medio.poster,
        title: media.medio.title,
        type: media.medio.type,
        rating: media.medio.rating,
      };
    });
    const filterMovies = data.profileProgress.movies.map((movie) => {
      return {
        title: movie.movie.title,
        poster: movie.movie.poster,
        id: movie.movie.medioId,
        progress: movie.timeWatched,
        maxProgress: movie.movie.duration,
        type: 'movies',
      }
    })
    const filterSeries = data.profileProgress.series.map((serie) => {
      return {
        title: serie.serie.title,
        poster: serie.serie.poster,
        id: serie.serie.medioId,
        progress: serie.viewedEpisodes,
        maxProgress: Number(serie.serie.episodes),
        type: 'series',
      }
    })

    return {
      props: {
        topRatedMedia: filteredMedia,
        progressMedia: [...filterMovies, ...filterSeries],
        recommendationMedia: data.profileRecommendation,
        bestMediaByType: data.bestRatingMedia,
      }
    }
  } catch (error) {
    return {
      redirect: {
        destination: '/404',
        permanent: false
      }
    }
  }
}

export default AppHome