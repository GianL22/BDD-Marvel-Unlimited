import { FC } from 'react';
import { Link, Text } from '@nextui-org/react';
import { Box, Flex } from '../containers';
import { useRouter } from 'next/router';
import { Carousel } from '../carousel/carousel';

interface Props {
  medios: {
    id: string;
    title: string;
    poster: string;
    type: string;
  }[]
}

export const MyList: FC<Props> = ({ medios }) => {
  const { replace } = useRouter()
  const movies = medios.filter(medio => medio.type === 'movie')
  const series = medios.filter(medio => medio.type === 'serie')
  const videoGames = medios.filter(medio => medio.type === 'videoGame')

  return (
    <Flex direction={'column'}>
      <Box css={{ width: 'auto' }}>
        <Text size={'$2xl'}>Películas: </Text>
        {
          movies.length === 0
            ? <Link href={'/app/movies'}> Agrega Peliculas a tu lista </Link>
            : <Carousel medios={movies} type='movies' />
        }
      </Box>
      <Box css={{ width: 'auto' }}>
        <Text size={'$2xl'}>Series: </Text>
        {
          series.length === 0
            ? <Link href={'/app/series'}> Agrega Series a tu lista </Link>
            : <Carousel medios={series} type='series' />
        }
      </Box>
      <Box css={{ width: 'auto' }}>
        <Text size={'$2xl'}>Video Juegos: </Text>
        {
          videoGames.length === 0
            ? <Link href={'/app/videoGames'}> Agrega Video Juegos a tu lista </Link>
            : <Carousel medios={videoGames} type='videoGames' />
        }

      </Box>
    </Flex>
  )
}
