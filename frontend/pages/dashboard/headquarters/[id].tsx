import { Button, Grid, Input, Loading, Row, Spacer, Text, useTheme } from '@nextui-org/react';
import { Flex } from '../../../components/containers';
import { AppLayout } from '@/layouts/AppLayout';
import { useMemo, useState } from 'react';
import { ApolloClient, InMemoryCache, useMutation, useQuery } from '@apollo/client';
import { DropdownRegister } from '@/components/dropdown/DropdownRegister';
import { useRouter } from 'next/router';
import { Notification } from '@/notification';
import { useForm } from '@/hooks/useForm';
import { GetData, GetHeadquarterById, UpdateHeadquarters } from '@/graphql/Headquarters';
import { GenericResponse } from '@/models/Information';
import { GetServerSideProps, NextPage } from 'next';
import { Headquarter } from '@/models/Headquarters';

export interface DataResponse {
    organizations: GenericResponse[];
    buildingTypes: GenericResponse[];
    places:        GenericResponse[];
}

interface Props{
    headquarter: Headquarter;
}

const HeadquarterDetailsPage: NextPage<Props>= ( {headquarter} ) => {  
    const {data, error} =  useQuery<DataResponse>(GetData);
    const [ubication, setUbication] = useState(headquarter.headquarter.ubication)
    const [edificationType, setEdificationType] = useState(headquarter.headquarter.buildingType)
    const { isDark } = useTheme();
    const { replace } = useRouter();
    const [isLoading,setIsLoading] = useState(false);
    const [updateHeadquarter] = useMutation(UpdateHeadquarters)

    const onSubmit = async () => {
        setIsLoading(true)
        Notification(isDark).fire({
            title: 'Cargando',
            icon: 'info',
        })
        try {
            const {data} = await updateHeadquarter({
                variables: {
                  updateHeadquarterInput: {
                        id: headquarter.headquarter.id,
                        organizationId: headquarter.headquarter.organization.id,
                        name: nameHeadquarter.value,
                        ubicationId: ubication.id,
                        buildingTypeId: edificationType.id
                    },
                },
            });
            Notification(isDark).fire({
                title: `Sede: ${data.updateHeadquarter.name} actualizada`,
                icon: 'success',
            })
            setIsLoading(false)
            setTimeout(() => replace('/dashboard/headquarters'),500)
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
          name: 'nameHeadquarter',
          validate: (value: string) => value.trim().length >= 3,
          validMessage: 'Nombre de Sede Valido',
          errorMessage: 'Minimo 3 caracteres',
          initialValue: headquarter.headquarter.name,
      },
  ])
  const [nameHeadquarter] = parsedFields;
  const infoChanged = useMemo(() => {
    return nameHeadquarter.value !== headquarter.headquarter.name ||
    ubication.id !== headquarter.headquarter.ubication.id || edificationType.id !== headquarter.headquarter.buildingType.id
    }, [nameHeadquarter.value,ubication.id,edificationType.id,headquarter])
  if(!data ) return <Text>No Hay info pana</Text>
  return (
    <AppLayout 
      title='Detalle de Sede'
      description='Pagina administrativa de Marvel United'
    >
      <Flex
        css={{'mt': '$5', 'px': '$6','@sm': {mt: '$10',px: '$16',}}}
        justify='between'
        align='center'
      >
        <Text h1>
          Crear Sedes: 
        </Text>
      </Flex>

      <Grid.Container gap={4} justify="center" direction="column" css={{width:'100%'}} >
        <Spacer y={2}/>
        <Grid xs={ 12 } alignContent='space-between' alignItems='center' direction="column">
            <Row css={{width:'100%', gap:'$15'}}>
                <Input
                    bordered
                    labelPlaceholder="Nombre Sede"
                    css={{width:'81%'}}
                    value={nameHeadquarter.value}
                    onChange={(e) => nameHeadquarter.setValue(e.target.value)}
                    helperText={nameHeadquarter.message}
                    helperColor={nameHeadquarter.color}
                    status={nameHeadquarter.color}
                    color={nameHeadquarter.color}
                />
                <Input
                    bordered
                    labelPlaceholder="Nombre Organización"
                    readOnly
                    css={{width:'81%'}}
                    value={ headquarter.headquarter.organization.description }
                    helperColor={'success'}
                    status={'success'}
                    color={'success'}
                />
            </Row>
        </Grid>
        <Grid xs={12} alignContent='space-between' alignItems='center' direction='column'>
            <Row css={{width:'100%', gap:'$15', py:'$20'}}>
                <DropdownRegister
                    listkeys={data.places!}
                    selected={ubication.description}
                    setValue={setUbication}
                    width={80} 
                    check='Ubicación'
                />
                <DropdownRegister
                    listkeys={data.buildingTypes!}
                    selected={edificationType.description}
                    setValue={setEdificationType}
                    width={80} 
                    check='Tipo Edificación'
                />
            </Row>
        </Grid>
        <Grid xs ={12} alignContent='space-between' alignItems='stretch' direction='row-reverse' css={{py:'$20'}}>
            <Button
                disabled={!allowSubmit || isLoading || (!infoChanged)  }
                onPress={onSubmit}
                size='lg'
            >
                {!isLoading ? 'Actualizar Sede' : <Loading type='points'/>}
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

    const {data: headquarter} =  await client.query({
        query: GetHeadquarterById,
        variables: {
            headquarterId: id,
        },
    });
    
    if (  !headquarter) {
      return{
        redirect: {
          destination: '/404',
          permanent: false
        }
      }
    }

    return {
      props: {
        headquarter,
      }
    }
  }
export default HeadquarterDetailsPage