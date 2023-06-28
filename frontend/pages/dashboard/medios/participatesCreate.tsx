import { Button, Col, Grid, Input, Loading, Row, Spacer, Text, Textarea, useTheme } from '@nextui-org/react';
import { Flex } from '../../../components/containers';
import { AppLayout } from '@/layouts/AppLayout';
import { useEffect, useMemo, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { DropdownRegister } from '@/components/dropdown/DropdownRegister';
import { useRouter } from 'next/router';
import { Notification } from '@/notification';
import { useForm } from '@/hooks/useForm';
import { GenericResponse } from '@/models/Information';
import { GetAllOrganizationsNameAndId } from '@/graphql/Organizations';
import { TableWrapper } from '@/components/table';
import { SimpleCellReducer } from '@/components/table/cell-reducers/SimpleCellReducer';
import { CreateParticipates, GetAllMediosTitlesIds } from '@/graphql/Medio';
import { RadioRegister } from '@/components/radio/RadioRegister';

interface MediaResponse{
    mediosTitleAndIds: GenericResponse[];
}

interface OrganizationMedio {
    organization : GenericResponse,
    rolOrganization: string,
    status: string
}

interface DataJobPosition {
    jobPositions: JobPosition[];
}

interface DataOrganization {
    organizations : GenericResponse[]
}

interface JobPosition {
    id:   string;
    description: string;
}

const columns = [
    { label: "Organización", uid: "description" },
    { label: "Rol", uid: "rol" },
    { label: "Status", uid: "status" },
    { label: "Acciones", uid: "actions" },
  ];

const rols = ['Enemiga', 'Protagonista', 'Secundaria']

const ParticipatesCreatePage= ( ) => {  
    
    const {data: mediosData} = useQuery<MediaResponse>(GetAllMediosTitlesIds);
    const {data: organizationsData} = useQuery<DataOrganization>(GetAllOrganizationsNameAndId);
    const [createParticipates] = useMutation(CreateParticipates)
    const [orgsInMedio, setOrgsInMedio] = useState<OrganizationMedio[]>([]);
    const [medio, setMedio] = useState({id: '', description: 'Seleccionar Medio'})
    const [rol, setRol] = useState('Protagonista')
    const [toAddOrgnization, setToAddOrgnization] = useState({id: '', description: 'Agregar Organización'})
    const { isDark } = useTheme();
    const { replace } = useRouter();
    const [isLoading,setIsLoading] = useState(false);
    const medios = useMemo(() => mediosData?.mediosTitleAndIds, [mediosData])
    const organizations = useMemo(() => organizationsData?.organizations, [organizationsData])
    const orgsInMedioShow = useMemo(() => {
        return orgsInMedio.map(row => {
            return {
                id : row.organization.id,
                description : row.organization.description,
                rol : row.rolOrganization,
                status : row.status, 
            }
        })
    }, [orgsInMedio])

    useEffect(() => {
        setOrgsInMedio([])
        setToAddOrgnization({id: '', description: 'Agregar Organización'})
        status.setValue('')
    }, [medio])
    
    const onRemoveOrganization = async (id : string) => {

        const newOrgsInMedio = orgsInMedio.filter(row => row.organization.id !== id)
        setOrgsInMedio(newOrgsInMedio)

    } 

    const onAddOrganization = () => {

        const row = orgsInMedio!.find((row) =>
                (row.organization.id === toAddOrgnization.id)
            )
        if(row) {
            Notification(isDark).fire({
                title: `Esa organización ya esta en el medio`,
                icon: 'error',
                timer : 3000
            })
            return ;
        }

        const newRow  =  {
            id : toAddOrgnization.id,
            organization : toAddOrgnization,
            rolOrganization: rol,
            status: status.value
        }
        setOrgsInMedio([...orgsInMedio, newRow])

        setToAddOrgnization({id: '', description: 'Agregar Organización'})
        status.setValue('')
    }

    const onSubmit = async () => {
        setIsLoading(true)
        Notification(isDark).fire({
            title: 'Cargando',
            icon: 'info',
        })
        try {
            const organizationsParticipates = orgsInMedio.map(({status, rolOrganization, organization}) => {
                return {
                    status,
                    rolOrganization,
                    organizationId : organization.id,
                }
            })
            const {data} = await createParticipates({
                variables: {
                    createParticipatesInput: {
                        medioId : medio.id,
                        organizationsParticipates
                    },
                },
            });
            Notification(isDark).fire({
                title: `Organizaciones añadidas`,
                icon: 'success',
            })
            setIsLoading(false)
            setTimeout(() => replace('/dashboard/medios'),500)
        } catch (error: any) {
            console.log(error)
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
          name: 'status',
          validate: (value: string) => value.trim().length >= 3,
          validMessage: 'Status Valido',
          errorMessage: 'Minimo 3 caracteres',
          initialValue: '',
      },
  ])
  const [status] = parsedFields;
  if(!mediosData ) return <Text>No Hay info pana</Text>
  return (
    <AppLayout 
      title='Creación de Organizaciones'
      description='Pagina administrativa de Marvel United'
    >
      <Flex
        css={{'mt': '$5', 'px': '$6','@sm': {mt: '$10',px: '$16',}}}
        justify='between'
        align='center'
      >
        <Text h1>
          Agregar Organizaciones a Medios: 
        </Text>
      </Flex>

      <Grid.Container gap={4} justify="center" direction="column" css={{width:'100%'}} >
        <Spacer y={2}/>
        <Row>
            <Text h3 css = {{ m : '$10'}}>
                Elija un medio
            </Text>                
        </Row>
        <Grid alignContent='space-between' alignItems='center' xs={ 12 } direction="column">
            <Row css={{width:'100%', gap:'$15'}}>
                    <DropdownRegister
                        listkeys={medios!}
                        selected={medio.description}
                        setValue={setMedio}
                        width={100} 
                        check='Seleccionar Medio'
                    />
            </Row>
        </Grid>
        <Grid xs={12} alignContent='space-between' alignItems='center' direction='column-reverse' css={{py:'$10'}}>
            <Row gap={1}>
                <Grid.Container >
                    {
                        medio.id !== '' && 
                        <>
                            <Grid xs = {6}>
                                <TableWrapper 
                                    columns={columns} 
                                    rows={orgsInMedioShow!}
                                    cellReducer={SimpleCellReducer}
                                    onDelete={onRemoveOrganization}
                                />
                            </Grid>
                            <Grid xs = {6} direction='column'>
                                <Input
                                    bordered
                                    labelPlaceholder="Estado de la organización"
                                    css={{width:'100%'}}
                                    value={status.value}
                                    onChange={(e) => status.setValue(e.target.value)}
                                    helperText={status.message}
                                    helperColor={status.color}
                                    status={status.color}
                                    color={status.color}
                                />
                                <Spacer y={2} />
                                <DropdownRegister
                                    listkeys={organizations!}
                                    selected={toAddOrgnization.description}
                                    setValue={setToAddOrgnization}
                                    width={100} 
                                    check='Agregar Organización'
                                />
                                <Spacer y={2} />
                                <RadioRegister 
                                    label='Rol'
                                    listValue={rols}
                                    onSelectKey={setRol}
                                    valueRadio={rol}
                                    size='md'
                                />
                                <Spacer y={2} />
                                <Button
                                    disabled={!allowSubmit || isLoading || toAddOrgnization.id === ''}
                                    onPress={onAddOrganization}
                                    size='lg'
                                >
                                    Añadir Organización
                                </Button>
                            </Grid>
                            
                        </>
                    }

                </Grid.Container>
            </Row>
            <Row>
                <Text h3>
                    Organizaciones en el Medio
                </Text>                
            </Row>
        </Grid>
        <Grid xs ={12} alignContent='space-between' alignItems='stretch' direction='row-reverse' css={{py:'$0'}}>
            <Button
                disabled={ orgsInMedio.length === 0 || isLoading }
                onPress={onSubmit}
                size='lg'
            >
                {!isLoading ? 'Guardar' : <Loading type='points'/>}
            </Button>
        </Grid>
      </Grid.Container> 
    </AppLayout>
  )
}
export default ParticipatesCreatePage