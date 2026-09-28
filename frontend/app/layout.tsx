import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Project Monitoring',
  description: 'Track your projects',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-gray-800 text-white p-4">
          <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-xl font-bold">📋 Project Monitor</h1>
            <div className="space-x-4">
              <Link href="/" className="hover:underline">
                Projects
              </Link>
              <Link href="/dashboard" className="hover:underline">
                Dashboard
              </Link>
            </div>
          </div>
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}