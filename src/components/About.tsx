"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const image = imageRef.current;
    if (!section || !text || !image) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 60%",
        end: "bottom top",
        toggleActions: "play reverse play reverse",
      },
    });

    tl.fromTo(text, { x: -80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 0);
    tl.fromTo(image, { x: 80, opacity: 0 }, { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 0);

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-background"
    >
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div
            ref={textRef}
            className="space-y-8 p-8 md:p-10 rounded-2xl border border-border bg-surface relative group hover:border-primary/30 transition-colors duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative">
              <h2 className="text-3xl md:text-5xl font-space font-bold text-foreground mb-2">
                {t.about.title}
              </h2>
              <div className="h-1 w-20 bg-primary rounded-full mb-6" />

              <p className="text-lg text-muted leading-relaxed">
                {t.about.description}
              </p>

              <ul className="mt-8 space-y-4">
                {t.about.highlights.map((item, i) => (
                  <li key={i} className="flex items-center gap-4 text-foreground">
                    <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
                      <div className="w-2 h-2 rounded-full bg-primary" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div
            ref={imageRef}
            className="relative h-[400px] md:h-[550px] rounded-2xl overflow-hidden border border-border bg-surface p-3 group"
          >
            <div className="relative w-full h-full rounded-xl overflow-hidden shadow-xl group-hover:shadow-2xl transition-shadow duration-700">
              <Image
                src="https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=2000&auto=format&fit=crop"
                alt="Simulator Technology"
                fill
                className="object-cover transform group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

              <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end border-t border-white/20 pt-4">
                <div>
                  <p className="text-primary font-space text-sm font-bold tracking-widest mb-1">
                    {t.about.system}
                  </p>
                  <p className="text-white text-xl font-medium">MSK-2025 PRO</p>
                </div>
                <div className="text-right">
                  <div className="flex gap-1 mb-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"
                        style={{ animationDelay: `${i * 200}ms` }}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-gray-400 font-space">{t.about.active}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
