import { Text } from '@nextui-org/react';
import { TableActions } from '../TableActions';

interface Row {
  id: string;
  name: string;
  description: string;
}

export const PowersCellReducer = (row: Row, columnKey: string, onDelete:(id: string) => Promise<void> ) => {  
  switch (columnKey) {
    case "name":
      return (
        <Text>
          {row.name}
        </Text>
      );
    case "description":
      return (
        <Text>
          {row.description}
        </Text>
      );
    case "actions": 
      return <TableActions
        url={`/dashboard/powers/${row.id}`}
        onActions={ onDelete }
        id = {row.id}
      />
    default:
      return <></>
  }
}