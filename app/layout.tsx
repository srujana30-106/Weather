

import "./globals.css";

export const metadata = {
  title: "Weather App",
  description: "Next.js Weather Forecast App",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 dark:bg-gray-900 text-black dark:text-white transition-colors">
        {children}
      </body>
    </html>
  );
}
