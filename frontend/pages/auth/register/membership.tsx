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
            </Flex>
            //! Hacerlo responsive
            <Flex css={{h : '100%'}}  direction={'row'} justify={'center'} align={'center'} >
              {
                data?.memberships.map((membership) => 
                    <Grid xs={ 12 } sm={12}  css={{height: "50%"}} key={membership.id} >
                      <CardPlan  
                        key={membership.id} 
                        id ={membership.id}
                        features={membership.description.split('/')}
                        price={membership.price}
                        title={membership.type}
                        recommended = { (membership.type === 'premium') ? true : false }
                      />
                      </Grid>
                  )
              }
            </Flex>
        </Flex>

      </LandingLayout>

    )
}
export default MembershipPage