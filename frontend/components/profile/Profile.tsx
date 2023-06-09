import { FC } from 'react';
import { Card, Row, Text, Col, useModal } from '@nextui-org/react';
import { ProfileModal } from '../modal/ProfileModal';
import { EditPencil } from 'iconoir-react'
import { Box } from '../containers';

interface Props {
    img: string;
    nickname: string;
    nProfile: number;
    editable: boolean;
}

export const Profile:FC<Props> = ({img,nickname,nProfile, editable} : Props) => {
    const { bindings, setVisible } = useModal();
  return (
    <>
        <ProfileModal bindings={bindings} setVisible={setVisible} edit={true} />
        <Card 
            isPressable 
            isHoverable  
            variant='bordered'  
            css={{ width : '200px', height : '200px', minH:'200px',}}
            onClick={
                (editable)
                    ? () => setVisible(true)
                    : () => console.log('Te mando al main')
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
                    src={img}
                    objectFit="cover"   
                    width="100%"
                    height={340}
                    alt='Imagen de perfil del usuario'
                />
            </Card.Body>
            <Card.Footer css={{ justifyItems: "flex-start" }}>
                <Row wrap="wrap" justify="space-between" align="center">
                    <Text b>{nickname}</Text>
                    <Text css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>
                    Numero Perfil {nProfile}
                    </Text>
                </Row>
            </Card.Footer>
    </Card>
    </>
  )
}
