import { Button, Card, Grid, Text } from "@nextui-org/react"
import { Box, Flex } from "../containers"
import { Check } from "iconoir-react"
import Cookies from 'js-cookie';
import { useRouter } from "next/router";


interface Props {
    id: string | undefined;
    title: string | undefined,
    features: string[] | undefined,
    price: number | undefined,
    recommended?: boolean | undefined,
    disableButton?: boolean
}

export const CardPlan = ({id = '', title='',  features = [], price = 0, recommended= false, disableButton = false } : Props) => {
    const {replace} = useRouter();
    const saveSuscription = (membershipId: string) => {
        Cookies.set('membershipId', membershipId , { expires: 7 })
        setTimeout(() => replace('/auth/register/paymentcredit'),700)
    }
    return (
        <Card
            css={{
                p: '$6', ml:'60px', width: '200px',
                minWidth:'500px', h:'600px', background:'$backgroundContrast',
                borderColor:'$primary', borderWidth:'3px'
            }}
            variant={ (recommended) ? 'bordered' : 'flat' }
            isHoverable
        >
            
                {
                    (recommended) ? 
                    <Text h3 css={{
                        lineHeight: '$xs', position: 'absolute',
                        top:'-8px', left:'334px', width:'200px',
                        backgroundColor: '$primary', borderRadius:'8px', padding:'$6',
                    }}>
                        Recomendado
                    </Text> : <></>
                }
            <Card.Header>
                <Grid.Container css={{p: '$8'}} >
                    <Text h2 css={{lineHeight: '$xs'}}>
                        $
                    </Text>
                    <Flex justify={'center'} align={'center'}>
                        <Text h1 css={{lineHeight: '$xs', paddingLeft:'$8', fontSize:'$6xl', padding:'$12'}}>
                            {price}
                        </Text>
                        <Text h3 b css={{lineHeight: '$xs'}}>
                            /mes
                        </Text>
                    </Flex>
                    <Grid xs={12} css={{ display: 'flex', justifyContent: 'center', alignContent: 'center'}}>
                        <Text css={{
                            backgroundColor: '$primary', borderRadius:'8px', fontSize: '16px',
                            minWidth: '100px', textAlign: 'center', color: '$white'
                        }}>
                            {title.toUpperCase()}
                        </Text>
                    </Grid>
                </Grid.Container>
            </Card.Header>
            <Card.Body css={{py: '$2'}}>
                
                    <Box as={'ul'} css={{h:'80%', overflow:'hidden'}}>
                        {features.map((feature) => {
                            return (
                                <Flex
                                    as={'li'}
                                    css={{py: '$2', gap: '$2'}}
                                    align={'center'}
                                    key={ feature }
                                >
                                    <Box>
                                        <Check />
                                    </Box>
                                    <Text span key={ feature } >
                                        {feature}
                                    </Text>
                                </Flex>)}
                        )}
                    </Box>
                    <Flex justify={'center'} align={'center'}>
                        {
                            (disableButton)
                                ? <></>
                                :   <Button 
                                        css={{mt: '$7', mb: '$12', width:'80%'}}
                                        onClick={() => saveSuscription(id)}
                                    >
                                        Suscribete
                                    </Button>
                        }
                    </Flex>
            </Card.Body>
        </Card>

    )
}