import { Button, Card, Col, Divider, Grid, Image, Input, Link, Loading, Radio, Row, Spacer, Text, useTheme } from '@nextui-org/react'
import { AuthLayout,  } from '../../../layouts';
import { Box, Flex } from '../../../components/containers';
import { CardPlan } from '@/components/plan/CardPlan';

const MembershipPage = () => {
    return(
      <AuthLayout
        title='Payment'
        description='Metodo de Pago'
      >
        <Grid.Container gap={2} justify="center">
            <Grid 
                xs={ 12 } 
                sm={ 6 } 
                css={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '4px',
                    height: '90vh',
                    width: '100vw',
                }}
            >
                <CardPlan />
            </Grid>
            <Grid 
                xs={ 12 } 
                sm={ 6 } 
                css={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '4px',
                    height: '90vh',
                    width: '100vw',
                }}
            >
                <Card
                    css={{
                        width: 'fit-content',
                        py: '$10',
                        px: '$7',
                    }} 
                >
                    <Card.Header
                        css={{
                            display: 'flex',
                            justifyContent: 'center',
                            height: '20%'
                        }}
                    >
                        <Text h1>Tarjeta Credito</Text>
                    </Card.Header>
                    <Card.Body 
                        css={{
                            gap: '$15',
                            display: 'flex',
                            py: '$11',
                        }}
                    >
                        <Input
                            labelPlaceholder='Numero Tarjeta'
                            type='text'
                            // value={name.value}
                            // onChange={(e) => name.setValue(e.target.value)}
                            // helperText={name.message}
                            // helperColor={name.color}
                            // status={name.color}
                            // color={name.color}
                            size='lg'
                            bordered
                            clearable
                        />
                    
                        <Row justify='center' fluid align='center' css={{width:'100%'}}>
                            <Col css={{alignContent: 'center', justifyItems: 'center', width: '50%'}} >
                                <Input
                                    label='Vencimiento'
                                    placeholder='mm/aa'
                                    type='text'
                                    // value={name.value}
                                    // onChange={(e) => name.setValue(e.target.value)}
                                    // helperText={name.message}
                                    // helperColor={name.color}
                                    // status={name.color}
                                    // color={name.color}
                                    size='lg'
                                    bordered
                                    clearable
                                />
                            </Col>
                            <Spacer x={2}/>
                            <Col css={{alignContent: 'center', justifyItems: 'center', width: '50%'}}>
                                <Input
                                    label='CVV'
                                    placeholder='345'
                                    type='text'
                                    // value={email.value}
                                    // onChange={(e) => email.setValue(e.target.value)}
                                    // helperText={email.message}
                                    // helperColor={email.color}
                                    // status={email.color}
                                    // color={email.color}
                                    size='lg'
                                    bordered
                                    clearable
                                />
                            </Col>
                        </Row>   
                        <Input
                            labelPlaceholder='Nombre'
                            // value={password.value}
                            // onChange={(e) => password.setValue(e.target.value)}
                            // helperText={password.message}
                            // helperColor={password.color}
                            // status={password.color}
                            // color={password.color}
                            size='lg'
                            bordered
                            />

                        <Input 
                            labelPlaceholder='Apellido' 
                            type="text"
                            // value={password.value}
                            // onChange={(e) => password.setValue(e.target.value)}
                            // helperText={password.message}
                            // helperColor={password.color}
                            // status={password.color}
                            // color={password.color}
                            size='lg'
                            bordered 
                            />
                        <Button
                            size='lg'
                            // onPress={handleSubmit}
                            // disabled={!allowSubmit || dniType === '' || isLoading }
                            >
                            {/* {!isLoading ? 'Registrarse' : <Loading type='points' />} */}
                            Comprar Ahora
                        </Button>
                    </Card.Body>
                    <Card.Footer
                        css={{
                            display: 'flex',
                            justifyContent: 'end',
                            height: '1%'
                        }}
                    >
                        <Spacer x={12} />
                        <Link href='/auth/register/membership'>
                            Seleccionar otra Membresia
                        </Link>
                    </Card.Footer>
                </Card>
            </Grid>

        </Grid.Container>


      </AuthLayout>

    )
}
export default MembershipPage