import { useEffect, useState } from "react";
import { getAllEmployees, type Employee } from "../services/employees-services";
import EmployeeCard from "../components/EmployeeCard/EmployeeCard";
import IconAndTextLabel from "../components/IconAndTextLabel/IconAndTextLabel";
import {
  faBriefcase,
  faFileSignature,
  faFilter,
  faIdCard,
  faMobileScreenButton,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button/Button";
import Modal from "../components/Modal/Modal";
import EmployeeProfile from "../components/EmployeeProfile/EmployeeProfile";
import InputText from "../components/EmployeeForm/InputText/InputText";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Filter from "../components/Filter/Filter";
import { useSearchParams } from "react-router";

export interface DefaultFilterState {
  contractType: string[];
  employmentBasis: string[];
}

const EmployeesPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  // const [filters, setFilters] = useState<DefaultFilterState>({
  //   contractType: [],
  //   employmentBasis: [],
  // });
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [searchParams] = useSearchParams();

  // useEffect(() => {
  //   console.log("Filters changed in parent:", filters);
  // }, [filters]);

  const handleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
    // console.log("current filter", filters);
  };

  useEffect(() => {
    const params = searchParams.toString().replace("+", "_");
    console.log(searchParams);
    setLoading(true);
    getAllEmployees(params)
      .then((data) => {
        setEmployees(data);
        setIsFilterOpen(false);
        console.log(data);
      })
      .catch((e) => console.warn(e))
      .finally(() => setLoading(false));
  }, [searchParams]);

  if (loading) return <div>Loading employees...</div>;

  return (
    <div className="w-4/5 border border-red-700 relative">
      <div className="flex justify-between">
        <h1 className="justify-self-start text-2xl mb-4">All Employees</h1>
        <div className="flex justify-center items-center gap-4">
          <input
            type="search"
            placeholder="Search..."
            className="placeholder-gray-500 px-2 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
          />
          <div className="flex flex-col relative">
            <Button
              variants={
                "px-2 py-2 border border-gray-300 rounded-lg cursor-pointer"
              }
              onClick={handleFilter}
            >
              <FontAwesomeIcon icon={faFilter} /> Filter
            </Button>
            {isFilterOpen && (
              <Filter
                variants="flex flex-col items-start px-4 py-4 absolute w-50 right-0 gap-4 top-full bg-white border rounded shadow-lg"
                // onCheckboxChange={handleCheckboxChange}
                // filters={filters}
                // setFilters={setFilters}
              />
            )}
          </div>
          <Button
            variants={
              "px-2 py-2 border border-gray-300 rounded-lg cursor-pointer"
            }
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-12 gap-x-4 px-6 py-4">
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
      </div>
      {employees.map((employee) => (
        <div key={employee.id} className="flex">
          <EmployeeCard employee={employee} />
        </div>
      ))}
      {/* {isModalOpen && (
        <Modal onClose={onClose} heading={"Employee Profile"}>
          <EmployeeProfile employee={selectedEmployee} />
        </Modal>
      )} */}
    </div>
  );
};

export default EmployeesPage;
