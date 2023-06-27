import { Button, Col, Grid, Input, Loading, Row, Spacer, Text, Textarea, useTheme } from '@nextui-org/react';
import { Flex } from '../../../components/containers';
import { AppLayout } from '@/layouts/AppLayout';
import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { DropdownRegister } from '@/components/dropdown/DropdownRegister';
import { useRouter } from 'next/router';
import { Notification } from '@/notification';
import { useForm } from '@/hooks/useForm';
import { DataResponse } from '@/models/Character';
import { GetCharactersNamesAndId } from '@/graphql/Character';
import { convertCharacters } from '@/helpers/transformData';
import { GetAllPlaces } from '@/graphql/Places';
import { GenericResponse } from '@/models/Information';
import { CreateOrganization } from '@/graphql/Organizations';

interface PlaceResponse{
    places: GenericResponse[];
}

const OrganizationsCreatePage= ( ) => {  
    const {data, error} =  useQuery<DataResponse>(GetCharactersNamesAndId);
    const {data: placesData} = useQuery<PlaceResponse>(GetAllPlaces);
    const [leader, setLeader] = useState({id: '', description: 'Líder'})
    const [founder, setFounder] = useState({id: '', description: 'Fundador'})
    const [placeCreation, setPlaceCreation] = useState({id: '', description: 'Lugar creación'})
    const { isDark } = useTheme();
    const { replace } = useRouter();
    const [isLoading,setIsLoading] = useState(false);
    const [createOrganization] = useMutation(CreateOrganization)
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
            const {data} = await createOrganization({
                variables: {
                    createOrganizationInput: {
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
                title: `Organización: ${data.createOrganization.name} creada`,
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
          initialValue: '',
      },
      {
          name: 'slogan',
          validate: (value: string) => value.trim().length >= 3,
          validMessage: 'Eslogan valido',
          errorMessage: 'Minimo 3 caracteres',
          initialValue: '',
      },
      {
        name: 'objective',
        validate: (value: string) => value.trim().length >= 10,
        validMessage: 'Objectivo valido',
        errorMessage: 'Minimo 10 caracteres',
        initialValue: '',
    },
    {
        name: 'firstApparition',
        validate: (value: string) => value.trim().length >= 3,
        validMessage: 'Comic valido',
        errorMessage: 'Minimo 3 caracteres',
        initialValue: '',
    },
  ])
  const [name,slogan, objective,firstApparition ] = parsedFields;
  if(!data || !placesData ) return <Text>No Hay info pana</Text>
  return (
    <AppLayout 
      title='Creación de Organizaciones'
      description='Pagina administrativa de Marvel United'
    >
      <Flex
        css={{'mt': '$5', 'px': '$6','@sm': {mt: '$10',px: '$16',}}}
        justify='between'
        align='center'
      >
        <Text h1>
          Crear Organizaciones: 
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
            <Row css={{py:'$5', margin:'$18'}}>
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
        <Spacer y={7} />
        <Grid xs={12} alignContent='space-between' alignItems='center' direction='column-reverse' css={{py:'$10'}}>
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
                disabled={!allowSubmit || isLoading || leader.id === '' || founder.id === '' || placeCreation.id === '' }
                onPress={onSubmit}
                size='lg'
            >
                {!isLoading ? 'Crear Organización' : <Loading type='points'/>}
            </Button>
        </Grid>
      </Grid.Container> 
    </AppLayout>
  )
}
export default OrganizationsCreatePage