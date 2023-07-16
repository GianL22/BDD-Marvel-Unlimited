import { FC } from "react";
import { Card, Text } from "@nextui-org/react";
import { ListItem } from "./ListItem";
import { GenericResponse } from "@/models/Information";
import { Flex } from "../containers";

interface Props {
    title : string
    rows : GenericResponse[],
    pressable : boolean,
    selected : string,
    onDelete: (id: string) => Promise<void>,
    onSelect: (id: string) => void,
}


export const ListGrid : FC<Props> = ({title, rows, pressable, selected, onDelete, onSelect}) => {




  return (
    <Card css={{ minWidth: "400px" }}>
      <Card.Header css={{ justifyContent : 'center', alignItems : 'center'}}>

          <Text h3>{title}</Text>  
      </Card.Header>
      <Card.Body>

        {
          (rows.length == 0) ?
            <Flex css={{ justifyContent : 'center', alignItems : 'center'}}>
              <Text h3>Nada agregado aún</Text>  
            </Flex>
           : rows.map((row) => {

                return <ListItem
                    key={row.id}
                    id={row.id}
                    selected={row.id === selected}
                    description={row.description}
                    pressable={pressable}
                    onDelete={onDelete}
                    onSelect={onSelect}
                />

            })

        }
      </Card.Body>
    </Card>
  );
}
