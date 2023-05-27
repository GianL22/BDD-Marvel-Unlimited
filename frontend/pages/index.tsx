import type { NextPage } from 'next'
import { SubSignupLayout } from '@/layouts'
import { Hero } from '../components/Hero'

const Home: NextPage = () => {
  return (
    <SubSignupLayout
      title='Hero United'
      description= 'Landing Page'
    >
      <Hero />
    </SubSignupLayout>
  )
}

export default Home
