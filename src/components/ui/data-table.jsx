"use client";

import { useEffect, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ChevronDown,
  ChevronUp,
  LayoutGrid,
  List,
  Table as TableIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  X,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "./input";
import { DataTableFacetedFilter } from "./data-table/faceted-filter";
import { DataTableViewOptions } from "./data-table/view-options";
import { Button } from "./button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn, getPageNumbers } from "@/lib/utils";

// View Toggle Dropdown Component
export function ViewToggle({ view, onViewChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const views = [
    { value: "table", label: "Table", icon: TableIcon },
    { value: "list", label: "List", icon: List },
    { value: "grid", label: "Tile", icon: LayoutGrid },
  ];

  const currentView = views.find((v) => v.value === view);
  const CurrentIcon = currentView.icon;

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="h-8 px-2 lg:px-3"
      >
        <CurrentIcon className="w-4 h-4" />
        <span className="hidden sm:inline">{currentView.label}</span>
        {isOpen ? (
          <ChevronUp className="size-4" />
        ) : (
          <ChevronDown className="size-4" />
        )}
      </Button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-40 bg-background border rounded shadow-lg z-20">
            {views.map((v) => {
              const Icon = v.icon;
              return (
                <button
                  key={v.value}
                  onClick={() => {
                    onViewChange(v.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center gap-2 px-4 py-2 hover:bg-card ${
                    view === v.value ? "bg-card" : ""
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{v.label}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

// Toolbar with View Toggle
const DataTableToolbar = ({
  table,
  searchPlaceholder = "Filter...",
  searchKeys = [],
  filters = [],
  view,
  onViewChange = () => {},
  presetFilters = [], // 👈 add new prop
}) => {
  // Apply preset filters before first paint
  useEffect(() => {
    if (presetFilters?.length) {
      presetFilters.forEach(({ columnId, value }) => {
        const column = table.getColumn(columnId);
        if (!column) return;

        // 🧠 Ensure filter values are always arrays
        const normalizedValue = Array.isArray(value) ? value : [value];

        // Apply only if not already set
        if (
          JSON.stringify(column.getFilterValue()) !==
          JSON.stringify(normalizedValue)
        ) {
          column.setFilterValue(normalizedValue);
        }
      });
    }
  }, [table, presetFilters]);

  const isFiltered =
    table.getState().columnFilters.length > 0 || table.getState().globalFilter;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 flex-col-reverse items-start gap-y-2 sm:flex-row sm:items-center sm:space-x-2">
        {/* Search box logic */}
        <Input
          placeholder={searchPlaceholder}
          value={table.getState().globalFilter || ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {/* Filters */}
        <div className="flex gap-x-2">
          {filters.map((filter) => {
            const column = table.getColumn(filter.columnId);
            if (!column) return null;
            return (
              <DataTableFacetedFilter
                key={filter.columnId}
                column={column}
                title={filter.title}
                options={filter.options}
              />
            );
          })}
        </div>

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters();
              table.setGlobalFilter("");
            }}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ms-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-3">
        {onViewChange && <ViewToggle view={view} onViewChange={onViewChange} />}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
};

const DataTablePagination = ({ table }) => {
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();
  const pageNumbers = getPageNumbers(currentPage, totalPages);

  return (
    <div
      className={cn(
        "flex items-center justify-between overflow-clip px-2",
        "@max-2xl/content:flex-col-reverse @max-2xl/content:gap-4"
      )}
      style={{ overflowClipMargin: 1 }}
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2 @max-2xl/content:flex-row-reverse">
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="hidden text-sm font-medium sm:block">Rows per page</p>
        </div>
      </div>

      <div className="flex items-center sm:space-x-6 lg:space-x-8">
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Page {currentPage} of {totalPages}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={() => table.setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>

          {/* Page number buttons */}
          {pageNumbers.map((pageNumber, index) => (
            <div key={`${pageNumber}-${index}`} className="flex items-center">
              {pageNumber === "..." ? (
                <span className="text-muted-foreground px-1 text-sm">...</span>
              ) : (
                <Button
                  variant={currentPage === pageNumber ? "default" : "outline"}
                  className="h-8 min-w-8 px-2"
                  onClick={() => table.setPageIndex(pageNumber - 1)}
                >
                  <span className="sr-only">Go to page {pageNumber}</span>
                  {pageNumber}
                </Button>
              )}
            </div>
          ))}

          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="size-8 p-0"
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

// Table View Component
function TableView({ table, columns }) {
  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} colSpan={header.colSpan}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

// List View Component
function ListView({ table, listItemComponent, actionsComponent }) {
  const ListItem = listItemComponent || DefaultListItem;

  return (
    <div className="space-y-2">
      {table.getRowModel().rows?.length ? (
        table
          .getRowModel()
          .rows.map((row) => (
            <ListItem
              key={row.id}
              row={row}
              actionsComponent={actionsComponent}
            />
          ))
      ) : (
        <div className="h-24 flex items-center justify-center text-gray-500">
          No results.
        </div>
      )}
    </div>
  );
}

// Default List Item Component
function DefaultListItem({ row }) {
  return (
    <div className="border rounded-lg p-4 hover:bg-card">
      <div className="flex items-center gap-4">
        <div className="flex-1 flex items-center gap-4">
          {row.getVisibleCells().map((cell) => (
            <div key={cell.id} className="flex-1">
              {flexRender(cell.column.columnDef.cell, cell.getContext())}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Grid View Component
function GridView({ table, gridItemComponent, actionsComponent }) {
  const GridItem = gridItemComponent || DefaultGridItem;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
      {table.getRowModel().rows?.length ? (
        table
          .getRowModel()
          .rows.map((row) => (
            <GridItem
              key={row.id}
              row={row}
              actionsComponent={actionsComponent}
            />
          ))
      ) : (
        <div className="col-span-full h-24 flex items-center justify-center text-gray-500">
          No results.
        </div>
      )}
    </div>
  );
}

// Default Grid Item Component
function DefaultGridItem({ row, actionsComponent }) {
  const Actions = actionsComponent;

  return (
    <div className="border rounded-lg p-4 hover:shadow-md transition-shadow relative">
      {/* Top-right actions */}
      {Actions && (
        <div className="absolute top-2 right-2">
          <Actions row={row} />
        </div>
      )}

      <div className="space-y-4 mt-6">
        {row
          .getVisibleCells()
          .filter((cell) => cell.column.id !== "actions") // exclude action column from normal rendering
          .map((cell) => (
            <div key={cell.id} className="flex flex-wrap items-center gap-2">
              <span className="font-medium">
                {flexRender(cell.column.columnDef.header, cell.getContext())}
                {":"}
              </span>
              <span>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
                {flexRender(cell.column.columnDef.cell, cell.getContext()) ===
                  "" && "-"}
              </span>
            </div>
          ))}
      </div>
    </div>
  );
}

// Main DataView Component
export function DataView({
  data,
  columns,

  // View configuration
  defaultView = "table",
  enableViewToggle = true,
  listItemComponent,
  gridItemComponent,
  actionsComponent,

  // Optional configurations
  searchPlaceholder = "Filter...",
  searchKeys = [],
  filters = [],
  presetFilters = [],
  globalFilterFn,

  // Pagination settings
  defaultPageSize = 10,
  pageSizeOptions = [10, 20, 30, 40, 50],

  // Enable/disable features
  enableRowSelection = true,
  enablePagination = true,
  enableSorting = true,
  enableFiltering = true,

  // Custom components
  toolbarComponent,
  paginationComponent,
  bulkActionsComponent,

  // State management
  externalState,

  // Callbacks
  onRowSelectionChange,
  onViewChange,

  // Custom class names
  containerClassName = "space-y-4",
}) {
  const [view, setView] = useState(defaultView);
  const ToolbarComponent = toolbarComponent || DataTableToolbar;
  const PaginationComponent = paginationComponent || DataTablePagination;
  const BulkActionsComponent = bulkActionsComponent;

  // Local states
  const [rowSelection, setRowSelection] = useState({});
  const [sorting, setSorting] = useState([]);
  const [columnVisibility, setColumnVisibility] = useState({});

  // Internal states
  const [internalGlobalFilter, setInternalGlobalFilter] = useState("");
  const [internalColumnFilters, setInternalColumnFilters] = useState([]);
  const [internalPagination, setInternalPagination] = useState({
    pageIndex: 0,
    pageSize: defaultPageSize,
  });

  // Use external state if provided
  const globalFilter = externalState?.globalFilter ?? internalGlobalFilter;
  const onGlobalFilterChange =
    externalState?.onGlobalFilterChange ?? setInternalGlobalFilter;
  const columnFilters = externalState?.columnFilters ?? internalColumnFilters;
  const onColumnFiltersChange =
    externalState?.onColumnFiltersChange ?? setInternalColumnFilters;
  const pagination = externalState?.pagination ?? internalPagination;
  const onPaginationChange =
    externalState?.onPaginationChange ?? setInternalPagination;

  const defaultGlobalFilterFn = (row, _columnId, filterValue) => {
    const searchValue = String(filterValue).toLowerCase();

    // If no filter value, show all rows
    if (!searchValue) return true;

    // Only search specific keys if provided
    const keysToSearch =
      searchKeys.length > 0 ? searchKeys : Object.keys(row.original);

    // Return true if ANY of the keys contain the search text (OR logic)
    return keysToSearch.some((key) => {
      const cellValue = row.original[key];
      if (cellValue == null) return false;
      return String(cellValue).toLowerCase().includes(searchValue);
    });
  };

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting: enableSorting ? sorting : undefined,
      columnVisibility,
      rowSelection: enableRowSelection ? rowSelection : undefined,
      columnFilters: enableFiltering ? columnFilters : undefined,
      globalFilter: enableFiltering ? globalFilter : undefined,
      pagination: enablePagination ? pagination : undefined,
    },
    enableRowSelection,
    enableSorting,
    onRowSelectionChange: (updater) => {
      const newSelection =
        typeof updater === "function" ? updater(rowSelection) : updater;
      setRowSelection(newSelection);
      onRowSelectionChange?.(newSelection);
    },
    onSortingChange: enableSorting ? setSorting : undefined,
    onColumnVisibilityChange: setColumnVisibility,
    globalFilterFn: globalFilterFn ?? defaultGlobalFilterFn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: enableFiltering ? getFilteredRowModel() : undefined,
    getPaginationRowModel: enablePagination
      ? getPaginationRowModel()
      : undefined,
    getSortedRowModel: enableSorting ? getSortedRowModel() : undefined,
    getFacetedRowModel: enableFiltering ? getFacetedRowModel() : undefined,
    getFacetedUniqueValues: enableFiltering
      ? getFacetedUniqueValues()
      : undefined,
    onPaginationChange: enablePagination ? onPaginationChange : undefined,
    onGlobalFilterChange: enableFiltering ? onGlobalFilterChange : undefined,
    onColumnFiltersChange: enableFiltering ? onColumnFiltersChange : undefined,
  });

  const pageCount = table.getPageCount();
  useEffect(() => {
    if (enablePagination && externalState?.onPaginationChange) {
      const currentPageIndex = table.getState().pagination.pageIndex;
      if (pageCount > 0 && currentPageIndex >= pageCount) {
        table.setPageIndex(pageCount - 1);
      }
    }
  }, [pageCount, table, enablePagination, externalState]);

  const handleViewChange = (newView) => {
    setView(newView);
    onViewChange?.(newView);
  };

  return (
    <div className={containerClassName}>
      {enableFiltering && (
        <ToolbarComponent
          table={table}
          searchPlaceholder={searchPlaceholder}
          searchKeys={searchKeys}
          filters={filters}
          presetFilters={presetFilters}
          view={view}
          onViewChange={enableViewToggle ? handleViewChange : undefined}
        />
      )}

      {view === "table" && <TableView table={table} columns={columns} />}
      {view === "list" && (
        <ListView
          table={table}
          listItemComponent={listItemComponent}
          actionsComponent={actionsComponent}
        />
      )}
      {view === "grid" && (
        <GridView
          table={table}
          gridItemComponent={gridItemComponent}
          actionsComponent={actionsComponent}
        />
      )}

      {enablePagination && <PaginationComponent table={table} />}

      {BulkActionsComponent && enableRowSelection && (
        <BulkActionsComponent table={table} />
      )}
    </div>
  );
}
