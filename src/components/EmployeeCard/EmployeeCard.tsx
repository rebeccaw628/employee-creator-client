import { Link } from "react-router";
import type { Employee } from "../../services/employees-services";
import {
  displayDate,
  displayForm,
  getContractClass,
  getEmploymentClass,
} from "../../services/utils";
import Button from "../Button/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface EmployeeCardProps {
  employee: Employee;
  // onView: () => unknown;
}

const EmployeeCard = ({ employee }: EmployeeCardProps) => {
  const employmentBasisFormatted = displayForm(employee.employmentBasis);
  return (
    <div className="grid grid-cols-12 gap-x-4 px-6 py-4 text-left border border-gray-200 rounded-lg">
      <Link
        to={`/employees/${employee.id}`}
        className="flex flex-col col-span-2 cursor-pointer w-[218px]"
      >
        <h3>{`${employee.firstName} ${employee?.middleName} ${employee.lastName}`}</h3>
        <p className="text-sm text-gray-500">{`ID: ${employee.id}`} </p>
      </Link>
      <div className="flex flex-col col-span-3 w-[335px]">
        <p className="truncate">{employee.email}</p>
        <p className="text-sm text-gray-500">{employee.mobile}</p>
      </div>
      <div className="flex flex-col col-span-4">
        <p className="truncate">{employee.position}</p>
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
      <Button
        variants={
          "h-10 w-fit self-center justify-self-center cursor-pointer hover:border-[#646cff] py-2 px-3 "
        }
      >
        <FontAwesomeIcon
          icon={faTrash}
          className="text-gray-700 text-xl hover:text-red-700 hover:shadow-lg"
        />
      </Button>
    </div>

    //old format
    //  <div className="grid grid-cols-[1fr_1fr_2fr_1fr] gap-x-4">
    //   <div className="flex flex-col">
    //     <h3>{`${employee.firstName} ${employee?.middleName} ${employee.lastName}`}</h3>
    //     <IconAndTextLabel icon={faIdCard} text={`ID: ${employee.id}`} />
    //   </div>
    //   <div className="flex flex-col">
    //     <IconAndTextLabel icon={faInbox} text={employee.email} />
    //     <IconAndTextLabel icon={faMobileScreenButton} text={employee.mobile} />
    //   </div>
    //   <IconAndTextLabel icon={faBriefcase} text={employee.jobTitle} />
    //   <div className="flex">
    //     <p>{employee.employmentBasis}</p>
    //     <p>{employee.contractType}</p>
    //   </div>
    // </div>
  );
};

export default EmployeeCard;
