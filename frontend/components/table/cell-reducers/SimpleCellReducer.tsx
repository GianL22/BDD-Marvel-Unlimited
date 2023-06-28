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

    case "description":
      return <Text>
          {row.description}
          </Text>
    case "jobOcupation":
      return <Text>
          {row.jobOcupation}
          </Text>
    default:
      return  <Text>
              N/A
            </Text>
  }
}