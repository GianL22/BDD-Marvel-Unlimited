import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Card, Container, Grid, Image, Input, Link, Loading, Radio, Spacer, Text, useTheme } from '@nextui-org/react'
import { LandingLayout } from '../../../layouts';
import { CardPlan  } from '../../../components/plan/CardPlan';
import { Flex, Box } from '../../../components/containers';

const memberships =[
  {
    title: 'GOLD',
    features : ['Acceso iimitado a las últimas películas y series de Marvel', 'Información detallada de los personajes de Marvel', 'Solo un perfil de usuario.'],
    price: 9.99,
    recommended: false,
  },
  {
    title: 'PREMIUM',
    features : ['Acceso limitado a películas y series de Marvel en calidad premium', 'Información detallada de los personajes de Marvel', 'Hasta 3 perfiles de usuario para compartir la suscripción con familiares o amigos.'],
    price: 15.99,
    recommended: true,
  },
  {
    title: 'VIP',
    features : ['Acceso ilimitado y exclusivo a películas, series, videojuegos y cómics de Marvel', 'Información detallada y actualizada constantemente sobre los personajes de Marvel y su relación con los cómics', 'Hasta 5 perfiles de usuario para compartir la suscripción con familiares o amigos.'],
    price: 79.99,
    recommended: false,
  }
]

const MembershipPage = () => {
    return(
      <LandingLayout
        title='Plans'
        description='Seleccion Membresia'
      >
          <Flex direction={'column'} justify={'center'} align={'center'} css={{padding:'$4',}}>
            <Text h2 css={{lineHeight: '$xs', pb:'$8'}}> 
                SELECCIONA EL PLAN IDEAL PARA TI
            </Text>
            <Flex direction={'row'} justify={'center'} align={'center'} css={{pb:'$8'}}> 
              <Box>
                <Image 
                      src="/Suscripcion.jpg"
                      width={'335px'} 
                      objectFit="contain" 
                      showSkeleton
                      containerCss={{
                          borderRadius: '5%',
                          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.6)',
                          overflow: 'hidden',
                      }}
                  />
              </Box> 
              <Text css={{lineHeight: '$xs', maxW:'60%', textAlign:'center', fontSize:'$2xl'}}>
                ¡Únete gratis a la comunidad de Marvel por tiempo limitado! Acceso exclusivo a contenido épico de Marvel
              </Text>
            {/* <Flex
              as={'li'}
              css={{py: '$2', gap: '$2', maxW:'20%'}}
              direction={'column'}
            >
              <Text span css={{lineHeight: '$xs'}}>
                ¡Ve todo lo que quieras.
              </Text>
              <Text span css={{lineHeight: '$xs'}}>
                Recomendaciones exclusivas para ti.
              </Text>
              <Text span css={{lineHeight: '$xs'}}>
                Puedes cambiar de plan cuando quieras.
              </Text>
            </Flex> */}
            </Flex>
            <Flex css={{h : '100%'}}  direction={'row'} justify={'center'} align={'center'} >
              {
                memberships.map((membership, id) => <CardPlan  key={id} {...membership} />)
              }
            </Flex>
        </Flex>

      </LandingLayout>

    )
}
export default MembershipPage