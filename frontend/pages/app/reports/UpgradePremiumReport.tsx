import type { NextPage } from 'next'
import { AppLayout } from '@/layouts/AppLayout'
import { Text, Row, Col, Grid, Link, Button, Spacer } from '@nextui-org/react';
import { TableWrapper } from '../../../components/table/index';
import { CellCalculation } from '@/components/table/CellCalculation';



const columns = [
  {label: 'Nombre', uid: 'nombre'},
  {label: 'Apellido', uid: 'apellido'},
  {label: 'F.InicioGold', uid: 'fechaInicioGold'},
  {label: 'F.InicioPremium', uid: 'fechaInicioPremium'},
  {label: 'Correo', uid: 'email'},
]

const users = [
  {uid:1, nombre: 'Juan', apellido: 'Perez', fechaInicioGold: '2021/01/01', fechaInicioPremium: '2021/05/01', email: 'JuanPerez@gmail.com'},
  {uid:2, nombre:'Pedro', apellido: 'Rodriguez', fechaInicioGold: '2021/01/01', fechaInicioPremium: '2021/05/01', email: 'PedroRodriguez@gmail.com'},
  {uid:3, nombre:'Maria', apellido: 'Gonzalez', fechaInicioGold: '2021/01/01', fechaInicioPremium: '2021/05/01', email: 'MariaGonzalez@gmail.com'},
  {uid:4, nombre : 'Carlos', apellido: 'Gutierrez', fechaInicioGold: '2021/01/01', fechaInicioPremium: '2021/05/01', email: 'CarlosGutierrez@gmail.com'},
  {uid:5, nombre: 'Juan', apellido: 'Perez', fechaInicioGold: '2021/01/01', fechaInicioPremium: '2021/05/01', email: 'JuanPerez@gmail.com'},
  {uid:6, nombre:'Pedro', apellido: 'Rodriguez', fechaInicioGold: '2021/01/01', fechaInicioPremium: '2021/05/01', email: 'PedroRodriguez@gmail.com'},
  {uid:7, nombre:'Maria', apellido: 'Gonzalez', fechaInicioGold: '2021/01/01', fechaInicioPremium: '2021/05/01', email: 'MariaGonzalez@gmail.com'},
  {uid:8, nombre : 'Carlos', apellido: 'Gutierrez', fechaInicioGold: '2021/01/01', fechaInicioPremium: '2021/05/01', email: 'CarlosGutierrez@gmail.com'},
]

const UpgradePremiumReportPage: NextPage = () => {
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
            <Text span size='$2xl'>
              ¡Descubre quiénes han dado el salto de Gold a Premium en los últimos 4 meses! Al igual que los héroes de Marvel, nuestros usuarios buscan mejorar su experiencia.
              Descubre cómo aprovechar al máximo tu membresía y conviértete en un héroe de Marvel.
            </Text>
          </Grid>
          <Grid css={{margin:'$4', minWidth:'80%', maxWidth:'600px'}}>
            <TableWrapper columns={columns} rows={users}/>
          </Grid>
          <Grid.Container gap={10} direction='row' justify='flex-start'>
            <Grid css={{maxW:'max-content'}}>
              <CellCalculation label='Total Upgrades' value='2'/>
            </Grid>
          </Grid.Container>
        </Grid.Container>
    </AppLayout>
  )
}

export default UpgradePremiumReportPage
