import type { ContractType, EmploymentBasis } from "./employees-services";

export const displayDate = (dueDate: string) => {
  const formattedDate = new Date(dueDate).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });
  return formattedDate;
};

export const getEmploymentYears = (startDate: string) => {
  const employeeStartDate = new Date(startDate);
  const currentDate = new Date();
  const diffInYears =
    (currentDate.getTime() - employeeStartDate.getTime()) /
    (1000 * 60 * 60 * 24 * 365);
  return diffInYears.toFixed(1);
};

export const getEmploymentClass = (type: string) => {
  const styles = {
    "PART TIME": "bg-orange-100 text-orange-800",
    "FULL TIME": "bg-purple-100 text-purple-800",
    CASUAL: "bg-yellow-100 text-yellow-800",
  };
  return styles[type as EmploymentBasis];
};

export const getContractClass = (type: string) => {
  const styles = {
    CONTRACT: "bg-blue-100 text-blue-800",
    PERMANENT: "bg-green-100 text-green-800",
  };
  return styles[type as ContractType];
};
