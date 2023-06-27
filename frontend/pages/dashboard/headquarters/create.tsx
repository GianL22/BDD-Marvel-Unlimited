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

const HeadquartersCreatePage= ( ) => {  
    const {data, error} =  useQuery<DataResponse>(GetCharactersNamesAndId);
    const [organization, setOrganization] = useState({id: '', description: 'Organizaciones'})
    const [ubication, setUbication] = useState({id: '', description: 'Ubicación'})
    const [edificationType, setEdificationType] = useState({id: '', description: 'Tipo Edificación'})
    const { isDark } = useTheme();
    const { replace } = useRouter();
    const [isLoading,setIsLoading] = useState(false);
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
            // await createObject({
            //     variables: {
            //         createObjectInput: {
            //             name: name.value,
            //         },
            //     },
            // });
            Notification(isDark).fire({
                title: 'Objecto creado',
                icon: 'success',
            })
            setIsLoading(false)
            setTimeout(() => replace('/dashboard/objects'),500)
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
                    listkeys={characters!}
                    selected={organization.description}
                    setValue={setOrganization}
                    width={80} 
                    check='Organizaciones'
                />
            </Row>
        </Grid>
        <Grid xs={12} alignContent='space-between' alignItems='center' direction='column'>
            <Row css={{width:'100%', gap:'$15'}}>
                <DropdownRegister
                    listkeys={characters!}
                    selected={ubication.description}
                    setValue={setUbication}
                    width={80} 
                    check='Ubicación'
                />
                <DropdownRegister
                    listkeys={characters!}
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