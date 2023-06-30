import { useForm } from '@/hooks/useForm';
import { Button, Image, Modal, Row, Text, Col, Grid, Input, useTheme, Loading, Checkbox, Spacer } from '@nextui-org/react'
import { FC, useEffect, useState } from 'react';
import { ArrowRightCircle, ArrowLeftCircle  } from 'iconoir-react'
import { Notification } from '@/notification';
import { useMutation } from '@apollo/client';
import { CreateProfile } from '@/graphql';
import { Profile } from '@/models/Client';
import { DeleteProfile, UpdateProfile } from '@/graphql/Profile';
import { RadioRegister } from '../radio/RadioRegister';
import { IconButton } from '../table/IconButton';

interface Props {
   bindings: {
      open: boolean;
      onClose: () => void;
   };
   setVisible: (visible: boolean) => void;
   edit: boolean;
   profile?: Profile;
}

export const ProfileModal: FC<Props> = ( {profile, bindings, setVisible, edit} ) => {
   const [createProfile] = useMutation(CreateProfile);
   const [language,setLanguage] = useState(`${(!profile?.language) ? 'Español' : profile.language}`);
   const [device,setDevice] = useState(`${(!profile?.device) ? 'Laptop' : profile.device}`);
   const [confirmDelete, setConfirmDelete] = useState(false)
   const {isDark} = useTheme()
   const [avatar,setAvatar] = useState((!profile?.avatar) ? 1 : Number(profile.avatar.replace(/\D/g, '')));
   const [avatarPath,setAvatarPath] = useState((!profile?.avatar) ? '' : profile?.avatar);

   useEffect(() => {
     setAvatar((!profile?.avatar) ? 1 : Number(profile.avatar.replace(/\D/g, '')))
     setLanguage(`${(!profile?.language) ? 'Español' : profile.language}`)
     setDevice(`${(!profile?.device) ? 'Laptop' : profile.device}`)
     email.setValue((!profile?.emailProfile) ? '' : profile.emailProfile)
     nickname.setValue((!profile?.nickname) ? '' : profile.nickname)
   }, [bindings])

   const handleAdd = () => {
      if(avatar < 5)
         setAvatar(avatar + 1 );
      else setAvatar(1)
   } 
   const handleTakeOut = () => {
      if(avatar > 1)
         setAvatar(avatar - 1);
      else setAvatar(5)
   } 
   const [isLoading,setIsLoading] = useState(false);
   const {allowSubmit,parsedFields} = useForm([
      {
         name: 'email',
         validate: (value: string) => value.match(/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi),
         validMessage: 'Email válido',
         errorMessage: 'Email inválido',
         initialValue: (!profile?.emailProfile) ? '' : profile.emailProfile,
      },
      {
         name: 'nickname',
         validate: (value: string) => value.trim().length >= 3,
         validMessage: 'Nickname valido',
         errorMessage: 'Debe tener al menos 3 caracteres',
         initialValue: (!profile?.nickname) ? '' : profile.nickname,
      },
   ])
   const [email,nickname] = parsedFields;
   
   const [updateProfile] = useMutation(UpdateProfile);

   const handleUpdate = async() => {
      setIsLoading(true)
      Notification(isDark).fire({
          title: 'Cargando',
          icon: 'info',
      })
      try{
         await updateProfile({
            variables:{
               updateProfileInput:{
                  id: profile?.id,
                  nickname: nickname.value,
                  language: language,
                  device: device,
                  emailProfile: email.value,
                  avatar: avatarPath,
               }
            }
         })
         nickname.setValue('');
         email.setValue('');
         setAvatarPath('');
         setIsLoading(false);
         setVisible(false);
         setLanguage('Español')
         setDevice('Lapto')

      } catch (error: any) {
         Notification(isDark).fire({
             title: error.message,
             icon: 'error',
         }) 
         setIsLoading(false)
     }
   }

   const [deleteProfile] = useMutation(DeleteProfile);
   const handleDeleteProfile = () => {
      setVisible(false);
      deleteProfile({
         variables:{
            blockProfileId: profile?.id,
         }
      })
      Notification(isDark).fire({
         title: 'Perfil Eliminado',
         icon: 'success',
     })
   }
   
   const handleSubmit = async() => {
      setIsLoading(true)
      Notification(isDark).fire({
          title: 'Cargando',
          icon: 'info',
      })
      try {
         await createProfile({
            variables: {
               createProfileInput: {
                  nickname: nickname.value,
                  language: language,
                  device: device,
                  emailProfile: email.value,
                  avatar: avatarPath,
               },
            },
         });
         nickname.setValue('');
         email.setValue('');
         setAvatarPath('');
         setIsLoading(false);
         setVisible(false);
         setLanguage('Español')
         setDevice('Lapto')
      } catch (error: any) {
          Notification(isDark).fire({
              title: error.message,
              icon: 'error',
          }) 
          setIsLoading(false)
      }
  }

   return (
      <Modal
         width="800px"
         closeButton
         preventClose
         blur
         {...bindings}
      >
         <Modal.Header>
            <Text b h1>
               {
                  (edit)
                     ? 'Editar Perfil'
                     : 'Crear Perfil'
               }
               
            </Text>
         </Modal.Header>

         <Modal.Body>
            <Grid.Container gap={2} justify="center">
               <Grid
                  xs={ 12 } 
                  sm={ 6 } 
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
                  <Image 
                    src={`/profiles/${avatar}.png`}
                    objectFit="contain" 
                    width={'300px'}
                    css={{ maxWidth: '300px', maxHeight: '375px' }}
                    showSkeleton
                    containerCss={{
                        borderRadius: '5%',
                        boxShadow: '0 8px 16px rgba(0, 0, 0, 0.6)',
                        overflow: 'hidden',
                    }}
                  />
                  <Row  gap={2} css={{width: 'fit-content', justifyContent: 'center'}}>
                     <Col>
                        <IconButton onClick={handleTakeOut}> 
                           <ArrowLeftCircle fontSize={'20px'} color='#ED1D24'/>
                        </IconButton>
                     </Col>
                     <Col>
                        <Button 
                           auto 
                           ghost 
                           size={'md'} 
                           onPress={() => setAvatarPath(`/profiles/${avatar}.png`)}
                        >
                           Guardar Avatar
                        </Button>
                     </Col>
                     <Col>
                        <IconButton onClick={handleAdd}>
                           <ArrowRightCircle fontSize={'20px'} color='#ED1D24' />
                        </IconButton>
                     </Col>
                  </Row>
               </Grid>
               <Grid
                  xs={ 12 } 
                  sm={ 6 } 
                  css={{
                     gap: '$17',
                     display: 'flex',
                     flexDirection: 'column',
                     py: '$11',
                     justifyContent: 'space-between',
                     margin: '$0'
                 }}
               >
                  <Input
                     labelPlaceholder='Nickname'
                     type='text'
                     value={nickname.value}
                     onChange={(e) => nickname.setValue(e.target.value)}
                     helperText={nickname.message}
                     helperColor={nickname.color}
                     status={nickname.color}
                     color={nickname.color}
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
                  <RadioRegister 
                     label='Idioma'
                     listValue={['Español', 'Inglés', 'Árabe','Hebreo']}
                     onSelectKey={setLanguage}
                     valueRadio={language}
                     size='sm'
                  />
                  <RadioRegister 
                     label='Dispositivo'
                     listValue={['Laptop', 'Movil', 'Tablet']}
                     onSelectKey={setDevice}
                     valueRadio={device}
                     size='sm'
                  />
               </Grid>
            </Grid.Container>
         </Modal.Body>
         <Modal.Footer>
            {
               (edit)
                  ?  <> 
                        <Checkbox color="success" onChange={setConfirmDelete} size='sm'>
                           Habilitar eliminación
                        </Checkbox>
                        <Spacer x={1} />
                        <Button
                           size='md'
                           onPress={ handleDeleteProfile }
                           disabled = { !confirmDelete }
                           >
                           Eliminar Perfil
                        </Button>
                     </>
                  : <></>
            }
            <Button
               size='md'
               onPress={
                  (edit) 
                     ? handleUpdate
                     : handleSubmit
               }
               disabled={!allowSubmit || isLoading || avatarPath === ''}
            >
               {
                  (edit)
                     ? (!isLoading )? 'Modificar Perfil' : <Loading type='points' />
                     : (!isLoading )? 'Crear Perfil' : <Loading type='points' />
               }
            </Button>
         </Modal.Footer>
         
      </Modal>
   );
};