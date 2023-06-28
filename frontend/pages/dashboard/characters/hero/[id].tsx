import { Grid, Input, Spacer, Text, Button, Image } from '@nextui-org/react';
import { Box, Flex } from '../../../../components/containers';
import { AppLayout } from '@/layouts/AppLayout';
import { ApolloClient, InMemoryCache, useMutation, useQuery } from '@apollo/client';
import { HeroAll, VillainAll } from '@/models/Character';
import { useRouter } from 'next/router';
import { GetServerSideProps, NextPage } from 'next';
import { GetHeroById } from '@/graphql/Character';

interface Props{
  hero: HeroAll;
}

const HeroDetailsPage: NextPage<Props> = ( {hero} ) => {  
  const {replace} = useRouter()

  return (
    <AppLayout 
      title='Detalle de Heroe'
      description='Pagina administrativa de Marvel United'
    >
      <Flex
        css={{'mt': '$5', 'px': '$6','@sm': {mt: '$10',px: '$16',}}}
        justify='between'
        align='center'
      >
        <Text h1>
          Detalle del Heroe: 
        </Text>
      </Flex>
      <Grid.Container gap={2} justify="center" >
        <Grid alignContent='space-between' alignItems='center' xs={ 12 } sm={ 4 } direction="column">
          <Spacer y={1} />
          <Input
            labelPlaceholder='Nombre'
            width='90%'
            value={hero.name}
            helperColor={'success'}
            status={'success'}
            color={'success'}
            readOnly
          />
          <Spacer y={3} />
          <Input
            labelPlaceholder='Apellido'
            width='90%'
            value={hero.lastName}
            helperColor={'success'}
            status={'success'}
            color={'success'}
            readOnly
          />
          <Spacer y={3} />
          <Input
            labelPlaceholder='Frase'
            width='90%'
            value={hero.phrase}
            helperColor={'success'}
            status={'success'}
            color={'success'}
            readOnly
          />
          <Spacer y={3} />
          <Input
            labelPlaceholder='Primera Aparición'
            width='90%'
            value={hero.firstApparition}
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
            value={hero.gender}
            helperColor={'success'}
            status={'success'}
            color={'success'}
            readOnly
          />
          <Spacer y={3} />
          <Input
            labelPlaceholder='Estado Marital'
            width='90%'
            value={hero.maritialStatus}
            helperColor={'success'}
            status={'success'}
            color={'success'}
            readOnly
          />
          <Spacer y={3} />
          <Input
            labelPlaceholder='Color de Ojos'
            width='90%'
            value={hero.character.eyeColor.description}
            helperColor={'success'}
            status={'success'}
            color={'success'}
            readOnly
          />
          <Spacer y={3} />
          <Input
            labelPlaceholder='Color de Cabello'
            width='90%'
            value={hero.character.hairColor.description}
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
            labelPlaceholder='Archienemigo'
            width='90%'
            value={hero.archEnemy.nameVillain}
            helperColor={'success'}
            status={'success'}
            color={'success'}
            readOnly
          />
          <Spacer y={1.5} />
          <Box css={{width: '450px'}}>
              <Text>Logo</Text>
               <Image 
                    src= {hero.logo + '.jpg'}
                    width={'450px'} 
                    css={{maxWidth:'450px'}}
                    objectFit="contain" 
                    showSkeleton
                    containerCss={{
                        borderRadius: '5%',
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.6)',
                        overflow: 'hidden',
                    }}
                />
            </Box>
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
      const {data: hero} =  await client.query({
        query: GetHeroById,
        variables: {
          heroId: id,
        },
      });
      return{
        props:{
          hero: hero.hero
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

export default HeroDetailsPage