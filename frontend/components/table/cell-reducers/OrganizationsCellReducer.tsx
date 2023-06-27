import { Text } from '@nextui-org/react';
import { TableActions } from '../TableActions';

interface Row {
  id:          string;
  name:        string;
  slogan:      string;
  leaderName:  string;
  founderName: string;
}

export const OrganizationsCellReducer = (row: Row, columnKey: string, onDelete:(id: string) => Promise<void> ) => {  
  switch (columnKey) {
    case "name":
      return (
        <Text>
          {row.name}
        </Text>
      );
    case "slogan":
      return (
        <Text>
          {row.slogan}
        </Text>
      );
    case "leaderName":
    return (
        <Text>
        {row.leaderName}
        </Text>
    );
    case "founderName":
      return (
          <Text>
          {row.founderName}
          </Text>
      );
    case "actions": 
      return <TableActions
        url={`/dashboard/organizations/${row.id}`}
        onActions={ onDelete }
        id = {row.id}
      />
    default:
      return <></>
  }
}