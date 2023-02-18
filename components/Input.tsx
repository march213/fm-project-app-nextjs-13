import clsx from 'clsx';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input = ({ className, ...props }: InputProps) => {
  return (
    <input
      className={clsx('border-solid border-gray border-2 px-6 py-2 text-lg rounded-3xl w-full', className)}
      {...props}
    />
  );
};
