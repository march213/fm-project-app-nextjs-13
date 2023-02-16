import { PropsWithChildren } from 'react';
import clsx from 'clsx';
import { Inter } from '@next/font/google';
// import {Sidebar} from '@/components/Sidebar';
import { GlassPane } from '@/components/GlassPane';
import '@/styles/global.css';

const inter = Inter({
  variable: '--font-inter',
});

type TDashboardRootLayout = PropsWithChildren;

export default function DashboardRootLayout({ children }: TDashboardRootLayout) {
  return (
    <html lang="en" className={clsx(inter.variable, 'dark')}>
      <head />
      <body className="h-screen w-screen candy-mesh p-6">
        <GlassPane className="w-full h-full p-6 flex align-center container mx-auto">
          {/* <Sidebar /> */}
          <main className="w-full pl-6 h-full">{children}</main>
        </GlassPane>
      </body>
    </html>
  );
}
