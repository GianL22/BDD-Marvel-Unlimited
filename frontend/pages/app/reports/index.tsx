import { Flex } from '@/components/containers';
import { AppLayout } from '@/layouts/AppLayout'
import { Text, Row, Col, Grid, Link, Button, Spacer } from '@nextui-org/react';
import type { NextPage } from 'next'


const reportsPage: NextPage = () => {
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
                xs={ 12 } 
                sm={ 6 } 
                
            >
                <Link href='' css={{'minWidth': '100%',}}>
                    <Button auto bordered css={{'minWidth': '50%'}}>
                        Lideres con Poderes Artificiales
                    </Button>
                </Link>

                <Spacer y={4}/>

                <Link href='' css={{'minWidth': '100%'}}>
                    <Button auto bordered css={{'minWidth': '50%'}}>
                        Objetos de Superhéroes y Supervillanos
                    </Button>
                </Link>

                <Spacer y={4}/>

                <Link href='' css={{'minWidth': '100%',}}>
                    <Button auto bordered css={{'minWidth': '50%'}}>
                        Películas Animadas Rentables y Largas
                    </Button>
                </Link>

                <Spacer y={4}/>

                <Link href='' css={{'minWidth': '100%',}}>
                    <Button auto bordered css={{'minWidth': '50%'}}>
                        Upgrade a Premium
                    </Button>
                </Link>

            </Grid>

            <Grid 
                alignContent='space-between'   
                alignItems='center' 
                direction="column"
                xs={ 12 } 
                sm={ 6 } 
            >
                <Link href='' css={{'minWidth': '100%'}}>
                    <Button auto bordered css={{'minWidth': '50%'}}>
                        Series Extensas
                    </Button>
                </Link>

                <Spacer y={4}/>


                <Link href='' css={{'minWidth': '100%',}}>
                    <Button auto bordered css={{'minWidth': '50%'}}>
                        Locaciones de Combate
                    </Button>
                </Link>

                <Spacer y={4}/>


                <Link href='' css={{'minWidth': '100%',}}>
                    <Button auto bordered css={{'minWidth': '50%'}}>
                        Poderes Heredados "Super" en Villanos
                    </Button>
                </Link>

                <Spacer y={4}/>

                <Link href='' css={{'minWidth': '100%'}}>
                    <Button auto bordered css={{'minWidth': '50%'}}>
                        Jugando al Límite
                    </Button>
                </Link>
            </Grid>
        </Grid.Container>
    </AppLayout>
  )
}

export default reportsPage