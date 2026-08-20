import React, { useState, useEffect } from 'react';
import {
  createColumnHelper,
  globalFilteringFeature,
  rowPaginationFeature,
  tableFeatures,
  useTable,
} from '@tanstack/react-table'


export default function Table(config) {
  const columnHelper = createColumnHelper();
  var cols = [];
  for(let key in config.columns){ 
    cols.push(
      columnHelper.accessor(
        key,
        {
          header: config.columns[key].display,
        }
      )
    );
  }
  const columns = columnHelper.columns(cols);
  const features = tableFeatures({ rowPaginationFeature, globalFilteringFeature });

  const pageSize = config.pageSize ?? config.page_length ?? 10;
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize });
  const [globalFilter, setGlobalFilter] = useState('');
  const [totalRows, setTotalRows] = useState(0);
  const table = useTable({
    features,
    data,
    columns,
    manualPagination: true,
    manualFiltering: true,
    rowCount: totalRows,
    state: { pagination, globalFilter },
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
  });

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({
      start: String(pagination.pageIndex * pagination.pageSize),
      length: String(pagination.pageSize),
    });
    const searchParam = config.searchParam ?? 'search[value]';
    if (globalFilter && searchParam) params.set(searchParam, globalFilter);

    fetch(`/table/${config.id}/get?${params}`, { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`Unable to load table data (${res.status})`);
        return res.json();
      })
      .then((response) => {
        setData(response.data ?? []);
        setTotalRows(response.recordsFiltered ?? response.total ?? response.recordsTotal ?? 0);
      })
      .catch((error) => {
        if (error.name !== 'AbortError') throw error;
      });

    return () => controller.abort();
  }, [config.id, pagination.pageIndex, pagination.pageSize, globalFilter, config.searchParam]);

  useEffect(() => {
    setPagination((current) => current.pageIndex === 0
      ? current
      : { ...current, pageIndex: 0 });
  }, [globalFilter]);

  return (
    <div className="demo-root">
      <div className="table-controls">
          <input
            type="search"
            value={globalFilter}
            placeholder={config.searchPlaceholder ?? 'Search...'}
            aria-label={config.searchLabel ?? 'Search table'}
            onChange={(event) => table.setGlobalFilter(event.target.value)}
          />
        <div className="table-page-size">
          <select
            value={pagination.pageSize}
            onChange={(event) => table.setPageSize(Number(event.target.value))}
          >
            {(config.pageSizes ?? [10, 25, 50, 100]).map((size) => (
              <option key={size} value={size}>{size} per page</option>
            ))}
          </select>
        </div>
      </div>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : (
                    <table.FlexRender header={header} />
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getAllCells().map((cell) => (
                <td key={cell.id}>
                  <table.FlexRender cell={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        <tfoot>
          {table.getFooterGroups().map((footerGroup) => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : (
                    <table.FlexRender footer={header} />
                  )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot>
      </table>
      <div className="table-pagination">
        <button
          type="button"
          onClick={() => table.firstPage()}
          disabled={!table.getCanPreviousPage()}
        >
          First
        </button>
        <button
          type="button"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </button>
        <span>
          Page {table.getPageCount() === 0 ? 0 : pagination.pageIndex + 1} of {table.getPageCount()}
        </span>
        <button
          type="button"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </button>
        <button
          type="button"
          onClick={() => table.lastPage()}
          disabled={!table.getCanNextPage()}
        >
          Last
        </button>
      </div>
      <div className="spacer-md" />
    </div>
  );
};
