import { useContext, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { Button, Card, Grid, Input, Link, Loading, Spacer, Text, useTheme } from '@nextui-org/react'
import { useForm } from '../../../hooks/useForm';
import { AuthLayout } from '../../../layouts/AuthLayout';
import { Notification } from '../../../notification';
import { ApolloClient, InMemoryCache, useMutation, useQuery } from '@apollo/client';
import { DropdownRegister } from '@/components/dropdown/DropdownRegister';
import { GetCountries } from '@/graphql/Countries';
import { GetServerSideProps, NextPage } from 'next';
import { Client } from '@/models/Client';
import { GetUser, UpdateUser } from '@/graphql/User';
import { AuthContext } from '@/context/auth';

interface countriesResponse {
  countries: {
    description: string;
    cities: {
      description: string;
      id: string
    }[]
  }[]
}

interface Props {
  user: Client
}

const UpdateUserPage: NextPage<Props> = ({ user }) => {
  const { isDark } = useTheme()
  const [isLoading, setIsLoading] = useState(false);
  const { replace } = useRouter();
  const { logout } = useContext(AuthContext)

  const { data: dataCountries, error, loading } = useQuery<countriesResponse>(GetCountries)
  const [countrySelected, setCountrySelected] = useState({ description: user?.city.country.description, id: user?.city.country.description })
  const [citySelected, setCitySelected] = useState({ description: user?.city.description, id: user?.city.id })
  const [updateUser] = useMutation(UpdateUser)

  const countries = useMemo(() => {
    if (!dataCountries) return;
    return dataCountries.countries.map((country) => {
      return {
        id: country.description,
        description: country.description,
      };
    });
  }, [dataCountries])

  const cities = useMemo(() => {
    if (!dataCountries || !countries) return;
    return dataCountries.countries.find(
      ({ description }) => description === countrySelected.description
    )
      ?.cities.map((city) => city)
  }, [countrySelected])

  const onSelectCountry = (country: any) => {
    setCountrySelected(country)
    setCitySelected({ description: 'Ciudad', id: '' })
  }

  const { allowSubmit, parsedFields } = useForm([
    {
      name: 'name',
      validate: (value: string) => value.trim().length >= 3,
      validMessage: 'Nombre válido',
      errorMessage: 'Mínimo 3 caracteres',
      initialValue: user.name,
    },
    {
      name: 'lastName',
      validate: (value: string) => value.trim().length >= 3,
      validMessage: 'Apellido válido',
      errorMessage: 'Mínimo 3 caracteres',
      initialValue: user.lastName,
    },
    {
      name: 'birthdate',
      validate: (value: string) => value.trim().length >= 3,
      validMessage: 'Fecha de nacimiento válida',
      errorMessage: 'Fecha de nacimiento inválido',
      initialValue: user.birthdate,
    },
    {
      name: 'username',
      validate: (value: string) => value.trim().length >= 3,
      validMessage: 'Fecha de nacimiento válida',
      errorMessage: 'Fecha de nacimiento inválido',
      initialValue: user.username,
    },
  ])
  const [name, lastName, birthdate, username] = parsedFields;
  const handleSubmit = async () => {
    setIsLoading(true)
    Notification(isDark).fire({
      title: 'Cargando',
      icon: 'info',
    })
    try {
      const { data } = await updateUser({
        variables: {
          updateUserInput: {
            id: user.id,
            name: name.value,
            lastName: lastName.value,
            birthdate: birthdate.value,
            username: username.value
          }
        }
      })
      setTimeout(() => replace('/app/profiles'), 700)
      Notification(isDark).fire({
        title: `Actualización exitosa: ${data.updateUser.username}`,
        icon: 'success',
        timer: 5000,
      })
      setIsLoading(false)
    } catch (error: any) {
      Notification(isDark).fire({
        title: "Ocurrio un error al actualizar",
        icon: 'error',
      })
      setIsLoading(false)
    }
  }
  const blockUser = async () => {
    setIsLoading(true)
    Notification(isDark).fire({
      title: 'Cargando',
      icon: 'info',
    })
    try {
      const { data } = await updateUser({
        variables: {
          updateUserInput: {
            id: user.id,
            isActive: false
          }
        }
      })
      setTimeout(() => replace('/auth/login'), 700)
      Notification(isDark).fire({
        title: `Usuario desactivado: ${data.updateUser.username}`,
        icon: 'success',
        timer: 5000,
      })
      setIsLoading(false)
      logout()
    } catch (error: any) {
      Notification(isDark).fire({
        title: "Ocurrio un error al actualizar",
        icon: 'error',
      })
      setIsLoading(false)
    }
  }
  if (loading || !user) return <Loading size='lg' />
  return (
    <AuthLayout
      title='Actualizar Datos'
      description='Actualizar usuario'
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
          <Text h1>Actualizar Usuario</Text>
        </Card.Header>

        <Card.Body>
          <Grid.Container gap={2} justify="center" >
            <Grid alignContent='center' alignItems='center' xs={12} sm={6} direction="column" css={{ px: '$10', py: '$8', gap: '$15' }}>
              <Input
                fullWidth
                label='Nombre'
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
                fullWidth
                label='Apellido'
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
                fullWidth
                readOnly
                label='Email'
                type='email'
                value={user?.email}
                helperColor={'success'}
                status={'success'}
                color={'success'}
                size='lg'
                bordered
              />
            </Grid>
            <Grid alignContent='center' alignItems='center' xs={12} sm={6} direction="column" css={{ px: '$10', py: '$8', gap: '$15' }}>
              <Input
                fullWidth
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
              <Input
                fullWidth
                label='Nombre usuario'
                type='text'
                value={username.value}
                onChange={(e) => username.setValue(e.target.value)}
                helperText={username.message}
                helperColor={username.color}
                status={username.color}
                color={username.color}
                size='lg'
                bordered
                clearable
              />
            </Grid>
          </Grid.Container>
          <Grid.Container gap={2} alignContent='center' justify='center' css={{ width: '100%', py: '$15' }}>
            <Grid xs={6}>
              <DropdownRegister
                listkeys={cities!}
                selected={citySelected.description!}
                setValue={setCitySelected}
                check='Ciudad'
              />

            </Grid>
            <Grid xs={6}>
              <DropdownRegister
                listkeys={countries!}
                selected={countrySelected.description!}
                setValue={onSelectCountry}
                check='País'
              />
            </Grid>
          </Grid.Container>
          <Grid.Container direction='row' gap={2}>
            <Grid>
              <Button
                css={{ maxWidth: '100%' }}
                size='lg'
                onPress={blockUser}
                disabled={!allowSubmit}
              >
                {!isLoading ? 'Desabilitar Usuario' : <Loading type='points' />}
              </Button>
            </Grid>
            <Grid>

              <Button
                css={{ maxWidth: '100%' }}
                size='lg'
                onPress={handleSubmit}
                disabled={!allowSubmit}
              >
                {!isLoading ? 'Actualizar' : <Loading type='points' />}
              </Button>
            </Grid>
          </Grid.Container>
        </Card.Body>
      </Card>
    </AuthLayout >
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id = '' } = ctx.params as { id: string };
  const client = new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
    cache: new InMemoryCache(),
  });

  try {
    const { data: user } = await client.query({
      query: GetUser,
      variables: {
        userByIdId: id,
      },
    });

    return {
      props: {
        user: user.userById
      }
    }

  } catch (error) {
    return {
      redirect: {
        destination: '/404',
        permanent: false
      }
    }
  }
}
export default UpdateUserPage