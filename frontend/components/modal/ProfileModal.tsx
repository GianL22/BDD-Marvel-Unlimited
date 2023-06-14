import { useForm } from '@/hooks/useForm';
import { Button, Image, Modal, Row, Text, Col, Grid, Input, Radio, Spacer, Divider, useTheme, Loading } from '@nextui-org/react'
import { FC, useState } from 'react';
import { ArrowRightCircle, ArrowLeftCircle  } from 'iconoir-react'
import { Notification } from '@/notification';
import { useMutation } from '@apollo/client';
import { CreateProfile } from '@/graphql';
import Cookies from 'js-cookie';
import { Profile } from '@/models/Client';
import { useRouter } from 'next/router';
import { AddProfile } from '../profile/AddProfile';
import { DeleteProfile, UpdateProfile } from '@/graphql/Profile';

interface Props {
   bindings: {
      open: boolean;
      onClose: () => void;
   };
   setVisible: (visible: boolean) => void;
   edit: boolean;
   profile: Profile;
}

export const ProfileModal: FC<Props> = ( {profile, bindings, setVisible, edit} ) => {
   const [createProfile] = useMutation(CreateProfile);
   const {isDark} = useTheme()
   const [avatar,setAvatar] = useState(1);
   const [avatarPath,setAvatarPath] = useState((!profile?.avatar) ? '' : profile?.avatar);

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
      {
         name: 'language',
         validate: (value: string) => value.trim().length >= 3,
         validMessage: 'Idioma válido',
         errorMessage: 'Mínimo 3 caracteres',
         initialValue: (!profile?.language) ? '' : profile.language,
      },
      {
         name: 'device',
         validate: (value: string) => value.trim().length >= 3,
         validMessage: 'Dispositivo válido',
         errorMessage: 'Mínimo 3 caracteres',
         initialValue: (!profile?.device) ? '' : profile.device,
      },
   ])
   const [email,nickname,language,device] = parsedFields;
   
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
                  id: profile.id,
                  nickname: nickname.value,
                  language: language.value,
                  device: device.value,
                  emailProfile: email.value,
                  avatar: avatarPath,
               }
            }
         })
         nickname.setValue('');
         language.setValue('');
         device.setValue('');
         email.setValue('');
         setAvatarPath('');
         setIsLoading(false);
         setVisible(false);

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
            blockProfileId: profile.id,
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
                  language: language.value,
                  device: device.value,
                  emailProfile: email.value,
                  avatar: avatarPath,
               },
            },
         });
         nickname.setValue('');
         language.setValue('');
         device.setValue('');
         email.setValue('');
         setAvatarPath('');
         setIsLoading(false);
         setVisible(false);
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
                  <Row  gap={0} css={{width: 'fit-content', justifyContent: 'center'}}>
                     <Col>
                        <Button 
                           icon={<ArrowLeftCircle fontSize={'20px'} color='#ED1D24'/>}
                           light
                           auto
                           size={'sm'} 
                           onPress={handleTakeOut}
                        />
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
                        <Button 
                           size={'sm'}
                           auto
                           light
                           iconRight= { <ArrowRightCircle fontSize={'20px'} color='#ED1D24' /> }
                           onPress={handleAdd}
                        />
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
                     py: '$12',
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

                  <Input
                     labelPlaceholder='Idioma'
                     type='text'
                     value={language.value}
                     onChange={(e) => language.setValue(e.target.value)}
                     helperText={language.message}
                     helperColor={language.color}
                     status={language.color}
                     color={language.color}
                     size='lg'
                     bordered
                     clearable
                  />

                  <Input  
                     labelPlaceholder='Dispositivo'
                     type='text'
                     value={device.value}
                     onChange={(e) => device.setValue(e.target.value)}
                     helperText={device.message}
                     helperColor={device.color}
                     status={device.color}
                     color={device.color}
                     size='lg'
                     bordered
                     clearable
                  />
               </Grid>
            </Grid.Container>
         </Modal.Body>
         <Modal.Footer>
            {
               (edit)
                  ?  <Button
                        size='md'
                        onPress={ handleDeleteProfile }

                     >
                        Eliminar Perfil
                     </Button>
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