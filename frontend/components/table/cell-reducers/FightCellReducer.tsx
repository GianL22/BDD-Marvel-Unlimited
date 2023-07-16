import { Text } from '@nextui-org/react';
import { TableActions } from '../TableActions';

interface Row {
  id : string;
  date: string;
  placeId : string;
  placeName: string;
}

export const FightCellReducer = (row: Row, columnKey: string, onDelete:(id: string) => Promise<void> ) => {  
  switch (columnKey) {
    case "placeName":
      return (
        <Text>
          {row.placeName}
        </Text>
      );
    case "date":
      return (
        <Text>
          {
            row.date
            
          }
        </Text>
      );
    case "actions": 
      return <TableActions
        url={`/dashboard/fights/${row.id}`}
        onActions={ onDelete }
        id = {`${row.id}`}
      />
    default:
      return <></>
  }
}