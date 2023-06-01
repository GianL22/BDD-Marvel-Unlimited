import { FC } from 'react';
import { Card, Row, Text } from '@nextui-org/react';
import { Plus } from 'iconoir-react';


export const AddProfile= () => {
  return (
    <Card isPressable variant='bordered'
          css={{ width : '200px', height : '200px',
                margin:'$16', border:'$white 4px dashed'
        }}
    >
        <Card.Body css={{
            p: 0, 
        }} >
            <Row wrap="wrap" justify="center" align="center" css={{height:'100%'}}>
                <Plus fontSize={60} />
            </Row>
        </Card.Body>
  </Card>
  )
}