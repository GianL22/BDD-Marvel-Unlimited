import { useMemo } from 'react';
import type { NextPage } from 'next'
import { Grid, Link, Loading, Text, useTheme } from '@nextui-org/react';
import { TableWrapper } from '../../../components/table';
import { AppLayout } from '@/layouts/AppLayout';
import { useMutation, useQuery } from '@apollo/client';
import { Notification } from '@/notification';
import { Flex } from '@/components/containers';
import { GetAllCharacters, RemoveCharacter } from '@/graphql/Character';
import { CharactersCellReducer } from '@/components/table/cell-reducers/CharactersCellReducer';

const columns = [
  { label: "Nombre", uid: "name" },
  { label: "Apellido", uid: "lastName" },
  { label: "Genero", uid: "gender" },
  { label: "Estado Marital", uid: "maritialStatus" },
  { label: "Primera Aparición", uid: "firstApparition" },
  { label: "Tipo", uid: "type" },
  { label: "Acciones", uid: "actions" },
];

export interface ResponseData {
  findCharacters: FindCharacters;
}

interface FindCharacters {
  hero:    Characters[];
  villain: Characters[];
  civil:   Characters[];
}

interface Characters {
  character:       Character;
  name:            string;
  lastName:        string;
  gender:          string;
  maritialStatus:  string;
  firstApparition: string;
}

interface Character {
  id: string;
}

const CharactersPage: NextPage = () => {
  const { isDark } = useTheme()
  const { data , error} = useQuery<ResponseData>(GetAllCharacters,{
    pollInterval: 1000
  })

  let characters: Characters[] = [];
  data?.findCharacters.hero.forEach(hero => {
    const character = {
      ...hero,
      id: hero.character.id,
      type: "heroe"
    };
    characters.push(character);
  });

  data?.findCharacters.villain.forEach(villain => {
    const character = {
      ...villain,
      id: villain.character.id,
      type: "villano"
    };
    characters.push(character);
  });
  
  data?.findCharacters.civil.forEach(civil => {
    const character = {
      ...civil,
      id: civil.character.id,
      type: "civil"
    };
    characters.push(character);
  });

  const [deleteCharacterById] = useMutation(RemoveCharacter)
  const characterAction = async (id: string) => {
    Notification(isDark).fire({
      title: 'Cargando',
      icon: 'info',
    })
    try {
      await deleteCharacterById({
        variables:{
          removeCharacterId: id,
        }
      })
      Notification(isDark).fire({
        title: 'Personaje eliminado exitosamente',
        icon: 'success',
        timer: 3000
      })
    } catch (error: any) {
      Notification(isDark).fire({
        title: error.message,
        icon: 'error',
        timer: 3000
      })
    }
  }

  if ( !data ) return <Loading />
  return ( 
    <AppLayout
      title='characters'
      description='Marvel'
    >
        <Grid.Container gap={2} direction='column' alignItems='flex-start' css={{margin:'$4', width:'100%'}}>

          <Grid css={{ width : '100%'}}>
            <Flex wrap={'nowrap'} justify={'between'} >
              <Text h1 >Personajes</Text>
              <Link href='/dashboard/characters/create'>
                Crear Objecto
              </Link>
            </Flex>
          </Grid>
          
          <Grid css={{margin:'$8', minWidth:'100%', maxWidth:'600px', display: 'inline-grid'}}>
            <TableWrapper 
              columns={columns} 
              rows={characters!}
              cellReducer={ CharactersCellReducer }
              onDelete={characterAction}
            />
          </Grid>        
        </Grid.Container>
    </AppLayout>
  )
}

export default CharactersPage
