import { useEffect, useState } from "react";
import { useParams } from "react-router";
import {
  getEmployeeById,
  updateEmployeeById,
  type Employee,
} from "../services/employees-services";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button/Button";
import IconAndTextLabel from "../components/IconAndTextLabel/IconAndTextLabel";
import TextLabel from "../components/TextLabel/TextLabel";
import { getEmploymentYears, displayDate } from "../services/utils";
import EmployeeForm from "../components/EmployeeForm/EmployeeForm";
import type { EmployeeFormData } from "../components/EmployeeForm/schema";
import Modal from "../components/Modal/Modal";

const EmployeePage = () => {
  const [employee, setEmployee] = useState<Employee>({
    id: 0,
    firstName: "",
    lastName: "",
    middleName: "",
    position: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    state: "NSW",
    postcode: "",
    contractType: "PERMANENT",
    startDate: "",
    endDate: "",
    employmentBasis: "FULL_TIME",
    hoursPerWeek: "",
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const { id } = useParams();
  const numberID = Number(id);
  const handleUpdateModal = () => {
    setShowModal(!showModal);
  };

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        setLoading(true);
        setError(null);
        const employee = await getEmployeeById(numberID);
        setEmployee(employee);
      } catch (e) {
        setError("Failed to retrieve employee information");
        console.warn(e);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, []);

  const handleSave = async (numberID: number, data: EmployeeFormData) => {
    try {
      setSaving(true);
      const updatedEmployee = await updateEmployeeById(numberID, data);
      setEmployee(updatedEmployee);
      setShowModal(false);
    } catch (e) {
      setError("Failed to update employee information");
      console.warn(e);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Loading employee details...</div>;
  if (error) return <div>Error alert: {error}</div>;
  if (saving) return <div>Saving employee details</div>;

  return (
    <div className="w-4/5 flex flex-col gap-6 relative">
      <h1 className="text-xl"> Employee Profile</h1>
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
            {employee.firstName} {employee.lastName}
          </p>

          <p>ID: {employee.id} </p>
        </div>
        <div className="flex flex-col gap-6 justify-start items-start">
          <h3>BASIC INFORMATION</h3>
          <TextLabel label={"First Name"} value={employee.firstName} />
          <TextLabel label={"Middle Name"} value={employee.middleName} />
          <TextLabel label={"Last Name"} value={employee.lastName} />
          <h3 className="mt-4">CONTACT INFORMATION</h3>
          <TextLabel label={"Email"} value={employee.email} />
          <TextLabel label={"Mobile"} value={employee.mobile} />
          <TextLabel
            label={"Address"}
            value={`${employee?.address}, ${employee.city}, ${employee.postcode}`}
          />
          <TextLabel label={"State"} value={employee.state} />
        </div>
        <div className="flex flex-col gap-6 justify-start items-start">
          <h3>EMPLOYMENT INFORMATION</h3>
          <TextLabel label={"Position"} value={employee.position} />
          <TextLabel label={"Contract Type"} value={employee.contractType} />
          <TextLabel
            label={"Employment Basis"}
            value={employee.employmentBasis.replace("_", " ")}
          />
          {employee.employmentBasis != "CASUAL" && (
            <TextLabel label={"Hours Per Week"} value={employee.hoursPerWeek} />
          )}
          <TextLabel
            label={"Years at Company"}
            value={getEmploymentYears(employee.startDate)}
          />
          <TextLabel
            label={"Start Date"}
            value={displayDate(employee.startDate)}
          />
          {employee.endDate && (
            <TextLabel
              label={"End Date"}
              value={displayDate(employee.endDate)}
            />
          )}
        </div>
      </div>
      <Button
        variants={
          "h-10 w-fit cursor-pointer absolute bottom-0 right-0 hover:shadow-lg hover:bg-brand-purple-500 hover:text-white py-2 px-3 border rounded-3xl"
        }
        onClick={handleUpdateModal}
      >
        <IconAndTextLabel icon={faPenToSquare} text={"Edit Profile"} />
      </Button>
      {showModal && (
        <Modal
          heading="Edit Profile"
          onClose={handleUpdateModal}
          variants={"bg-white"}
          children={
            <EmployeeForm
              onSubmit={(data) => handleSave(numberID, data)}
              formType={"edit"}
              existingValues={{ ...employee }}
            />
          }
        ></Modal>
      )}
    </div>
  );
};

export default EmployeePage;
