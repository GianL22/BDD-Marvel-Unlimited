import { Grid, Input, Spacer, Text, useTheme, Button, Loading, Textarea, Row, Col, Card, Divider } from '@nextui-org/react';
import { Flex } from '../../../components/containers';
import { AppLayout } from '@/layouts/AppLayout';
import { useState } from 'react';
import { ApolloClient, InMemoryCache, useMutation, useQuery } from '@apollo/client';
import { DropdownRegister } from '@/components/dropdown/DropdownRegister';
import { useForm } from '@/hooks/useForm';
import { Notification } from '@/notification';
import { GetInformationToCreateMedio } from '@/graphql/Information';
import { FormMedia } from '@/models/Information';
import { CreateMovie, CreateSerie, CreateVideoGame, GetMovieById, GetSerieById, GetVideoGameById } from '@/graphql/Medio';
import { useRouter } from 'next/router';
import { GetServerSideProps, NextPage } from 'next';
import { MovieAll, SerieAll, VideoGameAll } from '@/models/Medio';

interface Props{
    movie?: MovieAll,
    serie?: SerieAll,
    videoGame?: VideoGameAll, 
}

const MediosDetailPage: NextPage<Props> = ( {movie, serie,videoGame} ) => {  
  const {replace} = useRouter()
  const { isDark } = useTheme();
  const {data} = useQuery<FormMedia>(GetInformationToCreateMedio)
  const [createMovie] = useMutation(CreateMovie);
  const [createSerie] = useMutation(CreateSerie);
  const [createVideoGame] = useMutation(CreateVideoGame);
  const [isLoading,setIsLoading] = useState(false);
  const medio: string = (`${(movie) ? 'Película' : (serie) ? 'Serie' : 'Video-juego'}`);
  const [duration, setDuration] = useState<number>((movie) ? movie.duration : 0)
  const [cost, setCost] = useState<number>((movie) ? movie.cost : 0)
  const [revenue, setRevenue] = useState<number>((movie) ? movie.revenue : 0)
  const [episodes, setEpisodes] = useState<number>((serie) ? Number(serie.episodes) : 0)
  const [director, setDirector] = useState({id: movie?.director.id, description: `${movie?.director.name} ${movie?.director.lastName}`})
  const [audioVisualType, setAudioVisualType] = useState((movie) ? movie.audioVisualType : (serie) ? serie.audioVisualType : {id:'', description:''})
  const [creator, setCreator] = useState({id: serie?.creator.id, description: `${serie?.creator.name} ${serie?.creator.lastName}`})
  const [companyDist, setCompanyDist] = useState({id: movie?.companyDist.id, description: movie?.companyDist.description})
  const [companyPublisher, setCompanyPublisher] = useState({id: videoGame?.companyPublisher.id, description: videoGame?.companyPublisher.description})
  const [companyProducer, setCompanyProducer] = useState((movie) ? movie.medio.companyProduction : (serie) ? serie.medio.companyProduction : videoGame?.medio.companyProduction!)
  const [plataforms, setPlataforms] = useState<{id: string}[]>([])
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

  const { parsedFields: parsedSerie} = useForm([
    {
      name: 'channel',
      validate: (value: string) => value.trim().length >= 3,
      validMessage: 'Canal Valido',
      errorMessage: 'Minimo 3 caracteres',
      initialValue: (serie) ? serie.channel : '',
    },
  ])
  const { parsedFields: parsedVideoGame } = useForm([
    {
      name: 'type',
      validate: (value: string) => value.trim().length >= 3,
      validMessage: 'El tipo de Video Juego es Valido',
      errorMessage: 'Minimo 3 caracteres',
      initialValue: (videoGame) ? videoGame.type : '',
    },
  ])
  const {allowSubmit,parsedFields} = useForm([
    {
        name: 'title',
        validate: (value: string) => value.trim().length >= 3,
        validMessage: 'Título Valido',
        errorMessage: 'Minimo 3 caracteres',
        initialValue: (movie) ? movie.title : (serie) ? serie.title : videoGame?.title!,
    },
    {
        name: 'synopsis',
        validate: (value: string) => value.trim().length >= 10,
        validMessage: 'Sinopsis Valida',
        errorMessage: 'Minimo 10 caracteres',
        initialValue: (movie) ? movie.synopsis : (serie) ? serie.synopsis : videoGame?.synopsis!,
    },
    {
        name: 'based',
        validate: (value: string) => value.trim().length >= 3,
        validMessage: 'Comic Valido',
        errorMessage: 'Minimo 3 caracteres',
        initialValue: (movie) ? movie.based : (serie) ? serie.based : videoGame?.based!,
    },
    {
        name: 'releaseDate',
        validate: (value: string) => value.trim().length >= 3,
        validMessage: 'Fecha de Lanzamiento válida',
        errorMessage: 'Fecha de Lanzamiento inválido',
        initialValue: (movie) ? movie.releaseDate : (serie) ? serie.releaseDate : videoGame?.releaseDate!,
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
        companyId: companyProducer.id!,
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
              platforms: plataforms,
            }
          }
        })
      }
      Notification(isDark).fire({
          title: 'Medio creado',
          icon: 'success',
      })
      setIsLoading(false)
      setTimeout(() => replace('/dashboard/medios'),500)
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
          Detalles del Medio: 
        </Text>
      </Flex>
      <Grid.Container gap={2} justify="center" >
        <Grid alignContent='center' alignItems='center' xs={ 12 } sm={ 12 } direction="row" css={{px: '$10', py:'$8', gap:'$15'}}>
            <Input
                label='Titulo'
                width='90%'
                value={title.value}
                onChange={(e) => title.setValue(e.target.value)}
                helperText={title.message}
                helperColor={title.color}
                status={title.color}
                color={title.color}
            />
            <Input
                label='Comic'
                width='90%'
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
                width='90%'
                value={releaseDate.value}
                onChange={(e) => releaseDate.setValue(e.target.value)}
                helperText={releaseDate.message}
                helperColor={releaseDate.color}
                status={releaseDate.color}
                color={releaseDate.color}
            />
            <DropdownRegister
                listkeys={data.companies!}
                selected={companyProducer.description!}
                setValue={setCompanyProducer}
                width={100} 
                check='Compañia Productora'
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
        <Grid xs={12} direction="row" css={{px: '$3', py:'$1', height: 'max-content'}}>    
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
                              labelLeft='Nro.'
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
                            <Card css={{py:'$5'}}>
                                <Card.Header css={{margin:'$0', py:'$0'}}>
                                    <Text h3>Plataformas</Text>
                                </Card.Header>
                                <Divider />
                                <Card.Body> 
                            {
                                videoGame?.platforms.map((plataform, i)=>(
                                    <Row>
                                        <Col>
                                            <Text> {plataform.description}  </Text>
                                        </Col>
                                    </Row>
                                ))
                            }
                                </Card.Body>
                            </Card>
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
                            check='Director'
                        />
                        <DropdownRegister
                            listkeys={data.AudioVisualTypes!}
                            selected={audioVisualType.description}
                            setValue={setAudioVisualType}
                            width={100} 
                            check='Tipo AudioVisual'
                        />
                        <DropdownRegister
                            listkeys={data.companies!}
                            selected={companyDist.description!}
                            setValue={setCompanyDist}
                            width={100} 
                            check='Compañia Distribuidora'
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
                                check='Creador'
                            />
                            <DropdownRegister
                                listkeys={data.AudioVisualTypes!}
                                selected={audioVisualType.description}
                                setValue={setAudioVisualType}
                                width={100} 
                                check='Tipo AudioVisual'
                            />
                        </>
                }
                {
                    (medio === 'Video-juego') &&
                      <>
                          <DropdownRegister
                            listkeys={data.companies!}
                            selected={companyPublisher.description!}
                            setValue={setCompanyPublisher}
                            width={100} 
                            check='Compañia Publicadora'
                          />
                      </>
                }
            </Grid>     
        </Grid>
        <Grid xs ={12} alignContent='flex-end' alignItems='flex-start' direction='row-reverse'>
          <Button
              disabled={ !allowSubmit || isLoading}
              onPress={onSubmit}
              size='lg'
          >
              {!isLoading ? 'Actualizar Medio' : <Loading type='points'/>}
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
        if ( id.split('&')[0] === 'Película' ){
            const {data: movie} =  await client.query({
                query: GetMovieById,
                variables: {
                    movieId: id.split('&')[1],
                },
            });
            return{
                props:{
                    movie: movie.movie,
                    serie: null,
                    videoGame: null
                }
            }
        }
        if ( id.split('&')[0] === 'Serie' ){
            const {data: serie} =  await client.query({
                query: GetSerieById,
                variables: {
                    serieId: id.split('&')[1],
                },
            });
            return{
                props:{
                    movie: null,
                    serie: serie.serie,
                    videoGame: null
                }
            }
        }
        if ( id.split('&')[0] === 'Video-Juego' ){
            const {data: videoGame} =  await client.query({
                query: GetVideoGameById,
                variables: {
                    videoGameId: id.split('&')[1],
                },
            });
            return{
                props:{
                    movie: null,
                    serie: null,
                    videoGame: videoGame.videoGame
                }
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
    return{
        redirect: {
            destination: '/404',
            permanent: false
        }
    }
  }

export default MediosDetailPage