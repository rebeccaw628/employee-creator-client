import type { EmployeeFormData } from "../components/EmployeeForm/schema";
import { displayDate } from "./utils";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export type State = "NSW" | "VIC" | "QLD" | "SA" | "WA" | "TAS" | "ACT" | "NT";

export type ContractType = "PERMANENT" | "CONTRACT";

export type EmploymentBasis = "FULL TIME" | "PART TIME" | "CASUAL";

export interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  middleName?: string;
  position: string;
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
  hoursPerWeek: string;
}

export interface UpdateEmployee {
  firstName?: string;
  lastName?: string;
  middleName?: string;
  position?: string;
  email?: string;
  mobile?: string;
  address?: string;
  city?: string;
  state?: State;
  postcode?: string;
  contractType?: ContractType;
  startDate?: string;
  endDate?: string | null;
  employmentBasis?: EmploymentBasis;
  hoursPerWeek?: string;
}

export interface APIEmployee {
  // id: number;
  first_name: string;
  last_name: string;
  middle_name?: string;
  position: string;
  email: string;
  mobile: string;
  address: string;
  city: string;
  state: State;
  postcode: string;
  contract_type: ContractType;
  start_date: string;
  end_date?: string | null;
  employment_basis: EmploymentBasis;
  hours_per_week: string;
}

export function mapEmployee(employee: any): Employee {
  return {
    id: employee.id,
    firstName: employee.first_name,
    lastName: employee.last_name,
    middleName: employee.middle_name,
    position: employee.position,
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

export function mapToAPIEmployee(
  // id: number,
  data: EmployeeFormData
): APIEmployee {
  return {
    // id: id,
    first_name: data.firstName,
    last_name: data.lastName,
    middle_name: data.middleName,
    position: data.position,
    email: data.email,
    mobile: data.mobile,
    address: data.address,
    city: data.city,
    state: data.state,
    postcode: data.postcode,
    contract_type: data.contractType,
    start_date: data.startDate,
    end_date: data.endDate,
    employment_basis: data.employmentBasis
      .split(" ")
      .join("_") as EmploymentBasis,
    hours_per_week: data.hoursPerWeek,
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

export const updateEmployeeById = async (
  id: number,
  data: APIEmployee
): Promise<APIEmployee> => {
  const response = await fetch(`${baseURL}/employees/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    throw new Error(`Could not find employee with id ${id}`);
  }
  return await response.json();
};
