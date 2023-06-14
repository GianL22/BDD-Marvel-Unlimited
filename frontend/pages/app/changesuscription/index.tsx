import { useEffect, useState } from 'react';
import type { NextPage } from 'next'
import { Flex } from '@/components/containers';
import { AppLayout } from '@/layouts/AppLayout'
import { Text, Row, Col, Grid, Link, Button, Spacer } from '@nextui-org/react';
import { useRouter } from 'next/router';
import { useMutation, useQuery } from '@apollo/client';
import { Memberships } from '@/models/Membership';
import { ChangeSuscription, GetMemberships } from '@/graphql/Membership';
import { CardPlan } from '@/components/plan/CardPlan';


const ChangeSuscriptionPage: NextPage = () => {
    const [membershipIdSelected, setMembershipIdSelected] = useState<string>("")
    const { data, error } = useQuery<Memberships>(GetMemberships);


    const [changeSuscription] = useMutation(ChangeSuscription, 
        {
            variables : {
                createSuscriptionInput: {
                    dateSuscription: new Date().toISOString().slice(0, 10),
                    membership: membershipIdSelected
                }
            }
        }
    )
        
    useEffect(() => {
        if ( membershipIdSelected === "" ) return 
        changeSuscription()

    }, [membershipIdSelected])
    
    const onChangeSuscription = (membershipId : string) => {
        setMembershipIdSelected(membershipId)
    }

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
              {
                data?.memberships.map((membership) => 
                    <Grid xs={ 12 } sm={4}  css={{height: "50%"}} key={membership.id} >
                        <Button auto bordered css={{'minWidth': '50%'}} onPress={() => onChangeSuscription(membership.id)}>
                            {membership.type}
                        </Button>
                    </Grid>
                  )
              }
            </Grid.Container>
    </AppLayout>
  )
}

export default ChangeSuscriptionPage
