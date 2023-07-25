import type { NextPage } from 'next'
import { Grid, Input, Loading, Text } from '@nextui-org/react';
import { AppLayout } from '../../../layouts/AppLayout';
import { MedioCard } from '@/components/medio/MedioCard';
import { Flex } from '@/components/containers';
import { useQuery } from '@apollo/client';
import { Search } from 'iconoir-react';
import { SearchMedia } from '@/graphql/Home';
import { Medio } from '@/models/Home';
import { useState } from 'react';

interface DataResponse {
    search: Medio[];
}

const SearchPage: NextPage = () => {
    const [search, setSearch] = useState('')
    const { data, error } = useQuery<DataResponse>(SearchMedia, {
        variables:{
            toSearch: search,
        }
    });
    
    if (error) return <Text>Imposible Cargar</Text>
    return (
        <AppLayout
            title='Busqueda'
            description='Marvel Unlimited - Mejor herramienta'
        >
            <Flex
                css={{ 'mt': '$5', 'px': '$6', '@sm': { mt: '$10', px: '$16', } }}
                justify='between'
                align='center'
            >
                <Input 
                    css={{marginBottom:'$12'}}
                    contentRightStyling={false}
                    placeholder="Encuentra todo sobre el universo de Marvel aquí..."
                    contentRight={ <Search fontSize={22}/>}
                    onChange={(e) =>setSearch(e.target.value)}
                    height={'50%'}
                    width='100%'
                    size='xl'
                    type='search'
                />
            </Flex>
            <Flex>
                {
                    (!data)
                        ? (<Loading /> )
                        : (
                            <Grid.Container gap={2} css={{ w: '100vw', px: '$12' }}>
                                {
                                    data.search.map((media) => (
                                        <Grid xs={12} sm={6} md={3} key={media.id}>
                                            <MedioCard
                                                img={`/medios/${media.poster}`}
                                                rating={(!media?.rating.ratingAvg) ? 'N.C. ' : media.rating.ratingAvg.toFixed(2)}
                                                title={media.title}
                                                url={`/app/${media.type}`}
                                                id={media.id}
                                            />
                                        </Grid>
                                    ))
                                }
                            </Grid.Container>
                        )
                }
            </Flex>
        </AppLayout>
    )
}

export default SearchPage
