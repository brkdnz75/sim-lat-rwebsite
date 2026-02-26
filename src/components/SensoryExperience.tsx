"use client";

import { motion } from "framer-motion";
import {
  Eye,
  Ear,
  Hand,
  Compass,
  Users,
  GraduationCap,
  TrendingUp,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const icons = [Eye, Ear, Hand, Compass, Users, GraduationCap, TrendingUp];

export default function SensoryExperience() {
  const { t } = useLanguage();

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      <div className="absolute inset-0 dark:bg-[radial-gradient(circle_at_80%_50%,rgba(6,182,212,0.06),transparent_50%)]" />

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-space font-bold text-foreground mb-4"
          >
            {t.sensory.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted text-lg max-w-xl mx-auto"
          >
            {t.sensory.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-6 lg:gap-4">
          {t.sensory.items.map((item, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group flex flex-col items-center text-center p-5 rounded-2xl border border-border bg-surface hover:border-red-400/40 dark:hover:border-red-400/40 transition-all duration-300 hover:shadow-md"
              >
                <div className="w-14 h-14 rounded-full bg-red-500/10 flex items-center justify-center mb-4 group-hover:bg-red-500/20 transition-colors duration-300">
                  <Icon
                    size={26}
                    className="text-red-500"
                    strokeWidth={1.5}
                  />
                </div>
                <h3 className="text-sm font-space font-bold text-foreground mb-1.5 tracking-wider">
                  {item.title}
                </h3>
                <p className="text-xs text-muted leading-snug">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
