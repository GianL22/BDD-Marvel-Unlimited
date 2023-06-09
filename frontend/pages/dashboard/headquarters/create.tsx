import { Button, Grid, Input, Loading, Row, Spacer, Text, useTheme } from '@nextui-org/react';
import { Flex } from '../../../components/containers';
import { AppLayout } from '@/layouts/AppLayout';
import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { DropdownRegister } from '@/components/dropdown/DropdownRegister';
import { useRouter } from 'next/router';
import { Notification } from '@/notification';
import { useForm } from '@/hooks/useForm';
import { CreateHeadquarter, GetData } from '@/graphql/Headquarters';
import { GenericResponse } from '@/models/Information';

export interface DataResponse {
    organizations: GenericResponse[];
    buildingTypes: GenericResponse[];
    places:        GenericResponse[];
}

const HeadquartersCreatePage= ( ) => {  
    const {data, error} =  useQuery<DataResponse>(GetData);
    const [organization, setOrganization] = useState({id: '', description: 'Organizaciones'})
    const [ubication, setUbication] = useState({id: '', description: 'Ubicación'})
    const [edificationType, setEdificationType] = useState({id: '', description: 'Tipo Edificación'})
    const { isDark } = useTheme();
    const { replace } = useRouter();
    const [isLoading,setIsLoading] = useState(false);
    const [createHeadquarter] = useMutation(CreateHeadquarter)

    const onSubmit = async () => {
        setIsLoading(true)
        Notification(isDark).fire({
            title: 'Cargando',
            icon: 'info',
        })
        try {
            const {data} = await createHeadquarter({
                variables: {
                    createHeadquarterInput: {
                        name: nameHeadquarter.value,
                        organizationId: organization.id,
                        ubicationId: ubication.id,
                        buildingTypeId: edificationType.id,
                    },
                },
            });
            Notification(isDark).fire({
                title: `Sede: ${data.createHeadquarter.name} creada`,
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
          validMessage: 'Nombre Valido',
          errorMessage: 'Minimo 3 caracteres',
          initialValue: '',
      },
  ])
  const [nameHeadquarter] = parsedFields;
  if(!data ) return <Text>No Hay info pana</Text>
  return (
    <AppLayout 
      title='Creación de Sedes'
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
                <DropdownRegister
                    listkeys={data.organizations!}
                    selected={organization.description}
                    setValue={setOrganization}
                    width={80} 
                    check='Organizaciones'
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
                disabled={!allowSubmit || isLoading || organization.id === '' || ubication.id === '' || edificationType.id === '' }
                onPress={onSubmit}
                size='lg'
            >
                {!isLoading ? 'Crear Sede' : <Loading type='points'/>}
            </Button>
        </Grid>
      </Grid.Container> 
    </AppLayout>
  )
}
export default HeadquartersCreatePage