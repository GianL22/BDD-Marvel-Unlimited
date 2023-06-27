import { useMemo } from 'react';
import type { NextPage } from 'next'
import { useQuery } from '@apollo/client';
import { Text, Grid, Loading } from '@nextui-org/react';
import { AppLayout } from '@/layouts/AppLayout'
import { TableWrapper } from '../../../components/table/index';
import { CellCalculation } from '@/components/table/CellCalculation';
import { GetProfitableLongAnimatedFilms } from '@/graphql/Reports';
import { ReportFilmsCellReducer } from '@/components/table/cell-reducers/ReportFilmsCellReducer';

const columns = [
  {label: 'TITULO', uid: 'title'},
  {label: 'COSTO', uid: 'cost'},
  {label: 'GANANCIA', uid: 'revenue'},
  {label: 'DURACION', uid: 'duration'},
  {label: 'PREMIERE', uid: 'premiere'},
  {label: 'DIRECTOR', uid: 'director'},

]

export interface Data {
    reportMovie: ReportMovie;
}

export interface ReportMovie {
    avg:    number;
    movies: Movie[];
}

export interface Movie {
    title:       string;
    cost:        number;
    revenue:     number;
    duration:    number;
    releaseDate: Date;
    director:    Director;
}

export interface Director {
    lastName: string;
    name:     string;
}


const ProfitableLongAnimatedFilmsPage: NextPage = () => {

    const { data , error} = useQuery<Data>(GetProfitableLongAnimatedFilms,{
      pollInterval: 1000
    })
    const avg = useMemo(() => data?.reportMovie.avg, [data])
    const movies = useMemo(() => (
        data?.reportMovie.movies.map((movie,i) => ({
            id: i,
            title: movie.title,
            cost: movie.cost,
            revenue: movie.revenue,
            duration: movie.duration,
            premiere : movie.releaseDate,
            director: `${movie.director.name} ${movie.director.lastName}` 
        }))
    ),[data])
    if ( !data ) return <Loading />
  return ( 
    <AppLayout
      title='Reportes'
      description='Reportes sobre Marvel'
    >
        <Grid.Container gap={2} direction='column' alignItems='flex-start' css={{margin:'$4', width:'100%'}}>

          <Grid>
            <Text h1 >Peliculas Animadas Rentables y Largas</Text>
          </Grid>
          
          <Grid>
            <Text span size='$2xl'>
              Descubre nuestras películas con más de 2 horas y media de duración, ganancias por encima del promedio y
              tipo animado, ordenadas cronológicamente por costro de producción.
            </Text>
          </Grid>
          
          <Grid css={{margin:'$8', minWidth:'100%', maxWidth:'600px', display: 'inline-grid'}}>
            <TableWrapper 
              columns={columns} 
              rows={movies!}
              cellReducer={ReportFilmsCellReducer}
            />
          </Grid>
          
          <Grid.Container gap={2} direction='row' justify='flex-start'>
            <Grid css={{maxW:'max-content'}}>
              <CellCalculation label='Promedio $' value={`${avg}`}/>
            </Grid>
            <Grid css={{maxW:'max-content'}}>
              <CellCalculation label='Total Películas' value={(movies) ? movies.length.toString() : '0'}/>
            </Grid>
          </Grid.Container>
        
        </Grid.Container>
    </AppLayout>
  )
}

export default ProfitableLongAnimatedFilmsPage
