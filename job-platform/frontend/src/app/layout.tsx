import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['cyrillic', 'latin'] });

export const metadata: Metadata = {
  title: 'JobPlatform - Поиск работы в Ираке',
  description: 'Платформа для поиска работы и сотрудников в Ираке',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
