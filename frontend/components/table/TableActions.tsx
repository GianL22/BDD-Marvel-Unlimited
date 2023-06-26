import { FC } from 'react';
import NextLink from 'next/link';
import { Col, Row, Text, Tooltip } from '@nextui-org/react'
import { IconButton } from './IconButton';
import { EyeIcon } from './EyeIcon';
import { DeleteIcon } from './DeleteIcon';

interface Props {
    url: string;
    onActions: (id: string) => Promise<void>;
    showDelete?: boolean;
    edit?: boolean;
    id: string;
}

export const TableActions: FC<Props> = ({url,edit=true,showDelete=true, onActions, id}) => {
  return (
    <Row justify="center" align="center" css={{margin:'$6'}}>
        {
            edit && (
                <Col css={{ d: "flex" }}>
                    <Tooltip 
                        content="Detalles"
                        color='primary'
                    >
                        <NextLink href={url} passHref > 
                            <IconButton>
                                <EyeIcon height={20} width={20} size={20} fill="#979797" />
                            </IconButton>
                        </NextLink>
                    </Tooltip>
                </Col>
            )
        }
        {
            showDelete && (
                <Col css={{ d: "flex" }}>
                    <Tooltip
                        content={'Eliminar'}
                        color={'error'}
                    >
                        <IconButton 
                            onClick={() =>  onActions(id)}
                            css={{ my: 10 }}
                        >
                            <DeleteIcon height={20} width={20} size={20} fill="#FF0080" />
                        </IconButton>                           
                    </Tooltip>
                </Col>
            )
        }
    </Row>
  )
}