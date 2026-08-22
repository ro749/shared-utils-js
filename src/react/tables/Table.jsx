import React, { useState, useEffect } from 'react';
import {
  createColumnHelper,
  globalFilteringFeature,
  rowPaginationFeature,
  rowSortingFeature ,
  tableFeatures,
  useTable
} from '@tanstack/react-table'
import IconMap from '../icons/IconMap.jsx';


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
  if(config.buttons){
    cols.push(columnHelper.display({
      id: 'actions',
      cell: (info) => (
        <div className="normal-buttons">
          {config.buttons.map((button, index) => {
            const IconComponent = IconMap[button.icon]
            const Wrapper = button.view ? "a" : React.Fragment;

            return (
              <Wrapper href={button.view?(button.view.url+'?'+button.view.name+'='+info.row.original[button.view.param]):undefined}>
              <button
                key={button.icon ?? index}
                type="button"
                className={`btn w-32-px h-32-px rounded-circle ${button.background_color_class} ${button.text_color_class} d-inline-flex align-items-center justify-content-center`}
              >
                <IconComponent/>
              </button>
              </Wrapper>
            )
          })}
        </div>
      ),
    }));
  }
  const columns = columnHelper.columns(cols);
  const features = tableFeatures({ rowPaginationFeature, globalFilteringFeature, rowSortingFeature  });

  const pageSize = config.pageSize ?? config.page_length ?? 10;
  const [data, setData] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize });
  const [globalFilter, setGlobalFilter] = useState('');
  const [sorting, setSorting] = useState([]);
  const [totalRows, setTotalRows] = useState(0);
  const [activeFilters, setActiveFilters] = useState(() => {
    const initialFilters = {};
    if (config.filters) {
      for (const [key, filter] of Object.entries(config.filters)) {
        if (filter.default) {
          initialFilters[key] = filter.default;
        }
      }
    }
    return initialFilters;
  });
  const [deletePopup, setDeletePopup] = useState({ show: false, warning: '', row: null });
  const table = useTable({
    features,
    data,
    columns,
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true,
    rowCount: totalRows,
    state: { pagination, globalFilter, sorting },
    onPaginationChange: setPagination,
    onGlobalFilterChange: setGlobalFilter,
    onSortingChange: setSorting,
  });

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({
      start: String(pagination.pageIndex * pagination.pageSize),
      length: String(pagination.pageSize),
    });
    const searchParam = config.searchParam ?? 'search[value]';
    if (globalFilter && searchParam) params.set(searchParam, globalFilter);
    
    if (sorting.length > 0) {
      const sort = sorting[0];
      params.set('order[0][column]', sort.id);
      params.set('order[0][dir]', sort.desc ? 'desc' : 'asc');
    }

    if (Object.keys(activeFilters).length > 0) {
      for (const [key, value] of Object.entries(activeFilters)) {
        params.set(`filters[${key}]`, value);
      }
    }

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
  }, [config.id, pagination.pageIndex, pagination.pageSize, globalFilter, sorting, config.searchParam, activeFilters]);

  useEffect(() => {
    setPagination((current) => current.pageIndex === 0
      ? current
      : { ...current, pageIndex: 0 });
  }, [globalFilter, activeFilters]);

  const handleFilterClick = (filterKey, optionKey) => {
    setActiveFilters((prev) => {
      const isActive = prev[filterKey] === optionKey;
      const filterConfig = config.filters[filterKey];
      
      if (isActive) {
        if (filterConfig.default === '') {
          const { [filterKey]: removed, ...rest } = prev;
          return rest;
        } else {
          return prev;
        }
      } else {
        return { ...prev, [filterKey]: optionKey };
      }
    });
  };

  const handleDeleteClick = (row) => {
    const warning = config.delete?.warning ?? '';
    const matches = [...warning.matchAll(/\{(.*?)\}/g)];
    const args = matches.map(match => match[1].trim());
    let processedWarning = warning;
    for (const arg of args) {
      processedWarning = processedWarning.replace('{' + arg + '}', row[arg]);
    }
    setDeletePopup({ show: true, warning: processedWarning, row });
  };

  const handleConfirmDelete = () => {
    const formData = new FormData();
    formData.append('id', deletePopup.row.id);
    formData.append('_token', document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') ?? '');
    Object.entries(activeFilters).forEach(([key, value]) => {
      formData.append(`filters[${key}]`, value);
    });

    fetch(`/table/${config.id}/delete`, {
      method: 'POST',
      body: formData,
    })
      .then((res) => {
        if (!res.ok) throw new Error(`Unable to delete row (${res.status})`);
        return res.json();
      })
      .then(() => {
        setDeletePopup({ show: false, warning: '', row: null });
        setData((prevData) => prevData.filter((item) => item.id !== deletePopup.row.id));
        setTotalRows((prev) => Math.max(0, prev - 1));
      })
      .catch((error) => {
        console.error('Delete error:', error);
      });
  };

  const handleCloseDeletePopup = () => {
    setDeletePopup({ show: false, warning: '', row: null });
  };

  return (
    <div className="dt-container">
      <div className="dt-layout-row">
        <div className="dt-layout-cell dt-layout-start">
          <select
            value={pagination.pageSize}
            onChange={(event) => table.setPageSize(Number(event.target.value))}
          >
            {(config.pageSizes ?? [10, 25, 50, 100]).map((size) => (
              <option key={size} value={size}>{size} per page</option>
            ))}
          </select>
        </div>
        <div className="dt-layout-cell dt-layout-end" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: '6px' }}>
          {config.filters && Object.entries(config.filters).map(([filterKey, filter]) => (
            <div key={filterKey} className="filter" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', gap: '8px', marginLeft: '8px', alignItems: 'center' }}>
              <p style={{ margin: '0' }}>{filter.display}</p>
              {filter.filters && Object.entries(filter.filters).map(([optionKey, option]) => (
                <button
                  key={optionKey}
                  id={`f-${filterKey}-${optionKey}`}
                  className={`filter-button btn btn-outline-neutral-900 no-hover ${activeFilters[filterKey] === optionKey ? 'active' : ''}`}
                  onClick={() => handleFilterClick(filterKey, optionKey)}
                >
                  {option.display}
                </button>
              ))}
            </div>
          ))}
          <div className="dt-search">
          <label>Buscar:</label> 
          <input
            type="search"
            value={globalFilter}
            placeholder={config.searchPlaceholder ?? 'Search...'}
            aria-label={config.searchLabel ?? 'Search table'}
            onChange={(event) => table.setGlobalFilter(event.target.value)}
          />
          </div>
        </div>
        
      </div>
      <table className="table bordered-table mb-0 dataTable" style={{width: "97.2222%"}} >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th 
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  style={{ cursor: header.column.getCanSort() ? 'pointer' : 'default' }}
                  className={`dt-orderable-asc dt-orderable-desc ${header.column.getIsSorted() ? (header.column.getIsSorted() == 'desc' ? 'dt-ordering-desc' : 'dt-ordering-asc') : ''}`}
                >
                  {header.isPlaceholder ? null : (
                    <div>
                      <table.FlexRender header={header} />
                      <span className="dt-column-order"></span>
                    </div>
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
      <div className="dt-layout-row">
        <div className="dt-layout-cell dt-layout-start"> 
          Mostrando {totalRows === 0 ? 0 : pagination.pageIndex * pagination.pageSize + 1} a {Math.min((pagination.pageIndex + 1) * pagination.pageSize, totalRows)} de {totalRows} registros
        </div>
        <div className="dt-layout-cell dt-layout-end">
          <div className="dt-paging" style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
            <button
              type="button"
              onClick={() => table.firstPage()}
              disabled={!table.getCanPreviousPage()}
              style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #d1d5db', background: '#f3f4f6', cursor: !table.getCanPreviousPage() ? 'not-allowed' : 'pointer', opacity: !table.getCanPreviousPage() ? 0.5 : 1 }}
            >
              Primera
            </button>
            <button
              type="button"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #d1d5db', background: '#f3f4f6', cursor: !table.getCanPreviousPage() ? 'not-allowed' : 'pointer', opacity: !table.getCanPreviousPage() ? 0.5 : 1 }}
            >
              Anterior
            </button>
            {(() => {
              const pageCount = table.getPageCount();
              const currentPage = pagination.pageIndex + 1;
              const pages = [];
              
              if (pageCount <= 7) {
                for (let i = 1; i <= pageCount; i++) {
                  pages.push(i);
                }
              } else {
                if (currentPage <= 4) {
                  for (let i = 1; i <= 5; i++) pages.push(i);
                  pages.push('...');
                  pages.push(pageCount);
                } else if (currentPage >= pageCount - 3) {
                  pages.push(1);
                  pages.push('...');
                  for (let i = pageCount - 4; i <= pageCount; i++) pages.push(i);
                } else {
                  pages.push(1);
                  pages.push('...');
                  for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
                  pages.push('...');
                  pages.push(pageCount);
                }
              }
              
              return pages.map((page, index) => {
                if (page === '...') {
                  return (
                    <span key={`ellipsis-${index}`} style={{ padding: '6px 12px' }}>
                      ...
                    </span>
                  );
                }
                const isActive = page === currentPage;
                return (
                  <button
                    key={page}
                    type="button"
                    onClick={() => table.setPageIndex(page - 1)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '4px',
                      border: '1px solid #d1d5db',
                      background: isActive ? '#3b82f6' : '#f3f4f6',
                      color: isActive ? '#ffffff' : '#374151',
                      cursor: 'pointer',
                      fontWeight: isActive ? '600' : '400'
                    }}
                  >
                    {page}
                  </button>
                );
              });
            })()}
            <button
              type="button"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #d1d5db', background: '#f3f4f6', cursor: !table.getCanNextPage() ? 'not-allowed' : 'pointer', opacity: !table.getCanNextPage() ? 0.5 : 1 }}
            >
              Siguiente
            </button>
            <button
              type="button"
              onClick={() => table.lastPage()}
              disabled={!table.getCanNextPage()}
              style={{ padding: '6px 12px', borderRadius: '4px', border: '1px solid #d1d5db', background: '#f3f4f6', cursor: !table.getCanNextPage() ? 'not-allowed' : 'pointer', opacity: !table.getCanNextPage() ? 0.5 : 1 }}
            >
              Última
            </button>
          </div>
          
        </div>
      </div>
      <div className="spacer-md" />
    </div>
  );
};
