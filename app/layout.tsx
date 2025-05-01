import React from 'react';
import './globals.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <header>
            <h1 className="text-3xl font-bold">Employee Avatar Animator</h1>
          </header>
          <main className="flex-1 w-full max-w-4xl">{children}</main>
          <footer>
            <p>&copy; {new Date().getFullYear()} Employee Avatar Animator</p>
          </footer>
        </div>
      </body>
    </html>
  );
}