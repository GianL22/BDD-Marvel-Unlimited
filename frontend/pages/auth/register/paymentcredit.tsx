import { Button, Card, Col, Divider, Grid, Input, Link, Loading, Row, Spacer, Text, useTheme } from '@nextui-org/react'
import { AuthLayout,  } from '../../../layouts';
import { CardPlan } from '@/components/plan/CardPlan';
import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from '@/hooks/useForm';
import { Notification } from '@/notification';
import { AuthContext } from '@/context/auth';
import Cookies from 'js-cookie';
import { useQuery } from '@apollo/client';
import { GetMembership } from '@/graphql/Membership';
import { MemberData } from '@/models/Membership';

const PaymentPage = () => {
    const { data, error } = useQuery<MemberData>( GetMembership, {
        variables:{
            membershipId: `${ Cookies.get('membershipId') }`
        }
    } );

    const { register } = useContext(AuthContext)
    const {isDark} = useTheme();
    const [isLoading,setIsLoading] = useState(false);
    const {replace} = useRouter();
    const {allowSubmit,parsedFields} = useForm([
      {
        name: 'cardNumber',
        validate: (value: string) => value.match(/^\d{16}$/),
        validMessage: 'Tarjeta credito válida',
        errorMessage: 'Tarjeta credito invalida (Deben ser 16 digitos)',
        initialValue: '',
      },
      {
        name: 'expiration',
        validate: (value: string) => value.match(/^(0[1-9]|1[0-2])\/([0-9]{2})$/),
        validMessage: 'Fecha de vencimiento válida',
        errorMessage: 'La fecha debe tener un formato MM/AA',
        initialValue: '',
      },
      {
        name: 'cvv',
        validate: (value: string) => value.match(/^\d{3,4}$/),
        validMessage: 'CVV válido',
        errorMessage: 'Debe estar en un rango de 3 o 4 digitos',
        initialValue: '',
      },
      {
        name: 'ownerName',
        validate: (value: string) => value.trim().length >= 3,
        validMessage: 'Nombre válido',
        errorMessage: 'Mínimo 3 caracteres',
        initialValue: '',
      },
      {
        name: 'ownerLastName',
        validate: (value: string) => value.trim().length >= 3,
        validMessage: 'Apellido válido',
        errorMessage: 'Mínimo 3 caracteres',
        initialValue: '',
      }
    ])
    const [cardNumber,expiration,cvv,ownerName,ownerLastName] = parsedFields;
    const handleSubmit = async() => {
        setIsLoading(true)
        Notification(isDark).fire({
          title: 'Cargando',
          icon: 'info',
        })
        try {
            const signup = JSON.parse(Cookies.get('registerData')!)
            await register( 
                {
                    ...signup
                }, 
                {
                    cardNumber: cardNumber.value,
                    expiration: expiration.value,
                    cvv: +cvv.value,
                    ownerName: ownerName.value,
                    ownerLastName: ownerLastName.value,
                }
            )
            setTimeout(() => replace('/app/profiles'),700)
            Cookies.remove('registerData');
            Cookies.remove('membershipId');

            Notification(isDark).fire({
                title: 'Registro exitoso',
                icon: 'success',
                timer: 5000,
            })
            setIsLoading(false)
        } catch (error: any) {
            Notification(isDark).fire({
            title: error.message,
            icon: 'error',
            })
            setIsLoading(false)
        }
      }
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
                <CardPlan 
                    key={data?.membership.id} 
                    id ={data?.membership.id}
                    features={data?.membership.description.split('/')}
                    price={data?.membership.price}
                    title={data?.membership.type}
                    recommended = { (data?.membership.type === 'premium') ? true : false }
                    disableButton =  { true }
                />
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
                            value={cardNumber.value}
                            onChange={(e) => cardNumber.setValue(e.target.value)}
                            helperText={cardNumber.message}
                            helperColor={cardNumber.color}
                            status={cardNumber.color}
                            color={cardNumber.color}
                            size='lg'
                            bordered
                            clearable
                        />
                    
                        <Row justify='center' fluid align='center' css={{width:'100%'}}>
                            <Col css={{alignContent: 'center', justifyItems: 'center', width: '50%'}} >
                                <Input
                                    label='Vencimiento'
                                    placeholder='MM/AA'
                                    type='text'
                                    value={expiration.value}
                                    onChange={(e) => expiration.setValue(e.target.value)}
                                    helperText={expiration.message}
                                    helperColor={expiration.color}
                                    status={expiration.color}
                                    color={expiration.color}
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
                                    value={cvv.value}
                                    onChange={(e) => cvv.setValue(e.target.value)}
                                    helperText={cvv.message}
                                    helperColor={cvv.color}
                                    status={cvv.color}
                                    color={cvv.color}
                                    size='lg'
                                    bordered
                                    clearable
                                />
                            </Col>
                        </Row>   
                        <Input
                            labelPlaceholder='Nombre'
                            value={ownerName.value}
                            onChange={(e) => ownerName.setValue(e.target.value)}
                            helperText={ownerName.message}
                            helperColor={ownerName.color}
                            status={ownerName.color}
                            color={ownerName.color}
                            size='lg'
                            bordered
                            />

                        <Input 
                            labelPlaceholder='Apellido' 
                            type="text"
                            value={ownerLastName.value}
                            onChange={(e) => ownerLastName.setValue(e.target.value)}
                            helperText={ownerLastName.message}
                            helperColor={ownerLastName.color}
                            status={ownerLastName.color}
                            color={ownerLastName.color}
                            size='lg'
                            bordered 
                            />
                        <Button
                            size='lg'
                            onPress={handleSubmit}
                            disabled={!allowSubmit || isLoading }
                            >
                            {!isLoading ? 'Comprar Ahora' : <Loading type='points' />}
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
export default PaymentPage