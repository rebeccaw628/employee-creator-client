import { faIdCard } from "@fortawesome/free-regular-svg-icons";
import type { Employee } from "../../services/employees-services";
import IconAndTextLabel from "../IconAndTextLabel/IconAndTextLabel";
import {
  faFileSignature,
  faInbox,
  faMobileScreenButton,
} from "@fortawesome/free-solid-svg-icons";

interface EmployeeCardProps {
  employee: Employee;
}

const EmployeeCard = ({ employee }: EmployeeCardProps) => {
  return (
    <div>
      <h3>{`${employee.firstName} ${employee?.middleName} ${employee.lastName}`}</h3>
      <IconAndTextLabel icon={faIdCard} text={`Employee ID: ${employee.id}`} />
      <IconAndTextLabel icon={faInbox} text={employee.email} />
      <IconAndTextLabel icon={faMobileScreenButton} text={employee.mobile} />
      <IconAndTextLabel
        icon={faFileSignature}
        text={`${employee.employmentBasis}, ${employee.contractType}`}
      />
    </div>
  );
};

export default EmployeeCard;
