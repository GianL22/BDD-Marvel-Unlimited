import { Button, Card, Col, Divider, Grid, Input, Link, Loading, Row, Spacer, Text } from '@nextui-org/react'
import { AuthLayout,  } from '../../../layouts';
import { CardPlan } from '@/components/plan/CardPlan';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from '@/hooks/useForm';

const memberships =
    {
      title: 'GOLD',
      features : ['Acceso iimitado a las últimas películas y series de Marvel', 'Información detallada de los personajes de Marvel', 'Solo un perfil de usuario.'],
      price: 9.99,
      recommended: false,
    }

const PaymentPage = () => {
    const [isLoading,setIsLoading] = useState(false);
    const {replace} = useRouter();
    const {allowSubmit,parsedFields} = useForm([
      {
        name: 'creditNumber',
        validate: (value: string) => value.match(/^\d{16}$/),
        validMessage: 'Tarjeta credito válida',
        errorMessage: 'Tarjeta credito invalida (Deben ser 16 digitos)',
        initialValue: '',
      },
      {
        name: 'expeditionDate',
        validate: (value: string) => value.match(/^(0[1-9]|1[0-2])-(\d{2})$/),
        validMessage: 'Fecha de vencimiento válida',
        errorMessage: 'La fecha debe tener un formato MM-AA',
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
        name: 'name',
        validate: (value: string) => value.trim().length >= 3,
        validMessage: 'Nombre válido',
        errorMessage: 'Mínimo 3 caracteres',
        initialValue: '',
      },
      {
        name: 'lastName',
        validate: (value: string) => value.trim().length >= 3,
        validMessage: 'Apellido válido',
        errorMessage: 'Mínimo 3 caracteres',
        initialValue: '',
      }
    ])
    const [creditNumber,expeditionDate,cvv,name,lastName] = parsedFields;
    const handleSubmit = async() => {
        setIsLoading(true)
      //   Notification(isDark).fire({
      //     title: 'Cargando',
      //     icon: 'info',
      //   })
        try {
          //! Falta implementar el register pero de la tarjeta de credito
          // await register({ 
          //     creditNumber: creditNumber.value,
          //     expeditionDate: expeditionDate.value,
          //     cvv: cvv.value,
          //     name: name.value,
          //     lastName: lastName.value,
          // })
          setTimeout(() => replace('/auth/register/membership'),700)
          // Notification(isDark).fire({
          //   title: 'Registro exitoso',
          //   icon: 'success',
          //   timer: 5000,
          // })
          setIsLoading(false)
        } catch (error: any) {
          // Notification(isDark).fire({
          //   title: error.response.data.message,
          //   icon: 'error',
          // })
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
                <CardPlan {...memberships}/>
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
                            value={creditNumber.value}
                            onChange={(e) => creditNumber.setValue(e.target.value)}
                            helperText={creditNumber.message}
                            helperColor={creditNumber.color}
                            status={creditNumber.color}
                            color={creditNumber.color}
                            size='lg'
                            bordered
                            clearable
                        />
                    
                        <Row justify='center' fluid align='center' css={{width:'100%'}}>
                            <Col css={{alignContent: 'center', justifyItems: 'center', width: '50%'}} >
                                <Input
                                    label='Vencimiento'
                                    placeholder='MM-AA'
                                    type='text'
                                    value={expeditionDate.value}
                                    onChange={(e) => expeditionDate.setValue(e.target.value)}
                                    helperText={expeditionDate.message}
                                    helperColor={expeditionDate.color}
                                    status={expeditionDate.color}
                                    color={expeditionDate.color}
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
                            value={name.value}
                            onChange={(e) => name.setValue(e.target.value)}
                            helperText={name.message}
                            helperColor={name.color}
                            status={name.color}
                            color={name.color}
                            size='lg'
                            bordered
                            />

                        <Input 
                            labelPlaceholder='Apellido' 
                            type="text"
                            value={lastName.value}
                            onChange={(e) => lastName.setValue(e.target.value)}
                            helperText={lastName.message}
                            helperColor={lastName.color}
                            status={lastName.color}
                            color={lastName.color}
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