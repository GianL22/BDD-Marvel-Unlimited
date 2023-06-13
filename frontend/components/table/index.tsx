import { FC } from "react";
import { Table } from "@nextui-org/react";

interface Props{
  columns: { label: string; uid: string}[];
  rows: any[];
}

export const TableWrapper: FC<Props>= ({columns,rows}) => {
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
          >
            {column.label}
          </Table.Column>
        )}
      </Table.Header>
      <Table.Body items={rows}>
        {(item) => (
          <Table.Row>
            {(columnKey) => (
              <Table.Cell>
                {item[columnKey] ? item[columnKey] : "N/A"}
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