interface InputTextProps {
  variants: Variants;
  name: string;
  label: string;
  id: string;
  type: string;
  isDisabled?: boolean;
  register?: any;
  errors?: any;
  onChange?: (...args: any[]) => void;
  checked?: boolean;
}

interface Variants {
  wrapperClass: string;
  labelClass?: string;
  inputClass?: string;
}

const InputText = ({
  variants,
  name,
  label,
  id,
  type,
  isDisabled,
  register,
  errors,
  onChange,
  checked,
}: InputTextProps) => {
  const {
    labelClass = "block text-sm font-medium text-gray-600 mb-1",
    inputClass = "px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors",
  } = variants;
  return (
    <div className={variants.wrapperClass}>
      <label className={labelClass} htmlFor={name}>
        {label}
      </label>
      <input
        className={inputClass}
        id={id}
        type={type}
        disabled={isDisabled}
        {...(register ? register(name) : {})}
        onChange={onChange}
        // {...(onChange != undefined ? { onChange } : {})}
        checked={type === "checkbox" ? checked : undefined}
      />
      {errors?.errors[name] && (
        <small className="text-red-700 font-semibold">
          {errors[name].message}
        </small>
      )}
    </div>
  );
};

export default InputText;
