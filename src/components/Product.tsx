"use client";

import { motion } from "framer-motion";
import { CheckCircle2, MessageSquare, ArrowRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Product() {
  const { t } = useLanguage();

  const handleWhatsApp = () => {
    const phone = "905550000000";
    const message = encodeURIComponent(
      "Merhaba, Modern Sürücü Kursu Simülatörü hakkında bilgi almak istiyorum."
    );
    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  return (
    <section className="py-24 md:py-32 bg-surface-alt relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-space font-bold text-foreground mb-4"
          >
            {t.product.title}{" "}
            <span className="text-primary text-glow">{t.product.titleAccent}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted text-lg max-w-2xl mx-auto"
          >
            {t.product.subtitle}
          </motion.p>
        </div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="rounded-3xl p-1 md:p-8 border border-border bg-surface hover:border-primary/30 transition-colors duration-500 shadow-lg"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-16 items-center p-6 md:p-8">
              <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-surface-alt to-surface border border-border group">
                <div className="absolute inset-0 bg-primary/5 mix-blend-overlay z-10" />
                <div className="absolute top-0 left-0 w-full h-[2px] bg-primary shadow-[0_0_15px_var(--color-primary)] z-20 opacity-50 animate-scan" />

                <div className="absolute inset-0 flex items-center justify-center p-8">
                  <div className="relative w-full h-full">
                    <img
                      src="https://images.unsplash.com/photo-1610931256338-7fdf41fa80c8?q=80&w=1000&auto=format&fit=crop"
                      alt="Modern Simulator Rig"
                      className="w-full h-full object-cover rounded-xl opacity-80 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0"
                    />
                  </div>
                </div>

                <div className="absolute top-4 left-4 z-20 bg-surface/80 backdrop-blur-sm border border-primary/30 px-4 py-1.5 rounded-full text-xs font-space font-bold text-primary flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  {t.product.inStock}
                </div>
              </div>

              <div className="space-y-8">
                <div>
                  <h3 className="text-3xl font-space font-bold text-foreground mb-2">
                    {t.product.productName}
                  </h3>
                  <p className="text-xl font-bold text-primary mb-4 font-space">
                    {t.product.price}
                  </p>
                  <p className="text-muted">{t.product.productDesc}</p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-sm font-space text-muted uppercase tracking-widest mb-4 border-b border-border pb-2">
                    {t.product.specsTitle}
                  </h4>
                  {t.product.specs.map((spec, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.1 * i }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 size={20} className="text-primary shrink-0 mt-0.5" />
                      <span className="text-muted text-sm">{spec}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    onClick={handleWhatsApp}
                    className="flex-1 flex items-center justify-center gap-3 bg-[#25D366] text-white font-bold py-4 px-6 rounded-xl hover:bg-[#20bd5a] transition-colors shadow-md"
                  >
                    <MessageSquare size={20} />
                    {t.product.whatsapp}
                  </button>
                  <a
                    href="/iletisim"
                    className="flex-1 flex items-center justify-center gap-3 border border-primary/50 text-primary font-bold py-4 px-6 rounded-xl hover:bg-primary/10 transition-colors"
                  >
                    {t.product.formLink}
                    <ArrowRight size={20} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes scan {
          0% { top: 0; }
          50% { top: 100%; }
          100% { top: 0; }
        }
        .animate-scan {
          animation: scan 4s linear infinite;
        }
      `}</style>
    </section>
  );
}
