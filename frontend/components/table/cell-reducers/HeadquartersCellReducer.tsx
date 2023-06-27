import { Text } from '@nextui-org/react';
import { TableActions } from '../TableActions';

interface Row {
  id:     string;
  headquarterName:   string;
  organizationId:    string;
  organizationName:  string;
  buildingType:      string;
}

export const HeadquartersCellReducer = (row: Row, columnKey: string, onDelete:(id: string) => Promise<void> ) => {  
  switch (columnKey) {
    case "headquarterName":
      return (
        <Text>
          {row.headquarterName}
        </Text>
      );
    case "organizationName":
      return (
        <Text>
          {row.organizationName}
        </Text>
      );
    case "buildingType":
    return (
        <Text>
        {row.buildingType}
        </Text>
    );
    case "actions": 
      return <TableActions
        url={`/dashboard/headquarters/${row.id}`}
        onActions={ onDelete }
        id = {`${row.id} ${row.organizationId}`}
      />
    default:
      return <></>
  }
}