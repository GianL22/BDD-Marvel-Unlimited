import { FC } from "react";
import { Table } from "@nextui-org/react";

interface Props{
  columns: { label: string; uid: string}[];
  rows: any[];
  cellReducer: (row: any, columnKey: string, onDelete:(id: string) => Promise<void> ) => JSX.Element;
  onDelete?: (id: string) => Promise<void>;
}

export const TableWrapper: FC<Props>= ({columns,rows,cellReducer,onDelete }) => {
  return (
    <Table
      aria-label="table"
      lined
      headerLined
      striped
      css={{
        width: "100%",
      }}
    >
      <Table.Header columns={columns}>
        {(column) => (
          <Table.Column
            key={column.uid}
            hideHeader={column.uid === "actions"}
            align={column.uid === "actions" ? "center" : "start"}
          >
            {column.label}
          </Table.Column>
        )}
      </Table.Header>
      <Table.Body items={rows}>
        {(item) => (
          <Table.Row>
            {(columnKey) => (
              <Table.Cell css={{fontSize:'$xl'}}>
                { 
                  cellReducer(item, columnKey as string, onDelete!)
                }
              </Table.Cell>
            )}
          </Table.Row>
        )}
      </Table.Body>
      <Table.Pagination
        noMargin
        align="center"
        rowsPerPage={5}
        onPageChange={(page) => console.log({ page })}
      />
    </Table>
  )
}