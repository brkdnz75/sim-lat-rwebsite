"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Play } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const [currentPhase, setCurrentPhase] = useState(0);
  const { t } = useLanguage();

  const phases = t.hero.phases;

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentPhase((prev) => (prev + 1) % phases.length);
    }, 5000);
    return () => window.clearInterval(intervalId);
  }, [phases.length]);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-background">
      {/* Background gradients */}
      <div className="absolute inset-0 z-0">
        <div className="dark:block hidden absolute inset-0 bg-[linear-gradient(120deg,#0F1729_0%,#1a2744_45%,#0F1729_100%)]" />
        <div className="dark:block hidden absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_30%,rgba(6,182,212,0.25),transparent_40%),radial-gradient(circle_at_80%_70%,rgba(59,130,246,0.15),transparent_45%)]" />
        <div className="dark:hidden absolute inset-0 bg-gradient-to-br from-cyan-50 via-white to-slate-50" />
      </div>

      <div className="relative z-10 h-full container mx-auto px-6 md:px-12 flex items-center min-h-screen">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full py-24 lg:py-0">
          {/* Left: Text content */}
          <div className="space-y-8 order-2 lg:order-1">
            <div className="flex items-center gap-4 mb-4">
              <div className="h-[2px] w-12 bg-primary" />
              <span className="text-primary font-space tracking-widest text-sm font-bold">
                {t.hero.badge}
              </span>
            </div>

            <div className="h-[180px] md:h-[160px] relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPhase}
                  initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -30, filter: "blur(10px)" }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute inset-0"
                >
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-space text-foreground leading-tight mb-4">
                    {phases[currentPhase].text}
                  </h1>
                  <p className="text-lg md:text-xl text-muted font-light">
                    {phases[currentPhase].sub}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <Link
                href="/urunler"
                className="relative group px-8 py-4 rounded-lg overflow-hidden bg-primary/10 text-primary font-bold text-lg text-center border border-primary/50 transition-all duration-300 hover:shadow-lg"
              >
                <div className="absolute inset-0 w-0 bg-primary transition-all duration-[250ms] ease-out group-hover:w-full -z-10" />
                <span className="group-hover:text-white dark:group-hover:text-black transition-colors duration-300">
                  {t.hero.cta1}
                </span>
              </Link>

              <Link
                href="/iletisim"
                className="px-8 py-4 rounded-lg text-foreground font-bold text-lg text-center border border-border hover:border-primary/50 hover:bg-surface-alt transition-all duration-300"
              >
                {t.hero.cta2}
              </Link>
            </div>
          </div>

          {/* Right: Video placeholder */}
          <div className="order-1 lg:order-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative aspect-video rounded-2xl overflow-hidden border border-border shadow-2xl group"
            >
              {/* Placeholder gradient when no video file exists */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-surface-alt to-primary/10 dark:from-cyan-900/40 dark:via-slate-800 dark:to-cyan-900/20" />

              {/* Video element -- replace src with your own video */}
              <video
                className="absolute inset-0 w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster=""
              >
                {/* Add your video: <source src="/simulator-demo.mp4" type="video/mp4" /> */}
              </video>

              {/* Play button overlay */}
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-20 h-20 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Play
                    size={32}
                    className="text-primary ml-1"
                    fill="currentColor"
                  />
                </div>
              </div>

              {/* Bottom label */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent z-10">
                <p className="text-white/80 text-sm font-space tracking-wider">
                  MODERN SIMULATOR - DEMO
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] text-muted tracking-[0.2em] font-space uppercase">
          {t.hero.scroll}
        </span>
        <div className="w-[1px] h-10 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </section>
  );
}
