import { Button, Col, Grid, Input, Loading, Row, Spacer, Text, Textarea, useTheme } from '@nextui-org/react';
import { Flex } from '../../../components/containers';
import { AppLayout } from '@/layouts/AppLayout';
import { useMemo, useState } from 'react';
import { ApolloClient, InMemoryCache, useMutation } from '@apollo/client';
import { DropdownRegister } from '@/components/dropdown/DropdownRegister';
import { UpdateObject, GetObjectById, GetObjectType } from '@/graphql/Objects';
import { useRouter } from 'next/router';
import { Notification } from '@/notification';
import { useForm } from '@/hooks/useForm';
import { GetServerSideProps, NextPage } from 'next';
import { Object } from '@/models/Object';

interface ObjectTypeResponse {
    objectsType: ObjectsType[];
}
interface ObjectsType {
    id:          string;
    description: string;
}

interface Props {
    object: Object;
    objectsType: ObjectTypeResponse;
}

const ObjectDetailsPage: NextPage<Props>= ({ object,objectsType} ) => {  
    const [objectType, setObjectType] = useState(object.objectById.objectTypeId)
    const { isDark } = useTheme();
    const { replace } = useRouter();
    const [isLoading,setIsLoading] = useState(false);
    const [updateObject] = useMutation(UpdateObject);
    const onSubmit = async () => {
      setIsLoading(true)
      Notification(isDark).fire({
          title: 'Cargando',
          icon: 'info',
      })
      try {
        await updateObject({
            variables: {
                updateObjectInput: {
                  id: object.objectById.id,
                  name: name.value,
                  description: description.value,
                  material: material.value,
                  objectTypeId: objectType.id,
                },
            },
        });
        Notification(isDark).fire({
          title: 'Objecto actualizado',
          icon: 'success',
        })
        setIsLoading(false)
        setTimeout(() => replace('/dashboard/objects'),500)
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
        initialValue: object.objectById.name,
      },
      {
        name: 'description',
        validate: (value: string) => value.trim().length >= 10,
        validMessage: '',
        errorMessage: 'Minimo 10 caracteres',
        initialValue: object.objectById.description,
      },
      {
      name: 'material',
      validate: (value: string) => value.trim().length >= 3,
      validMessage: '',
      errorMessage: 'Minimo 3 caracteres',
      initialValue: object.objectById.material,
    },
  ])
  const [name,description, material] = parsedFields;
  const infoChanged = useMemo(() => {
    return name.value !== object.objectById.name ||
    description.value !== object.objectById.description ||
    material.value !== object.objectById.material ||
    objectType.id !== object.objectById.objectTypeId.id
    }, 
    [name.value,description.value,material.value,objectType.id,object])
  return (
    <AppLayout 
      title='Creación de Objetos'
      description='Pagina administrativa de Tienda'
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
                  listkeys={objectsType.objectsType!}
                  selected={objectType.description}
                  setValue={setObjectType}
                  width={90} 
                />
              </Col>
            </Row>
        </Grid>
        <Spacer y={5} />
        <Grid xs ={12} sm = {12} alignContent='space-between' alignItems='stretch' direction='row-reverse'>
          <Button
            disabled={!allowSubmit  || isLoading  || (!infoChanged)}
            onPress={onSubmit}
          >
            {!isLoading ? 'Actualizar' : <Loading type='points'/>}
          </Button>
        </Grid>
      </Grid.Container> 
    </AppLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const { id = '' } = ctx.params as {id: string}; 
    const client = new ApolloClient({
        uri: process.env.NEXT_PUBLIC_GRAPHQL_API_URL,
        cache: new InMemoryCache(),
    });

    const {data: object} =  await client.query({
        query: GetObjectById,
        variables: {
            objectByIdId: id,
        },
    });
    const {data: objectsType} =  await client.query({query: GetObjectType});
    
    if (  !object || !objectsType) {
      return{
        redirect: {
          destination: '/404',
          permanent: false
        }
      }
    }

    return {
      props: {
        object,
        objectsType,
      }
    }
  }
export default ObjectDetailsPage