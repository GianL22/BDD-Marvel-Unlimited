import { useContext, useEffect, useState } from 'react';
import type { NextPage } from 'next'
import { Flex } from '@/components/containers';
import { AppLayout } from '@/layouts/AppLayout'
import { Text, Grid } from '@nextui-org/react';
import { useQuery } from '@apollo/client';
import { UpdateMembershipData } from '@/graphql/Membership';
import { CardPlan } from '@/components/plan/CardPlan';
import { AuthContext } from '@/context/auth';
import { Membership, Memberships } from '@/models/Membership';


const ChangeSuscriptionPage: NextPage = () => {
    const { user } = useContext(AuthContext);
    const { data } = useQuery(UpdateMembershipData,{
        variables: {
            userByIdId: user?.id
        }, 
        pollInterval : 1000
    });

  return ( 
    <AppLayout
      title='change Suscription'
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
                Cambiar Suscripcion:
            </Text>
        </Flex>

        <Grid.Container css={{h : '100%'}} justify='center' alignItems='center' >
            <Flex css={{h : '100%'}}  direction={'row'} justify={'center'} align={'center'} >
              {
                data?.userById.getMembership.map((membership: Membership) => 
                    <Grid xs={ 12 } sm={12}  css={{height: "50%"}} key={membership.id} >
                      <CardPlan  
                        key={membership.id} 
                        id ={membership.id}
                        features={membership.description.split('/')}
                        price={membership.price}
                        title={membership.type}
                        recommended = { (membership.type === 'Premium') ? true : false }
                        control = {true}
                      />
                      </Grid>
                  )
              }
            </Flex>
        </Grid.Container>
    </AppLayout>
  )
}

export default ChangeSuscriptionPage
