import { Text } from '@nextui-org/react';
import { TableActions } from '../TableActions';

interface Row {
  id:              string;
  title:           string;
  based:           string;
  releaseDate:      string;
  type:            string;
}

export const MediosCellReducer = (row: Row, columnKey: string, onDelete:(id: string) => Promise<void> ) => {  
  switch (columnKey) {
    case "title":
      return (
        <Text>
          {row.title}
        </Text>
      );
    case "based":
      return (
        <Text>
          {row.based}
        </Text>
      );
    case "releaseDate":
    return (
        <Text>
            {row.releaseDate}
        </Text>
    );
    case "type":
    return (
        <Text>
            {row.type}
        </Text>
    );
    case "actions": 
      return <TableActions
        url={`/dashboard/medios/${row.type}&${row.id}`}
        onActions={ onDelete }
        id = {row.id}
      />
    default:
      return <></>
  }
}