import { Grid, Input, Spacer, Text, Link, useTheme, Button, Loading, useModal, Divider } from '@nextui-org/react';
import { Flex } from '../../../components/containers';
import { AppLayout } from '@/layouts/AppLayout';
import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { DropdownRegister } from '@/components/dropdown/DropdownRegister';
import { RadioRegister } from '@/components/radio/RadioRegister';
import { CreateCivil, CreateHero, CreateVillain, GetHeroesAndVillains, RelatePowers } from '@/graphql/Character';
import { CharactersResponse } from '@/models/Character';
import { DropdownMultiRegister } from '@/components/dropdown/DropdownMultiRegister';
import { InformationResponse } from '@/models/Information';
import { GetInformationToCreateCharacter } from '@/graphql/Information';
import { useForm } from '@/hooks/useForm';
import { Notification } from '@/notification';
import { PowerModal } from '@/components/modal/PowerModal';
import { useRouter } from 'next/router';

const CharacterCreatePage = ( ) => {  
  const {replace} = useRouter()
  const { data } = useQuery<InformationResponse>(GetInformationToCreateCharacter);
  const { data: characters} =  useQuery<CharactersResponse>(GetHeroesAndVillains);
  const { isDark } = useTheme();
  const [isLoading,setIsLoading] = useState(false);
  const [createHero] = useMutation(CreateHero);
  const [createVillain] = useMutation(CreateVillain);
  const [createCivil] = useMutation(CreateCivil);
  const [relatePowers] = useMutation(RelatePowers);
  const { bindings, setVisible } = useModal();
  const [character,setCharacter] = useState('Hero');
  const [eyeColor, setEyeColor] = useState({id: '', description: 'Color Ojos'})
  const [hairColor, setHairColor] = useState({id: '', description: 'Color Cabello'})
  const [hero, setHero] = useState({id: '', description: `Heroes`})
  const [villain, setVillain] = useState({id: '', description: `Villanos`})
  const [nacionalities, setNacionalities] = useState<{id: string}[]>([])
  const [occuptations, setOccuptations] = useState<{id: string}[]>([])
  const [objects, setObjects] = useState<{id: string}[]>([])
  const [creators, setCreators] = useState<{id: string}[]>([])
  const [suitColors, setSuitColors] = useState<{id: string}[]>([])
  const [fightWith, setFightWith] = useState<{id: string}[]>([])
  const [powers, setPowers] = useState<{powerName: string, powerId: string, type: string, inherited: boolean}[]>([])
  const [gender,setGender] = useState('M');
  const [maritialStatus,setMaritialStatus] = useState('Soltero');
  const heroes = characters?.findCharacters.hero.map(({ nameHero, character }) => ({
    id: character.id,
    description: nameHero,
  }));
  const villains = characters?.findCharacters.villain.map(({ nameVillain, character }) => ({
    id: character.id,
    description: nameVillain,
  }));
  const creatorsData = data?.persons.creators.map(creator => {
    return {
      id: creator.id,
      description: creator.name + ' ' + creator.lastName
    };
  });
  const {allowSubmit: allowHeroSubmit, parsedFields: parsedHero} = useForm([
    {
      name: 'nameHero',
      validate: (value: string) => value.trim().length >= 3,
      validMessage: 'Nombre de Heroe Valido',
      errorMessage: 'Minimo 3 caracteres',
      initialValue: '',
    },
    {
      name: 'logo',
      validate: (value: string) => value.trim().length >= 3,
      validMessage: 'Logo valido',
      errorMessage: 'Minimo 3 caracteres',
      initialValue: '',
    },
  ])
  const {allowSubmit: allowVillainSubmit, parsedFields: parsedVillain} = useForm([
    {
      name: 'nameVillain',
      validate: (value: string) => value.trim().length >= 3,
      validMessage: 'Nombre de Villano Valido',
      errorMessage: 'Minimo 3 caracteres',
      initialValue: '',
    },
    {
      name: 'objective',
      validate: (value: string) => value.trim().length >= 3,
      validMessage: 'Objetivo Valido',
      errorMessage: 'Minimo 3 caracteres',
      initialValue: '',
    },
  ])
  const {allowSubmit,parsedFields} = useForm([
    {
        name: 'name',
        validate: (value: string) => value.trim().length >= 3,
        validMessage: 'Nombre Valido',
        errorMessage: 'Minimo 3 caracteres',
        initialValue: '',
    },
    {
        name: 'lastName',
        validate: (value: string) => value.trim().length >= 3,
        validMessage: 'Apellido Valido',
        errorMessage: 'Minimo 10 caracteres',
        initialValue: '',
    },
    {
      name: 'phrase',
      validate: (value: string) => value.trim().length >= 3,
      validMessage: 'Frase Valida',
      errorMessage: 'Minimo 3 caracteres',
      initialValue: '',
    },
    {
      name: 'firstApparition',
      validate: (value: string) => value.trim().length >= 3,
      validMessage: 'Primera Aparición Valida',
      errorMessage: 'Minimo 3 caracteres',
      initialValue: '',
    },
])
const onSubmit = async () => {
  setIsLoading(true)
  Notification(isDark).fire({
      title: 'Cargando',
      icon: 'info',
  })
  try {
      const createCharacterInput ={
        eyeColor: eyeColor.id,
        hairColor: hairColor.id,
        nacionalities: nacionalities,
        occupations: occuptations,
        objects: (objects.length === 0) ? [] : objects,
        creators: creators,
      }
      const createCharacterCommon = {
        name: name.value,
        lastName: lastName.value,
        gender: gender,
        phrase: phrase.value,
        maritialStatus: maritialStatus,
        firstApparition: firstApparition.value
      }
      let characterId: any
      if(character === 'Hero'){
        const {data} = await createHero({
            variables: {
                createHeroInput: {
                    ...createCharacterCommon,
                    nameHero: nameHero.value,
                    logo: logo.value,
                    archEnemy: villain.id,
                    suitColors: suitColors,
                },
                createCharacterInput:{...createCharacterInput,}
            },
        });
        characterId = data.createHero.character.id
      }
      if(character === 'Villain'){
        const {data} = characterId = await createVillain({
          variables: {
            createVillainInput:{
              ...createCharacterCommon,
              nameVillain: nameVillain.value,
              objective: objective.value,
              fightWith: fightWith,
            },
            createCharacterInput:{...createCharacterInput,}
          }
        })
        characterId = data.createVillain.character.id!
      }
      if(character === 'Civil'){
        const {data} = await createCivil({
          variables: {
            createCivilInput:{
              ...createCharacterCommon,
              heroId: (hero.id === '' ? null : hero.id),
              villainId: (villain.id === '' ? null : villain.id),
            },
            createCharacterInput:{...createCharacterInput,}
          }
        })
        characterId = data?.createCivil.character.id!;
      }
      if(powers.length !==0 && characterId){
        const powersWithoutName = powers.map(({ powerName, ...rest }) => rest);
        await relatePowers({
          variables:{
            createUsePowerInput:{
              characterId: (characterId),
              powers: powersWithoutName,
            }
          }
        })
      }
      setTimeout(() => replace('/dashboard/characters'),500)
      Notification(isDark).fire({
          title: 'Personaje creado',
          icon: 'success',
      })
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
const [name,lastName,phrase,firstApparition] = parsedFields;
const [nameHero,logo ] = parsedHero;
const [nameVillain, objective] = parsedVillain;

  if(!data || !characters) return <Text>No Hay info pana</Text>
  return (
    <AppLayout 
      title='Creación de Personajes'
      description='Pagina administrativa de Marvel United'
    >
      <PowerModal powers={powers} bindings={bindings} setVisible={setVisible} setPowers={setPowers} />
      <Flex
        css={{'mt': '$5', 'px': '$6','@sm': {mt: '$10',px: '$16',}}}
        justify='between'
        align='center'
      >
        <Text h1>
          Crear Personajes: 
        </Text>
        <RadioRegister 
          label='Personaje'
          listValue={['Hero', 'Villain', 'Civil']}
          onSelectKey={setCharacter}
          valueRadio={character}
          size='xl'
        />
      </Flex>
      <Grid.Container gap={2} justify="center" >
        <Grid alignContent='space-between' alignItems='center' xs={ 12 } sm={ 4 } direction="column">
          <Spacer y={1} />
          <Input
            labelPlaceholder='Nombre'
            width='90%'
            value={name.value}
            onChange={(e) => name.setValue(e.target.value)}
            helperText={name.message}
            helperColor={name.color}
            status={name.color}
            color={name.color}
          />
          <Spacer y={3} />
          <Input
            labelPlaceholder='Apellido'
            width='90%'
            value={lastName.value}
            onChange={(e) => lastName.setValue(e.target.value)}
            helperText={lastName.message}
            helperColor={lastName.color}
            status={lastName.color}
            color={lastName.color}
          />
          <Spacer y={3} />
          <Input
            labelPlaceholder='Frase'
            width='90%'
            value={phrase.value}
            onChange={(e) => phrase.setValue(e.target.value)}
            helperText={phrase.message}
            helperColor={phrase.color}
            status={phrase.color}
            color={phrase.color}
          />
          <Spacer y={3} />
          <Input
            labelPlaceholder='Primera Aparición'
            width='90%'
            value={firstApparition.value}
            onChange={(e) => firstApparition.setValue(e.target.value)}
            helperText={firstApparition.message}
            helperColor={firstApparition.color}
            status={firstApparition.color}
            color={firstApparition.color}
          />
          <Spacer y={3} />
          <Button
            css={{width: '90%', alignContent: 'center', alignItems:'center'}}
            onPress={ () => setVisible(true) }
            ghost
          >
            Lista Poderes
          </Button>
        </Grid>

        <Grid xs={12} sm={ 4 } direction="column" alignItems='center' alignContent='space-between'>
          <Spacer y={0.6} />
          <DropdownRegister
            listkeys={data?.colors}
            selected={eyeColor.description}
            setValue={setEyeColor}
            width={90}
            check='Color Ojos' 
          />
          <Spacer y={3} />
          <DropdownRegister
            listkeys={data?.colors}
            selected={hairColor.description}
            setValue={setHairColor}  
            width={90} 
            check='Color Cabello'
          />
          <Spacer y={3} />
          <DropdownMultiRegister 
            listkeys={data?.nacionality}
            label='Nacionalidades'
            setValue={ setNacionalities }
            width={90}
          />
          <Spacer y ={3}/>
          <DropdownMultiRegister 
            listkeys={data?.occupations}
            label='Ocupaciones'
            setValue={ setOccuptations }
            width={90}
          />
          <Spacer y ={3}/>
        </Grid>

        <Grid xs={12} sm={ 4 } direction="column" alignContent='flex-end' alignItems='center'>
          <Spacer y={0.6} />
          <DropdownMultiRegister 
            listkeys={data?.objects}
            label='Objetos'
            setValue={ setObjects }
            width={90}
          />
          <Spacer y ={3}/>
          <DropdownMultiRegister 
            listkeys={creatorsData}
            label='Creadores'
            setValue={ setCreators }
            width={90}
          />
          <Spacer y ={2}/>
          <Grid>
            <RadioRegister 
              label='Genero'
              listValue={['M','F','Desc','Otro' ]}
              onSelectKey={setGender}
              valueRadio={gender}
            />
          </Grid>
          <Spacer y={2} />
          <Grid>
            <RadioRegister 
              label='Estado Marital'
              listValue={['Soltero', 'Casado', 'Viudo', 'Divorciado']}
              onSelectKey={setMaritialStatus}
              valueRadio={maritialStatus}
            />
          </Grid>
        </Grid>

        <Grid xs ={12} sm = {12} alignContent='space-between' alignItems='center' direction='row'>
          <Spacer y={6} />
          {
            (character === 'Hero') && 
              <>
                <Input
                  labelPlaceholder='Nombre Heroico'
                  width='60%'
                  value={nameHero.value}
                  onChange={(e) => nameHero.setValue(e.target.value)}
                  helperText={nameHero.message}
                  helperColor={nameHero.color}
                  status={nameHero.color}
                  color={nameHero.color}
                />
                <Spacer x={2}/>
                <Input
                  labelPlaceholder='Logo'
                  width='60%'
                  value={logo.value}
                  onChange={(e) => logo.setValue(e.target.value)}
                  helperText={logo.message}
                  helperColor={logo.color}
                  status={logo.color}
                  color={logo.color}
                />
                <Spacer x={2}/>
                <DropdownRegister
                  listkeys={villains!}
                  selected={villain.description}
                  setValue={setVillain}
                  width={60} 
                  check='Villanos'
                />
                <Spacer x={2}/>
                <DropdownMultiRegister 
                  listkeys={data?.colors}
                  label='Colores Traje'
                  setValue={ setSuitColors }
                  width={60}
                />
              </>
          }
          {
            (character === 'Villain') &&
              <>
                <Spacer x={4}/>
                <Input
                  labelPlaceholder='Nombre Villano'
                  width='60%'
                  value={nameVillain.value}
                  onChange={(e) => nameVillain.setValue(e.target.value)}
                  helperText={nameVillain.message}
                  helperColor={nameVillain.color}
                  status={nameVillain.color}
                  color={nameVillain.color}
                />
                <Spacer x={2}/>
                <Input
                  labelPlaceholder='Objetivo'
                  width='60%'
                  value={objective.value}
                  onChange={(e) => objective.setValue(e.target.value)}
                  helperText={objective.message}
                  helperColor={objective.color}
                  status={objective.color}
                  color={objective.color}
                />
                <Spacer x={2}/>
                <DropdownMultiRegister 
                  listkeys={heroes!}
                  label='Pelea con'
                  setValue={ setFightWith }
                  width={60}
                />
                <Spacer x={4}/>
              </>
          } 
          {
            (character === 'Civil') &&
            <>
              <Spacer x={4}/>
              <DropdownRegister
                listkeys={heroes!}
                selected={hero.description}
                setValue={setHero}
                width={50} 
                check='Heroes'
              />
              <Spacer x={4}/>
              <DropdownRegister
                listkeys={villains!}
                selected={villain.description}
                setValue={setVillain}
                width={50} 
                check='Villanos'
              />
              <Spacer x={4}/>
            </>
          }
        </Grid>
        <Grid xs ={12} alignContent='space-between' alignItems='center' direction='row-reverse'>
          <Button
              disabled={
                !allowSubmit || isLoading || (hairColor.description === 'Color Cabello') ||
                (eyeColor.description === 'Color Ojos') || (nacionalities.length === 0) || (occuptations.length === 0) || (creators.length === 0) ||
                ((character==='Hero') && (!allowHeroSubmit || !(villain.description !== 'Archienemigo') || (suitColors.length === 0))) ||
                ( (character==='Villain') && (!allowVillainSubmit || (fightWith.length === 0)) )
              }
              onPress={onSubmit}
              size='lg'
          >
              {!isLoading ? 'Crear Personaje' : <Loading type='points'/>}
          </Button>
        </Grid>
      </Grid.Container> 
    </AppLayout>
  )
}
export default CharacterCreatePage