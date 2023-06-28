import { Button, Modal, Row, Text, Col, Grid, useTheme, Checkbox, Divider } from '@nextui-org/react'
import { FC, useState } from 'react';
import { DeleteCircle  } from 'iconoir-react'
import { Notification } from '@/notification';
import { useQuery } from '@apollo/client';
import { RadioRegister } from '../radio/RadioRegister';
import { DropdownRegister } from '../dropdown/DropdownRegister';
import { GetAllPowers } from '@/graphql/Powers';
import { IconButton } from '../table/IconButton';

interface Props {
   bindings: {
      open: boolean;
      onClose: () => void;
   };
   setVisible: (visible: boolean) => void;
   powers:{
      powerName: string,
      powerId: string,
      type: string,
      inherited: boolean,
   }[];
   setPowers: (value: any) => void
}
interface PowerResponse {
   Powers: Power[];
}

interface Power {
   id:   string;
   description: string;
}

export const PowerModal: FC<Props> = ( {powers, setPowers,bindings, setVisible} ) => {
   const { data } = useQuery<PowerResponse>(GetAllPowers);
   const {isDark} = useTheme()
   const [isLoading,setIsLoading] = useState(false);
   const [power, setPower] = useState({id: '', description: 'Poderes'})
   const [type,setType] = useState('Natural');
   const [inherited, setInherited] = useState(false)

   const handleDelete = (id: string) => {
      Notification(isDark).fire({
          title: 'Cargando',
          icon: 'info',
      })
      try{
         const newList = powers.filter((power)=> power.powerId !== id)
         setPowers([...newList])
      } catch (error: any) {
         Notification(isDark).fire({
             title: error.message,
             icon: 'error',
         }) 
         setIsLoading(false)
     }
   }
   
   const onAddPower = () => {
      Notification(isDark).fire({
         title: 'Poder Guardado',
         icon: 'success',
      })
      try {
         const checkPower = powers.some(p => p.powerId === power.id)
         if(checkPower) throw new Error
         const newPower = {
            powerName: power.description,
            powerId: power.id,
            type: type,
            inherited: inherited,
         }
         setPowers([...powers, newPower])
         setPower({id: '', description: 'Poderes'})
         setInherited(false)
         setType('Natural')
      } catch (error: any) {
         Notification(isDark).fire({
            title: "El poder ya esta en la lista",
            icon: 'error',
         }) 
         setIsLoading(false)
      }
  }

   return (
      <Modal
         width="900px"
         css={{height: '100%'}}
         closeButton
         preventClose
         {...bindings}
      >
         <Modal.Header>
            <Text b h1>
               Lista de Poderes
            </Text>
         </Modal.Header>

         <Modal.Body>
            <Grid.Container gap={2} justify="center">
               <Grid
                  xs={ 12 } 
                  sm={ 12 } 
                  css={{
                     display: 'flex',
                     flexDirection: 'column',
                     justifyContent: 'center',
                     alignItems: 'center',
                     height: '100%',
                     width: '100%',
                     gap: '$12'
                 }}
               >
                  <Row>
                     <Col>
                        <Text b> NOMBRE </Text>
                     </Col>
                     <Col>
                        <Text b> TIPO </Text>
                     </Col>
                     <Col>
                        <Text b> HEREDADO </Text>
                     </Col>
                     <Col>
                        <Text b> ACTIONS </Text>  
                     </Col>
                  </Row>
                  {
                     (powers.length === 0)
                        ? <Text h3> Aun no se ha guardado ningun poder</Text>
                        : 
                        powers.map((power)=>(
                           <Row key={power.powerId}>
                              <Col>
                                 <Text> {power.powerName}  </Text>
                              </Col>
                              <Col>
                                 <Text>  {power.type} </Text>
                              </Col>
                              <Col>
                                 <Text> {(power.inherited) ? 'Si': 'No'}   </Text>
                              </Col>
                              <Col>
                                 <IconButton 
                                    color='#ED1D24'
                                    onClick={() => handleDelete(power.powerId)}
                                 >
                                       <DeleteCircle fill='#FF0080' fontSize={'18px'}/>
                                 </IconButton>  
                              </Col>
                           </Row>
                        ))
                  }
               </Grid>
               <Divider />
               <Grid justify='center' alignContent='center' alignItems='center'>
                  <Text h2> Añadir Poderes a la Lista</Text>
               </Grid>
               <Grid
                  xs={ 12 } 
                  sm={ 12 } 
                  css={{
                     gap: '$17',
                     display: 'flex',
                     flexDirection: 'row',
                     py: '$11',
                     justifyContent: 'space-between',
                     margin: '$0'
                 }}
                 direction='row'
               >
                  <DropdownRegister
                     listkeys={data?.Powers!}
                     selected={power.description}
                     setValue={setPower}
                     width={40} 
                     check='Poderes'
                  />
                  <RadioRegister 
                     label='Tipo de Poder'
                     listValue={['Natural', 'Artificial']}
                     onSelectKey={setType}
                     valueRadio={type}
                     size='md'
                  />
                  <Checkbox isSelected={inherited} color="success" onChange={setInherited} size='md'>
                     ¿Es heredado?
                  </Checkbox>

               </Grid>
            </Grid.Container>
         </Modal.Body>
         <Modal.Footer>
            <Button
               size='md'
               onPress={ onAddPower }
               disabled={ isLoading || power.id === ''}
            >
               Agregar Poder
            </Button>
         </Modal.Footer>
         
      </Modal>
   );
};