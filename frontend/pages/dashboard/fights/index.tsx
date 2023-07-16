import { useEffect, useMemo } from 'react';
import type { NextPage } from 'next'
import { Grid, Link, Loading, Text, useTheme } from '@nextui-org/react';
import { TableWrapper } from '../../../components/table';
import { AppLayout } from '@/layouts/AppLayout';
import { useMutation, useQuery } from '@apollo/client';
import { Notification } from '@/notification';
import { Flex } from '@/components/containers';
import { GetFights, RemoveFight } from '@/graphql/Fight';
import { GenericResponse } from '@/models/Information';
import { FightCellReducer } from '@/components/table/cell-reducers/FightCellReducer';

const columns = [
    { label: "Lugar", uid: "placeName" },
    { label: "Fecha", uid: "date" },
    { label: "Acciones", uid: "actions" },
];

interface Data {
    fights: Fight[];
}

interface Fight {
    date:  string;
    place: GenericResponse;
}

const FightsPage: NextPage = () => {
  const { isDark } = useTheme()
  const { data, error } = useQuery<Data>(GetFights, {
      pollInterval: 1000
    })
  const [deleteFight] = useMutation(RemoveFight)
  const fights = useMemo(() => data?.fights.map((f) => {

    
    const date = f.date.substring(0,10)

    return {
      id : `${date}&${f.place.id}`,
      date,
      placeId: f.place.id,
      placeName: f.place.description
    }
  }), [data])   

  const fightAction = async (id: string) => {
    
    const [date, placeId] = id.split('&')  
    Notification(isDark).fire({
      title: 'Cargando',
      icon: 'info',
    })
    try {
      await deleteFight({
        variables: {

          removeFightInput : {
            date,
            placeId
          }

        }
      })
      Notification(isDark).fire({
        title: 'Combate eliminado exitosamente',
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
  if (!data) return <Loading />
  return (
    <AppLayout
      title='Combates'
      description='Marvel United - Combates'
    >
      <Grid.Container gap={2} direction='column' alignItems='flex-start' css={{ margin: '$4', width: '100%' }}>

        <Grid css={{ width: '100%' }}>
          <Flex wrap={'nowrap'} justify={'between'} >
            <Text h1 >Combates</Text>
            <Link href='/dashboard/fights/create'>
              Crear Combate
            </Link>
          </Flex>
        </Grid>

        <Grid css={{ margin: '$8', minWidth: '100%', maxWidth: '600px', display: 'inline-grid' }}>
          <TableWrapper
            columns={columns}
            rows={fights!}
            cellReducer={FightCellReducer}
            onDelete={fightAction}
          />
        </Grid>
      </Grid.Container>
    </AppLayout>
  )
}

export default FightsPage
