import { Grid, Spacer, Text, Image, Progress, Input, Button } from '@nextui-org/react';
import { Box, Flex } from '../../../components/containers';
import { AppLayout } from '@/layouts/AppLayout';
import { useMemo, useState } from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GetSerieById } from '@/graphql/Medio';
import { GetServerSideProps, NextPage } from 'next';
import { SerieAll, SerieServer } from '@/models/Medio';
import { Rating } from 'react-simple-star-rating';
import { IconButton } from '@/components/table/IconButton';
import { Check, Heart, Plus } from 'iconoir-react';
import { useRecommendations } from '@/hooks/useRecommendations';
import { useProgress } from '@/hooks/useProgress';

interface Props {
    serie: SerieAll,
    isInMyList: boolean,
    isInMyPreference: boolean
    ratingByProfile: number,
    serieProgressByProfile: number,
}

const SerieDetailPage: NextPage<Props> = ({ serie, isInMyList, isInMyPreference, ratingByProfile, serieProgressByProfile }) => {
    const { myList, preference, rating, handleMyList, handleMyPreferences, handleRating } = useRecommendations(isInMyList, isInMyPreference, ratingByProfile)
    const [isHovering, setIsHovering] = useState(false)
    const showTooltip = useMemo(() => rating > 0 || isHovering, [rating, isHovering])
    const {handleSerieProgress, serieProgress , setSerieProgress} = useProgress(0, serieProgressByProfile, false)

    return (
        <AppLayout
            title={serie.title}
            description='Pagina administrativa de Marvel United'
        >
            <Flex
                css={{ 'mt': '$5', 'px': '$6', '@sm': { mt: '$10', px: '$16', } }}
                justify='between'
                align='center'
            >
                <Text h1>
                    {serie.title}
                </Text>
                <Flex css={{ gap: '$10', m: '$5' }}>
                    <Flex direction={'column'} >
                        <IconButton onClick={() => handleMyPreferences(serie.medio.id)} >
                            <Heart
                                fontSize={25}
                                fill={(preference) ? '#fe0000' : '#FFFFFF'}
                            />
                        </IconButton>
                        <Text>Me gusta</Text>
                    </Flex>
                    <Flex direction={'column'}>
                        <IconButton onClick={() => handleMyList(serie.medio.id)} >
                            {
                                (myList)
                                    ? <Check fontSize={25} color={(myList) ? '#fe0000' : ''} />
                                    : <Plus fontSize={25} color={(myList) ? '#fe0000' : ''} />
                            }
                        </IconButton>
                        <Text>Mi Lista</Text>
                    </Flex>
                </Flex>
            </Flex>
            <Grid.Container gap={2} justify="center" direction='row'>
                <Grid alignContent='center' alignItems='center' xs={4} direction="column">
                    <Image
                        src={`/medios/${serie.poster}`}
                        css={{
                            maxWidth: '400px',
                        }}
                        objectFit="contain"
                        showSkeleton
                        containerCss={{
                            borderRadius: '5%',
                            boxShadow: '0 8px 16px rgba(0, 0, 0, 0.6)',
                            overflow: 'hidden',
                        }}
                    />
                    <Spacer y={0.5} />
                    <Flex justify={'center'} wrap={'wrap'} css={{ m: '$2', gap: '$4' }}>
                        <Rating
                            size={40}
                            readonly
                            allowFraction
                            fillColorArray={['#f17a45', '#f19745', '#f1a545', '#f1b345', '#f1d045']}
                            initialValue={(serie.medio.rating.ratingAvg) ? serie.medio.rating.ratingAvg : 0}
                        />
                        <Text size='$xl'>
                            {(serie.medio.rating.ratingAvg) ? serie.medio.rating.ratingAvg.toFixed(2) : 0}/5.00 ({serie.medio.rating.ratingCount})
                        </Text>
                    </Flex>
                </Grid>
                <Grid xs={8} direction='column' css={{ gap: '$7' }}>
                    <Box>
                        <Text h3 b> Sinopsis: </Text>
                        <Text size={'$xl'}>
                            {serie.synopsis}
                        </Text>
                    </Box>
                    <Text size={'$xl'}>
                        <Text b>Fecha de Estreno:</Text> {serie.releaseDate}
                    </Text>
                    <Text size={'$xl'}>
                        <Text b>Comic basado:</Text> {serie.based}
                    </Text>
                    <Text size={'$xl'}>
                        <Text b>Productora:</Text> {serie.medio.companyProduction.description}
                    </Text>
                    <Text size={'$xl'}>
                        <Text b>Episodios:</Text> {serie.episodes}
                    </Text>
                    <Text size={'$xl'}>
                        <Text b>Creador:</Text> {serie.creator.name + ' ' + serie.creator.lastName}
                    </Text>
                    <Text size={'$xl'}>
                        <Text b>Tipo:</Text> {serie.audioVisualType.description}
                    </Text>
                    <Text size={'$xl'}>
                        <Text b>Canal de Emisión:</Text> {serie.channel}
                    </Text>
                    <Flex direction={'row'} wrap={'wrap'} align={'between'} justify={'around'}>
                        <Box css={{ width: '50%' }}>
                            <Flex direction={'row'} wrap={'wrap'} justify={'between'} css={{ width: '80%' }}>
                                <Text size={'$xl'}>Tu Progreso: </Text>
                                <Input
                                    aria-label='Progreso'
                                    width='40%'
                                    type="number"
                                    min={0}
                                    max={serie.episodes}
                                    value={serieProgress}
                                    labelRight={`/ ${serie.episodes} Episodios`}
                                    step="1"
                                    onChange={(e) => setSerieProgress(Number(e.target.value))}
                                />
                            </Flex>
                            <Spacer y={1} />
                            <Progress color="primary" min={1} max={Number(serie.episodes)} value={serieProgress} css={{ width: '80%' }} />
                            <Spacer y={1} />
                            <Box css={{display: 'flex',justifyContent:'flex-end', width:'80%'}}>
                                <Button animated bordered onPress={() => handleSerieProgress(serie.medio.id, serieProgress)}>
                                    Guardar Progreso
                                </Button>
                            </Box>
                        </Box>
                        <Box css={{ width: '50%' }} >
                            <Text size={'$xl'} >Tu Calificación:</Text>
                            <Rating
                                size={35}
                                allowFraction
                                transition
                                showTooltip={showTooltip}
                                initialValue={rating}
                                onClick={(rating) => handleRating(serie.medio.id, rating)}
                                onPointerEnter={() => setIsHovering(true)}
                                onPointerLeave={() => setIsHovering(false)}
                                tooltipArray={['Terrible', 'Terrible', 'Malo', 'Malo', 'Regular', 'Regular', 'Bueno', 'Bueno', 'Muy Bueno', 'Perfecto']}
                                fillColorArray={['#f17a45', '#f19745', '#f1a545', '#f1b345', '#f1d045']}
                            />
                        </Box>
                    </Flex>
                </Grid>
            </Grid.Container>
        </AppLayout>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { id = '' } = ctx.params as { id: string };
    const { activeProfile, token } = ctx.req.cookies;
    const client = new ApolloClient({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
        cache: new InMemoryCache(),
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    try {
        const { data } = await client.query<SerieServer>({
            query: GetSerieById,
            variables: {
                serieId: id,
                profileId: activeProfile,
            },
        });
        return {
            props: {
                serie: data.serie,
                isInMyList: (data.profileMyList.medios.find(medio => medio.id === id)) ? true : false,
                isInMyPreference: (data.profilePreferenceList.medios.find(medio => medio.id === id)) ? true : false,
                ratingByProfile: data.ratingOfMedioByProfile,
                serieProgressByProfile: data.progressOfMedios.serieProgress
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

export default SerieDetailPage