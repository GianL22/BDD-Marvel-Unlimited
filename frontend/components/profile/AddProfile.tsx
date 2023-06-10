import { Card, Row, Text, useModal } from '@nextui-org/react';
import { Plus } from 'iconoir-react';
import { ProfileModal } from '../modal/ProfileModal';


export const AddProfile= () => {
    const { bindings, setVisible } = useModal();

  return (
    <>
        <ProfileModal bindings={bindings} setVisible={setVisible} edit={false} />
        <Card 
            isPressable 
            variant='bordered'
            css={{ 
                    width : '200px', height : '200px', minH:'200px', border:'$primary 4px dashed'
                }}
            onClick={() => setVisible(true)}
        >
            <Card.Body css={{
                p: 0, 
            }} >
                <Row wrap="wrap" justify="center" align="center" css={{height:'100%', color:'$primary'}}>
                    <Plus fontSize={60} />
                </Row>
            </Card.Body>
        </Card>
    </>
    
  )
}
