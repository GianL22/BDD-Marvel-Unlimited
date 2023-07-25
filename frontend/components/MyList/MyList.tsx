import { FC } from 'react';
import { Link, Text } from '@nextui-org/react';
import { Box, Flex } from '../containers';
import { Carousel } from '../carousel/caruosel';
import { MedioList } from '@/models/Medio';

interface Props {
  medios: MedioList[]
}

export const MyList: FC<Props> = ({ medios }) => {
  const movies = medios.filter(medio => medio.type === 'movies')
  const series = medios.filter(medio => medio.type === 'series')
  const videoGames = medios.filter(medio => medio.type === 'videogames')
  return (
    <Flex direction={'column'} justify={'center'} css={{ gap: '$5', p: '$8' }}>
      <Box css={{ width: '100%', justifyContent: 'center' }}>
        <Text size={'$3xl'}>Películas: </Text>
        {
          movies.length === 0
            ? (
              <Link href={'/app/movies'}>
                <Text color='##00BFFF' size={'$2xl'}>
                  Agrega Peliculas a tu lista
                </Text>
              </Link>
            )
            : <Carousel medios={movies} />
        }
      </Box>
      <Box css={{ width: '100%', justifyContent: 'center' }}>
        <Text size={'$3xl'}>Series: </Text>
        {
          series.length === 0
            ? (
              <Link href={'/app/series'}>
                <Text color='##00BFFF' size={'$2xl'}>
                  Agrega series a tu lista
                </Text>
              </Link>
            )
            : <Carousel medios={series} />
        }
      </Box>
      <Box css={{ width: '100%', justifyContent: 'center' }}>
        <Text size={'$3xl'}>Video Juegos: </Text>
        {
          videoGames.length === 0
            ? (
              <Link href={'/app/videogames'}>
                <Text color='##00BFFF' size={'$2xl'}>
                  Agrega video-juegos a tu lista
                </Text>
              </Link>
            )
            : <Carousel medios={videoGames} />
        }
      </Box>
    </Flex>
  )
}
