interface InputTextProps {
  name: string;
  label: string;
  id: string;
  register: any;
  errors: any;
}

const InputText = ({ name, label, id, register, errors }: InputTextProps) => {
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
        type="text"
        {...register(name)}
      />
      {errors.description && (
        <small className="text-red-700 font-semibold">
          {errors.id.message}
        </small>
      )}
    </div>
  );
};

export default InputText;
