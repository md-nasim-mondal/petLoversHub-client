import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import PropTypes from "prop-types";

const TanStackTable = ({ data, columns }) => {
  const [sorting, setSorting] = useState([]);
  const [filtering, setFiltering] = useState("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting: sorting,
      globalFilter: filtering,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  return (
    <div className='text-center'>
      <div className='flex flex-col md:flex-row justify-center items-center gap-1 md:gap-4'>
        <input
          type='text'
          value={filtering}
          placeholder='Write Name or Category'
          onChange={(e) => setFiltering(e.target.value)}
          className='my-6 p-2 border rounded'
        />
        <p className='dark:text-white font-semibold'>You can Search Here</p>
      </div>
      <div className='overflow-x-auto md:flex justify-center'>
        <table className='w-full md:w-3/4 dark:text-white'>
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr className='border-2' key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className='text-center cursor-pointer px-3 py-6 border'
                    onClick={header.column.getToggleSortingHandler()}>
                    {header.isPlaceholder ? null : (
                      <div className='flex items-center justify-center'>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {
                          { asc: "🔼", desc: "🔽" }[
                            header.column.getIsSorted() ?? null
                          ]
                        }
                      </div>
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr className='border-b' key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td className='text-center w-auto border px-3 py-1' key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {table.getPageCount() > 1 && (
        <div className='lg:w-1/4 flex justify-between items-center mt-4 mx-auto'>
          <button
            className={`px-4 py-2 rounded ${
              table.getCanPreviousPage()
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}>
            Previous
          </button>
          <span className='text-sm text-gray-700 dark:text-white'>
            Page {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </span>
          <button
            className={`px-4 py-2 rounded ${
              table.getCanNextPage()
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

TanStackTable.propTypes = {
  data: PropTypes.any,
  columns: PropTypes.any,
};

export default TanStackTable;
