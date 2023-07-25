import { FC } from 'react'
import { Card, Col, Grid, Text, Tooltip} from '@nextui-org/react'
import { IconButton } from '../table/IconButton'
import { DeleteIcon } from '../table/DeleteIcon'
import { Flex } from '../containers/Flex';

interface Props {
    id : string
    description : string
    pressable : boolean
    selected : boolean
    onDelete: (id: string) => Promise<void>;
    onSelect: (id: string) => void;

}


export const ListItem : FC<Props>= ({id, description = 'Testing', pressable, selected, onDelete, onSelect}) => {
  return (
    <Flex direction='row' justify='between'>
        <Card
        isPressable={pressable}
        isHoverable
        variant={selected ? 'bordered' : 'flat'}
        onClick={() => onSelect(id)}
        css={{ mw: "100%" }}
        >
            <Card.Body>
                <Text h4>{description}</Text>

            </Card.Body>
        </Card>
        <Tooltip
                content={'Eliminar'}
                color={'error'}
            >
            <IconButton 
                onClick={() =>  onDelete(id)}
                css={{ m: 10 }}
            >
                <DeleteIcon height={20} width={20} size={24} fill="#FF0080" />
            </IconButton>                           
        </Tooltip>
    </Flex>
  )
}
