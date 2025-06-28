interface TextLabelProps {
  label: string;
  value?: string | number | null;
}

const TextLabel = ({ label, value }: TextLabelProps) => {
  return (
    <div className="flex flex-col items-start">
      <label className="block text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <p className="text-gray-900 font-medium">{value}</p>
    </div>
  );
};

export default TextLabel;
