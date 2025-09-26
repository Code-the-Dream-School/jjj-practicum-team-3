import Header from "@/components/shared/layout/Header";
import Footer from "@/components/shared/layout/Footer";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0f121a] text-[#e7eaf3]">
      <Header />
      <main className="flex-grow px-4 py-6 md:px-6 lg:px-8">
        {children}
      </main>
      <Footer />
    </div>
  );
}