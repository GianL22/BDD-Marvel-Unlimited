import {  Container, Grid, Image, Link, Text } from '@nextui-org/react';
import { AuthLayout } from '../layouts';

const Custom404 = () => {
  return (
    <AuthLayout title='Page not found' description='No hay nada que mostrar aquí'>
      <Container 
        display='flex' 
        justify='center'
        alignContent='center'
        alignItems='center'
        css={{
            height:'calc(100vh - 200px)',
            flexDirection: "column"
        }}
      >
        <Grid
            xs={ 12 } 
            sm={ 6 } 
            css={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '8px',
                height: '90vh',
                width: '100vw',
            }}
        >
        <Text size='xxx-large' weight="bold" >Error 404 - Ultron derrotado|</Text>
        <Text size='$xl' weight="bold">Falla en el protocolo... Saliendo del programa...</Text>
        <Text size='$xl' weight="normal">
            Ultron ha sido vencido y esta página ha quedado en el caos. 
            Los héroes están trabajando para restaurarla. 
            ¡Explora otros rincones de nuestro universo en busca de nuevas sorpresas!
        </Text>
        <Link href={'/app'} animated color={'warning'}>
            <Text size='$xl'>Te invitamos a explorar otros rincones de nuestro universo Marvel. </Text>
        </Link>
        </Grid>

        <Grid
            xs={ 12 } 
            sm={ 6 } 
            css={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: '4px',
                height: '90vh',
                width: '100vw',
            }}
        >
            <Image 
                src="/404-Image/Ultron.png"
                objectFit="contain"
                width={'500px'} 
                showSkeleton
                containerCss={{
                    borderRadius: '5%',
                    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.6)',
                    overflow: 'hidden',
                }}
            />
        </Grid>
      </Container>
    </AuthLayout>
  )  
}

export default Custom404;