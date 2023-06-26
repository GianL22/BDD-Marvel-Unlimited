import { useMemo } from 'react';
import type { NextPage } from 'next'
import { Grid, Link, Loading, Text, useTheme } from '@nextui-org/react';
import { TableWrapper } from '../../../components/table';
import { AppLayout } from '@/layouts/AppLayout';
import { useMutation, useQuery } from '@apollo/client';
import { Notification } from '@/notification';
import { Flex } from '@/components/containers';
import { DeleteObjectById, GetAllObject } from '@/graphql/Objects';
import { ObjectByID } from '@/models/Object';
import { ObjectsCellReducer } from '@/components/table/cell-reducers/ObjectsCellReducer';

const columns = [
  { label: "Nombre", uid: "name" },
  { label: "Material", uid: "material" },
  { label: "Tipo", uid: "type" },
  { label: "Acciones", uid: "actions" },
];

interface ResponseData {
  objects: ObjectByID[];
}

const PowersPage: NextPage = () => {
  const { isDark } = useTheme()
  const { data , error} = useQuery<ResponseData>(GetAllObject,{
    pollInterval: 1000
  })
  const objects = useMemo(() => (
    data?.objects.map((object,i) => ({
        id: object.id,
        material: object.material,
        name: object.name,
        type: object.objectTypeId.description
    }))
  ),[data])

  const [deleteObjectById] = useMutation(DeleteObjectById)
  const objectAction = async (id: string) => {
    Notification(isDark).fire({
      title: 'Cargando',
      icon: 'info',
    })
    try {
      await deleteObjectById({
        variables:{
          removeObjectId: id,
        }
      })
      Notification(isDark).fire({
        title: 'Objeto eliminado exitosamente',
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
      title='Objects'
      description='Marvel'
    >
        <Grid.Container gap={2} direction='column' alignItems='flex-start' css={{margin:'$4', width:'100%'}}>

          <Grid css={{ width : '100%'}}>
            <Flex wrap={'nowrap'} justify={'between'} >
              <Text h1 >Objetos</Text>
              <Link href='/dashboard/objects/create'>
                Crear Objecto
              </Link>
            </Flex>
          </Grid>
          
          <Grid css={{margin:'$8', minWidth:'100%', maxWidth:'600px', display: 'inline-grid'}}>
            <TableWrapper 
              columns={columns} 
              rows={objects!}
              cellReducer={ObjectsCellReducer}
              onDelete={objectAction}
            />
          </Grid>        
        </Grid.Container>
    </AppLayout>
  )
}

export default PowersPage
