import type { NextPage } from 'next'
import { SubSignupLayout } from '../layouts'
import { Hero } from '../components/hero'
import { Spacer, Text } from '@nextui-org/react'
import { NavbarWrapper } from '@/components/navbar/Navbar'

const Home: NextPage = () => {
  return (
    <SubSignupLayout
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
    </SubSignupLayout>
  )
}

export default Home
