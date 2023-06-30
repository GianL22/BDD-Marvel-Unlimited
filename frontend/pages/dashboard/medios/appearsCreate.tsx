import { Button, Col, Grid, Input, Loading, Row, Spacer, Text, Textarea, useTheme } from '@nextui-org/react';
import { Flex } from '../../../components/containers';
import { AppLayout } from '@/layouts/AppLayout';
import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { DropdownRegister } from '@/components/dropdown/DropdownRegister';
import { useRouter } from 'next/router';
import { Notification } from '@/notification';
import { useForm } from '@/hooks/useForm';
import { GenericResponse } from '@/models/Information';
import { GetAllOrganizationsNameAndId } from '@/graphql/Organizations';
import { TableWrapper } from '@/components/table';
import { SimpleCellReducer } from '@/components/table/cell-reducers/SimpleCellReducer';
import { CreateAppears, CreateParticipates, GetAllMediosTitlesIds } from '@/graphql/Medio';
import { RadioRegister } from '@/components/radio/RadioRegister';
import { GetCharactersNamesAndId } from '@/graphql/Character';
import { GetAllActors } from '@/graphql/Persons';
import { convertCharacters } from '@/helpers/transformData';
import { DataResponse } from '@/models/Character';

interface MediaResponse{
    mediosTitleAndIds: GenericResponse[];
}

interface CharacterMedio {
    character : GenericResponse,
    actor : GenericResponse,
    rolActor: string,
    rolCharacter: string
}



interface DataJobPosition {
    jobPositions: JobPosition[];
}

interface DataOrganization {
    organizations : GenericResponse[]
}

interface Actor {
    id:   string;
    name : string;
    lastName: string;
}

interface DataActors {
    persons : {
        actors : Actor[]
    }
}

interface DataCharacters {
    characters : GenericResponse[]
}

interface JobPosition {
    id:   string;
    description: string;
}

const columns = [
    { label: "Personaje", uid: "characterName" },
    { label: "Actor", uid: "actorName" },
    { label: "Rol Actor", uid: "actorRol" },
    { label: "Rol Personaje", uid: "characterRol" },
    { label: "Acciones", uid: "actions" },
  ];

const actorRols = ['Interpretado', 'Voz']
const characterRols = ['Antagonista', 'Protagonista', 'Secundario']


const AppearsCreatePage= ( ) => {  
    
    const {data: mediosData} = useQuery<MediaResponse>(GetAllMediosTitlesIds);
    const {data: organizationsData} = useQuery<DataOrganization>(GetAllOrganizationsNameAndId);
    const {data: actorsData} = useQuery<DataActors>(GetAllActors);
    const {data: charactersData, error} =  useQuery<DataResponse>(GetCharactersNamesAndId);
    const [createAppears] = useMutation(CreateAppears)
    const [charactersInMedio, setCharactersInMedio] = useState<CharacterMedio[]>([]);
    const [medio, setMedio] = useState({id: '', description: 'Seleccionar Medio'})
    const [characterRol, setCharacterRol] = useState('Protagonista')
    const [actorRol, setActorRol] = useState('Interpretado')
    const [toAddOrgnization, setToAddOrgnization] = useState({id: '', description: 'Agregar Organización'})
    const [toAddActor, setToAddActor] = useState({id: '', description: 'Agregar Actor'})
    const [toAddCharacter, setToAddCharacter] = useState({id: '', description: 'Agregar Personaje'})
    const { isDark } = useTheme();
    const { replace } = useRouter();
    const [isLoading,setIsLoading] = useState(false);
    const medios = useMemo(() => mediosData?.mediosTitleAndIds, [mediosData])
    const organizations = useMemo(() => organizationsData?.organizations, [organizationsData])
    const actors = useMemo(() => { 
        return actorsData?.persons.actors.map( actor => {
            return {
                id : actor.id,
                description : actor.name + ' ' + actor.lastName
            }
        })

    }, [actorsData])
    const characters = useMemo(() => convertCharacters(charactersData!), [charactersData])
    const charactersInMedioShow = useMemo(() => {
        return charactersInMedio.map(row => {
            return {
                id : row.character.id + '/' +row.actor.id,
                characterName : row.character.description,
                actorName : row.actor.description,
                actorRol : row.rolActor,
                characterRol : row.rolCharacter,

            }
        })
    }, [charactersInMedio])


    useEffect(() => {
        setCharactersInMedio([])
        setToAddOrgnization({id: '', description: 'Agregar Organización'})
        status.setValue('')
    }, [medio])
    
    const onRemoveCharacter = async (id : string) => {
        const newCharactersInMedio = charactersInMedio.filter(row => (row.character.id !== id.split('/')[0] || row.actor.id !== id.split('/')[1]))
        // console.log(newCharactersInMedio)
        setCharactersInMedio(newCharactersInMedio)
    } 

    const onAddChacracter = () => {

        const row = charactersInMedio!.find((row) =>
                (row.character.id === toAddCharacter.id) && 
                (row.actor.id === toAddActor.id)
            )
        if(row) {
            Notification(isDark).fire({
                title: `Ese personaje ya está en el medio`,
                icon: 'error',
                timer : 3000
            })
            return ;
        }

        const newRow  =  {
            id : toAddActor.id + toAddCharacter.id,
            character: toAddCharacter,
            actor: toAddActor,
            rolCharacter: characterRol,
            rolActor: actorRol
        }
        setCharactersInMedio([...charactersInMedio, newRow])

        setToAddActor({id: '', description: 'Agregar Actor'})
        setToAddCharacter({id: '', description: 'Agregar Personaje'})
    }

    const onSubmit = async () => {
        setIsLoading(true)
        Notification(isDark).fire({
            title: 'Cargando',
            icon: 'info',
        })
        try {
            if(charactersInMedio.length === 0) throw Error
            const appears = charactersInMedio.map((row)=>({
                characterId: row.character.id,
                actorId: row.actor.id,
                rolCharacter: row.rolCharacter,
                rolActor: row.rolActor
            }))
            const {data} = await createAppears({
                variables: {
                    createAppearsInput: {
                        medioId : medio.id,
                        appears: appears,
                    }
                },
            });
            Notification(isDark).fire({
                title: `Relacion lista`,
                icon: 'success',
            })
            setIsLoading(false)
            setTimeout(() => replace('/dashboard/medios'),500)
        } catch (error: any) {
            // console.log(error)
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
          name: 'status',
          validate: (value: string) => value.trim().length >= 3,
          validMessage: 'Status Valido',
          errorMessage: 'Minimo 3 caracteres',
          initialValue: '',
      },
  ])
  const [status] = parsedFields;
  if(!mediosData ) return <Text>No Hay info pana</Text>
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
          Agregar Personajes a Medios: 
        </Text>
      </Flex>

      <Grid.Container gap={4} justify="center" direction="column" css={{width:'100%'}} >
        <Spacer y={2}/>
        <Row>
            <Text h3 css = {{ m : '$10'}}>
                Elija un medio
            </Text>                
        </Row>
        <Grid alignContent='space-between' alignItems='center' xs={ 12 } direction="column">
            <Row css={{width:'100%', gap:'$15'}}>
                    <DropdownRegister
                        listkeys={medios!}
                        selected={medio.description}
                        setValue={setMedio}
                        width={100} 
                        check='Seleccionar Medio'
                    />
            </Row>
        </Grid>

        <Grid xs={12} alignContent='space-between' alignItems='center' direction='column-reverse' css={{py:'$10'}}>
            <Row gap={1}>
                <Grid.Container direction='row'>
                    {
                        medio.id !== '' && 
                        <>
                            <Grid css={{margin:'$8', minWidth:'50%', maxWidth:'600px', display: 'inline-grid'}}>
                                <TableWrapper 
                                    columns={columns} 
                                    rows={charactersInMedioShow!}
                                    cellReducer={SimpleCellReducer}
                                    onDelete={onRemoveCharacter}
                                />
                            </Grid>
                            <Grid xs = {6} direction='column'>
                                <Spacer y={2} />
                                <DropdownRegister
                                    listkeys={actors!}
                                    selected={toAddActor.description}
                                    setValue={setToAddActor}
                                    width={100} 
                                    check='Agregar Actor'
                                />
                                <Spacer y={2} />
                                <DropdownRegister
                                    listkeys={characters!}
                                    selected={toAddCharacter.description}
                                    setValue={setToAddCharacter}
                                    width={100} 
                                    check='Agregar Personaje'
                                />
                                <Spacer y={2} />
                                <RadioRegister 
                                    label='Rol del personaje'
                                    listValue={characterRols}
                                    onSelectKey={setCharacterRol}
                                    valueRadio={characterRol}
                                    size='md'
                                />
                                <Spacer y={2} />
                                <RadioRegister 
                                    label='Rol del actor'
                                    listValue={actorRols}
                                    onSelectKey={setActorRol}
                                    valueRadio={actorRol}
                                    size='md'
                                />
                                <Spacer y={2} />                                        
                                <Button
                                    disabled={ isLoading || toAddActor.id === ''|| toAddCharacter.id === ''}
                                    onPress={onAddChacracter}
                                    size='lg'
                                >
                                    Añadir Personaje
                                </Button>
                            </Grid>
                            
                        </>
                    }

                </Grid.Container>
            </Row>
            <Row>
                <Text h3>
                    Personajes en el Medio
                </Text>                
            </Row>
        </Grid>
        <Grid xs ={12} alignContent='space-between' alignItems='stretch' direction='row-reverse' css={{py:'$0'}}>
            <Button
                disabled={ charactersInMedioShow.length === 0 || isLoading }
                onPress={onSubmit}
                size='lg'
            >
                {!isLoading ? 'Guardar' : <Loading type='points'/>}
            </Button>
        </Grid>
      </Grid.Container> 
    </AppLayout>
  )
}
export default AppearsCreatePage