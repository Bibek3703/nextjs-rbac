"use client";

import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import TablePagination from "./table-pagination";
import { PAGE_INDEX, PAGE_SIZE } from "@/constants";
import { Filters } from "@/types";
import useDebounce from "@/hooks/use-debounce";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    filters?: Filters<TData>;
    setFilters: (filters: Filters<TData>) => void;
    rowCount?: number;
}

export function DataTable<TData, TValue>({
    columns,
    data,
    filters,
    setFilters,
    rowCount = 0,
}: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [inputValue, setInputValue] = useState("");
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>(
        [],
    );
    const debouncedValue = useDebounce(inputValue, 300);

    // console.log({ columnFilters });

    const paginationState = {
        pageIndex: filters?.pageIndex || PAGE_INDEX,
        pageSize: filters?.pageSize || PAGE_SIZE,
        rowCount,
    };

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        manualFiltering: true,
        manualSorting: true,
        manualPagination: true,
        state: {
            pagination: {
                pageIndex: filters?.pageIndex || PAGE_INDEX,
                pageSize: filters?.pageSize || PAGE_SIZE,
            },
            sorting,
            columnFilters,
        },
        onPaginationChange: (pagination: any) => {
            setFilters(
                typeof pagination === "function"
                    ? pagination(paginationState)
                    : pagination,
            );
        },
        pageCount: Math.ceil(
            rowCount / paginationState?.pageSize,
        ) ?? 0,
    });

    useEffect(() => {
        if (debouncedValue) {
            setFilters({ ...filters, query: debouncedValue } as Filters<TData>);
        }
    }, [debouncedValue]);

    return (
        <div className="rounded-md border p-4">
            <div className="flex items-center mb-4">
                <Input
                    placeholder="Filter title..."
                    value={inputValue}
                    onChange={(event) => setInputValue(event.target.value)}
                    className="max-w-sm"
                />
            </div>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext(),
                                            )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length
                        ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() &&
                                        "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext(),
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        )
                        : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                </TableBody>
            </Table>

            <div className="mt-4">
                <TablePagination
                    table={table}
                    data={data}
                />
            </div>
        </div>
    );
}
