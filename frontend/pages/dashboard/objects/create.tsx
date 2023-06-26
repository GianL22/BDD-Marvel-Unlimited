import { Button, Col, Grid, Input, Loading, Row, Spacer, Text, Textarea, useTheme } from '@nextui-org/react';
import { Flex } from '../../../components/containers';
import { AppLayout } from '@/layouts/AppLayout';
import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { DropdownRegister } from '@/components/dropdown/DropdownRegister';
import { CreateObject, GetObjectType } from '@/graphql/Objects';
import { useRouter } from 'next/router';
import { Notification } from '@/notification';
import { useForm } from '@/hooks/useForm';

export interface ObjectTypeResponse {
    objectsType: ObjectsType[];
}
export interface ObjectsType {
    id:          string;
    description: string;
}

const ObjectsCreatePage= ( ) => {  
    const {data, error, loading} =  useQuery<ObjectTypeResponse>(GetObjectType);
    const [objectType, setObjectType] = useState({id: '', description: 'Tipos Objetos'})
    const { isDark } = useTheme();
    const { replace } = useRouter();
    const [isLoading,setIsLoading] = useState(false);
    const [createObject] = useMutation(CreateObject);

    const onSubmit = async () => {
        setIsLoading(true)
        Notification(isDark).fire({
            title: 'Cargando',
            icon: 'info',
        })
        try {
            await createObject({
                variables: {
                    createObjectInput: {
                        name: name.value,
                        description: description.value,
                        material: material.value,
                        objectTypeId: objectType.id,
                    },
                },
            });
            // setTimeout(() => replace('/dashboard/objects/create'),500)
            Notification(isDark).fire({
                title: 'Objecto creado',
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
      {
        name: 'material',
        validate: (value: string) => value.trim().length >= 3,
        validMessage: '',
        errorMessage: 'Minimo 3 caracteres',
        initialValue: '',
    },
  ])
  const [name,description, material] = parsedFields;
  if(!data ) return <Text>No Hay info pana</Text>
  return (
    <AppLayout 
      title='Creación de Objetos'
      description='Pagina administrativa de Marvel United'
    >
      <Flex
        css={{'mt': '$5', 'px': '$6','@sm': {mt: '$10',px: '$16',}}}
        justify='between'
        align='center'
      >
        <Text h1>
          Crear Objetos: 
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
            <Spacer y={2.5} />
            <Row>
                <Col>
                    <Input
                        bordered
                        labelPlaceholder="Material"
                        css={{width:'90%'}}
                        value={material.value}
                        onChange={(e) => material.setValue(e.target.value)}
                        helperText={material.message}
                        helperColor={material.color}
                        status={material.color}
                        color={material.color}
                    />
                </Col>
                <Col>
                    <DropdownRegister
                        listkeys={data.objectsType!}
                        selected={objectType.description}
                        setValue={setObjectType}
                        width={90} 
                    />
                </Col>
            </Row>
        </Grid>
        <Spacer y={5} />
        <Grid xs ={12} sm = {12} alignContent='space-between' alignItems='stretch' direction='row'>
            <Button
                // disabled={!allowSubmit || isLoading}
                // onPress={onSubmit}
                size='lg'
            >
                Añadir Tipo Objeto
            </Button>
            <Spacer x={29} />
            <Button
                disabled={!allowSubmit || isLoading || objectType.description === 'Tipos Objetos'}
                onPress={onSubmit}
                size='lg'
            >
                {!isLoading ? 'Crear Objeto' : <Loading type='points'/>}
            </Button>
        </Grid>
      </Grid.Container> 
    </AppLayout>
  )
}
export default ObjectsCreatePage