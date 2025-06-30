import { faPenToSquare } from "@fortawesome/free-regular-svg-icons";
import type { Employee } from "../../services/employees-services";
import { displayDate, getEmploymentYears } from "../../services/utils";
import Button from "../Button/Button";
import IconAndTextLabel from "../IconAndTextLabel/IconAndTextLabel";
import TextLabel from "../TextLabel/TextLabel";

interface EmployeeProfileProps {
  employee: Employee | null;
}

const EmployeeProfile = ({ employee }: EmployeeProfileProps) => {
  return (
    <div className="flex flex-col gap-6 border relative border-amber-700">
      {/* <h1> Employee Profile</h1>
      <div className="flex gap-20">
        <div className="flex flex-col gap-4">
          <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-200">
            <img
              src="/api/placeholder"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <p>
            {employee?.firstName} {employee?.lastName}
          </p>

          <p>ID: {employee?.id} </p>
        </div>
        <div className="flex flex-col gap-6 justify-start items-start">
          <h3>BASIC INFORMATION</h3>
          <TextLabel label={"First Name"} value={employee?.firstName} />
          <TextLabel label={"Middle Name"} value={employee?.middleName} />
          <TextLabel label={"Last Name"} value={employee?.lastName} />
          <h3 className="mt-4">CONTACT INFORMATION</h3>
          <TextLabel label={"Email"} value={employee?.email} />
          <TextLabel label={"Mobile"} value={employee?.mobile} />
          <TextLabel
            label={"Address"}
            value={`${employee?.address}, ${employee?.city}, ${employee?.postcode}`}
          />
          <TextLabel label={"State"} value={employee?.state} />
        </div>
        <div className="flex flex-col gap-6 justify-start items-start">
          <h3>EMPLOYMENT INFORMATION</h3>
          <TextLabel label={"Position"} value={employee?.jobTitle} />
          <TextLabel label={"Contract Type"} value={employee?.contractType} />
          <TextLabel
            label={"Employment Basis"}
            value={employee?.employmentBasis}
          />
          <TextLabel
            label={"Years at Company"}
            value={
              employee?.startDate && getEmploymentYears(employee.startDate)
            }
          />
          <TextLabel
            label={"Start Date"}
            value={employee?.startDate && displayDate(employee.startDate)}
          />
          <TextLabel
            label={"End Date"}
            value={employee?.endDate && displayDate(employee.endDate)}
          />
        </div>
      </div>
      <Button
        variants={
          "h-10 w-fit cursor-pointer absolute bottom-0 right-0 hover:shadow-lg hover:bg-brand-purple-500 hover:text-white py-2 px-3 border rounded-3xl right-[0]"
        }
      >
        <IconAndTextLabel icon={faPenToSquare} text={"Edit Profile"} />
      </Button> */}
    </div>
  );
};

export default EmployeeProfile;
