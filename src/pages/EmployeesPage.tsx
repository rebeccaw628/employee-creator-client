import React, { useEffect, useRef, useState } from "react";
import {
  deleteEmployeeById,
  getAllEmployees,
  type Employee,
} from "../services/employees-services";
import EmployeeCard from "../components/EmployeeCard/EmployeeCard";
import IconAndTextLabel from "../components/IconAndTextLabel/IconAndTextLabel";
import {
  faBriefcase,
  faFileSignature,
  faFilter,
  faIdCard,
  faMobileScreenButton,
  faPlus,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import Button from "../components/Button/Button";
import Modal from "../components/Modal/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Filter from "../components/Filter/Filter";
import { Link, useSearchParams } from "react-router";
import { useSelector } from "react-redux";
import { useAppDispatch, type RootState } from "../redux/store";
import { searchEmployee } from "../redux/employeeSlice";
import SearchBar from "../components/SearchBar/SearchBar";

export interface DefaultFilterState {
  contractType: string[];
  employmentBasis: string[];
}

const EmployeesPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState<boolean>(false);
  const [employeeID, setEmployeeID] = useState<number | null>(null);
  const [searchParams] = useSearchParams();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const params = searchParams.toString().replace("+", "_");
    setIsFilterOpen(false);
    fetchAllEmployees(params);
  }, [searchParams]);

  const fetchAllEmployees = (params?: string) => {
    setLoading(true);
    getAllEmployees(params)
      .then((data) => {
        setEmployees(data);
      })
      .catch((e) => console.warn(e))
      .finally(() => setLoading(false));
  };

  const handleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleDelete = async (id: number) => {
    console.log("deleting employee with id:", id);
    closeConfirmationModal();
    await deleteEmployeeById(id);
    fetchAllEmployees();
  };

  const openConfirmationModal = (id: number) => {
    console.log("modal triggered");
    setEmployeeID(id);
  };

  const closeConfirmationModal = () => {
    setEmployeeID(null);
  };

  const dispatch = useAppDispatch();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = searchInputRef?.current?.value;
    if (query && query.trim()) {
      dispatch(searchEmployee(query.trim()));
    }
  };

  const { results, status, error } = useSelector(
    (state: RootState) => state.employee
  );

  if (loading) return <div>Loading employees...</div>;

  return (
    <div className="w-4/5 h-auto border border-red-700 relative">
      <div className="flex justify-between">
        <h1 className="justify-self-start text-2xl mb-4">All Employees</h1>
        <div className="flex justify-center items-center gap-6">
          <SearchBar ref={searchInputRef} onSubmit={handleSearch} />
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
              <Filter variants="flex flex-col items-start px-4 py-4 absolute w-50 right-0 gap-4 top-full bg-white border rounded shadow-lg" />
            )}
          </div>
          <Link
            to={`/employees/create`}
            className="px-2 py-2 border border-gray-300 rounded-lg cursor-pointer"
          >
            <FontAwesomeIcon icon={faPlus} />
          </Link>
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
          <EmployeeCard employee={employee}>
            {" "}
            <Button
              variants={
                "h-10 w-fit self-center justify-self-center cursor-pointer hover:border-[#646cff] py-2 px-3 "
              }
              onClick={() => {
                openConfirmationModal(employee.id);
              }}
            >
              <FontAwesomeIcon
                icon={faTrash}
                className="text-gray-700 text-xl hover:text-red-700 hover:shadow-lg"
              />
            </Button>
          </EmployeeCard>
        </div>
      ))}
      {employeeID && (
        <Modal
          heading={"Confirm Delete"}
          onClose={closeConfirmationModal}
          variants={"bg-black/90 py-8"}
        >
          <div className="flex flex-col gap-6">
            <p>Are you sure you want to delete this employee profile?</p>
            <p>Click OK to confirm deletion or CANCEL to go back.</p>
            <div className="flex gap-4 justify-center">
              <Button
                variants={
                  "h-10 w-fit cursor-pointer hover:shadow-lg hover:bg-red-500 hover:text-white py-2 px-3 border rounded-3xl"
                }
                onClick={closeConfirmationModal}
              >
                CANCEL
              </Button>
              <Button
                variants={
                  "h-10 w-fit cursor-pointer hover:shadow-lg hover:bg-brand-purple-500 hover:text-white py-2 px-3 border rounded-3xl"
                }
                onClick={() => handleDelete(employeeID)}
              >
                OK
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default EmployeesPage;
