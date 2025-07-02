import { useEffect, useState } from "react";
import { contractOptions, employmentOptions } from "../../types/option-types";
import Button from "../Button/Button";
import InputText from "../EmployeeForm/InputText/InputText";
import { useSearchParams } from "react-router";
// import type { DefaultFilterState } from "../../pages/EmployeesPage";

interface FilterProps {
  variants: string;
  // onCheckBoxChange: (filter: string) => void;
  // filters: DefaultFilterState;
  // setFilters: React.Dispatch<React.SetStateAction<DefaultFilterState>>;
}

export interface DefaultFilterState {
  contractType: string[];
  employmentBasis: string[];
}

const Filter = ({ variants }: FilterProps) => {
  const [filters, setFilters] = useState<DefaultFilterState>({
    contractType: [],
    employmentBasis: [],
  });
  const [checkedFilters, setCheckedFilters] = useState<DefaultFilterState>({
    contractType: [],
    employmentBasis: [],
  });

  console.log("Filter props:", { variants, filters, setFilters });

  const [searchParams, setSearchParams] = useSearchParams();

  const handleCheckboxChange = (
    filterKey: keyof DefaultFilterState,
    filterValue: string
  ) => {
    console.log("filter checked for", filterValue);
    setFilters((prev) => {
      console.log("prev filters state", prev);
      // console.log('prev values of key', prev[])
      const currentFilters = [...prev[filterKey]];
      console.log("before adding to filters state,", filterKey, [
        ...prev[filterKey],
      ]);
      console.log("already included?", currentFilters.includes(filterValue));
      if (currentFilters.includes(filterValue)) {
        const index = currentFilters.indexOf(filterValue);
        currentFilters.splice(index, 1);
      } else {
        currentFilters.push(filterValue);
        console.log(prev[filterKey]);
      }
      return { ...prev, [filterKey]: currentFilters };
    });
  };

  const applyFilters = () => {
    console.log("setting params in URL");
    const newSearchParams = new URLSearchParams();
    console.log("filters to set", filters);
    filters.contractType.forEach((option) =>
      newSearchParams.append("contractType", option)
    );
    filters.employmentBasis.forEach((option) =>
      newSearchParams.append("employmentBasis", option)
    );
    setSearchParams(newSearchParams);
    console.log(newSearchParams);
  };

  const clearFilters = () => {
    setSearchParams("");
  };

  useEffect(() => {
    const contractType = searchParams.getAll("contractType");
    const employmentBasis = searchParams.getAll("employmentBasis");
    setFilters({ contractType, employmentBasis });
  }, [searchParams]);

  console.log("updated filters", filters);

  return (
    <div className={variants}>
      <div className="flex flex-col gap-2">
        <h3>Contract Type</h3>
        <div className="flex flex-col gap-2">
          {contractOptions.map((option) => (
            <InputText
              key={option}
              variants={{
                wrapperClass: "flex justify-between w-30",
                inputClass: "",
              }}
              name={option}
              label={option}
              id={option}
              type={"checkbox"}
              checked={filters.contractType.includes(option)}
              onChange={() => handleCheckboxChange("contractType", option)}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <h3>Employment Basis</h3>
        <div className="flex flex-col gap-2">
          {employmentOptions.map((option) => (
            <InputText
              key={option}
              variants={{
                wrapperClass: "flex justify-between w-30",
                inputClass: "",
              }}
              name={option}
              label={option}
              id={option}
              type={"checkbox"}
              checked={filters.employmentBasis.includes(option)}
              onChange={() => handleCheckboxChange("employmentBasis", option)}
            />
          ))}
        </div>
      </div>
      <div className="flex w-full justify-between ">
        <Button
          variants={"text-red-500 cursor-pointer hover:shadow-lg"}
          onClick={clearFilters}
        >
          Clear All
        </Button>
        <Button
          variants={
            "h-8 w-fit px-2 cursor-pointer hover:shadow-lg hover:bg-brand-purple-500 hover:text-white border rounded"
          }
          onClick={applyFilters}
        >
          Apply
        </Button>
      </div>
    </div>
  );
};

export default Filter;
