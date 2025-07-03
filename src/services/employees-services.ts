import type { EmployeeFormData } from "../components/EmployeeForm/schema";
import { displayDate } from "./utils";

const baseURL = import.meta.env.VITE_API_BASE_URL;

export type State = "NSW" | "VIC" | "QLD" | "SA" | "WA" | "TAS" | "ACT" | "NT";

export type ContractType = "PERMANENT" | "CONTRACT";

export type EmploymentBasis = "FULL TIME" | "PART TIME" | "CASUAL";

export type APIEmploymentBasis = "FULL_TIME" | "PART_TIME" | "CASUAL";

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
  employment_basis: APIEmploymentBasis;
  hours_per_week: string;
}

export const getAllEmployees = async (
  queryParams?: string
): Promise<Employee[]> => {
  const response = await fetch(
    queryParams ? `${baseURL}/employees?${queryParams}` : `${baseURL}/employees`
  );
  if (!response.ok) {
    throw new Error("Failed to retrive employee list");
  }
  const data = await response.json();
  return data;
};

export const getEmployeeById = async (id: number): Promise<Employee> => {
  const response = await fetch(`${baseURL}/employees/${id}`);
  if (!response.ok) {
    throw new Error(`Could not find emplopyee with id ${id}`);
  }
  const data = await response.json();
  return data;
};

export const updateEmployeeById = async (
  id: number,
  data: EmployeeFormData
): Promise<Employee> => {
  console.log("Updated Data being sent:", data);
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

export const createEmployee = async (data: EmployeeFormData) => {
  const response = await fetch(`${baseURL}/employees`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to create new employee");
  }
  return await response.json();
};

export const deleteEmployeeById = async (id: number) => {
  console.log(id);
  const response = await fetch(`${baseURL}/employees/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Failed to delete employee");
  }
};
