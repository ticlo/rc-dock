import React, {useEffect, useState} from 'react';
import "./employee-table.css";
import {v4 as uuidv4} from 'uuid';

interface Employee {
  id: string;
  name: string;
  department: string;
  position: string;
  salary: number;
  hireDate: string;
}

const EmployeeTable: React.FC = () => {

  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const response = await fetch('/employees.json'); // Adjust the path if needed
      return await response.json();
    };


    const loadEmployees = async () => {
      const data = await fetchEmployees(); // Await the fetchEmployees call
      setEmployees(data);
      console.log(data.map((employee) => employee.name)); // Log the employee names
    };

    console.time('Function Execution Time');
    loadEmployees(); // Call the function to load employees
    console.timeEnd('Function Execution Time');
  }, []);

  return (
    <div className="employee-table-container">
      <h1>Mocked Employee Records</h1>
      <table className="employee-table">
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Department</th>
            <th>Position</th>
            <th>Salary</th>
            <th>Hire Date</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => {
            const id = uuidv4();

            return (
              <tr key={id}>
                <td>{employee.name}</td>
                <td>{employee.department}</td>
                <td>{employee.position}</td>
                <td>${employee.salary.toLocaleString()}</td>
                <td>{employee.hireDate}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
};


export default EmployeeTable;
