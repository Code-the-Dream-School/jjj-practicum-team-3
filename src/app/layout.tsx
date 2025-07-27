import "./globals.css";

export const metadata = {
  title: "My Next.js App",
  description: "A clean Next.js starter layout with fixed width",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header
          style={{
            padding: "1rem",
            backgroundColor: "#f0f0f0",
            borderBottom: "1px solid #ddd",
          }}
        >
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            <h1 style={{ margin: 0 }}>My App Header</h1>
          </div>
        </header>

        <main
          style={{
            maxWidth: "1000px",
            margin: "2rem auto",
            padding: "0 1rem",
          }}
        >
          {children}
        </main>

        <footer
          style={{
            padding: "1rem",
            backgroundColor: "#f0f0f0",
            borderTop: "1px solid #ddd",
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
            © 2025 My App
          </div>
        </footer>
      </body>
    </html>
  );
}
