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
  {label: 'F.InicioPremium', uid: 'dateSuscription'},
  {label: 'Correo', uid: 'email'},
]

interface User {
  name : string,
  lastName : string,
  email : string,
}
 
interface RowReport{
  user : User,
  dateSuscription : Date | string,
}
interface ReportResponse {
  reportSuscriptions : RowReport[]
}



// const users = [
//   {uid:1, nombre: 'Juan', apellido: 'Perez', fechaInicioGold: '2021/01/01', fechaInicioPremium: '2021/05/01', email: 'JuanPerez@gmail.com'},
//   {uid:2, nombre:'Pedro', apellido: 'Rodriguez', fechaInicioGold: '2021/01/01', fechaInicioPremium: '2021/05/01', email: 'PedroRodriguez@gmail.com'},
//   {uid:3, nombre:'Maria', apellido: 'Gonzalez', fechaInicioGold: '2021/01/01', fechaInicioPremium: '2021/05/01', email: 'MariaGonzalez@gmail.com'},
//   {uid:4, nombre : 'Carlos', apellido: 'Gutierrez', fechaInicioGold: '2021/01/01', fechaInicioPremium: '2021/05/01', email: 'CarlosGutierrez@gmail.com'},
//   {uid:5, nombre: 'Juan', apellido: 'Perez', fechaInicioGold: '2021/01/01', fechaInicioPremium: '2021/05/01', email: 'JuanPerez@gmail.com'},
//   {uid:6, nombre:'Pedro', apellido: 'Rodriguez', fechaInicioGold: '2021/01/01', fechaInicioPremium: '2021/05/01', email: 'PedroRodriguez@gmail.com'},
//   {uid:7, nombre:'Maria', apellido: 'Gonzalez', fechaInicioGold: '2021/01/01', fechaInicioPremium: '2021/05/01', email: 'MariaGonzalez@gmail.com'},
//   {uid:8, nombre : 'Carlos', apellido: 'Gutierrez', fechaInicioGold: '2021/01/01', fechaInicioPremium: '2021/05/01', email: 'CarlosGutierrez@gmail.com'},
// ]

const UpgradePremiumReportPage: NextPage = () => {

  const { data , error } = useQuery<ReportResponse>(GetUpgragePremiumReport)
  console.log(data)
  const users = useMemo(() => (
    data?.reportSuscriptions.map(({dateSuscription, user},i) => ({
      id: i,
      dateSuscription,
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
              Descubre cómo aprovechar al máximo tu membresía y conviértete en un héroe de Marvel.
            </Text>
          </Grid>
          <Grid css={{margin:'$4', minWidth:'80%', maxWidth:'600px'}}>
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
