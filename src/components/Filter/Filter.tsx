import { useEffect, useState } from "react";
import { contractOptions, employmentOptions } from "../../types/option-types";
import Button from "../Button/Button";
import InputText from "../EmployeeForm/InputText/InputText";
import { useSearchParams } from "react-router";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { DefaultFilterState } from "./defaultFilterState";
import { setFilters } from "../../redux/querySlice";
// import type { DefaultFilterState } from "../../pages/EmployeesPage";

interface FilterProps {
  variants: string;
}

export interface FilterState {
  contractType: string[];
  employmentBasis: string[];
}

const Filter = ({ variants }: FilterProps) => {
  const [selected, setSelected] = useState<FilterState>(DefaultFilterState);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();

  const handleCheckboxChange = (
    filterKey: keyof FilterState,
    filterValue: string
  ) => {
    console.log("filter checked for", filterValue);
    setSelected((prev) => {
      // console.log("prev filters state", prev);
      // console.log('prev values of key', prev[])
      const currentFilters = [...prev[filterKey]];
      // console.log("before adding to filters state,", filterKey, [
      //   ...prev[filterKey],
      // ]);
      // console.log("already included?", currentFilters.includes(filterValue));
      if (currentFilters.includes(filterValue)) {
        const index = currentFilters.indexOf(filterValue);
        currentFilters.splice(index, 1);
      } else {
        currentFilters.push(filterValue);
        // console.log(prev[filterKey]);
      }
      return { ...prev, [filterKey]: currentFilters };
    });
  };

  const applyFilters = () => {
    dispatch(setFilters(selected));
    //Update URL in UI:
    //Preserve existing search input values (if any)
    const newSearchParams = new URLSearchParams(
      searchParams.get("search") || ""
    );
    //Add filter query params
    selected.contractType.forEach((option) =>
      newSearchParams.append("contractType", option)
    );
    selected.employmentBasis.forEach((option) =>
      newSearchParams.append("employmentBasis", option)
    );
    //Set new URL
    setSearchParams(newSearchParams);
  };

  const clearFilters = () => {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      const filterKeys = ["contractType", "employmentBasis"];
      filterKeys.forEach((key) => newParams.delete(key));
      return newParams;
    });
  };

  useEffect(() => {
    const contractType = searchParams.getAll("contractType");
    const employmentBasis = searchParams.getAll("employmentBasis");
    setSelected({ contractType, employmentBasis });
  }, [searchParams]);

  console.log("updated filters", selected);

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
              checked={selected.contractType.includes(option)}
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
              checked={selected.employmentBasis.includes(option)}
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
