import { useEffect, useMemo } from 'react';
import type { NextPage } from 'next'
import { Grid, Link, Loading, Text, useTheme } from '@nextui-org/react';
import { TableWrapper } from '../../../components/table';
import { AppLayout } from '@/layouts/AppLayout';
import { useMutation, useQuery } from '@apollo/client';
import { Notification } from '@/notification';
import { Flex } from '@/components/containers';
import { GetMedios, RemoveMedio } from '@/graphql/Medio';
import { MediosCellReducer } from '@/components/table/cell-reducers/MediosCellReducer';
import { Media, Medio } from '@/models/Medio';
import { convertMedioToShow } from '@/helpers/transformData';

const columns = [
  { label: "Titulo", uid: "title" },
  { label: "Basado", uid: "based" },
  { label: "Fecha de Estreno", uid: "releaseDate" },
  { label: "Tipo", uid: "type" },
  { label: "Acciones", uid: "actions" },
];

export interface MedioResponse {
    media: Media;
}

const MediosPage: NextPage = () => {
  const { isDark } = useTheme()
  const { data , error} = useQuery<MedioResponse>(GetMedios,{
    pollInterval: 1000
  })

  let medios = useMemo(() => convertMedioToShow(data!), [data])

  useEffect(() => {
      medios = convertMedioToShow(data!)
  }, [data])

  const [deleteMedioById] = useMutation(RemoveMedio)
  const MedioAction = async (id: string) => {
    Notification(isDark).fire({
      title: 'Cargando',
      icon: 'info',
    })
    try {
      await deleteMedioById({
        variables:{
            removeMedioId: id,
        }
      })
      Notification(isDark).fire({
        title: 'Medio eliminado exitosamente',
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
      title='Medios'
      description='Marvel United - Medios'
    >
        <Grid.Container gap={2} direction='column' alignItems='flex-start' css={{margin:'$4', width:'100%'}}>

          <Grid css={{ width : '100%'}}>
            <Flex wrap={'nowrap'} justify={'between'} >
              <Text h1 >Medios</Text>
              <Link href='/dashboard/medios/create'>
                Crear Medio
              </Link>
            </Flex>
          </Grid>
          
          <Grid css={{margin:'$8', minWidth:'100%', maxWidth:'600px', display: 'inline-grid'}}>
            <TableWrapper 
              columns={columns} 
              rows={medios!}
              cellReducer={ MediosCellReducer }
              onDelete={MedioAction}
            />
          </Grid>        
        </Grid.Container>
    </AppLayout>
  )
}

export default MediosPage
