import { useForm } from "react-hook-form";
import { type EmployeeFormData, schema } from "./schema";
import { zodResolver } from "@hookform/resolvers/zod";
import InputText from "./InputText.tsx/InputText";
import Dropdown from "./Dropdown/Dropdown";

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
    formState: { isSubmitSuccessful, errors },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(schema),
    defaultValues: existingValues,
  });
  if (isSubmitSuccessful) reset();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputText
        name="firstName"
        id="firstName"
        label="First Name"
        register={register}
        errors={errors}
      />
      <InputText
        name="middleName"
        id="middleName"
        label="Middle Name"
        register={register}
        errors={errors}
      />
      <InputText
        name="lastName"
        id="lastName"
        label="Last Name"
        register={register}
        errors={errors}
      />
      <InputText
        name="email"
        id="email"
        label="Email"
        register={register}
        errors={errors}
      />
      <InputText
        name="mobile"
        id="mobile"
        label="Mobile"
        register={register}
        errors={errors}
      />
      <InputText
        name="address"
        id="address"
        label="Address"
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
        name="position"
        id="position"
        label="Position"
        register={register}
        errors={errors}
      />
    </form>
  );
};

export default EmployeeForm;
