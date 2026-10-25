import "./globals.css";

export const metadata = {
  title: "Bihar Fashion League",
  description: "The next generation of fashion starts here. Discover emerging talent, runway moments, and the people shaping the future of fashion with Bihar Fashion League.",
  openGraph: {
    title: "Bihar Fashion League",
    description: "The next generation of fashion starts here.",
    type: "website",
    locale: "en_IN",
  },
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
