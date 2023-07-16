import { Text, Tooltip, User } from '@nextui-org/react';
import { TableActions } from '../TableActions';
import { IconButton } from '../IconButton';
import { DeleteIcon } from '../DeleteIcon';
import { Plus } from 'iconoir-react';

interface Row {
  id: string;
  description: string;
  jobOcupation: string;
  poster: string;
  title: string
}

export const SimpleCellReducer = (row: Row, columnKey: string, onDelete: (id: string) => Promise<void>) => {
  switch (columnKey) {
    case "actions":
      return (
        <TableActions
          url=''
          edit={false}
          onActions={onDelete}
          id={row.id}
        />
      )
    case "delete":
      return (
        <Tooltip
          content={'Eliminar'}
          color={'error'}
        >
          <IconButton
            onClick={() => onDelete(row.id)}
            css={{ my: 10 }}
          >
            <DeleteIcon height={20} width={20} size={20} fill="#FF0080" />
          </IconButton>
        </Tooltip>
      )
    case "add":
      return (
        <Tooltip
          content={'Agregar'}
          color={'success'}
        >
          <IconButton
            onClick={() => onDelete(row.id)}
            css={{ my: 10 }}
          >
            <Plus fontSize={20} color={"#88dc65"} fill='88dc65' />
          </IconButton>
        </Tooltip>
      )
    case "poster":
      return (
        <User
          src={`/medios/${row.poster}`}
          name={row.title}
          size="lg"
        />
      );
    default:
      return (
        <Text>
          {row[columnKey as keyof Row]}
        </Text>
      )
  }
}