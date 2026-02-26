"use client";

import { motion } from "framer-motion";
import { Monitor, Gamepad2, Brain, Map, Settings2, Headset } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const icons = [Monitor, Gamepad2, Brain, Map, Settings2, Headset];

export default function Features() {
  const { t } = useLanguage();

  return (
    <section className="py-24 md:py-32 bg-surface-alt relative overflow-hidden">
      <div className="absolute inset-0 dark:bg-[radial-gradient(circle_at_50%_0%,rgba(6,182,212,0.08),transparent_50%)]" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16 md:mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-space font-bold text-foreground mb-4"
          >
            {t.features.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted text-lg max-w-2xl mx-auto"
          >
            {t.features.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {t.features.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative p-8 rounded-2xl border border-border bg-surface hover:border-primary/40 transition-all duration-500 hover:shadow-lg dark:hover:shadow-primary/5"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                    <Icon
                      size={28}
                      className="text-primary"
                      strokeWidth={1.5}
                    />
                  </div>

                  <h3 className="text-xl font-space font-bold text-foreground mb-3">
                    {item.title}
                  </h3>
                  <p className="text-muted leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
