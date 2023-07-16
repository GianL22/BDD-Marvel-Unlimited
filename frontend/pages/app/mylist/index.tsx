import type { NextPage } from 'next'
import { Loading, Text } from '@nextui-org/react';
import { AppLayout } from '../../../layouts/AppLayout';
import { Flex } from '@/components/containers';
import { useQuery } from '@apollo/client';
import EmptyList from '@/components/MyList/EmptyList';
import { GetMyList } from '@/graphql/Medio';
import { ProfileMyList } from '@/models/Medio';
import Cookies from 'js-cookie';
import { MyList } from '@/components/MyList/MyList';

interface DataResponse {
  profileMyList: ProfileMyList
}

const MyListPage: NextPage = () => {
  const { data, refetch } = useQuery<DataResponse>(GetMyList, {
    variables: {
      profileId: Cookies.get('activeProfile')
    }
  })
  if (!data) return <Loading />
  return (
    <AppLayout
      title='My List'
      description='Marvel Unlimited - Tus Películas, series y video juegos favoritos'
    >
      <Flex
        css={{ 'mt': '$5', 'px': '$6', '@sm': { mt: '$10', px: '$16', } }}
        justify='between'
        align='center'
      >
        <Text h1>Explora el vasto universo de Marvel con tus títulos favoritos.</Text>
      </Flex>
      {
        (data.profileMyList.medios.length === 0)
          ? <EmptyList />
          : <MyList medios={data.profileMyList.medios} />
      }
    </AppLayout>
  )
}

export default MyListPage
