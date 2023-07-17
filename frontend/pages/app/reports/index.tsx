import type { NextPage } from 'next'
import { Flex } from '@/components/containers';
import { AppLayout } from '@/layouts/AppLayout'
import { Text, Row, Col, Grid, Link, Button, Spacer } from '@nextui-org/react';
import { useRouter } from 'next/router';


const ReportsPage: NextPage = () => {
    const { push } = useRouter()
    return (
        <AppLayout
            title='Reportes'
            description='Reportes sobre Marvel'
        >
            <Flex
                css={{
                    'mt': '$5',
                    'px': '$6',
                    '@sm': {
                        mt: '$10',
                        px: '$16',
                    },
                }}
                justify='between'
                align='center'
            >
                <Text h1>
                    Reportes disponibles:
                </Text>
            </Flex>

            <Grid.Container gap={8} justify="center" alignContent='center' alignItems='center'>
                <Grid
                    alignContent='space-between'
                    alignItems='center'
                    direction="column"
                    xs={12}
                    sm={6}

                >
                    <Link css={{ 'minWidth': '100%', }}>
                        <Button  
                            auto 
                            bordered 
                            size={'xl'} 
                            css={{ 'minWidth': '100%', fontSize: '$2xl' }}
                            onPress={async () => await push('reports/naturalPowers')}
                        >
                            Lideres con Poderes Artificiales
                        </Button>
                    </Link>

                    <Spacer y={4} />

                    <Link href='reports/objectsMostUsed' css={{ 'minWidth': '100%' }}>
                        <Button auto bordered size={'xl'} css={{ 'minWidth': '100%', fontSize: '$2xl' }}>
                            Objetos de Superhéroes y Supervillanos
                        </Button>
                    </Link>

                    <Spacer y={4} />
                    <Link css={{ 'minWidth': '100%', }}>
                        <Button
                            auto
                            bordered
                            onPress={async () => await push('reports/profitableLongAnimatedFilms')}
                            size={'xl'}
                            css={{ 'minWidth': '100%', fontSize: '$2xl' }}
                        >
                            Peliculas Animadas Rentables y Largas
                        </Button>
                    </Link>
                    <Spacer y={4} />

                    <Link css={{ 'minWidth': '100%', }}>
                        <Button
                            auto
                            bordered
                            onPress={async () => await push('reports/upgradepremium')}
                            size={'xl'}
                            css={{ 'minWidth': '100%', fontSize: '$2xl' }}
                        >
                            Upgrade a Premium
                        </Button>
                    </Link>

                </Grid>

                <Grid
                    alignContent='space-between'
                    alignItems='center'
                    direction="column"
                    xs={12}
                    sm={6}
                >
                    <Link css={{ 'minWidth': '100%', }}>
                        <Button
                            auto
                            bordered
                            onPress={async () => await push('reports/extensiveSeries')}
                            size={'xl'}
                            css={{ 'minWidth': '100%', fontSize: '$2xl' }}
                        >
                            Series Extensas
                        </Button>
                    </Link>

                    <Spacer y={4} />


                    <Link href='reports/placesFight' css={{ 'minWidth': '100%', }}>
                        <Button auto bordered size={'xl'} css={{ 'minWidth': '100%', fontSize: '$2xl' }}>
                            Locaciones de Combate
                        </Button>
                    </Link>

                    <Spacer y={4} />


                    <Link href='reports/inheritedPowers' css={{ 'minWidth': '100%', }}>
                        <Button auto bordered size={'xl'} css={{ 'minWidth': '100%', fontSize: '$2xl' }}>
                            Poderes Heredados "Super" en Villanos
                        </Button>
                    </Link>

                    <Spacer y={4} />

                    <Link css={{ 'minWidth': '100%' }}>
                        <Button 
                            auto 
                            bordered 
                            size={'xl'} 
                            css={{ 'minWidth': '100%', fontSize: '$2xl' }}
                            onPress={async () => await push('reports/playingAtTheLimit')}
                        >
                            Jugando al Límite
                        </Button>
                    </Link>
                </Grid>
            </Grid.Container>
        </AppLayout>
    )
}

export default ReportsPage
