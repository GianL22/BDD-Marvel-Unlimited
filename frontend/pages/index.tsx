import type { NextPage } from 'next'
import { LandingLayout } from '../layouts'
import { Spacer, Text } from '@nextui-org/react'
import { Hero } from '@/components/hero'

const Home: NextPage = () => {
  return (
    <LandingLayout
      title='Hero United'
      description= 'Landing Page'
    >
      <Hero />
      <Spacer y={2}/>
      <Text
        size={'$xl'}
        css={{
          fontStyle:"italic",
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        "Y ahora, hasta que nos volvamos a encontrar, 
        ¡que las bendiciones de Asgard caigan sobre ti!"
      </Text>
      <Text
        b
        size={'$xl'}
        css={{
          marginTop: '0.5rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'end'
        }}
      >
        - Stan Lee
      </Text>
    </LandingLayout>
  )
}

export default Home
