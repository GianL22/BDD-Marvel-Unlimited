import { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Card, Input, Link, Loading, Spacer, Text } from '@nextui-org/react'
import { useForm } from '../../../hooks/useForm';
import { AuthLayout } from '../../../layouts/AuthLayout';
// import { AuthContext } from '../../../context/auth';
// import { Notification } from '../../../notification';

const RegisterPage = () => {
    // const {register} = useContext(AuthContext)
    const [isLoading,setIsLoading] = useState(false)
    const {replace} = useRouter()
    const {allowSubmit,parsedFields} = useForm([
      {
        name: 'email',
        validate: (value: string) => value.match(/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi),
        validMessage: 'Email válido',
        errorMessage: 'Email inválido',
        initialValue: '',
      },
      {
        name: 'password',
        validate: (value: string) => value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
        validMessage: 'Contraseña segura',
        errorMessage: 'Debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número',
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
      },
      {
        name: 'birthdate',
        validate: (value: string) => value.trim().length >= 3,
        validMessage: 'Fecha de nacimiento válida',
        errorMessage: 'Fecha de nacimiento inválido',
        initialValue: '',
      },
    ])
    const [email,password,name,lastName,birthdate] = parsedFields;
    // const handleSubmit = async() => {
    //   setIsLoading(true)
    //   Notification(isDark).fire({
    //     title: 'Cargando',
    //     icon: 'info',
    //   })
    //   try {
    //     await register({
    //       email: email.value,
    //       password: password.value,
    //       fullName: name.value,
    //       dni: dniType + dni.value,
    //       phoneNumber: phoneNumber.value,
    //     })
    //     setTimeout(() => replace('/auth/login'),500)
    //     Notification(isDark).fire({
    //       title: 'Registro exitoso',
    //       icon: 'success',
    //       timer: 5000,
    //     })
    //     setIsLoading(false)
    //   } catch (error: any) {
    //     Notification(isDark).fire({
    //       title: error.response.data.message,
    //       icon: 'error',
    //     })
    //     setIsLoading(false)
    //   }
    // }
    return (
        <AuthLayout
          title='Regístrate'
          description='Registro de usuario'
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
                        height: '10%'
                    }}
                >
                    <Text h1>Regístrate</Text>
                </Card.Header>

                <Card.Body 
                    css={{
                        gap: '$15',
                        display: 'flex',
                        py: '$12',
                    }}
                >
                    <Input
                        labelPlaceholder='Nombre'
                        type='text'
                        value={name.value}
                        onChange={(e) => name.setValue(e.target.value)}
                        helperText={name.message}
                        helperColor={name.color}
                        status={name.color}
                        color={name.color}
                        size='lg'
                        bordered
                        clearable
                    />
                    <Input
                        labelPlaceholder='Apellido'
                        type='text'
                        value={lastName.value}
                        onChange={(e) => lastName.setValue(e.target.value)}
                        helperText={lastName.message}
                        helperColor={lastName.color}
                        status={lastName.color}
                        color={lastName.color}
                        size='lg'
                        bordered
                        clearable
                    />
                    <Input
                        labelPlaceholder='Email'
                        type='email'
                        value={email.value}
                        onChange={(e) => email.setValue(e.target.value)}
                        helperText={email.message}
                        helperColor={email.color}
                        status={email.color}
                        color={email.color}
                        size='lg'
                        bordered
                        clearable
                    />
                    <Input.Password
                        labelPlaceholder='Contraseña'
                        value={password.value}
                        onChange={(e) => password.setValue(e.target.value)}
                        helperText={password.message}
                        helperColor={password.color}
                        status={password.color}
                        color={password.color}
                        size='lg'
                        bordered
                    />

                    <Input 
                        label='Fecha de Nacimiento' 
                        type="date"
                        value={birthdate.value}
                        onChange={(e) => birthdate.setValue(e.target.value)}
                        helperText={birthdate.message}
                        helperColor={birthdate.color}
                        status={birthdate.color}
                        color={birthdate.color}
                        size='lg'
                        bordered 
                    />
                    <Button
                        size='lg'
                        // onPress={handleSubmit}
                        // disabled={!allowSubmit || dniType === '' || isLoading }
                    >
                        {!isLoading ? 'Registrarse' : <Loading type='points' />}
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
                    <Link href='/auth/login'>
                        Ya tienes una cuenta?
                    </Link>
                </Card.Footer>
            </Card>
        </AuthLayout>
    )
}
export default RegisterPage