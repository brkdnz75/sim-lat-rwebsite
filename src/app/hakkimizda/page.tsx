import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Footer from "@/components/Footer";

export default function HakkimizdaPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <div className="pt-24">
        <About />
      </div>
      <Footer />
    </main>
  );
}
