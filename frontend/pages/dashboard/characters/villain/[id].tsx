import { Grid, Input, Spacer, Text, Button } from '@nextui-org/react';
import { Flex } from '../../../../components/containers';
import { AppLayout } from '@/layouts/AppLayout';
import { ApolloClient, InMemoryCache, useMutation, useQuery } from '@apollo/client';
import { VillainAll } from '@/models/Character';
import { useRouter } from 'next/router';
import { GetServerSideProps, NextPage } from 'next';
import { GetVillainById } from '@/graphql/Character';

interface Props{
  villain: VillainAll;
}

const VillanDetailsPage: NextPage<Props> = ( {villain} ) => {  
  const {replace} = useRouter()

  return (
    <AppLayout 
      title='Detalle de Villano'
      description='Pagina administrativa de Marvel United'
    >
      <Flex
        css={{'mt': '$5', 'px': '$6','@sm': {mt: '$10',px: '$16',}}}
        justify='between'
        align='center'
      >
        <Text h1>
          Detalle del Villano: 
        </Text>
      </Flex>
      <Grid.Container gap={2} justify="center" >
        <Grid alignContent='space-between' alignItems='center' xs={ 12 } sm={ 4 } direction="column">
          <Spacer y={1} />
          <Input
            labelPlaceholder='Nombre'
            width='90%'
            value={villain.name}
            helperColor={'success'}
            status={'success'}
            color={'success'}
            readOnly
          />
          <Spacer y={3} />
          <Input
            labelPlaceholder='Apellido'
            width='90%'
            value={villain.lastName}
            helperColor={'success'}
            status={'success'}
            color={'success'}
            readOnly
          />
          <Spacer y={3} />
          <Input
            labelPlaceholder='Frase'
            width='90%'
            value={villain.phrase}
            helperColor={'success'}
            status={'success'}
            color={'success'}
            readOnly
          />
          <Spacer y={3} />
          <Input
            labelPlaceholder='Primera Aparición'
            width='90%'
            value={villain.firstApparition}
            helperColor={'success'}
            status={'success'}
            color={'success'}
            readOnly
          />
          <Spacer y={3} />
        </Grid>

        <Grid xs={12} sm={ 4 } direction="column" alignItems='center' alignContent='space-between'>
          <Spacer y={1} />
          <Input
            labelPlaceholder='Genero'
            width='90%'
            value={villain.gender}
            helperColor={'success'}
            status={'success'}
            color={'success'}
            readOnly
          />
          <Spacer y={3} />
          <Input
            labelPlaceholder='Estado Marital'
            width='90%'
            value={villain.maritialStatus}
            helperColor={'success'}
            status={'success'}
            color={'success'}
            readOnly
          />
          <Spacer y={3} />
          <Input
            labelPlaceholder='Color de Ojos'
            width='90%'
            value={villain.character.eyeColor.description}
            helperColor={'success'}
            status={'success'}
            color={'success'}
            readOnly
          />
          <Spacer y={3} />
          <Input
            labelPlaceholder='Color de Cabello'
            width='90%'
            value={villain.character.hairColor.description}
            helperColor={'success'}
            status={'success'}
            color={'success'}
            readOnly
          />
          <Spacer y={3} />
        </Grid>

        <Grid xs={12} sm={ 4 } direction="column" alignItems='center' alignContent='space-between'>
          <Spacer y={1} />
          <Input
            labelPlaceholder='Nombre Villano'
            width='90%'
            value={villain.nameVillain}
            helperColor={'success'}
            status={'success'}
            color={'success'}
            readOnly
          />
          <Spacer y={3} />
          <Input
            labelPlaceholder='Objetivo'
            width='90%'
            value={villain.objective}
            helperColor={'success'}
            status={'success'}
            color={'success'}
            readOnly
          />
        </Grid>

        <Grid xs ={12} alignContent='space-between' alignItems='center' direction='row-reverse'>
          <Button
              onPress={()=> setTimeout(() => replace('/dashboard/characters'),500)}
              size='lg'
          >
              Regresar
          </Button>
        </Grid>
      </Grid.Container> 
    </AppLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { id = '' } = ctx.params as {id: string}; 
    const client = new ApolloClient({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
        cache: new InMemoryCache(),
    });

    try {
      const {data: villain} =  await client.query({
        query: GetVillainById,
        variables: {
          villainId: id,
        },
      });
      return{
        props:{
          villain: villain.villain
        }
      }

    } catch (error) {
        return{
            redirect: {
                destination: '/404',
                permanent: false
            }
        }
    }
  }

export default VillanDetailsPage