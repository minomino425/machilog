type InputFieldProps = {
  id?: string;
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register?: any;
  textarea?: boolean;
};

export default function InputField({
  id,
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  register,
  textarea = false,
}: InputFieldProps) {
  return (
    <div className="w-[100%]">
      {label && (
        <label
          htmlFor={id}
          className="mb-1 block text-sm font-bold text-gray-700"
        >
          {label}
        </label>
      )}
      {textarea ? (
        <textarea
          {...(register ? register(id) : {})}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="h-28 w-full rounded-lg border-2 border-[#090A0A] py-3 pl-3 text-sm text-black"
        />
      ) : (
        <input
          {...(register ? register(id) : {})}
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className="w-full rounded-lg border-2 border-[#090A0A] py-3 pl-3 text-sm text-black"
        />
      )}
    </div>
  );
}
