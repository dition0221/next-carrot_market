import type { UseFormRegisterReturn } from "react-hook-form";

interface ITextareaProps {
  name: string;
  label: string;
  register: UseFormRegisterReturn;
  required: boolean;
  [key: string]: any;
}

export default function Textarea({
  name,
  label,
  register,
  required,
  ...rest
}: ITextareaProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1 block text-sm font-medium text-gray-700"
      >
        {label}
      </label>
      <div>
        <textarea
          id={name}
          {...register}
          className="mt-1 shadow-sm w-full border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 rounded-md resize-none"
          rows={4}
          required={required}
          {...rest}
        />
      </div>
    </div>
  );
}
