import { useEffect, useState } from "react";
import { getAllEmployees, type Employee } from "../services/employees-services";
import EmployeeCard from "../components/EmployeeCard/EmployeeCard";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    getAllEmployees()
      .then((data) => {
        setEmployees(data);
        console.log(data);
      })
      .catch((e) => console.warn(e));
  }, []);

  return (
    <div className="">
      EmployeesPage
      {employees.map((employee) => (
        <EmployeeCard key={employee.id} employee={employee} />
      ))}
    </div>
  );
};

export default EmployeesPage;
