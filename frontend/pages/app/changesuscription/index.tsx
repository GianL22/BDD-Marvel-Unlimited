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


interface UpdateMembershipResponse {
  userById : {
      membership : Membership
  }
  memberships : Membership[]
}


const ChangeSuscriptionPage: NextPage = () => {


    const { user } = useContext(AuthContext);
    const { data } = useQuery<UpdateMembershipResponse>(UpdateMembershipData,{
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
            mb : '$12',
            '@sm': {
                mt: '$10',
                px: '$16',
            },
            }}
            justify='between'
            align='center'
            wrap= 'wrap'
        >

        <Text h1 >
                ¿Quieres cambiar de membresía?
            </Text>
        <Flex>

          <Text h3 >
              Posees la membresía: 
          </Text>
          <Text h2 css={{
                              p : '1px', ml : '16px',
                              backgroundColor: '$primary', borderRadius:'8px', fontSize: '24px',
                              minWidth: '100px', textAlign: 'center', color: '$white'
                          }}>
                                            {data?.userById.membership.type}

              </Text>
        </Flex>

        </Flex>
        <Grid.Container css={{h : '100%'}} justify='center' alignItems='center' >
              {
                data?.memberships.map((membership: Membership) => {

                      if ( membership.type === data?.userById.membership.type ) return
                  
                      return <Grid xs={ 12 } sm={6}  css={{height: '50%'}} justify='center' key={membership.id} >
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
                    }
                  )
              }
        </Grid.Container>
    </AppLayout>
  )
}

export default ChangeSuscriptionPage
