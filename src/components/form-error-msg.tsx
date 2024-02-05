interface IFromErrorMessageProps {
  text: string;
}

export default function FormErrorMessage({ text }: IFromErrorMessageProps) {
  return (
    <p className="px-4 mt-4 text-sm text-center italic text-red-600 underline underline-offset-2">
      {text}
    </p>
  );
}
