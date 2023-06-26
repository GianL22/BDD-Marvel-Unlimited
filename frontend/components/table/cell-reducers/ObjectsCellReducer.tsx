import { Text } from '@nextui-org/react';
import { TableActions } from '../TableActions';

interface Row {
  id: string;
  name: string;
  material: string;
  type: string
}

export const ObjectsCellReducer = (row: Row, columnKey: string, onDelete:(id: string) => Promise<void> ) => {  
  switch (columnKey) {
    case "name":
      return (
        <Text>
          {row.name}
        </Text>
      );
    case "material":
      return (
        <Text>
          {row.material}
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
        url={`/dashboard/objects/${row.id}`}
        onActions={ onDelete }
        id = {row.id}
      />
    default:
      return <></>
  }
}