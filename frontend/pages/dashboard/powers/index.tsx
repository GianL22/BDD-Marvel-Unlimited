import type { NextPage } from 'next'
import { Grid, Link, Loading, Text, useTheme } from '@nextui-org/react';
import { TableWrapper } from '../../../components/table';
import { AppLayout } from '@/layouts/AppLayout';
import { useMutation, useQuery } from '@apollo/client';
import { DeletePowerById, GetPowers } from '@/graphql/Powers';
import { Power } from '@/models/Power';
import { PowersCellReducer } from '@/components/table/cell-reducers/PowersCellReducer';
import { Notification } from '@/notification';
import { Flex } from '@/components/containers';

const columns = [
  { label: "Nombre", uid: "name" },
  { label: "Descripción", uid: "description" },
  { label: "Acciones", uid: "actions" },
];

interface ResponseData {
    Powers: Power[];
}

const PowersPage: NextPage = () => {
  const { isDark } = useTheme()
  const { data , error} = useQuery<ResponseData>(GetPowers,{
    pollInterval: 1000
  })

  const [removePowerById] = useMutation(DeletePowerById)
  const powerAction = async (id: string) => {
    Notification(isDark).fire({
      title: 'Cargando',
      icon: 'info',
    })
    try {
      await removePowerById({
        variables:{
          removePowerId: id
        }
      })

      Notification(isDark).fire({
        title: 'Poder eliminado exitosamente',
        icon: 'success',
        timer: 3000
      })
    } catch (error: any) {
      Notification(isDark).fire({
        title: error.message,
        icon: 'error',
        timer: 3000
      })
    }
  }

  if ( !data ) return <Loading />
  return ( 
    <AppLayout
      title='Pagina de Poderes'
      description='Marvel United - Powers'
    >
        <Grid.Container gap={2} direction='column' alignItems='flex-start' css={{margin:'$4', width:'100%'}}>

          <Grid css={{ width : '100%'}}>
            <Flex wrap={'nowrap'} justify={'between'} >
              <Text h1 >Poderes</Text>
              <Link href='/dashboard/powers/create'>
                Crear Poder
              </Link>
            </Flex>
          </Grid>
          
          <Grid css={{margin:'$8', minWidth:'100%', maxWidth:'600px', display: 'inline-grid'}}>
            <TableWrapper 
              columns={columns} 
              rows={data.Powers!}
              cellReducer={PowersCellReducer}
              onDelete={powerAction}
            />
          </Grid>        
        </Grid.Container>
    </AppLayout>
  )
}

export default PowersPage
