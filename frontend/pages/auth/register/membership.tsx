import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Card, Container, Grid, Image, Input, Link, Loading, Radio, Spacer, Text, useTheme } from '@nextui-org/react'
import { LandingLayout } from '../../../layouts';
import { CardPlan  } from '../../../components/plan/CardPlan';
import { Flex } from '../../../components/containers/Flex';

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
          <Flex direction={'column'} justify={'center'} align={'center'} css={{padding:'$4'}}>
            <Text h2 css={{lineHeight: '$xs'}}> 
                SELECCIONA EL PLAN IDEAL PARA TI
            </Text>
            <Flex direction={'row'} justify={'center'} align={'center'} > 
              <Text css={{lineHeight: '$xs', maxW:'60%', textAlign:'center', fontSize:'$4xl', pb:'128px'}}>
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
            {/* <Image
              height='360px'
              width='400px'
              src={'https://prod-ripcut-delivery.disney-plus.net/v1/variant/disney/DA2E198288BFCA56AB53340211B38DE7134E40E4521EDCAFE6FFB8CD69250DE9/scale?width=1200&aspectRatio=1.78&format=jpeg'}
              alt="Marvel"
            />     */}
            </Flex>
            <Flex css={{h : '100%'}}  direction={'row'} justify={'center'} align={'center'} >
              {
                memberships.map((membership) => <CardPlan {...membership} />)
              }
            </Flex>
        </Flex>

      </LandingLayout>

    )
}
export default MembershipPage