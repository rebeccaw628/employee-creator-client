import EmployeeForm from "../components/EmployeeForm/EmployeeForm";
import type { EmployeeFormData } from "../components/EmployeeForm/schema";
import { createEmployee } from "../services/employees-services";

const CreateEmployeePage = () => {
  const handleCreate = (data: EmployeeFormData) => {
    console.log("add employee clicked");
    createEmployee(data);
  };
  return (
    <div className="flex flex-col w-full gap-6 items-center border border-amber-900">
      <h1 className="text-2xl mb-4">Add Employee</h1>
      <EmployeeForm onSubmit={handleCreate} formType={"create"} />
    </div>
  );
};

export default CreateEmployeePage;
