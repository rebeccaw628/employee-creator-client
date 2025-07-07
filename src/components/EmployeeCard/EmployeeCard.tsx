import { Link } from "react-router";
import type { Employee } from "../../services/employees-services";
import {
  displayDate,
  displayForm,
  getContractClass,
  getEmploymentClass,
} from "../../services/utils";

interface EmployeeCardProps extends React.PropsWithChildren {
  employee: Employee;
}

const EmployeeCard = ({ employee, children }: EmployeeCardProps) => {
  const employmentBasisFormatted = displayForm(employee.employmentBasis);
  return (
    <div className="grid grid-cols-12 gap-x-6 px-6 py-4 text-left border border-gray-200 rounded-lg">
      <Link
        to={`/employees/${employee.id}`}
        className="flex flex-col col-span-2 cursor-pointer w-218px wrap-normal"
      >
        <h3>{`${employee.firstName} ${employee?.middleName} ${employee.lastName}`}</h3>
        <p className="text-sm text-gray-500">{`ID: ${employee.id}`} </p>
      </Link>
      <div className="flex flex-col col-span-3 w-[335px]">
        <p className="truncate">{employee.email}</p>
        <p className="text-sm text-gray-500">{employee.mobile}</p>
      </div>
      <div className="flex flex-col col-span-4">
        <p className="wrap-normal">{employee.position}</p>
        <p className="text-sm text-gray-500">{`Start Date: ${displayDate(
          employee.startDate
        )}`}</p>
      </div>
      <div className="flex flex-col text-sm gap-4 col-span-2">
        <p
          className={`px-2 py-1 rounded-full text-center ${getEmploymentClass(
            employmentBasisFormatted
          )}`}
        >
          {displayForm(employmentBasisFormatted)}
        </p>
        <p
          className={`px-2 py-1 rounded-full text-center ${getContractClass(
            employee.contractType
          )}`}
        >
          {employee.contractType}
        </p>
      </div>
      {children}
    </div>
  );
};

export default EmployeeCard;
