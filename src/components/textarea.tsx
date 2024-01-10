interface ITextareaProps {
  name: string;
  label: string;
  [key: string]: any;
}

export default function Textarea({ name, label, ...rest }: ITextareaProps) {
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
          className="mt-1 shadow-sm w-full border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 rounded-md resize-none"
          rows={4}
          {...rest}
        />
      </div>
    </div>
  );
}
