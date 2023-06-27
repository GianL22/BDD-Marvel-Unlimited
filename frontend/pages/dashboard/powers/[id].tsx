import { Button, Col, Grid, Input, Loading, Row, Spacer, Text, Textarea, useTheme } from '@nextui-org/react';
import { Flex } from '../../../components/containers';
import { AppLayout } from '@/layouts/AppLayout';
import { useMemo, useState } from 'react';
import { ApolloClient, InMemoryCache, useMutation } from '@apollo/client';
import { useRouter } from 'next/router';
import { Notification } from '@/notification';
import { useForm } from '@/hooks/useForm';
import { GetPowerById, UpdatePower } from '@/graphql/Powers';
import { GetServerSideProps, NextPage } from 'next';
import { Power } from '@/models/Power';

interface Props{
    power: Power;
}

const PowersDetailsPage: NextPage<Props>= ( {power} ) => {  
    const { isDark } = useTheme();
    const { replace } = useRouter();
    const [isLoading,setIsLoading] = useState(false);
    const [updatePower] = useMutation(UpdatePower);

    const onSubmit = async () => {
      setIsLoading(true)
      Notification(isDark).fire({
          title: 'Cargando',
          icon: 'info',
      })
        try {
          await updatePower({
              variables: {
                updatePowerInput: {
                  id: power.powerBy.id,
                  name: name.value,
                  description: description.value
                },
              },
          });
          Notification(isDark).fire({
            title: 'Poder Actualizado',
            icon: 'success',
          })
          setTimeout(() => replace('/dashboard/powers'),500)
          setIsLoading(false)
        } catch (error: any) {
            Notification(isDark).fire({
                title: error.message,
                icon: 'error',
                timer: 3000
            })
            setIsLoading(false)
        }
    }
  const {allowSubmit,parsedFields} = useForm([
      {
        name: 'name',
        validate: (value: string) => value.trim().length >= 3,
        validMessage: '',
        errorMessage: 'Minimo 3 caracteres',
        initialValue: power.powerBy.name,
      },
      {
        name: 'description',
        validate: (value: string) => value.trim().length >= 10,
        validMessage: '',
        errorMessage: 'Minimo 10 caracteres',
        initialValue: power.powerBy.description,
      },
  ])
  const [name,description] = parsedFields;
  const infoChanged = useMemo(() => {
    return name.value !== power.powerBy.name ||
    description.value !== power.powerBy.description
    }, [name.value,description.value,power])
  return (
    <AppLayout 
      title='Creación de Poderes'
      description='Pagina administrativa de Marvel United'
    >
      <Flex
        css={{'mt': '$5', 'px': '$6','@sm': {mt: '$10',px: '$16',}}}
        justify='between'
        align='center'
      >
        <Text h1>
          Detalles del Poder: 
        </Text>
      </Flex>

      <Grid.Container gap={4} justify="center" direction="column" css={{width:'80%'}} >
        <Spacer y={2}/>
        <Grid alignContent='space-between' alignItems='center' xs={ 12 } sm={ 12 } direction="column">
            <Row css={{width:'100%'}}>
              <Input
                bordered
                labelPlaceholder="Nombre Objeto"
                css={{width:'50%'}}
                value={name.value}
                onChange={(e) => name.setValue(e.target.value)}
                helperText={name.message}
                helperColor={name.color}
                status={name.color}
                color={name.color}
              />
            </Row>
            <Spacer y={2.5}/>
            <Row>
              <Textarea 
                labelPlaceholder="Descripción" 
                status= {description.color}  
                css={{width: '95%'}}
                value={description.value}
                onChange={(e) => description.setValue(e.target.value)}
                helperText={description.message}
                helperColor={description.color}
                color={description.color}
              />
            </Row>
        </Grid>
        <Spacer y={4.5} />
        <Grid xs ={12} sm = {12} alignContent='space-between' alignItems='stretch' direction='row'>
            <Spacer x={40.5} />
            <Button
                disabled={!allowSubmit || isLoading || (!infoChanged) }
                onPress={onSubmit}
                size='lg'
            >
                {!isLoading ? 'Actualizar Poder' : <Loading type='points'/>}
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
      const {data: power} =  await client.query({
          query: GetPowerById,
          variables: {
              powerById: id,
          },
      });

      return {
        props:{
          power
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

export default PowersDetailsPage