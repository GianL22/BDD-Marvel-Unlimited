import { Text } from '@nextui-org/react';

interface Row {
  title: string,
  episodes: number,
  type: string,
  channel: string
}

export const ReportExtensiveSeriesCellReducer = (row: Row, columnKey: string) => {
  switch (columnKey) {
    case "title":
      return (
        <Text size={'$xl'}>
          {row.title}
        </Text>
      );
    case "episodes":
      return (
        <Text size={'$xl'}>
          {row.episodes}
        </Text>
      );
    case "type":
      return (
        <Text size={'$xl'}>
          {row.type}
        </Text>
      );
    case "channel":
        return (
          <Text size={'$xl'}>
            {row.channel}
          </Text>
        );
    default:
      return <></>
  }
}