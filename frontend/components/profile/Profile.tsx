import { FC } from 'react';
import { Card, Row, Text } from '@nextui-org/react';

interface Props {
    img: string;
    nickname: string;
    nProfile: number;
}

export const Profile:FC<Props> = ({img,nickname,nProfile} : Props) => {
  return (
    <Card isPressable isHoverable  variant='bordered'  css={{ width : '200px', height : '200px', margin:'$16'}}>
        <Card.Body css={{ p: 0 }}>
            <Card.Image
                src={img}
                objectFit="cover"   
                width="100%"
                height={140}
                alt='Imagen de perfil del usuario'
            />
        </Card.Body>
        <Card.Footer css={{ justifyItems: "flex-start" }}>
            <Row wrap="wrap" justify="space-between" align="center">
                <Text b>{nickname}</Text>
                <Text css={{ color: "$accents7", fontWeight: "$semibold", fontSize: "$sm" }}>
                {nProfile}
                </Text>
            </Row>
        </Card.Footer>
  </Card>
  )
}
