import { Grid, Image, Text } from '@nextui-org/react'
import { LandingLayout } from '../../../layouts';
import { CardPlan  } from '../../../components/plan/CardPlan';
import { Flex, Box } from '../../../components/containers';
import { useQuery } from '@apollo/client';
import { GetMemberships } from '@/graphql/Membership';
import { Memberships } from '@/models/Membership';

const MembershipPage = () => {
    const { data, error } = useQuery<Memberships>(GetMemberships);

    return(
      <LandingLayout
        title='Plans'
        description='Seleccion Membresia'
      >
          <Flex direction={'column'} justify={'center'} align={'center'} css={{padding:'$4',}}>
            <Text h2 css={{lineHeight: '$xs', pb:'$8'}}> 
                SELECCIONA EL PLAN IDEAL PARA TI
            </Text>
            <Flex direction={'row'} justify={'center'} align={'center'} css={{pb:'$8'}} wrap={'wrap'}> 
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
            </Flex>
            <Grid.Container gap={2} >
              {
                data?.memberships.map((membership) => 
                    <Grid xs={ 12 }  sm={ 6 } md = { 4 } css={{height: "50%"}} key={membership.id} justify='center'>
                      <CardPlan  
                        id ={membership.id}
                        features={membership.description.split('/')}
                        price={membership.price}
                        title={membership.type}
                        recommended = { (membership.type === 'Premium') ? true : false }
                      />
                    </Grid>
                  )
              }
            </Grid.Container>
        </Flex>

      </LandingLayout>

    )
}
export default MembershipPage