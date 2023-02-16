import clsx from 'clsx';
import { PropsWithChildren } from 'react';

type TGlassPane = {
  className: string;
} & PropsWithChildren;

export const GlassPane = ({ children, className }: TGlassPane) => {
  return <div className={clsx('glass rounded-2xl border-solid border-2 border-gray-200', className)}>{children}</div>;
};
