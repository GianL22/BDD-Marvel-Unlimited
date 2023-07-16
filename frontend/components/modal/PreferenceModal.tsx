import { Button, Modal, Text, Grid, Loading, useTheme } from '@nextui-org/react'
import { FC, useEffect, useState } from 'react';
import { TableWrapper } from '../table';
import { SimpleCellReducer } from '../table/cell-reducers/SimpleCellReducer';
import { useQuery } from '@apollo/client';
import { GetMediosToPreference } from '@/graphql/Medio';
import { Notification } from '@/notification';
import { useRecommendations } from '@/hooks/useRecommendations';
import Cookies from 'js-cookie';

interface Props {
    bindings: {
        open: boolean;
        onClose: () => void;
    };
    setVisible: (visible: boolean) => void;
}

interface DataResponse {
    mediosTitleAndIds: MediosTitleAndID[];
}

interface MediosTitleAndID {
    id: string;
    title: string;
    poster: string;
    type: string;
}

const columnsToAdd = [
    { label: "Medios", uid: "poster" },
    { label: "Agregar", uid: "add" },
];

const columnsToDelete = [
    { label: "Medios", uid: "poster" },
    { label: "Eliminar", uid: "delete" },
];

export const PreferenceModal: FC<Props> = ({ bindings, setVisible }) => {
    const { data, error } = useQuery<DataResponse>(GetMediosToPreference)
    const [mediosToShow, setMediosToShow] = useState<MediosTitleAndID[]>(data?.mediosTitleAndIds!)
    const [mediosToAdd, setMediosToAdd] = useState<MediosTitleAndID[]>([])
    const [isLoading, setIsLoading] = useState(false);
    const { isDark } = useTheme()
    const { handleMyPreferences } = useRecommendations(false, false, 0)

    useEffect(() => {
        setMediosToAdd([])
        setIsLoading(false)
    }, [bindings])

    useEffect(() => {
        setMediosToShow(data?.mediosTitleAndIds.filter(medio => !mediosToAdd.includes(medio))!)
    }, [mediosToAdd])

    const handleSubmit = async () => {
        try {
            for (const medio of mediosToAdd) {
                await handleMyPreferences(medio.id);
            }
            setIsLoading(true);
            setVisible(false);
            Cookies.remove('activeProfile')
            Notification(isDark).fire({
                title: 'Preferencias guardadas',
                icon: 'success',
            })
            setIsLoading(false)
        } catch (error: any) {
            Notification(isDark).fire({
                title: error.message,
                icon: 'error',
            })
            setIsLoading(false)
        }
    }

    const onRemoveMedio = async (id: string) => setMediosToAdd(prevArray => prevArray.filter(obj => obj.id !== id))

    const onAddMedio = async (id: string) => {
        const newMedio = data?.mediosTitleAndIds.find(medio => medio.id === id)
        setMediosToAdd(prevArray => prevArray.concat(newMedio!))
    }

    if (error) return <Text>Algo CRÍTICO paso</Text>
    return (
        <Modal
            width="1000px"
            closeButton
            preventClose
            blur
            {...bindings}
        >
            <Modal.Header>
                <Text b h1>
                    Escoge tus películas, series y video juegos favoritos
                </Text>
            </Modal.Header>

            <Modal.Body>
                <Grid.Container gap={2} justify="center">
                    <Grid
                        xs={12}
                        sm={6}
                        css={{
                            gap: '$17',
                            display: 'flex',
                            flexDirection: 'column',
                            py: '$11',
                            justifyContent: 'space-between',
                            margin: '$0'
                        }}
                    >
                        <TableWrapper
                            columns={columnsToAdd}
                            rows={mediosToShow}
                            cellReducer={SimpleCellReducer}
                            onDelete={onAddMedio}
                        />
                    </Grid>
                    <Grid
                        xs={12}
                        sm={6}
                        css={{
                            gap: '$17',
                            display: 'flex',
                            flexDirection: 'column',
                            py: '$11',
                            justifyContent: 'space-between',
                            margin: '$0'
                        }}
                    >
                        {
                            (mediosToAdd.length === 0)
                                ? <Text b> Agrega tus preferencias </Text>
                                : (
                                    <TableWrapper
                                        columns={columnsToDelete}
                                        rows={mediosToAdd!}
                                        cellReducer={SimpleCellReducer}
                                        onDelete={onRemoveMedio}
                                    />
                                )
                        }
                    </Grid>
                </Grid.Container>
            </Modal.Body>
            <Modal.Footer>
                <Button size='md' onPress={() => setVisible(false)} animated ghost>
                    Omitir este paso
                </Button>
                <Button
                    size='md'
                    onPress={handleSubmit}
                    disabled={(mediosToAdd.length === 0)}
                    animated ghost
                >
                    {(!isLoading) ? 'Agregar Preferencias' : <Loading type='points' />}
                </Button>
            </Modal.Footer>

        </Modal>
    );
};