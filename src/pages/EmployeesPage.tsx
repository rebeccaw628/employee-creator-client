import { useEffect, useState } from "react";
import { getAllEmployees, type Employee } from "../services/employees-services";
import EmployeeCard from "../components/EmployeeCard/EmployeeCard";
import IconAndTextLabel from "../components/IconAndTextLabel/IconAndTextLabel";
import {
  faBriefcase,
  faFileSignature,
  faIdCard,
  faMobileScreenButton,
} from "@fortawesome/free-solid-svg-icons";

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
    <div className="w-4/5 border border-red-700">
      <h1>Employee List</h1>
      <div className="grid grid-cols-12 gap-x-4 px-6 py-4">
        {/* <h2>NAME</h2> */}
        <IconAndTextLabel
          icon={faIdCard}
          text={"EMPLOYEE"}
          variant={"col-span-2"}
        />
        <IconAndTextLabel
          icon={faMobileScreenButton}
          text={"CONTACT"}
          variant={"col-span-3"}
        />
        <IconAndTextLabel
          icon={faBriefcase}
          text={"TITLE"}
          variant={"col-span-4"}
        />
        <IconAndTextLabel
          icon={faFileSignature}
          text={"TYPE"}
          variant={"col-span-2"}
        />
        {/* <h2>CONTACT</h2>
        <h2>TITLE</h2>
        <h2>TYPE</h2> */}
      </div>
      {employees.map((employee) => (
        <EmployeeCard key={employee.id} employee={employee} />
      ))}
    </div>
  );
};

export default EmployeesPage;
