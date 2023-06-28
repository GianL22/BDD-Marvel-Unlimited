import type { NextPage } from 'next'
import { Grid, Link, Loading, Text, useTheme } from '@nextui-org/react';
import { TableWrapper } from '../../../components/table';
import { AppLayout } from '@/layouts/AppLayout';
import { useMutation, useQuery } from '@apollo/client';
import { Notification } from '@/notification';
import { Flex } from '@/components/containers';
import { GetAllOrganizations, RemoveOrganizationById } from '@/graphql/Organizations';
import { OrganizationsCellReducer } from '@/components/table/cell-reducers/OrganizationsCellReducer';

const columns = [
  { label: "Nombre", uid: "name" },
  { label: "Eslogan", uid: "slogan" },
  { label: "Líder", uid: "leaderName" },
  { label: "Fundador", uid: "founderName" },
  { label: "Acciones", uid: "actions" },
];

interface ResponseData {
  organizations: Organization[];
}

interface Organization {
  id:          string;
  name:        string;
  slogan:      string;
  leaderName:  string;
  founderName: string;
}

const OrganizationsPage: NextPage = () => {
  const { isDark } = useTheme()
  const { data , error} = useQuery<ResponseData>(GetAllOrganizations,{
    pollInterval: 1000
  })
  
  const [removeOrganizationById] = useMutation(RemoveOrganizationById)
  const organizationAction = async (id: string) => {
    Notification(isDark).fire({
      title: 'Cargando',
      icon: 'info',
    })
    try {
      await removeOrganizationById({
        variables:{
          removeOrganizationId: id
        }
      })

      Notification(isDark).fire({
        title: 'Organización eliminada exitosamente',
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
      title='Pagina de Organizaciones'
      description='Marvel United - Organizations'
    >
        <Grid.Container gap={2} direction='column' alignItems='flex-start' css={{margin:'$4', width:'100%'}}>

          <Grid css={{ width : '100%'}}>
            <Flex wrap={'nowrap'} justify={'between'} >
              <Text h1 >Organizaciones</Text>
              <Link href='/dashboard/organizations/create'>
                Crear Organización
              </Link>
            </Flex>
          </Grid>
          
          <Grid css={{margin:'$8', minWidth:'100%', maxWidth:'600px', display: 'inline-grid'}}>
            <TableWrapper 
              columns={columns} 
              rows={data.organizations!}
              cellReducer={OrganizationsCellReducer}
              onDelete={organizationAction}
            />
          </Grid>        
        </Grid.Container>
    </AppLayout>
  )
}

export default OrganizationsPage
