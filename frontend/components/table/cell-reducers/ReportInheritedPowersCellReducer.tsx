import { Text } from '@nextui-org/react';

interface Row {
    powerName: string
    powerDescription: string;
    villains: string;
}

export const ReportInheritedPowersCellReducer = (row: Row, columnKey: string) => {
  switch (columnKey) {
    case "powerName":
      return (
        <Text size={'$xl'}>
          {row.powerName}
        </Text>
      );
    case "powerDescription":
      return (
        <Text size={'$xl'}>
          {row.powerDescription}
        </Text>
      );
    case "villains":
      return (
        <Text size={'$xl'}>
          {row.villains}
        </Text>
      );
    default:
      return <></>
  }
}