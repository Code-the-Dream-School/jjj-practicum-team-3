import "./globals.css";

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
      <body>


        <main>
          {children}
        </main>


      </body>
    </html>
  );
}
