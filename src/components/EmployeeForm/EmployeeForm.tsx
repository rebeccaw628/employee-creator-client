import { useForm } from "react-hook-form";
import { type EmployeeFormData, schema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import InputText from "./InputText/InputText";
import Dropdown from "./Dropdown/Dropdown";
import Button from "../Button/Button";
import { useEffect } from "react";

interface EmployeeFormProps {
  onSubmit: (data: EmployeeFormData) => unknown;
  formType: string;
  existingValues?: EmployeeFormData;
}

const EmployeeForm = ({
  onSubmit,
  formType,
  existingValues,
}: EmployeeFormProps) => {
  const {
    handleSubmit,
    register,
    reset,
    watch,
    setValue,
    formState: { isSubmitSuccessful, errors },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(schema),
    defaultValues: existingValues,
  });
  if (isSubmitSuccessful) reset();

  const contractType = watch("contractType");
  const employmentBasis = watch("employmentBasis");

  useEffect(() => {
    if (contractType === "PERMANENT") {
      setValue("endDate", null);
    }
  }, [contractType]);

  useEffect(() => {
    if (employmentBasis === "CASUAL") {
      setValue("hoursPerWeek", "casual");
    }
  }, [employmentBasis]);

  const testClick = () => console.log("clicked", "errors", errors);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-10">
      <div className="flex gap-20">
        <div className="flex flex-col gap-6 justify-start items-start">
          <h3>BASIC INFORMATION</h3>
          <InputText
            name="firstName"
            id="firstName"
            label="First Name"
            type="text"
            register={register}
            errors={errors}
          />
          <InputText
            name="middleName"
            id="middleName"
            label="Middle Name"
            type="text"
            register={register}
            errors={errors}
          />
          <InputText
            name="lastName"
            id="lastName"
            label="Last Name"
            type="text"
            register={register}
            errors={errors}
          />
        </div>
        <div className="flex flex-col gap-6 justify-start items-start">
          <h3>CONTACT INFORMATION</h3>
          <InputText
            name="email"
            id="email"
            label="Email"
            type="text"
            register={register}
            errors={errors}
          />
          <InputText
            name="mobile"
            id="mobile"
            label="Mobile"
            type="text"
            register={register}
            errors={errors}
          />
          <InputText
            name="address"
            id="address"
            label="Address"
            type="text"
            register={register}
            errors={errors}
          />
          <InputText
            name="city"
            id="city"
            label="City"
            type="text"
            register={register}
            errors={errors}
          />
          <Dropdown
            name="state"
            id="state"
            label="State"
            options={["NSW", "VIC", "QLD", "SA", "WA", "TAS", "ACT", "NT"]}
            register={register}
            errors={errors}
          />
          <InputText
            name="postcode"
            id="postcode"
            label="Postcode"
            type="text"
            register={register}
            errors={errors}
          />
        </div>
        <div className="flex flex-col gap-6 justify-start items-start">
          <h3>EMPLOYMENT INFORMATION</h3>
          <InputText
            name="position"
            id="position"
            label="Position"
            type="text"
            register={register}
            errors={errors}
          />
          <Dropdown
            name="contractType"
            id="contractType"
            label="Contract Type"
            options={["PERMANENT", "CONTRACT"]}
            register={register}
            errors={errors}
          />
          <Dropdown
            name="employmentBasis"
            id="employmentBasis"
            label="Employment Basis"
            options={["FULL TIME", "PART TIME", "CASUAL"]}
            register={register}
            errors={errors}
          />
          <InputText
            name="hoursPerWeek"
            id="hoursPerWeek"
            label="Hours Per Week"
            type="text"
            isDisabled={employmentBasis === "CASUAL"}
            register={register}
            errors={errors}
          />
          <InputText
            name="startDate"
            id="startDate"
            label="Start Date"
            type="date"
            register={register}
            errors={errors}
          />
          <InputText
            name="endDate"
            id="endDate"
            label="End Date"
            type="date"
            isDisabled={contractType === "PERMANENT"}
            register={register}
            errors={errors}
          />
        </div>
      </div>
      <div className="flex justify-center gap-5">
        <Button
          variants={
            "h-10 w-fit cursor-pointer hover:shadow-lg hover:bg-red-500 hover:text-white py-2 px-3 border rounded-3xl right-[0]"
          }
          type="reset"
        >
          Discard Changes
        </Button>
        <Button
          variants={
            "h-10 w-fit cursor-pointer hover:shadow-lg hover:bg-brand-purple-500 hover:text-white py-2 px-3 border rounded-3xl right-[0]"
          }
          type="submit"
          onClick={testClick}
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
};

export default EmployeeForm;
