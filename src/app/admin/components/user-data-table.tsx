"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card } from "@/components/ui/card";

interface DataTableProps<TData> {
  columns: {
    accessorKey: string,
    header: string,
    cell: (props: { row: { original: TData } }) => React.ReactNode,
  }[];
  data: TData[];
}

export function UserDataTable<TData extends {id: string}>({
  columns,
  data,
}: DataTableProps<TData>) {
  return (
    <Card className="rounded-2xl">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.accessorKey}>{column.header}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length ? (
            data.map((row) => (
              <TableRow key={row.id}>
                {columns.map((column) => (
                  <TableCell key={column.accessorKey}>
                    {column.cell({ row: { original: row } })}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No users found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Card>
  );
}
