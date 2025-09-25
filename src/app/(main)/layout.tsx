import  Header  from "@/components/shared/layout/Header";
import  Footer  from "@/components/shared/layout/Footer";


export default function MainLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <>
            <Header />
            <main>
                {children}
            </main>
            <Footer />
        </>
    );
}
