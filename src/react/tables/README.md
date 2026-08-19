# Table Component

A basic table abstraction using TanStack Table with built-in sorting, filtering, pagination, and data fetching from backend.

## Usage

### With Local Data

```jsx
import { Table } from 'shared-utils/react';

const columns = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: (info) => info.getValue(),
  },
  {
    accessorKey: 'age',
    header: 'Age',
    cell: (info) => info.getValue(),
  },
];

const data = [
  { name: 'John Doe', age: 30 },
  { name: 'Jane Smith', age: 25 },
];

function MyComponent() {
  return (
    <Table
      data={data}
      columns={columns}
      enableSorting={true}
      enableFiltering={true}
      enablePagination={true}
      pageSize={10}
    />
  );
}
```

### With Backend Data Fetching

```jsx
import { Table } from 'shared-utils/react';

const columns = [
  { accessorKey: 'name', header: 'Name' },
  { accessorKey: 'email', header: 'Email' },
];

function MyComponent() {
  return (
    <Table
      url="/api/users"
      columns={columns}
      axiosConfig={{
        headers: {
          'Authorization': 'Bearer token'
        }
      }}
      enableSorting={true}
      enableFiltering={true}
      enablePagination={true}
      pageSize={10}
    />
  );
}
```

## Props

- `data` (array, optional): The array of data objects to display (used if no URL provided)
- `url` (string, optional): API endpoint to fetch data from
- `axiosConfig` (object, optional): Additional axios configuration for the API request
- `columns` (array, required): Array of column definitions following TanStack Table column format
- `enableSorting` (boolean, default: true): Enable column sorting
- `enableFiltering` (boolean, default: true): Enable global search/filter
- `enablePagination` (boolean, default: true): Enable pagination
- `pageSize` (number, default: 10): Number of rows per page
- `className` (string, default: ''): Additional CSS classes for the table container

## Features

- **Sorting**: Click column headers to sort (ascending/descending)
- **Filtering**: Global search input to filter all columns
- **Pagination**: Navigate through pages with first, previous, next, and last buttons
- **Data Fetching**: Fetch data from backend API using axios
- **Loading State**: Shows spinner while fetching data
- **Error Handling**: Displays error message with retry button
- **Responsive**: Uses Bootstrap table classes for responsive design
- **Empty State**: Shows "No data available" when table is empty
