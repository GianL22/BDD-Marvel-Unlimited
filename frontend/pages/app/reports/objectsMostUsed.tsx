import { useMemo } from 'react';
import type { NextPage } from 'next'
import { useQuery } from '@apollo/client';
import { Text, Grid, Loading } from '@nextui-org/react';
import { AppLayout } from '@/layouts/AppLayout'
import { TableWrapper } from '../../../components/table/index';
import { CellCalculation } from '@/components/table/CellCalculation';
import { GetNaturalPowersReport, GetObjectsMostUsedReportResponse, GetPlacesFightReportResponse } from '@/graphql/Reports';
import { ReportsCellReducer } from '@/components/table/cell-reducers/ReportsCellReducer';

const columns = [
    { label: 'NOMBRE', uid: 'name' },
    { label: 'TIPO', uid: 'type' },
    { label: 'CANT. USO', uid: 'count' },
]

interface Data {
    reportObjectsMostUsed: ReportObjectsMostUsed[];
}

interface ReportObjectsMostUsed {
    id :         string;
    count:       number;
    description: string;
    name:        string;
    type:        string;
}

const ObjectsMostUsedReportPage: NextPage = () => {

    const { data, error } = useQuery<Data>(GetObjectsMostUsedReportResponse, {
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
                    <Text h1 >Objetos de superhéroes y supervillanos</Text>
                </Grid>

                <Grid>
                    <Text span size='$2xl'>
                        Los héroes y villanos de Marvel tiene habilidades increíbles, pero a menudo son sus objetos 
                        icónicos los que los definen. Descubre los 5 objetos más usados en Marvel
                    </Text>
                </Grid>

                <Grid css={{ margin: '$8', minWidth: '100%', maxWidth: '600px', display: 'inline-grid' }}>
                    <TableWrapper
                        columns={columns}
                        rows={data.reportObjectsMostUsed!}
                        cellReducer={ReportsCellReducer}
                    />
                </Grid>

            </Grid.Container>
        </AppLayout>
    )
}

export default ObjectsMostUsedReportPage
