import { useMemo } from 'react';
import type { NextPage } from 'next'
import { useQuery } from '@apollo/client';
import { Text, Grid, Loading } from '@nextui-org/react';
import { AppLayout } from '@/layouts/AppLayout'
import { TableWrapper } from '../../../components/table/index';
import { CellCalculation } from '@/components/table/CellCalculation';
import { GetExtensiveSeriesReport } from '@/graphql/Reports';
import { ReportExtensiveSeriesCellReducer } from '@/components/table/cell-reducers/ReportExtensiveSeriesCellReducer';

const columns = [
  {label: 'TITULO', uid: 'title'},
  {label: 'EPISODIOS', uid: 'episodes'},
  {label: 'TIPO', uid: 'type'},
  {label: 'CANAL', uid: 'channel'},
]


interface Data {
    reportSerie: ReportSerie;
}

interface ReportSerie {
    avg:    number;
    series: Series[];
}

interface Series {
    title:           string;
    episodes:        string;
    audioVisualType: AudioVisualType;
    channel:         string;
}

interface AudioVisualType {
    description: string;
}

const ExtensiveSeriesPage: NextPage = () => {

    const { data , error} = useQuery<Data>(GetExtensiveSeriesReport,{
      pollInterval: 1000
    })
    const avg = useMemo(() => data?.reportSerie.avg, [data])
    const series = useMemo(() => (
        data?.reportSerie.series.map((serie,i) => ({
            id: i,
            title: serie.title,
            episodes: serie.episodes,
            type: serie.audioVisualType.description,
            channel: serie.channel
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
            <Text h1 >Series Extensas</Text>
          </Grid>
          
          <Grid>
            <Text span size='$2xl'>
              Marvel ha producido series que han cautivado a los fans y creado personajes icónicos. En este reporte,
              descubre las series que han superado el promedio de episodios y han dejado su marca en el universo de Marvel
            </Text>
          </Grid>
          
          <Grid css={{margin:'$8', minWidth:'100%', maxWidth:'600px', display: 'inline-grid'}}>
            <TableWrapper 
              columns={columns} 
              rows={series!}
              cellReducer={ReportExtensiveSeriesCellReducer}
            />
          </Grid>
          
          <Grid.Container gap={2} direction='row' justify='flex-start'>
            <Grid css={{maxW:'max-content'}}>
              <CellCalculation label='Promedio' value={`${avg}`}/>
            </Grid>
            <Grid css={{maxW:'max-content'}}>
              <CellCalculation label='Total Series' value={(series) ? series.length.toString() : '0'}/>
            </Grid>
          </Grid.Container>
        
        </Grid.Container>
    </AppLayout>
  )
}

export default ExtensiveSeriesPage
