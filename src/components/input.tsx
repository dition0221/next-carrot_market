interface IInputProps {
  name: string;
  label: string;
  type: string;
  kind?: "text" | "phone" | "price";
  [key: string]: any;
}

export default function Input({
  name,
  label,
  kind = "text",
  type,
  ...rest
}: IInputProps) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label}
      </label>

      {kind === "text" ? (
        <input
          id={name}
          type={type}
          className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
          {...rest}
        />
      ) : null}
      {kind === "phone" ? (
        <div className="flex rounded-md shadow-sm">
          <span className="flex items-center justify-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 select-none text-sm">
            +82
          </span>
          <input
            id={name}
            type={type}
            className="appearance-none w-full px-3 py-2 border border-gray-300 rounded-r-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            {...rest}
          />
        </div>
      ) : null}
      {kind === "price" ? (
        <div className="rounded-md shadow-sm relative flex items-center">
          <div className="absolute left-0 pl-3 flex justify-center items-center pointer-events-none">
            <span className="text-gray-500">$</span>
          </div>
          <input
            id={name}
            type={type}
            className="appearance-none pl-7 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
            {...rest}
          />
          <div className="absolute right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-gray-500">USD</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
