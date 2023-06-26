import { Text } from '@nextui-org/react';

interface Row {
  name: string
  lastName: string;
  dateSuscription: string;
  dateEnd: string;
  email: string;
}

export const ReportUpgradeCellReducer = (row: Row, columnKey: string) => {
  switch (columnKey) {
    case "email":
      return (
        <Text size={'$xl'}>
          {row.email}
        </Text>
      );
    case "name":
      return (
        <Text size={'$xl'}>
          {row.name}
        </Text>
      );
    case "lastName":
      return (
        <Text size={'$xl'}>
          {row.lastName}
        </Text>
      );
    case "dateSuscription":
        return (
          <Text size={'$xl'}>
            {row.dateSuscription}
          </Text>
        );
    case "dateEnd":
    return (
      <Text size={'$xl'}>
        {row.dateEnd}
      </Text>
    );
    default:
      return <></>
  }
}