import { displayDate } from "./utils";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export type State = "NSW" | "VIC" | "QLD" | "SA" | "WA" | "TAS" | "ACT" | "NT";

export type ContractType = "PERMANENT" | "CONTRACT";

export type EmploymentBasis = "FULL TIME" | "PART TIME" | "CASUAL";

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  middleName?: string | null;
  jobTitle: string;
  email: string;
  mobile: string;
  address: string;
  city: string;
  state: State;
  postcode: string;
  contractType: ContractType;
  startDate: string; // ISO date string (e.g. "2025-06-26")
  endDate?: string | null;
  employmentBasis: EmploymentBasis;
  hoursPerWeek?: string | null;
}

export function mapEmployee(employee: any): Employee {
  return {
    id: employee.id,
    firstName: employee.first_name,
    lastName: employee.last_name,
    middleName: employee.middle_name,
    jobTitle: employee.job_title,
    email: employee.email,
    mobile: employee.mobile,
    address: employee.address,
    city: employee.city,
    state: employee.state,
    postcode: employee.postcode,
    contractType: employee.contract_type,
    startDate: employee.start_date,
    endDate: employee.end_date,
    employmentBasis: employee.employment_basis.split("_").join(" "),
    hoursPerWeek: employee.hours_per_week,
  };
}

export const getAllEmployees = async (): Promise<Employee[]> => {
  const response = await fetch(`${baseURL}/employees`);
  if (!response.ok) {
    throw new Error("Failed to retrive employee list");
  }
  const rawData = await response.json();
  return rawData.map(mapEmployee);
};

export const getEmployeeById = async (id: number): Promise<Employee> => {
  const response = await fetch(`${baseURL}/employees/${id}`);
  if (!response.ok) {
    throw new Error(`Could not find emplopyee with id ${id}`);
  }
  const rawData = await response.json();
  return mapEmployee(rawData);
};
