import { ReactNode } from 'react';
import clsx from 'clsx';

export const Card = ({ className, children }: { className?: string; children: ReactNode }) => {
  return <div className={clsx('rounded-3xl px-10 py-4 drop-shadow-xl bg-white', className)}>{children}</div>;
};
