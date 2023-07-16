import { useMemo } from 'react';
import type { NextPage } from 'next'
import { useQuery } from '@apollo/client';
import { Text, Grid, Loading } from '@nextui-org/react';
import { AppLayout } from '@/layouts/AppLayout'
import { TableWrapper } from '../../../components/table/index';
import { CellCalculation } from '@/components/table/CellCalculation';
import { GetPlayingAtThelimitReport } from '@/graphql/Reports';
import { ReportsCellReducer } from '@/components/table/cell-reducers/ReportsCellReducer';

const columns = [
    { label: 'RATING', uid: 'rating' },
    { label: 'TITULO', uid: 'poster' },
    { label: 'PREMIERE', uid: 'premiere' },
    { label: 'COMPAÑIA PUBLICADORA ', uid: 'companyPublisher' },
    { label: 'COMPAÑIA PRODUCTORA ', uid: 'companyProduction' },
]

interface ReportResponse {
    reportPlayingAtThelimit: ReportPlayingAtThelimit;
}

interface ReportPlayingAtThelimit {
    avg: number;
    videoGames: VideoGame[];
}

interface VideoGame {
    medio: Medio;
    poster: string;
    title: string;
    releaseDate: string;
    companyPublisher: CompanyP;
}

interface CompanyP {
    description: string;
}

interface Medio {
    rating: Rating;
    companyProduction: CompanyP;
}

interface Rating {
    ratingAvg: number;
}

const PlayingAtTheLimitReportPage: NextPage = () => {

    const { data, error } = useQuery<ReportResponse>(GetPlayingAtThelimitReport, {
        pollInterval: 1000
    })

    const videoGames = useMemo(() => (
        data?.reportPlayingAtThelimit.videoGames.map(({ companyPublisher, medio,releaseDate , ...rest }, i) => ({
            id: i,
            companyPublisher: companyPublisher.description,
            companyProduction: medio.companyProduction.description,
            rating: medio.rating.ratingAvg,
            premiere: `${releaseDate.split('-')[2]}-${releaseDate.split('-')[1]}-${releaseDate.split('-')[0]}`,
            ...rest
        }))
    ), [data])

    if (!data) return <Loading />
    return (
        <AppLayout
            title='Reportes'
            description='Reportes sobre Marvel'
        >
            <Grid.Container gap={2} direction='column' alignItems='flex-start' css={{ margin: '$4', width: '100%' }}>
                <Grid>
                    <Text h1 >Jugando al Límite</Text>
                </Grid>

                <Grid>
                    <Text span size='$2xl'>
                        ¿Listo para enfrentar desafios de superhéroes en tu consola? Descubre los videojuegos de acción disponibles en
                        PlayStation 4 con baja calificación y encuentra la oportunidad de salvarlos. ¡Preparate para la aventura y protege el
                        universo Marvel!
                    </Text>
                </Grid>

                <Grid css={{ maxW: 'max-content' }}>
                    <CellCalculation label='Rating' value={(data.reportPlayingAtThelimit.avg) ? `${data.reportPlayingAtThelimit.avg.toFixed(2)}⭐` : '0.00 ⭐'} />
                </Grid>

                <Grid css={{ margin: '$8', minWidth: '100%', maxWidth: '600px', display: 'inline-grid' }}>
                    <TableWrapper
                        columns={columns}
                        rows={videoGames!}
                        cellReducer={ReportsCellReducer}
                    />
                </Grid>

                <Grid.Container gap={5} direction='row' justify='flex-start'>
                    <Grid css={{ maxW: 'max-content' }}>
                        <CellCalculation label='Total Juegos' value={(videoGames) ? videoGames.length.toString() : '0'} />
                    </Grid>
                </Grid.Container>

            </Grid.Container>
        </AppLayout>
    )
}

export default PlayingAtTheLimitReportPage
