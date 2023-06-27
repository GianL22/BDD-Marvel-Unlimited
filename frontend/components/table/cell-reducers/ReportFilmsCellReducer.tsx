import { Text } from '@nextui-org/react';

interface Row {
    title: string,
    cost: number,
    revenue: number,
    duration: number,
    premiere : string,
    director: string 
}

export const ReportFilmsCellReducer = (row: Row, columnKey: string) => {
  switch (columnKey) {
    case "title":
      return (
        <Text size={'$xl'}>
          {row.title}
        </Text>
      );
    case "cost":
      return (
        <Text size={'$xl'}>
          {row.cost}
        </Text>
      );
    case "revenue":
      return (
        <Text size={'$xl'}>
          {row.revenue}
        </Text>
      );
    case "duration":
      return (
        <Text size={'$xl'}>
          {row.duration}
        </Text>
      );
    case "premiere":
      return (
        <Text size={'$xl'}>
          {row.premiere}
        </Text>
      );
    case "director":
      return (
        <Text size={'$xl'}>
          {row.director}
        </Text>
      );
    default:
      return <></>
  }
}