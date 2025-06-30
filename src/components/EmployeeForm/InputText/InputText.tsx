interface InputTextProps {
  name: string;
  label: string;
  id: string;
  type: string;
  isDisabled?: boolean;
  register: any;
  errors: any;
}

const InputText = ({
  name,
  label,
  id,
  type,
  isDisabled,
  register,
  errors,
}: InputTextProps) => {
  return (
    <div className="flex flex-col items-start">
      <label
        className="block text-sm font-medium text-gray-600 mb-1"
        htmlFor={name}
      >
        {label}
      </label>
      <input
        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
        id={id}
        type={type}
        disabled={isDisabled}
        {...register(name)}
      />
      {errors[name] && (
        <small className="text-red-700 font-semibold">
          {errors[name].message}
        </small>
      )}
    </div>
  );
};

export default InputText;
