import { Button, Col, Grid, Input, Loading, Row, Spacer, Text, Textarea, useTheme } from '@nextui-org/react';
import { Flex } from '../../../components/containers';
import { AppLayout } from '@/layouts/AppLayout';
import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { useRouter } from 'next/router';
import { Notification } from '@/notification';
import { useForm } from '@/hooks/useForm';
import { CreatePower } from '@/graphql/Powers';


const PowersCreatePage= ( ) => {  
    const { isDark } = useTheme();
    const { replace } = useRouter();
    const [isLoading,setIsLoading] = useState(false);
    const [createPower] = useMutation(CreatePower);

    const onSubmit = async () => {
        setIsLoading(true)
        Notification(isDark).fire({
            title: 'Cargando',
            icon: 'info',
        })
        try {
            await createPower({
                variables: {
                  createPowerInput: {
                    name: name.value,
                    description: description.value
                  },
                },
            });
            // setTimeout(() => replace('/dashboard/objects/create'),500)
            Notification(isDark).fire({
                title: 'Poder creado',
                icon: 'success',
            })
            setIsLoading(false)
        } catch (error: any) {
            Notification(isDark).fire({
                title: error.message,
                icon: 'error',
                timer: 3000
            })
            setIsLoading(false)
        }
    }
  const {allowSubmit,parsedFields} = useForm([
      {
          name: 'name',
          validate: (value: string) => value.trim().length >= 3,
          validMessage: '',
          errorMessage: 'Minimo 3 caracteres',
          initialValue: '',
      },
      {
          name: 'description',
          validate: (value: string) => value.trim().length >= 10,
          validMessage: '',
          errorMessage: 'Minimo 10 caracteres',
          initialValue: '',
      },
  ])
  const [name,description] = parsedFields;
  return (
    <AppLayout 
      title='Creación de Poderes'
      description='Pagina administrativa de Marvel United'
    >
      <Flex
        css={{'mt': '$5', 'px': '$6','@sm': {mt: '$10',px: '$16',}}}
        justify='between'
        align='center'
      >
        <Text h1>
          Crear Poderes: 
        </Text>
      </Flex>

      <Grid.Container gap={4} justify="center" direction="column" css={{width:'80%'}} >
        <Spacer y={2}/>
        <Grid alignContent='space-between' alignItems='center' xs={ 12 } sm={ 12 } direction="column">
            <Row css={{width:'100%'}}>
                <Input
                    bordered
                    labelPlaceholder="Nombre Objeto"
                    css={{width:'50%'}}
                    value={name.value}
                    onChange={(e) => name.setValue(e.target.value)}
                    helperText={name.message}
                    helperColor={name.color}
                    status={name.color}
                    color={name.color}
                />
            </Row>
            <Spacer y={2.5}/>
            <Row>
                <Textarea 
                    labelPlaceholder="Descripción" 
                    status= {description.color}  
                    css={{width: '95%'}}
                    value={description.value}
                    onChange={(e) => description.setValue(e.target.value)}
                    helperText={description.message}
                    helperColor={description.color}
                    color={description.color}
                />
            </Row>
        </Grid>
        <Spacer y={4.5} />
        <Grid xs ={12} sm = {12} alignContent='space-between' alignItems='stretch' direction='row'>
            <Spacer x={40.5} />
            <Button
                disabled={!allowSubmit || isLoading }
                onPress={onSubmit}
                size='lg'
            >
                {!isLoading ? 'Crear Poder' : <Loading type='points'/>}
            </Button>
        </Grid>
      </Grid.Container> 
    </AppLayout>
  )
}
export default PowersCreatePage