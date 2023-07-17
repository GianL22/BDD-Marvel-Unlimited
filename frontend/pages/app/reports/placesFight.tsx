import { useMemo } from 'react';
import type { NextPage } from 'next'
import { useQuery } from '@apollo/client';
import { Text, Grid, Loading } from '@nextui-org/react';
import { AppLayout } from '@/layouts/AppLayout'
import { TableWrapper } from '../../../components/table/index';
import { CellCalculation } from '@/components/table/CellCalculation';
import { GetNaturalPowersReport, GetPlacesFightReportResponse } from '@/graphql/Reports';
import { ReportsCellReducer } from '@/components/table/cell-reducers/ReportsCellReducer';

const columns = [
    { label: 'NOMBRE', uid: 'name' },
    { label: 'F.DEL ULTIMO COMBATE', uid: 'max' },
    { label: 'N° COMBATES ', uid: 'count' },
]

interface Data {
    reportPlacesFight: ReportPlacesFight[];
}

interface ReportPlacesFight {
    id : string
    name:  string;
    max:   Date;
    count: number;
}

const PlacesFightReportResponse: NextPage = () => {

    const { data, error } = useQuery<Data>(GetPlacesFightReportResponse, {
        pollInterval: 1000
    })


    if (!data) return <Loading />
    return (
        <AppLayout
            title='Reportes'
            description='Reportes sobre Marvel'
        >
            <Grid.Container gap={2} direction='column' alignItems='flex-start' css={{ margin: '$4', width: '100%' }}>

                <Grid>
                    <Text h1 >Locaciones de Combate</Text>
                </Grid>

                <Grid>
                    <Text span size='$2xl'>
                        Marvel está lleno de locaciones increíbles donde héroes y villanos han luchado por el destino del universo.
                        Descubre las tres locaciones más importantes donde se han desarrollado los combates más épicos y memorables en 
                        el mundo de Marvel
                    </Text>
                </Grid>

                <Grid css={{ margin: '$8', minWidth: '100%', maxWidth: '600px', display: 'inline-grid' }}>
                    <TableWrapper
                        columns={columns}
                        rows={data.reportPlacesFight!}
                        cellReducer={ReportsCellReducer}
                    />
                </Grid>

            </Grid.Container>
        </AppLayout>
    )
}

export default PlacesFightReportResponse
