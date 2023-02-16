import { PropsWithChildren } from 'react';
import { Inter } from '@next/font/google';
import { GlassPane } from '@/components/GlassPane';
import '@/styles/global.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

type TAuthRootLayout = PropsWithChildren;

export default function AuthRootLayout({ children }: TAuthRootLayout) {
  return (
    <html lang="en" className={inter.variable}>
      <head />
      <body className="h-screen w-screen rainbow-mesh p-6">
        <GlassPane className="w-full h-full flex items-center justify-center">{children}</GlassPane>
      </body>
    </html>
  );
}
