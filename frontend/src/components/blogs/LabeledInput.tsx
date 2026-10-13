interface LabeledInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}

function LabeledInput({ label, value, onChange, placeholder, type = "text", disabled = false }: LabeledInputProps) {
  return (
    <label className="flex items-center gap-3 text-white bg-[#292929] border border-[#363636] w-full p-1.5 rounded-md transition-colors focus-within:border-[#8f612c] has-[input:disabled]:opacity-50">
      <span className="pl-1.5 pr-3 border-r border-[#363636] font-mono text-sm text-gray-400 whitespace-nowrap">
        {label}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full bg-transparent outline-none p-1 text-sm placeholder-gray-600 disabled:cursor-not-allowed"
      />
    </label>
  );
}

export default LabeledInput;
