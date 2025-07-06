import { useNavigate } from "react-router";
import Button from "../components/Button/Button";
import EmployeeForm from "../components/EmployeeForm/EmployeeForm";
import type { EmployeeFormData } from "../components/EmployeeForm/schema";
import { createEmployee } from "../services/employees-services";

const CreateEmployeePage = () => {
  const handleCreate = (data: EmployeeFormData) => {
    createEmployee(data);
  };
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className="flex flex-col w-full gap-6 items-center relative border border-amber-900">
      <div className="flex">
        <h1 className="text-2xl mb-4">Add Employee</h1>
        <Button
          variants={"absolute right-2 top-2 cursor-pointer"}
          onClick={handleGoBack}
        >
          X
        </Button>
      </div>
      <EmployeeForm onSubmit={handleCreate} formType={"create"} />
    </div>
  );
};

export default CreateEmployeePage;
