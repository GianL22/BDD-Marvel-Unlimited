import { Button, Col, Grid, Input, Loading, Row, Spacer, Text, Textarea, useTheme } from '@nextui-org/react';
import { AppLayout } from '@/layouts/AppLayout';
import { useEffect, useMemo, useState } from 'react';
import { ApolloClient, InMemoryCache, useMutation, useQuery } from '@apollo/client';
import { Notification } from '@/notification';
import { GenericResponse } from '@/models/Information';
import { GetFightToUpdate, GetInfoToCreate, RemoveFight } from '@/graphql/Fight';
import { Flex } from '@/components/containers';
import { ListGrid } from '@/components/list/ListGrid';
import { GetServerSideProps, NextPage } from 'next';
import { CharacterPowerAndObject, Fight } from '@/models/Fight';

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

const columns = [
    { label: "Personaje", uid: "description" },
    { label: "Acciones", uid: "actions" },
  ];

interface Props {
    fight : Fight
}


const FightsUpdatePage : NextPage<Props>= ({ fight }) => {  
     

    const { data } = useQuery<DataToCreateResponse>(GetInfoToCreate);
    const [deleteFight] = useMutation(RemoveFight)
    const [characterSelect, setCharacterSelect] = useState<GenericResponse>({id: '', description: 'Seleccionar Personaje'})

    const [charactersAdded, setCharactersAdded] = useState<CharacterPowerAndObject[]>([])
    const [listPowersAdded, setListPowersAdded] = useState<GenericResponse[]>([])
    const [listObjectsAdded, setListObjectsAdded] = useState<GenericResponse[]>([])

    const { isDark } = useTheme();

    const characters = useMemo(() => data?.AllCharacters, [data])
    const powers = useMemo(() => data?.Powers, [data])
    const objects = useMemo(() => data?.objects, [data])

    useEffect(() => {
        setCharactersAdded(fight.characterPowerAndObjects)
    }, [])
    

    const listCharactersAdded = useMemo(() => {
        return charactersAdded.map((row) => {
            return {
                id : row.character.id,
                description : row.character.description
            }
        })
    },[charactersAdded])
 
    const onChangeList = (id : string) => {

        if (id == '') return  

        const characterAdded = charactersAdded.find((row) => row.character.id === id)
        const listPower : GenericResponse[] = []
        const listObject : GenericResponse[] = []
        characterAdded?.powerAndObjectUsedInput.forEach((row) => {
            if (row.power?.id) {
                listPower.push({
                    id : row.power?.id,
                    description : powers?.find((power) => power.id === row.power?.id)?.description || ''
                })
            }else if (row.object?.id) {
                listObject.push({
                    id : row.object?.id,
                    description : objects?.find((object) => object.id === row.object?.id)?.description || ''
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

    const onRemoveCharacter = async (id : string) => {
        Notification(isDark).fire({
            title: 'Cargando',
            icon: 'info',
        })
        try {
            await deleteFight({
                variables: {
                    removeFightInput : {
                        date : fight.date,
                        placeId : fight.place.id,
                        characterId : id,
                    }
                }
            })
            Notification(isDark).fire({
                title: 'Personaje eliminado exitosamente',
                icon: 'success',
                timer: 3000
            })
            const newCharactersAdded = charactersAdded.filter(row => (row.character.id !== id))
            setCharacterSelect({id: '', description: 'Seleccionar Personaje'});
            setCharactersAdded(newCharactersAdded)
        } catch (error: any) {
            Notification(isDark).fire({
                title: error.message,
                icon: 'error',
                timer: 3000
            })
        }

    } 

    const onRemovePower = async (id : string) => {

        Notification(isDark).fire({
          title: 'Cargando',
          icon: 'info',
        })
        try {
          await deleteFight({
            variables: {
    
              removeFightInput : {
                date : fight.date,
                placeId : fight.place.id,
                characterId : characterSelect.id,
                powerId : id,
              }
    
            }
          })
          Notification(isDark).fire({
            title: 'Poder eliminado exitosamente',
            icon: 'success',
            timer: 3000
          })
          
          const characterWithPower = charactersAdded!.find((row) =>(row.character.id === characterSelect.id))
          if (!characterWithPower) return 
          const newPowerAndObjectUsedInput = characterWithPower.powerAndObjectUsedInput.filter(row => (row.power?.id !== id))
          characterWithPower.powerAndObjectUsedInput = newPowerAndObjectUsedInput;
          setCharactersAdded([...charactersAdded])
          onChangeList(characterWithPower.character.id)

        } catch (error: any) {
          Notification(isDark).fire({
            title: error.message,
            icon: 'error',
            timer: 3000
          })
        }


    } 

    const onRemoveObject = async (id : string) => {
        Notification(isDark).fire({
            title: 'Cargando',
            icon: 'info',
        })
        try {
            await deleteFight({
                variables: {
                    removeFightInput : {
                        date : fight.date,
                        placeId : fight.place.id,
                        characterId : characterSelect.id,
                        objectId : id,
                    }
                }
            })
            Notification(isDark).fire({
                title: 'Objeto eliminado exitosamente',
                icon: 'success',
                timer: 3000
            })
            const characterWithObject = charactersAdded!.find((row) =>(row.character.id === characterSelect.id))
            if (!characterWithObject) return 
            const newPowerAndObjectUsedInput = characterWithObject.powerAndObjectUsedInput.filter(row => (row.object?.id !== id))
            characterWithObject.powerAndObjectUsedInput = newPowerAndObjectUsedInput;
            setCharactersAdded([...charactersAdded])
            onChangeList(characterWithObject.character.id)
        } catch (error: any) {
        Notification(isDark).fire({
            title: error.message,
            icon: 'error',
            timer: 3000
        })
        }

    } 

    console.log(charactersAdded)
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
            Combate
        </Text>
      </Flex>

      <Grid.Container gap={4} justify="center" direction="column" css={{width:'100%'}} >
        <Spacer y={2}/>
        <Grid alignContent='space-between' alignItems='flex-start' xs={ 12 } direction="column">
            <Text h3> Lugar: {fight.place.description} </Text>
            <Text h3> Fecha: {`${fight.date}`} </Text>
        </Grid>
        <Grid.Container direction='row'>

                    <Grid xs={6} alignContent='space-between' alignItems='center' direction='column' css={{py:'$10' , minWidth : 'max-content'}}>
                        <ListGrid
                            title='Personajes'
                            rows={listCharactersAdded!}
                            selected={characterSelect.id}
                            pressable = {true}
                            onDelete={onRemoveCharacter}
                            onSelect={onSelect}
                        
                        />    
                        {/* <DropdownRegister
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
                        </Button> */}
                    </Grid> 

            
            <Grid xs={6} alignContent='space-between' alignItems='center' direction='column' css={{py:'$10' , minWidth : 'max-content'}}>
                <Grid>
                    {
                        (characterSelect.id !== '' ) &&
                        <>
                            
                        <ListGrid
                            title='Poderes'
                            rows={listPowersAdded!}
                            selected=''
                            pressable = {false}
                            onDelete={onRemovePower}
                            onSelect={onSelect}
                        
                        />    
                        {/* <DropdownRegister
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
                        </Button> */}
                        <Spacer y={2}/>
                        <ListGrid
                            title='Objetos'
                            rows={listObjectsAdded!}
                            pressable = {false}
                            selected=''
                            onDelete={onRemoveObject}
                            onSelect={onSelect}
                        
                        />    
                        {/* <DropdownRegister
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
                         */}
                        </>


                    }
                    
                </Grid>
                    
            </Grid> 
        </Grid.Container>
      </Grid.Container> 
    </AppLayout>
  )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { id = '' } = ctx.params as { id: string };
    const client = new ApolloClient({
      uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
      cache: new InMemoryCache(),
    });
  
    try {

      const [date, placeId] = id.split('&')  

      const { data: fight } = await client.query({
        query: GetFightToUpdate,
        variables: {
            placeId,
            date,
        },
      });
      
      return {
        props: {
            fight : fight.fightsByPlaceAndDate
        }
      }
  
    } catch (error) {
      return {
        redirect: {
          destination: '/404',
          permanent: false
        }
      }
    }
  }


export default FightsUpdatePage