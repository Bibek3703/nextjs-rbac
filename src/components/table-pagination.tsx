"use client";

import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Table } from "@tanstack/react-table";

export default function TablePagination<TData>(
    { table }: { table: Table<TData> },
) {
    const getPages = () => {
        let pages = Array.from({
            length: table.getPageCount(),
        }).map((_, i) => i + 1);
        if (
            table.getPageCount() > 5 &&
            table.getState().pagination.pageIndex >= 3
        ) {
            const leftPages = Array.from({ length: 2 }).map((_, i) =>
                table.getState().pagination.pageIndex - (1 - i)
            );
            const rightPages = Array.from({
                length: table.getPageCount() -
                            table.getState().pagination.pageIndex > 2
                    ? 3
                    : table.getPageCount() -
                        table.getState().pagination.pageIndex,
            }).map((_, i) => table.getState().pagination.pageIndex + i + 1);
            pages = [
                ...leftPages,
                ...rightPages,
            ];
        }
        return pages;
    };

    const handleNext = async () => {
        if (table.getCanNextPage()) {
            table.nextPage();
        }
    };

    return (
        <Pagination>
            <PaginationContent>
                <PaginationItem
                    onClick={() => {
                        if (table.getCanPreviousPage()) {
                            table.previousPage();
                        }
                    }}
                >
                    <PaginationPrevious href="#" />
                </PaginationItem>
                {getPages().map((num) => (
                    <PaginationItem
                        key={num}
                        onClick={() => table.setPageIndex(num - 1)}
                    >
                        <PaginationLink
                            href="#"
                            isActive={table.getState().pagination.pageIndex ===
                                num - 1}
                        >
                            {num}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                {table.getPageCount() > 5 && (
                    <PaginationItem>
                        <PaginationEllipsis />
                    </PaginationItem>
                )}
                <PaginationItem
                    onClick={handleNext}
                >
                    <PaginationNext href="#" />
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    );
}
