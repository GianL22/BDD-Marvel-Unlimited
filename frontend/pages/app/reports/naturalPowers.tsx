import { useMemo } from 'react';
import type { NextPage } from 'next'
import { useQuery } from '@apollo/client';
import { Text, Grid, Loading } from '@nextui-org/react';
import { AppLayout } from '@/layouts/AppLayout'
import { TableWrapper } from '../../../components/table/index';
import { CellCalculation } from '@/components/table/CellCalculation';
import { GetNaturalPowersReport } from '@/graphql/Reports';
import { ReportsCellReducer } from '@/components/table/cell-reducers/ReportsCellReducer';

const columns = [
    { label: 'NOMBRE', uid: 'characterName' },
    { label: 'ROL', uid: 'characterRol' },
    { label: 'ORGANIZACIÓN ', uid: 'organizationName' },
    { label: 'PODERES ', uid: 'powers' },
]

interface ReportResponse {
    reportNaturalPowers: ReportNaturalPower[];
}

interface ReportNaturalPower {
    characterName: string;
    characterRol: string;
    organizationName: string;
    naturalPowers: NaturalPower[];
}

interface NaturalPower {
    name: string;
}

const NaturalPowersReportPage: NextPage = () => {

    const { data, error } = useQuery<ReportResponse>(GetNaturalPowersReport, {
        pollInterval: 1000
    })

    const powers = useMemo(() => (
        data?.reportNaturalPowers.map(({ naturalPowers, ...rest }, i) => ({
            id: i,
            powers: naturalPowers.map(power => power.name).join(', '),
            ...rest
        }))
    ), [data])

    const heroCount = data?.reportNaturalPowers.filter(
        report => report.characterRol === "hero"
    ).length;

    const villainCount = data?.reportNaturalPowers.filter(
        report => report.characterRol === "villain"
    ).length;

    if (!data) return <Loading />
    return (
        <AppLayout
            title='Reportes'
            description='Reportes sobre Marvel'
        >
            <Grid.Container gap={2} direction='column' alignItems='flex-start' css={{ margin: '$4', width: '100%' }}>

                <Grid>
                    <Text h1 >Líderes con Poderes Artificiales</Text>
                </Grid>

                <Grid>
                    <Text span size='$2xl'>
                        Descubre a los líderes más sobresalientes del universo de Marvel en nuestro reporte que muestra los
                        nombres de los superhéroes y supervillanos que poseen poderes artificiales.
                    </Text>
                </Grid>

                <Grid css={{ margin: '$8', minWidth: '100%', maxWidth: '600px', display: 'inline-grid' }}>
                    <TableWrapper
                        columns={columns}
                        rows={powers!}
                        cellReducer={ReportsCellReducer}
                    />
                </Grid>

                <Grid.Container gap={5} direction='row' justify='space-between'>
                    <Grid css={{ maxW: 'max-content' }}>
                        <CellCalculation label='Total de Personajes' value={(powers) ? powers.length.toString() : '0'} />
                    </Grid>
                    <Grid css={{ maxW: 'max-content' }}>
                        <CellCalculation label='Total de Heroes' value={(heroCount) ? heroCount.toString() : '0'} />
                    </Grid>
                    <Grid css={{ maxW: 'max-content' }}>
                        <CellCalculation label='Total de Villanos' value={(villainCount) ? villainCount.toString() : '0'} />
                    </Grid>
                </Grid.Container>

            </Grid.Container>
        </AppLayout>
    )
}

export default NaturalPowersReportPage
