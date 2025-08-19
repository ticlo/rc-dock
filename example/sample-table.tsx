import React, { useEffect, useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { v4 as uuidv4 } from 'uuid';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70, valueGetter: (value, row) => uuidv4(), },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'department', headerName: 'Department', width: 130 },
  { field: 'position', headerName: 'Position', width: 130 },
  { field: 'salary', headerName: 'Salary', width: 130, type: 'number' },
  { field: 'hireDate', headerName: 'Hire Date', width: 130, type: 'string' },
];

interface Employee {
  id: string;
  name: string;
  department: string;
  position: string;
  salary: number;
  hireDate: string;
}

const paginationModel = { page: 0, pageSize: 100 };

const DataTable: React.FC = () => {
  const [data, setData] = useState<Employee[]>([]);
  
  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch('/employees.json'); // Adjust the path if needed
      const data: Employee[] = await response.json();

      setData(data);
    };

    fetchEmployees();
  }, []);

  return (
    <Paper sx={{ height: 400,  }}>
      <DataGrid
        rows={data}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[2, 100]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
};

export default DataTable;