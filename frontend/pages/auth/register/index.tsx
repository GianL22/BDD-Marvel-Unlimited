import { useEffect, useMemo, useState } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import { Button, Card, Grid, Input, Link, Loading, Spacer, Text, useTheme } from '@nextui-org/react'
import { useForm } from '../../../hooks/useForm';
import { AuthLayout } from '../../../layouts/AuthLayout';
import { Notification } from '../../../notification';
import { useQuery } from '@apollo/client';
import { ExistEmail } from '@/graphql/User';
import { DropdownRegister } from '@/components/dropdown/DropdownRegister';
import { GetCountries } from '@/graphql/Countries';

interface RegisterData{
    email:string,
    username: string,
    password: string,
    name: string,
    birthdate: string,
    lastName: string, 
    city : string
}

interface countriesResponse {
    countries: {
      description: string;
      cities : {
        description: string;
        id : string
      }[]
    }[]
}


const RegisterPage = () => {
    const {isDark} = useTheme()
    const [isLoading,setIsLoading] = useState(false);
    
    const {replace} = useRouter();

    const {data : dataCountries, error, loading} =  useQuery<countriesResponse>(GetCountries)
    const [countrySelected, setCountrySelected] = useState<string>('Pais')
    const [citySelected, setCitySelected] = useState({ description: 'Ciudad', id : '' })

    const countries = useMemo(()=> {

        if ( !dataCountries ) return ;
        return dataCountries.countries.map(({description}) => description)

      }, [ dataCountries ])


      const cities = useMemo(()=> {
      
      
        if ( !dataCountries || !countries ) return;
        return dataCountries.countries.find(
                  ({description}) => description === countrySelected
                )?.cities.map(
                  (city) => city
                )
        
      }, [ countrySelected ])
      
    const onSelectCountry = (country : string) => {
      setCountrySelected(country)
      setCitySelected({ description: 'Ciudad', id : '' })
    }

    const onSelectCity = (cityDescription : string) => {
      const city = cities?.find(({description}) => description === cityDescription)
      if ( !city ) return;
      setCitySelected(city)
    }


    const {allowSubmit,parsedFields} = useForm([
      {
        name: 'email',
        validate: (value: string) => value.match(/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi),
        validMessage: 'Email válido',
        errorMessage: 'Email inválido',
        initialValue: (!Cookies.get('registerData')) ? '' : JSON.parse(Cookies.get('registerData')!).email,
      },
      {
        name: 'password',
        // validate: (value: string) => value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
        validate: (value: string) => value.match(/^[^A-Z]*[A-Z][^A-Z]*$/),

        validMessage: 'Contraseña segura',
        errorMessage: 'Debe tener al menos 8 caracteres, una mayúscula, una minúscula y un número',
        initialValue: (!Cookies.get('registerData')) ? '' : JSON.parse(Cookies.get('registerData')!).password,
      },
      {
        name: 'name',
        validate: (value: string) => value.trim().length >= 3,
        validMessage: 'Nombre válido',
        errorMessage: 'Mínimo 3 caracteres',
        initialValue: (!Cookies.get('registerData')) ? '' : JSON.parse(Cookies.get('registerData')!).name,
      },
      {
        name: 'lastName',
        validate: (value: string) => value.trim().length >= 3,
        validMessage: 'Apellido válido',
        errorMessage: 'Mínimo 3 caracteres',
        initialValue: (!Cookies.get('registerData')) ? '' : JSON.parse(Cookies.get('registerData')!).lastName,
      },
      {
        name: 'birthdate',
        validate: (value: string) => value.trim().length >= 3,
        validMessage: 'Fecha de nacimiento válida',
        errorMessage: 'Fecha de nacimiento inválido',
        initialValue: (!Cookies.get('registerData')) ? '' : JSON.parse(Cookies.get('registerData')!).birthdate,
      },
    ])
    const [email,password,name,lastName,birthdate] = parsedFields;
    const { data } = useQuery(ExistEmail,{
        variables: {email: email.value}
    }); 
    const handleSubmit = async() => {
      setIsLoading(true)
      Notification(isDark).fire({
        title: 'Cargando',
        icon: 'info',
      })
      try {
        if (data || !dataCountries) throw Error;
        const registerData = {
            email: email.value,
            username: email.value.split('@',1)[0],
            password: password.value,
            name: name.value,
            birthdate: birthdate.value,
            lastName: lastName.value, 
            city : citySelected.id
        }
        Cookies.set('registerData', JSON.stringify(registerData), { expires: 7 })
        setTimeout(() => replace('/auth/register/membership'),700)
        Notification(isDark).fire({
          title: 'Registro exitoso',
          icon: 'success',
          timer: 5000,
        })
        setIsLoading(false)
      } catch (error: any) {
        Notification(isDark).fire({
          title: "El correo ya se encuentra registrado",
          icon: 'error',
        })
        setIsLoading(false)
      }
    }
    if ( loading ) return <Loading size='lg' />
    return (
        <AuthLayout
          title='Regístrate'
          description='Registro de usuario'
        >
            <Card
                css={{
                    width: 'fit-content',
                    py: '$4',
                    px: '$7',
                }} 
            >
                <Card.Header
                    css={{
                        display: 'flex',
                        justifyContent: 'center',
                        height: '8%'
                    }}
                >
                    <Text h1>Regístrate</Text>
                </Card.Header>

                <Card.Body 
                    css={{
                        gap: '$17',
                        display: 'flex',
                        flexDirection: 'column',
                        py: '$12',
                        justifyContent: 'space-between',
                        margin: '$0'
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
                    <Grid.Container  alignContent='center'  justify='center' css={{ width : '100%'}}>
                      <Grid xs={6}>
                        {
                          (cities)
                          ? 
                          <DropdownRegister
                              listkeys={cities.map(({description}) => description)}
                              selected={citySelected.description}
                              onSelectKey={onSelectCity}  
                            />
                          :
                          <></>
                        }
                      </Grid>
                      <Grid xs={6}>
                        <DropdownRegister
                          listkeys={countries!}
                          selected={countrySelected}
                          onSelectKey={onSelectCountry} 
                        />
                      </Grid>
                    </Grid.Container>
                    <Button
                        css={{ maxWidth: '100%' }}
                        size='lg'
                        onPress={handleSubmit}
                        disabled={!allowSubmit || isLoading || citySelected.id === ''}
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