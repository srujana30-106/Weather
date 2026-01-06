import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="bg-white dark:bg-gray-900 transition-colors duration-500">
      <body className="text-gray-900 dark:text-gray-100">{children}</body>
    </html>
  );
}
