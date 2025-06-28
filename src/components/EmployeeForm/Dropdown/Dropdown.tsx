interface DropdownProps {
  name: string;
  label: string;
  id: string;
  options: string[];
  register: any;
  errors: any;
}

const Dropdown = ({
  name,
  label,
  id,
  options,
  register,
  errors,
}: DropdownProps) => {
  return (
    <div className="flex flex-col items-start">
      <label
        className="block text-sm font-medium text-gray-600 mb-1"
        htmlFor={name}
      >
        {label}
      </label>
      <select
        defaultValue=""
        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
        id={id}
        {...register(name, { required: true })}
      >
        <option value="" disabled>
          Select
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      {errors.category && (
        <small className="text-red-700 font-semibold">
          {errors.id.message}
        </small>
      )}
    </div>
  );
};

export default Dropdown;
