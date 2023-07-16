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
            ? <Link href={'/app/movies'}> Agrega Peliculas a tu lista </Link>
            : <Carousel medios={medios} type={movies[0].type} />
        }
      </Box>
      <Box css={{ width: '100%', justifyContent: 'center' }}>
        <Text size={'$3xl'}>Series: </Text>
        {
          movies.length === 0
            ? <Link href={'/app/movies'}> Agrega Peliculas a tu lista </Link>
            : <Carousel medios={series} type={series[0].type} />
        }
      </Box>
      <Box css={{ width: '100%', justifyContent: 'center' }}>
        <Text size={'$3xl'}>Video Juegos: </Text>
        {
          movies.length === 0
            ? <Link href={'/app/movies'}> Agrega Peliculas a tu lista </Link>
            : <Carousel medios={videoGames} type={videoGames[0].type} />
        }
      </Box>
    </Flex>
  )
}
