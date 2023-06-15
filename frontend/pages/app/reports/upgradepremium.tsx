import { useMemo } from 'react';
import type { NextPage } from 'next'
import { useQuery } from '@apollo/client';
import { Text, Row, Col, Grid, Link, Button, Spacer } from '@nextui-org/react';
import { AppLayout } from '@/layouts/AppLayout'
import { TableWrapper } from '../../../components/table/index';
import { CellCalculation } from '@/components/table/CellCalculation';
import { GetUpgragePremiumReport } from '@/graphql/UpgradePremium';



const columns = [
  {label: 'Nombre', uid: 'name'},
  {label: 'Apellido', uid: 'lastName'},
  {label: 'Fecha Suscripción ', uid: 'dateSuscription'},
  {label: 'Fecha Fin', uid: 'dateEnd'},
  {label: 'Correo', uid: 'email'},
]

interface User {
  name : string,
  lastName : string,
  email : string,
}
 
interface RowReport{
  user : User,
  dateSuscription : string,
  dateEnd: string;
}
interface ReportResponse {
  reportSuscriptions : RowReport[]
}

const UpgradePremiumReportPage: NextPage = () => {

  const { data , error} = useQuery<ReportResponse>(GetUpgragePremiumReport,
    {
      pollInterval: 1000
    })
  const users = useMemo(() => (
    data?.reportSuscriptions.map(({dateSuscription, user, dateEnd},i) => ({
      id: i,
      dateSuscription: dateSuscription.slice(0,10),
      dateEnd: dateEnd.slice(0,10),
      ...user
    }))
  ),[data])
  if ( !data ) return <h1>cargando</h1>
  return ( 
    <AppLayout
      title='Reportes'
      description='Reportes sobre Marvel'
    >
        <Grid.Container gap={2} direction='column' alignItems='flex-start' css={{margin:'$4', width:'100%'}}>
          <Grid>
            <Text h1 >Upgrades a Premium</Text>
          </Grid>
          <Grid>
            <Text span size='$xl'>
              ¡Descubre quiénes han dado el salto de Gold a Premium en los últimos 4 meses! Al igual que los héroes de Marvel, nuestros usuarios buscan mejorar su experiencia.
              Descubre cómo aprovechar al máximo tu membresía y  conviértete en un héroe de Marvel.
            </Text>
          </Grid>
          <Grid css={{margin:'$8', minWidth:'90%', maxWidth:'600px', display: 'inline-grid'}}>
            <TableWrapper columns={columns} rows={users!}/>
          </Grid>
          <Grid.Container gap={10} direction='row' justify='flex-start'>
            <Grid css={{maxW:'max-content'}}>
              <CellCalculation label='Total Upgrades' value={(users) ? users.length.toString() : '0'}/>
            </Grid>
          </Grid.Container>
        </Grid.Container>
    </AppLayout>
  )
}

export default UpgradePremiumReportPage
