import { Text } from '@nextui-org/react';
import { TableActions } from '../TableActions';

interface Row {
    id:              string;
    name:            string;
    lastName:        string;
    gender:          string;
    maritialStatus:  string;
    firstApparition: string;
    type:            string;
}

export const CharactersCellReducer = (row: Row, columnKey: string, onDelete:(id: string) => Promise<void> ) => {  
  switch (columnKey) {
    case "name":
      return (
        <Text>
          {row.name}
        </Text>
      );
    case "lastName":
      return (
        <Text>
          {row.lastName}
        </Text>
      );
    case "gender":
    return (
        <Text>
            {row.gender}
        </Text>
    );
    case "maritialStatus":
    return (
        <Text>
            {row.maritialStatus}
        </Text>
    );
    case "firstApparition":
    return (
        <Text>
            {row.firstApparition}
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
        url={`/dashboard/characters/${row.id}`}
        onActions={ onDelete }
        id = {row.id}
      />
    default:
      return <></>
  }
}