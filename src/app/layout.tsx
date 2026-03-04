export const metadata = {
  title: 'VibeCod',
  description: 'AI-powered development environment',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
