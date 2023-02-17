import { PropsWithChildren } from 'react';
import clsx from 'clsx';

type TGlassPane = {
  className: string;
} & PropsWithChildren;

export const GlassPane = ({ children, className }: TGlassPane) => {
  return <div className={clsx('glass rounded-2xl border-solid border-2 border-gray-200', className)}>{children}</div>;
};
