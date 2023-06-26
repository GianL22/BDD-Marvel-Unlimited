import { useMemo } from 'react';
import type { NextPage } from 'next'
import { useQuery } from '@apollo/client';
import { Text, Grid, Loading } from '@nextui-org/react';
import { AppLayout } from '@/layouts/AppLayout'
import { TableWrapper } from '../../../components/table/index';
import { CellCalculation } from '@/components/table/CellCalculation';
import { GetInheritedPowersReport } from '@/graphql/Reports';

const columns = [
  {label: 'PODER', uid: 'powerName'},
  {label: 'DESCRIPCION', uid: 'powerDescription'},
  {label: 'VILLANOS ', uid: 'villains'},
]

interface ReportResponse {
    reportInheritedPowers: ReportInheritedPower[];
}

interface ReportInheritedPower {
    powerName:        string;
    powerDescription: string;
    villain:          Villain[];
}

interface Villain {
    nameVillain: string;
}

const InheritedPowersReportPage: NextPage = () => {

    const { data , error} = useQuery<ReportResponse>(GetInheritedPowersReport,{
      pollInterval: 1000
    })

    console.log(data)

    const powers = useMemo(() => (
        data?.reportInheritedPowers.map(({villain, ...rest},i) => ({
            id: i,
            villains: villain.map(vil => vil.nameVillain).join(', '),
            ...rest
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
            <Text h1 >Poderes Heredados "Super" en Villanos</Text>
          </Grid>
          
          <Grid>
            <Text span size='$2xl'>
              En Marvel, algunos villanos tienen poderes heredados "súper". Descubre cómo estos poderes han impactado en el universo
              de Marvel al explorar algunos de los villanos más icónicos que los poseen.
            </Text>
          </Grid>
          
          <Grid css={{margin:'$8', minWidth:'100%', maxWidth:'600px', display: 'inline-grid'}}>
            <TableWrapper columns={columns} rows={powers!}/>
          </Grid>
          
          <Grid.Container gap={10} direction='row' justify='flex-start'>
            <Grid css={{maxW:'max-content'}}>
              <CellCalculation label='Total de Poderes' value={(powers) ? powers.length.toString() : '0'}/>
            </Grid>
          </Grid.Container>
        
        </Grid.Container>
    </AppLayout>
  )
}

export default InheritedPowersReportPage
