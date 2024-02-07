interface IFromErrorMessageProps {
  text: string;
}

export default function FormErrorMessage({ text }: IFromErrorMessageProps) {
  return (
    <p className="px-4 my-4 text-sm text-center italic font-semibold text-red-500 underline underline-offset-2">
      {text}
    </p>
  );
}
