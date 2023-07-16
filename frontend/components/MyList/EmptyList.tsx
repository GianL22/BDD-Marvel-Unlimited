import { Text, Link, Grid, Image } from '@nextui-org/react';

const EmptyList = () => {
    return (
        <Grid.Container
            gap={4}
            direction='row'
            alignContent='center'
            alignItems='center'
            justify='center'
            css={{ height: 'calc(100vh - 200px)' }}
        >
            <Grid xs={7} direction='column' css={{ gap: '$3' }}>
                <Text h2>¡Sin títulos en la lista!</Text>
                <Text h3>
                    Incluso el Caballero de la Luna necesita un poco de ayuda para enfrentar a sus enemigos.
                    <Link href='/app'>Agrega algunos títulos para empezar a prepararte. </Link>
                </Text>
            </Grid>
            <Grid alignContent='center' alignItems='center' xs={5} direction="column" css={{width:'100%'}}>
                <Image
                    src="/EmptyList.jpg"
                    width={'480px'}
                    objectFit="contain"
                    showSkeleton
                    containerCss={{
                        borderRadius: '5%',
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.6)',
                        overflow: 'hidden',
                    }}
                />
            </Grid>
        </Grid.Container>
    )
}

export default EmptyList