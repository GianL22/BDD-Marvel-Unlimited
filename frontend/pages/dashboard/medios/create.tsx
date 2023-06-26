import { Grid, Input, Spacer, Text, useTheme, Button, Loading, Textarea } from '@nextui-org/react';
import { Flex } from '../../../components/containers';
import { AppLayout } from '@/layouts/AppLayout';
import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { DropdownRegister } from '@/components/dropdown/DropdownRegister';
import { RadioRegister } from '@/components/radio/RadioRegister';
import { useForm } from '@/hooks/useForm';
import { Notification } from '@/notification';
import { GetInformationToCreateMedio } from '@/graphql/Information';
import { FormMedia } from '@/models/Information';
import { CreateMovie, CreateSerie, CreateVideoGame } from '@/graphql/Medio';

const MediosCreatePage = ( ) => {  
  const { isDark } = useTheme();
  const {data} = useQuery<FormMedia>(GetInformationToCreateMedio)
  const [createMovie] = useMutation(CreateMovie);
  const [createSerie] = useMutation(CreateSerie);
  const [createVideoGame] = useMutation(CreateVideoGame);
  const [isLoading,setIsLoading] = useState(false);
  const [medio,setMedio] = useState('Película');
  const [duration, setDuration] = useState<number>(0)
  const [cost, setCost] = useState<number>(0)
  const [revenue, setRevenue] = useState<number>(0)
  const [episodes, setEpisodes] = useState<number>(0)
  const [director, setDirector] = useState({id: '', description: 'Director'})
  const [audioVisualType, setAudioVisualType] = useState({id: '', description: 'Tipo AudioVisual'})
  const [creator, setCreator] = useState({id: '', description: `Creador`})
  const [companyDist, setCompanyDist] = useState({id: '', description: `Compañia Distribuidora`})
  const [companyPublisher, setCompanyPublisher] = useState({id: '', description: `Compañia Publicadora`})
  const [companyProducer, setCompanyProducer] = useState({id: '', description: `Compañia Productora`})
  const directors = data?.persons.directors.map(director => {
    return {
      id: director.id,
      description: director.name + ' ' + director.lastName
    };
  });
  const creators = data?.persons.creators.map(creator => {
    return {
      id: creator.id,
      description: creator.name + ' ' + creator.lastName
    };
  });

  const {allowSubmit: allowSerieSubmit, parsedFields: parsedSerie} = useForm([
    {
      name: 'channel',
      validate: (value: string) => value.trim().length >= 3,
      validMessage: 'Canal Valido',
      errorMessage: 'Minimo 3 caracteres',
      initialValue: '',
    },
  ])
  const {allowSubmit: allowVideoGameSubmit, parsedFields: parsedVideoGame} = useForm([
    {
      name: 'type',
      validate: (value: string) => value.trim().length >= 3,
      validMessage: 'El tipo de Video Juego es Valido',
      errorMessage: 'Minimo 3 caracteres',
      initialValue: '',
    },
  ])
  const {allowSubmit,parsedFields} = useForm([
    {
        name: 'title',
        validate: (value: string) => value.trim().length >= 3,
        validMessage: 'Título Valido',
        errorMessage: 'Minimo 3 caracteres',
        initialValue: '',
    },
    {
        name: 'synopsis',
        validate: (value: string) => value.trim().length >= 10,
        validMessage: 'Sinopsis Valida',
        errorMessage: 'Minimo 10 caracteres',
        initialValue: '',
    },
    {
        name: 'based',
        validate: (value: string) => value.trim().length >= 3,
        validMessage: 'Comic Valido',
        errorMessage: 'Minimo 3 caracteres',
        initialValue: '',
    },
    {
        name: 'releaseDate',
        validate: (value: string) => value.trim().length >= 3,
        validMessage: 'Fecha de Lanzamiento válida',
        errorMessage: 'Fecha de Lanzamiento inválido',
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
      const createMedioInput ={
        title: title.value,
        synopsis: synopsis.value,
        based: based.value,
        releaseDate: releaseDate.value,
        companyId: companyProducer.id,
      }
      if(medio === 'Película'){
        await createMovie({
            variables: {
                createMovieInput: {
                    ...createMedioInput,
                    duration: duration,
                    cost: cost,
                    revenue: revenue,
                    directorId: director.id,
                    audioVisualTypeId: audioVisualType.id,
                    companyDistId: companyDist.id
                },
            },
        });
        if(cost > revenue){
            console.log('Mas caro')
            await Notification(isDark).fire({
                title: 'Información',
                icon: 'info',
                text: 'El costo de la pelicula fue mayor a las ganancias 😟'
            })
        }
      }
      if(medio === 'Serie'){
        await createSerie({
          variables: {
            createSerieInput:{
              ...createMedioInput,
              channel: channel.value,
              episodes: episodes,
              creatorId: creator.id,
              audioVisualTypeId: audioVisualType.id,
            }
          }
        })
      }
      if(medio === 'Video-juego'){
        await createVideoGame({
          variables: {
            createVideoGame:{
              ...createMedioInput,
              type: type.value,
              companyPublisherId: companyPublisher.id,
            }
          }
        })
      }
      Notification(isDark).fire({
          title: 'Medio creado',
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
const [title,synopsis, based, releaseDate] = parsedFields;
const [channel ] = parsedSerie;
const [type] = parsedVideoGame;

  if(!data) return <Text>No Hay info pana</Text>
  return (
    <AppLayout 
      title='Creación de un Medio'
      description='Pagina administrativa de Marvel United'
    >
      <Flex
        css={{'mt': '$5', 'px': '$6','@sm': {mt: '$10',px: '$16',}}}
        justify='between'
        align='center'
      >
        <Text h1>
          Crear un Medio: 
        </Text>
        <RadioRegister 
          label='Medios'
          listValue={['Película', 'Serie', 'Video-juego']}
          onSelectKey={setMedio}
          valueRadio={medio}
          size='xl'
        />
      </Flex>
      <Grid.Container gap={2} justify="center" >
        <Grid alignContent='center' alignItems='center' xs={ 12 } sm={ 12 } direction="row" css={{px: '$10', py:'$8', gap:'$15'}}>
            <Input
                label='Titulo'
                width='100%'
                value={title.value}
                onChange={(e) => title.setValue(e.target.value)}
                helperText={title.message}
                helperColor={title.color}
                status={title.color}
                color={title.color}
            />
            <Input
                label='Comic'
                width='100%'
                value={based.value}
                onChange={(e) => based.setValue(e.target.value)}
                helperText={based.message}
                helperColor={based.color}
                status={based.color}
                color={based.color}
            />
            <Input
                label='Fecha de estreno'
                type='date'
                width='100%'
                value={releaseDate.value}
                onChange={(e) => releaseDate.setValue(e.target.value)}
                helperText={releaseDate.message}
                helperColor={releaseDate.color}
                status={releaseDate.color}
                color={releaseDate.color}
            />
            <DropdownRegister
                listkeys={data.companies!}
                selected={companyProducer.description}
                setValue={setCompanyProducer}
                width={100} 
            />
        </Grid>
        <Grid xs={12} direction="row" css={{px: '$3', py:'$14', height: 'max-content'}}>
            <Spacer y={1} />
            <Textarea 
                labelPlaceholder="Sinópsis" 
                fullWidth
                status= {synopsis.color}  
                value={synopsis.value}
                onChange={(e) => synopsis.setValue(e.target.value)}
                helperText={synopsis.message}
                helperColor={synopsis.color}
                color={synopsis.color}
            />
        </Grid>
        <Grid xs={12} direction="row" css={{px: '$3', py:'$0', height: 'max-content'}}>    
            <Grid xs={12} sm={6} direction='column' css={{px: '$10', height: 'max-content', gap:'$15'}}>
                {
                    (medio === 'Película') &&
                        <>
                            <Input 
                                labelLeft='Min.'
                                label='Duración'
                                type="number"
                                min="0"
                                step="1"
                                value={duration}
                                onChange={(e) => setDuration(Number(e.target.value))}
                                helperText={ duration <= 0 ? 'La duración debe ser mayor a cero' : 'La duración es valida' }
                                helperColor={duration > 0  ? 'success' : 'error'}
                                status={duration > 0  ? 'success' : 'error'}
                                color= {duration > 0   ? 'success' : 'error'}
                            /> 
                            <Input 
                                labelLeft='$'
                                label='Costo'
                                type="number"
                                min="0"
                                step="0.1"
                                value={cost}
                                onChange={(e) => setCost(Number(e.target.value))}
                                helperText={ cost <= 0 ? 'El costo debe ser mayor a cero' : 'EL costo es valido' }
                                helperColor={cost > 0  ? 'success' : 'error'}
                                status={cost > 0  ? 'success' : 'error'}
                                color= {cost > 0   ? 'success' : 'error'}
                            /> 
                            <Input 
                                labelLeft='$'
                                label='Ganancias'
                                type="number"
                                min="0"
                                step="0.1"
                                value={revenue}
                                onChange={(e) => setRevenue(Number(e.target.value))}
                                helperText={ revenue <= 0 ? 'Las ganancias deben ser mayor a cero' : 'La ganancia es valida' }
                                helperColor={revenue > 0  ? 'success' : 'error'}
                                status={revenue > 0  ? 'success' : 'error'}
                                color= {revenue > 0   ? 'success' : 'error'}
                            /> 
                        </>
                }
                {
                    (medio === 'Serie') &&
                        <>
                            <Input
                                label='Canal'
                                width='100%'
                                value={channel.value}
                                onChange={(e) => channel.setValue(e.target.value)}
                                helperText={channel.message}
                                helperColor={channel.color}
                                status={channel.color}
                                color={channel.color}
                            />
                            <Input 
                                labelLeft='$'
                                label='Episodios'
                                type="number"
                                min="0"
                                step="1"
                                value={episodes}
                                onChange={(e) => setEpisodes(Number(e.target.value))}
                                helperText={ episodes <= 0 ? 'Los episodios deben ser mayor a cero' : 'Los episodios son validos' }
                                helperColor={episodes > 0  ? 'success' : 'error'}
                                status={episodes > 0  ? 'success' : 'error'}
                                color= {episodes > 0   ? 'success' : 'error'}
                            /> 
                        </>
                }
                {
                    (medio === 'Video-juego') &&
                        <>
                            <Input
                                label='Tipo de Juego'
                                width='100%'
                                value={type.value}
                                onChange={(e) => type.setValue(e.target.value)}
                                helperText={type.message}
                                helperColor={type.color}
                                status={type.color}
                                color={type.color}
                            />
                        </>
                }
            </Grid>
            <Grid xs={12} sm={6} direction='column' css={{px: '$12',py:'$15', height: 'max-content', gap:'$18'}}>
                {
                   (medio === 'Película') &&
                    <>
                        <DropdownRegister
                            listkeys={directors!}
                            selected={director.description}
                            setValue={setDirector}
                            width={100} 
                        />
                        <DropdownRegister
                            listkeys={data.AudioVisualTypes!}
                            selected={audioVisualType.description}
                            setValue={setAudioVisualType}
                            width={100} 
                        />
                        <DropdownRegister
                            listkeys={data.companies!}
                            selected={companyDist.description}
                            setValue={setCompanyDist}
                            width={100} 
                        />
                    </> 
                }
                {
                    (medio === 'Serie') &&
                        <>
                            <DropdownRegister
                                listkeys={creators!}
                                selected={creator.description}
                                setValue={setCreator}
                                width={100} 
                            />
                            <DropdownRegister
                                listkeys={data.AudioVisualTypes!}
                                selected={audioVisualType.description}
                                setValue={setAudioVisualType}
                                width={100} 
                            />
                        </>
                }
                {
                    (medio === 'Video-juego') &&
                        <>
                            <DropdownRegister
                                listkeys={data.companies!}
                                selected={companyPublisher.description}
                                setValue={setCompanyPublisher}
                                width={100} 
                            />
                        </>
                }
            </Grid>     
        </Grid>
        <Grid xs ={12} alignContent='flex-end' alignItems='flex-start' direction='row-reverse'>
          <Button
              disabled={
                !allowSubmit || isLoading || (companyProducer.description === 'Compañia Productora') ||
                ((medio==='Película') && ( !(director.description !== 'Director') || !(audioVisualType.description !== 'Tipo AudioVisual') || !(companyDist.description !== 'Compañia Distribuidora'))) ||
                ((medio==='Serie') && (!allowSerieSubmit || !(creator.description !== 'Creador') || !(audioVisualType.description !== 'Tipo AudioVisual'))) ||
                ((medio==='Video-juego') && (!allowVideoGameSubmit || !(companyPublisher.description !== 'Compañia Publicadora')))
              }
              onPress={onSubmit}
              size='lg'
          >
              {!isLoading ? 'Crear Medio' : <Loading type='points'/>}
          </Button>
        </Grid>
      </Grid.Container> 
    </AppLayout>
  )
}
export default MediosCreatePage