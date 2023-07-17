import { Button, Col, Grid, Input, Loading, Row, Spacer, Text, Textarea, useTheme } from '@nextui-org/react';
import { AppLayout } from '@/layouts/AppLayout';
import { useMemo, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { DropdownRegister } from '@/components/dropdown/DropdownRegister';
import { useRouter } from 'next/router';
import { Notification } from '@/notification';
import { useForm } from '@/hooks/useForm';
import { GenericResponse } from '@/models/Information';
import { CreateFight, GetInfoToCreate } from '@/graphql/Fight';
import { Flex } from '@/components/containers';
import { ListGrid } from '@/components/list/ListGrid';

interface DataToCreateResponse {
    places:        GenericResponse[];
    AllCharacters: AllCharacter[];
    objects:       GenericResponse[];
    Powers:        GenericResponse[];
}
Flex
interface AllCharacter {
    id:            string;
    description:   string;
}

interface CharacterPowerAndObject {
    characterId:             string;
    powerAndObjectUsedInput: PowerAndObjectUsedInputElement[]
}

interface PowerAndObjectUsedInputElement {
    powerId:  null | string;
    objectId: null | string;
}
const columns = [
    { label: "Personaje", uid: "description" },
    { label: "Acciones", uid: "actions" },
  ];


const FightsCreatePage= ( ) => {  
    
    const { data, error } = useQuery<DataToCreateResponse>(GetInfoToCreate);
    const [createFight] = useMutation(CreateFight)
    const [place, setPlace] = useState<GenericResponse>({id: '', description: 'Seleccionar Lugar'})
    const [characterToAdd, setCharacterToAdd] = useState<GenericResponse>({id: '', description: 'Seleccionar Personaje'})
    const [characterSelect, setCharacterSelect] = useState<GenericResponse>({id: '', description: 'Seleccionar Personaje'})
    const [powerToAdd, setPowerToAdd] = useState<GenericResponse>({id: '', description: 'Seleccionar Poder'})
    const [objectToAdd, setObjectToAdd] = useState<GenericResponse>({id: '', description: 'Seleccionar Objeto'})
    const [charactersAdded, setCharactersAdded] = useState<CharacterPowerAndObject[]>([])
    const [listPowersAdded, setListPowersAdded] = useState<GenericResponse[]>([])
    const [listObjectsAdded, setListObjectsAdded] = useState<GenericResponse[]>([])
    const { isDark } = useTheme();
    const { replace } = useRouter();
    const [isLoading,setIsLoading] = useState(false);
    const places = useMemo(() => data?.places, [data])
    const characters = useMemo(() => data?.AllCharacters, [data])
    const powers = useMemo(() => data?.Powers, [data])
    const objects = useMemo(() => data?.objects, [data])
    const listCharactersAdded = useMemo(() => {
        return charactersAdded.map((row) => {
            return {
                id : row.characterId,
                description : characters?.find((character) => character.id === row.characterId)?.description || ''
            }
        })
    },[charactersAdded])
    const onChangeList = (id : string) => {

        if (id == '') return  

        const characterAdded = charactersAdded.find((row) => row.characterId === id)
        const listPower : GenericResponse[] = []
        const listObject : GenericResponse[] = []
        characterAdded?.powerAndObjectUsedInput.forEach((row) => {
            if (row.powerId) {
                listPower.push({
                    id : row.powerId,
                    description : powers?.find((power) => power.id === row.powerId)?.description || ''
                })
            }else if (row.objectId) {
                listObject.push({
                    id : row.objectId,
                    description : objects?.find((object) => object.id === row.objectId)?.description || ''
                })
            }

        })
        
        setListPowersAdded(listPower);
        setListObjectsAdded(listObject);

    }

    const onSelect = (id : string) => {

        const character = characters?.find((char) => char.id === id)
        if (!character) return ;
        onChangeList(id);
        setCharacterSelect(character);

    }
    
    const onAddPower = () => {

        const row = listPowersAdded!.find((row) =>(row.id === powerToAdd.id))

        if(row) {
            Notification(isDark).fire({
                title: `Ese poder ya fue agregado en el personaje`,
                icon: 'error',
                timer : 3000
            })
            setPowerToAdd({id: '', description: 'Seleccionar Poder'})
            return ;
        }

        const character = charactersAdded.find((row) => row.characterId === characterSelect.id)
        const newPower = {
            powerId : powerToAdd.id,
            objectId : null
        }
        character?.powerAndObjectUsedInput.push(newPower)
        onChangeList(character?.characterId || '')
        setPowerToAdd({id: '', description: 'Seleccionar Poder'})
    }

    const onAddObject = () => {
        console.log(objectToAdd);
        const row = listObjectsAdded!.find((row) =>(row.id === objectToAdd.id))
        if(row) {
            Notification(isDark).fire({
                title: `Ese objeto ya fue agregado en el personaje`,
                icon: 'error',
                timer : 3000
            })
            setObjectToAdd({id: '', description: 'Seleccionar Objeto'})
            return ;
        }
        const character = charactersAdded.find((row) => row.characterId === characterSelect.id)
        const newObject = {
            powerId : null,
            objectId : objectToAdd.id
        }
        character?.powerAndObjectUsedInput.push(newObject)

        console.log(charactersAdded);
        onChangeList(character?.characterId || '')

        setObjectToAdd({id: '', description: 'Seleccionar Objeto'})
    }


    const onAddCharacter = () => {
        console.log(characterToAdd);
        const row = charactersAdded!.find((row) =>(row.characterId === characterToAdd.id))
        if(row) {
            Notification(isDark).fire({
                title: `Ese personaje ya está en el combate`,
                icon: 'error',
                timer : 3000
            })
            setCharacterToAdd({id: '', description: 'Seleccionar Personaje'})
            return ;
        }

        const newRow : CharacterPowerAndObject  =  {
            characterId : characterToAdd.id,
            powerAndObjectUsedInput : []
        }
        setCharactersAdded([...charactersAdded, newRow])

        setCharacterToAdd({id: '', description: 'Seleccionar Personaje'})
    }

    const onRemoveCharacter = async (id : string) => {
        const newCharactersAdded = charactersAdded.filter(row => (row.characterId !== id))
        setCharacterSelect({id: '', description: 'Seleccionar Personaje'});
        setCharactersAdded(newCharactersAdded)
    } 

    const onRemovePower = async (id : string) => {
        console.log(id)
        const character = charactersAdded!.find((row) =>(row.characterId === characterSelect.id))
        if (!character) return 
        const newPowerAndObjectUsedInput = character.powerAndObjectUsedInput.filter(row => (row.powerId !== id))
        character.powerAndObjectUsedInput = newPowerAndObjectUsedInput;
        setCharactersAdded([...charactersAdded])
        onChangeList(character.characterId)
    } 

    const onRemoveObject = async (id : string) => {
        const character = charactersAdded!.find((row) =>(row.characterId === characterSelect.id))
        if (!character) return 
        const newPowerAndObjectUsedInput = character.powerAndObjectUsedInput.filter(row => (row.objectId !== id))
        character.powerAndObjectUsedInput = newPowerAndObjectUsedInput;
        setCharactersAdded([...charactersAdded])
        onChangeList(character.characterId)
    } 

    console.log(data, error)


    const onSubmit = async () => {




        setIsLoading(true)
        Notification(isDark).fire({
            title: 'Cargando',
            icon: 'info',
        })
        try {
            if(charactersAdded.length === 0) throw Error
            
            const {data} = await createFight({
                variables: {
                    createFightInput: {
                        placeId : place.id,
                        date : dateFight.value,
                        characterPowerAndObjects : charactersAdded
                    }
                },
            });

            Notification(isDark).fire({
                title: `Combate Creado`,
                icon: 'success',
            })
            setIsLoading(false)
            setTimeout(() => replace('/dashboard/fights'),500)
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
            name: 'dateFight',
            validate: (value: string) => value.trim().length >= 3,
            validMessage: 'Fecha del combate válida',
            errorMessage: 'Fecha del combate inválido',
            initialValue:  '',
        },
  ])
  const [dateFight] = parsedFields;
  if(!data ) return <Text>No Hay info pana</Text>
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
          Crear combate: 
        </Text>
      </Flex>

      <Grid.Container gap={4} justify="center" direction="column" css={{width:'100%'}} >
        <Spacer y={2}/>
        <Row>
            <Text h3 css = {{ m : '$10'}}>
                Seleccione el lugar y la fecha del combate
            </Text>                
        </Row>
        <Grid alignContent='space-between' alignItems='center' xs={ 12 } direction="column">
            <Row css={{width:'100%', gap:'$15'}}>
                    <DropdownRegister
                        listkeys={places!}
                        selected={place.description}
                        setValue={setPlace}
                        width={30} 
                        check='Seleccionar Lugar'
                    />
                    <Input 
                        aria-label='Fecha del combate'
                        type="date"
                        value={dateFight.value}
                        onChange={(e) => dateFight.setValue(e.target.value)}
                        helperText={dateFight.message}
                        helperColor={dateFight.color}
                        status={dateFight.color}
                        color={dateFight.color}
                        size='lg'
                        bordered 
                    />
            </Row>

        </Grid>
        <Grid.Container direction='row'>

            {
                (!allowSubmit || place.id === '') ? 
                    <>
                    </>
                :
                    <Grid xs={6} alignContent='space-between' alignItems='center' direction='column' css={{py:'$10' , minWidth : 'max-content'}}>
                        <ListGrid
                            title = 'Personajes'
                            rows={listCharactersAdded!}
                            selected={characterSelect.id}
                            pressable = {true}
                            onDelete={onRemoveCharacter}
                            onSelect={onSelect}
                        
                        />    
                        <DropdownRegister
                            listkeys={characters!}
                            selected={characterToAdd.description}
                            setValue={setCharacterToAdd}
                            width={30} 
                            check='Seleccionar Personaje'
                        />
                        <Button
                            disabled={ characterToAdd.id === '' || isLoading }
                            onPress={onAddCharacter}
                            css={{ width : '30%', m : '6px'}}
                            bordered
                        >
                            Agregar Personaje
                        </Button>
                    </Grid> 
            }

            
            <Grid xs={6} alignContent='space-between' alignItems='center' direction='column' css={{py:'$10' , minWidth : 'max-content'}}>
                <Grid>
                    {
                        characterSelect.id !== '' &&
                        <>
                            
                        <ListGrid
                            title = 'Poderes'
                            rows={listPowersAdded!}
                            selected=''
                            pressable = {false}
                            onDelete={onRemovePower}
                            onSelect={onSelect}
                        
                        />    
                        <DropdownRegister
                            listkeys={powers!}
                            selected={powerToAdd.description}
                            setValue={setPowerToAdd}
                            width={30} 
                            check='Seleccionar Poder'
                        />
                        <Button
                            disabled={ powerToAdd.id === '' || isLoading }
                            onPress={onAddPower}
                            css={{ width : '30%', m : '6px'}}
                            bordered
                        >
                            Agregar Poder
                        </Button>

                        <ListGrid
                            title = 'Objetos'
                            rows={listObjectsAdded!}
                            pressable = {false}
                            selected=''
                            onDelete={onRemoveObject}
                            onSelect={onSelect}
                        
                        />    
                        <DropdownRegister
                            listkeys={objects!}
                            selected={objectToAdd.description}
                            setValue={setObjectToAdd}
                            width={30} 
                            check='Seleccionar Objeto'
                        />
                        <Button
                            disabled={ objectToAdd.id === '' || isLoading }
                            onPress={onAddObject}
                            css={{ width : '30%', m : '6px'}}
                            bordered
                        >
                            Agregar Objeto
                        </Button>
                        
                        </>


                    }
                    
                </Grid>
                    
            </Grid> 
        </Grid.Container>
        <Grid xs ={12} alignContent='space-between' alignItems='stretch' direction='row-reverse' css={{py:'$0'}}>
            <Button
                disabled={ !allowSubmit || place.id === '' ||  charactersAdded.length === 0 || isLoading }
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
export default FightsCreatePage