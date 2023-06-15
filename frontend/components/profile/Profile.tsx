import { FC } from 'react';
import { Card, Row, Text, Col, useModal } from '@nextui-org/react';
import { ProfileModal } from '../modal/ProfileModal';
import { EditPencil } from 'iconoir-react'
import { Box } from '../containers';
import { Profile as ProfileModel } from '@/models/Client';
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

interface Props {
    profile: ProfileModel;
    nProfile: number;
    editable: boolean;
}

export const Profile:FC<Props> = ({profile,nProfile, editable} : Props) => {
    const { replace } = useRouter()
    const { bindings, setVisible } = useModal();
    // !Por AHORA
    const handleAvatar = () => {
        replace('/app')
        Cookies.set('profilePath', profile.avatar, {expires: 8})
    }
  return (
    <>
        <ProfileModal profile={profile} bindings={bindings} setVisible={setVisible} edit={true} />
        <Card 
            isPressable 
            isHoverable  
            variant='bordered'  
            css={{ width : '200px', height : '200px', minH:'200px',}}
            onClick={
                (editable)
                    ? () => setVisible(true)
                    : handleAvatar
            }
        >
            <Card.Body css={{ p: 0 }}>
                {
                    (editable)
                        ?   <Box 
                                css={{ 
                                    position: "absolute", zIndex: 1,
                                    top: '30%',
                                    left: '30%',
                                }} 
                            >
                                <EditPencil fontSize={60} color='#FFFFFF' />
                            </Box>
                        : <></>
                }
                <Card.Image
                    src={profile.avatar}
                    objectFit="cover"   
                    width="100%"
                    height={340}
                    alt='Imagen de perfil del usuario'
                />
            </Card.Body>
            <Card.Footer css={{ justifyItems: "flex-start" }}>
                <Row wrap="wrap" justify="space-between" align="center">
                    <Text b>{profile.nickname}</Text>
                    <Text css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>
                    Nro. {nProfile}
                    </Text>
                </Row>
            </Card.Footer>
    </Card>
    </>
  )
}
