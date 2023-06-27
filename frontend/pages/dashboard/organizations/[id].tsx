import { Button, Card, Col, Divider, Grid, Input, Loading, Row, Spacer, Text, Textarea, useTheme } from '@nextui-org/react';
import { Flex } from '../../../components/containers';
import { AppLayout } from '@/layouts/AppLayout';
import { useEffect, useMemo, useState } from 'react';
import { ApolloClient, InMemoryCache, useMutation, useQuery } from '@apollo/client';
import { DropdownRegister } from '@/components/dropdown/DropdownRegister';
import { useRouter } from 'next/router';
import { Notification } from '@/notification';
import { useForm } from '@/hooks/useForm';
import { DataResponse } from '@/models/Character';
import { GetCharactersNamesAndId } from '@/graphql/Character';
import { convertCharacters } from '@/helpers/transformData';
import { GetAllPlaces } from '@/graphql/Places';
import { GenericResponse } from '@/models/Information';
import { CreateOrganization, GetOrganizationById, UpdateOrganization } from '@/graphql/Organizations';
import { GetServerSideProps, NextPage } from 'next';
import { OrganizationResponse } from '@/models/Organization';

interface PlaceResponse{
  places: GenericResponse[];
}

interface Props{
  organization: OrganizationResponse
}

const OrganizationsDetailPage: NextPage<Props>= ( {organization} ) => {  
    const {data, error} =  useQuery<DataResponse>(GetCharactersNamesAndId);
    const {data: placesData} = useQuery<PlaceResponse>(GetAllPlaces);
    const [leader, setLeader] = useState({id: organization.organization.leader.id, description: organization.organization.leaderName})
    const [founder, setFounder] = useState({id: organization.organization.founder.id, description: organization.organization.founderName})
    const [placeCreation, setPlaceCreation] = useState(organization.organization.creationPlace)
    const { isDark } = useTheme();
    const { replace } = useRouter();
    const [isLoading,setIsLoading] = useState(false);
    const [updateOrganization] = useMutation(UpdateOrganization)
    let characters = useMemo(() => convertCharacters(data!), [data])

    useEffect(() => {
        characters = convertCharacters(data!)
    }, [data])
    
    const onSubmit = async () => {
        setIsLoading(true)
        Notification(isDark).fire({
            title: 'Cargando',
            icon: 'info',
        })
        try {
            const {data} = await updateOrganization({
              variables: {
                updateOrganizationInput: {
                  id: organization.organization.id,
                  name: name.value,
                  slogan: slogan.value,
                  firstApparition: firstApparition.value,
                  objetive: objective.value,
                  founderId: founder.id,
                  leaderId: leader.id,
                  placeId: placeCreation.id
                },
              },
            });
            Notification(isDark).fire({
                title: `Organización: ${data.updateOrganization.name} actualizada`,
                icon: 'success',
            })
            setIsLoading(false)
            setTimeout(() => replace('/dashboard/organizations'),500)
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
          validMessage: 'Nombre Valido',
          errorMessage: 'Minimo 3 caracteres',
          initialValue: organization.organization.name,
      },
      {
          name: 'slogan',
          validate: (value: string) => value.trim().length >= 3,
          validMessage: 'Eslogan valido',
          errorMessage: 'Minimo 3 caracteres',
          initialValue: organization.organization.slogan,
      },
      {
        name: 'objective',
        validate: (value: string) => value.trim().length >= 10,
        validMessage: 'Objectivo valido',
        errorMessage: 'Minimo 10 caracteres',
        initialValue: organization.organization.objetive,
    },
    {
        name: 'firstApparition',
        validate: (value: string) => value.trim().length >= 3,
        validMessage: 'Comic valido',
        errorMessage: 'Minimo 3 caracteres',
        initialValue: organization.organization.firstApparition,
    },
  ])
  const [name,slogan, objective,firstApparition ] = parsedFields;
  const infoChanged = useMemo(() => {
    return name.value !== organization.organization.name ||slogan.value !== organization.organization.slogan 
    || objective.value !== organization.organization.objetive || firstApparition.value !== organization.organization.firstApparition 
    || founder.id !== organization.organization.founder.id || leader.id !== organization.organization.leader.id || placeCreation.id !== organization.organization.creationPlace.id
    }, [name.value,slogan.value,objective.value, firstApparition.value, founder.id,leader.id,placeCreation.id, organization])
  if(!data || !placesData ) return <Text>No Hay info pana</Text>
  return (
    <AppLayout 
      title='Actualizar Organización'
      description='Pagina administrativa de Marvel United'
    >
      <Flex
        css={{'mt': '$5', 'px': '$6','@sm': {mt: '$10',px: '$16',}}}
        justify='between'
        align='center'
      >
        <Text h1>
          Actualizar Organizacion: 
        </Text>
      </Flex>

      <Grid.Container gap={4} justify="center" direction="column" css={{width:'100%'}} >
        <Spacer y={2}/>
        <Grid alignContent='space-between' alignItems='center' xs={ 12 } direction="column">
            <Row css={{width:'100%', gap:'$15'}}>
                <Input
                    bordered
                    labelPlaceholder="Nombre Organización"
                    css={{width:'100%'}}
                    value={name.value}
                    onChange={(e) => name.setValue(e.target.value)}
                    helperText={name.message}
                    helperColor={name.color}
                    status={name.color}
                    color={name.color}
                />
                <Input
                    bordered
                    labelPlaceholder="Eslogan"
                    css={{width:'100%'}}
                    value={slogan.value}
                    onChange={(e) => slogan.setValue(e.target.value)}
                    helperText={slogan.message}
                    helperColor={slogan.color}
                    status={slogan.color}
                    color={slogan.color}
                />
                <Input
                    bordered
                    labelPlaceholder="Primera Aparición"
                    css={{width:'100%'}}
                    value={firstApparition.value}
                    onChange={(e) => firstApparition.setValue(e.target.value)}
                    helperText={firstApparition.message}
                    helperColor={firstApparition.color}
                    status={firstApparition.color}
                    color={firstApparition.color}
                />
            </Row>
            <Spacer y={3.5} />
            <Row css={{py:'$0', margin:'$0'}}>
                <Textarea 
                    labelPlaceholder="Objetivo de la Organización" 
                    status= {objective.color}  
                    css={{width: '100%'}}
                    value={objective.value}
                    onChange={(e) => objective.setValue(e.target.value)}
                    helperText={objective.message}
                    helperColor={objective.color}
                    color={objective.color}
                />
            </Row>
        </Grid>
        <Grid xs={12} alignContent='space-between' alignItems='center' direction='column'>
          <Card>
            <Card.Header css={{margin:'$0', py:'$0'}}>
              <Text h3>Sedes</Text>
            </Card.Header>
            <Divider />
            <Card.Body>
              {
                (organization.organization.headquarter.length === 0)
                  ? <Text h2> Aun no se ha asociado ninguna sede</Text>
                  : 
                  organization.organization.headquarter.map((headquarter, i)=>(
                    <Row>
                      <Col>
                          <Text> {i+1}  </Text>
                      </Col>
                      <Col>
                          <Text> {headquarter.name}  </Text>
                      </Col>
                      <Col>
                          <Text>  {headquarter.ubication.name} </Text>
                      </Col>
                      <Col>
                          <Text> {(headquarter.buildingType.description)}   </Text>
                      </Col>
                    </Row>
                  ))
              }
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={12} alignContent='space-between' alignItems='center' direction='column'>
            <Row gap={1}>
                <Col>
                    <DropdownRegister
                        listkeys={characters!}
                        selected={leader.description}
                        setValue={setLeader}
                        width={100} 
                        check='Líder'
                    />
                </Col>
                <Col>
                    <DropdownRegister
                        listkeys={characters!}
                        selected={founder.description}
                        setValue={setFounder}
                        width={100} 
                        check='Fundador'
                    />
                </Col>
                <Col>
                    <DropdownRegister
                        listkeys={placesData.places!}
                        selected={placeCreation.description}
                        setValue={setPlaceCreation}
                        width={100} 
                        check='Lugar creación'
                    />
                </Col>
            </Row>
        </Grid>
        <Grid xs ={12} alignContent='space-between' alignItems='stretch' direction='row-reverse' css={{py:'$0'}}>
            <Button
                disabled={!allowSubmit || isLoading || (!infoChanged)}
                onPress={onSubmit}
                size='lg'
            >
                {!isLoading ? 'Actualizar Organización' : <Loading type='points'/>}
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
    const {data: organization} =  await client.query({
        query: GetOrganizationById,
        variables: {
          organizationId: id,
        },
    });

    return {
      props:{
        organization,
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

export default OrganizationsDetailPage