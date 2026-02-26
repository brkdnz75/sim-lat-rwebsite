import Navbar from "@/components/Navbar";
import Product from "@/components/Product";
import Footer from "@/components/Footer";

export default function UrunlerPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <div className="pt-24">
        <Product />
      </div>
      <Footer />
    </main>
  );
}
