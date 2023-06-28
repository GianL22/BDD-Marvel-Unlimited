import { Grid, Input, Spacer, Text, Button } from '@nextui-org/react';
import { Flex } from '../../../../components/containers';
import { AppLayout } from '@/layouts/AppLayout';
import { ApolloClient, InMemoryCache, useMutation, useQuery } from '@apollo/client';
import { GetCivilById, GetHeroesAndVillains, RelatePowers } from '@/graphql/Character';
import { CivilAll } from '@/models/Character';
import { useRouter } from 'next/router';
import { GetServerSideProps, NextPage } from 'next';

interface Props{
  civil: CivilAll;
}

const CivilDetailsPage: NextPage<Props> = ( {civil} ) => {  
  console.log(civil)
  const {replace} = useRouter()

  return (
    <AppLayout 
      title='Detalle de Civil'
      description='Pagina administrativa de Marvel United'
    >
      <Flex
        css={{'mt': '$5', 'px': '$6','@sm': {mt: '$10',px: '$16',}}}
        justify='between'
        align='center'
      >
        <Text h1>
          Detalle del Civil: 
        </Text>
      </Flex>
      <Grid.Container gap={2} justify="center" >
        <Grid alignContent='space-between' alignItems='center' xs={ 12 } sm={ 4 } direction="column">
          <Spacer y={1} />
          <Input
            labelPlaceholder='Nombre'
            width='90%'
            value={civil.name}
            helperColor={'success'}
            status={'success'}
            color={'success'}
            readOnly
          />
          <Spacer y={3} />
          <Input
            labelPlaceholder='Apellido'
            width='90%'
            value={civil.lastName}
            helperColor={'success'}
            status={'success'}
            color={'success'}
            readOnly
          />
          <Spacer y={3} />
          <Input
            labelPlaceholder='Frase'
            width='90%'
            value={civil.phrase}
            helperColor={'success'}
            status={'success'}
            color={'success'}
            readOnly
          />
          <Spacer y={3} />
          <Input
            labelPlaceholder='Primera Aparición'
            width='90%'
            value={civil.firstApparition}
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
            value={civil.gender}
            helperColor={'success'}
            status={'success'}
            color={'success'}
            readOnly
          />
          <Spacer y={3} />
          <Input
            labelPlaceholder='Estado Marital'
            width='90%'
            value={civil.maritialStatus}
            helperColor={'success'}
            status={'success'}
            color={'success'}
            readOnly
          />
          <Spacer y={3} />
          <Input
            labelPlaceholder='Color de Ojos'
            width='90%'
            value={civil.character.eyeColor.description}
            helperColor={'success'}
            status={'success'}
            color={'success'}
            readOnly
          />
          <Spacer y={3} />
          <Input
            labelPlaceholder='Color de Cabello'
            width='90%'
            value={civil.character.hairColor.description}
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
            labelPlaceholder='Heroe'
            width='90%'
            value={(civil.hero) ? civil.hero.nameHero : 'No tiene relaciones'}
            helperColor={'success'}
            status={'success'}
            color={'success'}
            readOnly
          />
          <Spacer y={3} />
          <Input
            labelPlaceholder='Villano'
            width='90%'
            value={(civil.villain) ? civil.villain.nameVillain : 'No tiene relaciones'}
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
      const {data: civil} =  await client.query({
        query: GetCivilById,
        variables: {
          civilId: id,
        },
      });
      return{
        props:{
          civil: civil.civil
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

export default CivilDetailsPage