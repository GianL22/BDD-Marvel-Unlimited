import type { NextPage } from 'next'
import { Grid, Link, Loading, Text, useTheme } from '@nextui-org/react';
import { TableWrapper } from '../../../components/table';
import { AppLayout } from '@/layouts/AppLayout';
import { useMutation, useQuery } from '@apollo/client';
import { Notification } from '@/notification';
import { Flex } from '@/components/containers';
import { GetHeadquarters, RemoveHeadquarterByIds } from '@/graphql/Headquarters';
import { HeadquarterResponse } from '@/models/Headquarters';
import { useMemo } from 'react';
import { HeadquartersCellReducer } from '@/components/table/cell-reducers/HeadquartersCellReducer';

const columns = [
  { label: "Nombre Sede", uid: "headquarterName" },
  { label: "Nombre Organización", uid: "organizationName" },
  { label: "Tipo Edificación", uid: "buildingType" },
  { label: "Acciones", uid: "actions" },
];

const HeadquartersPage: NextPage = () => {
  const { isDark } = useTheme()
  const { data , error} = useQuery<HeadquarterResponse>(GetHeadquarters,{
    pollInterval: 1000
  })

  const headquarters = useMemo( () => 
    data?.headquarters.map(headquarter => {
        return {
            id: headquarter.id,
            headquarterName: headquarter.name,
            organizationId: headquarter.organization.id,
            organizationName: headquarter.organization.description,
            buildingType: headquarter.buildingType.description,
        };
    }) 
  ,[data])

  const [removeHeadquarterByIds] = useMutation(RemoveHeadquarterByIds)
  const headquarterAction = async (id: string) => {
    const headquarterId = id.split(' ')[0];
    const organizationId = id.split(' ')[1];
    Notification(isDark).fire({
      title: 'Cargando',
      icon: 'info',
    })
    try {
      await removeHeadquarterByIds({
        variables:{
            headquarterId: headquarterId,
            organizationId: organizationId
        }
      })

      Notification(isDark).fire({
        title: 'Sede eliminada exitosamente',
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
      title='Pagina de Sedes'
      description='Marvel United - Organizations'
    >
        <Grid.Container gap={2} direction='column' alignItems='flex-start' css={{margin:'$4', width:'100%'}}>

          <Grid css={{ width : '100%'}}>
            <Flex wrap={'nowrap'} justify={'between'} >
              <Text h1 >Sedes</Text>
              <Link href='/dashboard/headquarters/create'>
                Crear Sede
              </Link>
            </Flex>
          </Grid>
          
          <Grid css={{margin:'$8', minWidth:'100%', maxWidth:'600px', display: 'inline-grid'}}>
            <TableWrapper 
              columns={columns} 
              rows={headquarters!}
              cellReducer={ HeadquartersCellReducer }
              onDelete={headquarterAction}
            />
          </Grid>        
        </Grid.Container>
    </AppLayout>
  )
}

export default HeadquartersPage
