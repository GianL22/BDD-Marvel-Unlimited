import { Grid, Spacer, Text, Image, Checkbox } from '@nextui-org/react';
import { Box, Flex } from '../../../components/containers';
import { AppLayout } from '@/layouts/AppLayout';
import { useMemo, useState } from 'react';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GetVideoGameById } from '@/graphql/Medio';
import { GetServerSideProps, NextPage } from 'next';
import { VideoGameAll, VideoGameServer } from '@/models/Medio';
import { Rating } from 'react-simple-star-rating';
import { IconButton } from '@/components/table/IconButton';
import { Check, Heart, Plus } from 'iconoir-react';
import { useRecommendations } from '@/hooks/useRecommendations';
import { useProgress } from '@/hooks/useProgress';

interface Props {
    videoGame: VideoGameAll,
    isInMyList: boolean,
    isInMyPreference: boolean,
    ratingByProfile: number,
    videoGameProgressByProfile: boolean,
}

const VideoGameDetailPage: NextPage<Props> = ({ videoGame, isInMyList, isInMyPreference, videoGameProgressByProfile, ratingByProfile }) => {
    const { myList, preference, rating, handleMyList, handleMyPreferences, handleRating } = useRecommendations(isInMyList, isInMyPreference, ratingByProfile)
    const { played, handleProgress } = useProgress(0, 0, videoGameProgressByProfile)
    const [isHovering, setIsHovering] = useState(false)
    const showTooltip = useMemo(() => rating > 0 || isHovering, [rating, isHovering])

    return (
        <AppLayout
            title={videoGame.title}
            description='Pagina administrativa de Marvel United'
        >
            <Flex
                css={{ 'mt': '$5', 'px': '$6', '@sm': { mt: '$10', px: '$16', } }}
                justify='between'
                align='center'
            >
                <Text h1>
                    {videoGame.title}
                </Text>
                <Flex css={{ gap: '$10', m: '$5' }}>
                    <Flex direction={'column'} >
                        <IconButton onClick={() => handleMyPreferences(videoGame.medio.id)} >
                            <Heart
                                fontSize={25}
                                fill={(preference) ? '#fe0000' : '#FFFFFF'}
                            />
                        </IconButton>
                        <Text>Me gusta</Text>
                    </Flex>
                    <Flex direction={'column'}>
                        <IconButton onClick={() => handleMyList(videoGame.medio.id)} >
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
                        src={`/medios/${videoGame.poster}`}
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
                            initialValue={(videoGame.medio.rating.ratingAvg) ? videoGame.medio.rating.ratingAvg : 0}
                        />
                        <Text size='$xl'>
                            {(videoGame.medio.rating.ratingAvg) ? videoGame.medio.rating.ratingAvg.toFixed(2) : 0}/5.00 ({videoGame.medio.rating.ratingCount})
                        </Text>
                    </Flex>
                </Grid>
                <Grid xs={8} direction='column' css={{ gap: '$7' }}>
                    <Box>
                        <Text h3 b> Sinopsis: </Text>
                        <Text size={'$xl'}>
                            {videoGame.synopsis}
                        </Text>
                    </Box>
                    <Text size={'$xl'}>
                        <Text b>Fecha de Estreno:</Text> {videoGame.releaseDate}
                    </Text>
                    <Text size={'$xl'}>
                        <Text b>Comic basado:</Text> {videoGame.based}
                    </Text>
                    <Text size={'$xl'}>
                        <Text b>Productora:</Text> {videoGame.medio.companyProduction.description}
                    </Text>
                    <Text size={'$xl'}>
                        <Text b>Tipo:</Text> {videoGame.type}
                    </Text>
                    <Text size={'$xl'}>
                        <Text b>Publicadora:</Text> {videoGame.companyPublisher.description}
                    </Text>
                    <Text size={'$xl'}>
                        <Text b>Plataformas:</Text> {videoGame.platforms.map(platform => platform.description).join(", ")}
                    </Text>
                    <Flex direction={'row'} wrap={'wrap'} align={'between'} justify={'around'}>
                        <Box css={{ width: '50%' }}>
                            <Checkbox isSelected={played} color="success" onChange={(played) => handleProgress(played, videoGame.medio.id)} size='md'>
                                ¿Ya lo jugaste?
                            </Checkbox>
                        </Box>
                        <Box css={{ width: '50%' }} >
                            <Text size={'$xl'} >Tu Calificación:</Text>
                            <Rating
                                size={35}
                                allowFraction
                                transition
                                showTooltip={showTooltip}
                                initialValue={rating}
                                onClick={(rating) => handleRating(videoGame.medio.id, rating)}
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
        const { data } = await client.query<VideoGameServer>({
            query: GetVideoGameById,
            variables: {
                videoGameId: id,
                profileId: activeProfile,
            },
        });
        return {
            props: {
                videoGame: data.videoGame,
                isInMyList: (data.profileMyList.medios.find(medio => medio.id === id)) ? true : false,
                isInMyPreference: (data.profilePreferenceList.medios.find(medio => medio.id === id)) ? true : false,
                ratingByProfile: data.ratingOfMedioByProfile,
                videoGameProgressByProfile: data.progressOfMedios.videoGameProgress
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

export default VideoGameDetailPage