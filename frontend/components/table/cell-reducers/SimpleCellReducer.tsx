import { Text } from '@nextui-org/react';
import { TableActions } from '../TableActions';

interface Row {
  id:          string;
  description:        string;
  jobOcupation:      string;
}

export const SimpleCellReducer = (row: Row, columnKey: string, onDelete:(id: string) => Promise<void> ) => {  
  switch (columnKey) {
    case "actions": 
      return <TableActions
        url=''
        edit = {false}
        onActions={ onDelete }
        id = {row.id}
      />
    default:
      return  <Text>
                {row[columnKey as keyof Row]}
            </Text>
  }
}