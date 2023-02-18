'use client';

import { Calendar, Grid, Icon, Settings, User } from 'react-feather';

import Link from 'next/link';
import clsx from 'clsx';
import { usePathname } from 'next/navigation';

const icons: Record<string, Icon> = { Settings, User, Grid, Calendar };

type TSidebarLink = {
  link: {
    icon: string;
    label: string;
    link: string;
  };
};

export const SidebarLink = ({ link }: TSidebarLink) => {
  const pathname = usePathname();
  let isActive = false;

  if (pathname === link.link) {
    isActive = true;
  }

  const Icon = icons[link.icon];

  return (
    <Link href={link.link} className="w-full flex justify-center items-center">
      <Icon
        size={40}
        className={clsx(
          'stroke-gray-400 hover:stroke-violet-600 transition duration-200 ease-in-out',
          isActive && 'stroke-violet-600',
        )}
      />
    </Link>
  );
};
