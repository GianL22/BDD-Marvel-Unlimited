import { Badge, Text, Avatar, User } from '@nextui-org/react';

interface Row {
    characterRol: string,
    title: string;
    poster: string;
    rating: string;
}

export const ReportsCellReducer = (row: Row, columnKey: string) => {
    switch (columnKey) {
        case "characterRol":
            return (
                <Badge
                    color={(row.characterRol === 'hero') ? 'success' : 'error'}
                    variant='bordered'
                >
                    {(row.characterRol === 'hero') ? 'HEROE' : 'VILLANO'}
                </Badge>
            );
        case "rating":
            return (
                <Text size={'$xl'}>
                    {row.rating} ⭐
                </Text>
            );
        case "poster":
            return (
                <User
                    src={`/medios/${row.poster}`}
                    name={row.title}
                    size="lg"
                />
            );
        default:
            return (
                <Text size={'$xl'}>
                    {row[columnKey as keyof Row]}
                </Text>
            )
    }
}