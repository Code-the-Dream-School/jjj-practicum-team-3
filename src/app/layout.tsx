import "./globals.css";
import type { Metadata } from "next";
export const metadata = {
  title: "ComeAndSee",
  description: "Cinema tickets booking system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>


        <main>
          {children}
        </main>


      </body>
    </html>
  );
}
