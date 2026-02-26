"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon, Globe } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { useLanguage } from "@/context/LanguageContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const { lang, t, toggleLang } = useLanguage();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t.nav.home, href: "/" },
    { name: t.nav.about, href: "/hakkimizda" },
    { name: t.nav.products, href: "/urunler" },
    { name: t.nav.faq, href: "/sss" },
    { name: t.nav.contact, href: "/iletisim" },
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? "bg-surface/80 backdrop-blur-xl border-b border-border shadow-lg py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-3 group">
          <div
            className="relative w-11 h-11 rounded-full overflow-hidden shadow-lg transition-transform duration-300 group-hover:scale-105"
            style={{ position: "relative" }}
          >
            <Image
              src="/modernlogo.png"
              alt="Modern Simulator"
              fill
              className="object-cover"
            />
          </div>
          <div className="hidden sm:flex flex-col">
            <span className="font-space font-bold text-lg leading-tight tracking-wider text-foreground group-hover:text-primary transition-colors">
              MODERN
            </span>
            <span className="text-xs tracking-widest text-muted">
              SİMÜLATÖR
            </span>
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors relative group ${
                isActive(link.href)
                  ? "text-primary"
                  : "text-muted hover:text-primary"
              }`}
            >
              {link.name}
              <span
                className={`absolute -bottom-1 left-0 h-[2px] bg-primary transition-all duration-300 ${
                  isActive(link.href) ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </Link>
          ))}

          <div className="flex items-center gap-2 ml-2 border-l border-border pl-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-surface-alt transition-colors text-muted hover:text-primary"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-surface-alt transition-colors text-muted hover:text-primary text-xs font-bold font-space"
              aria-label="Toggle language"
            >
              <Globe size={14} />
              {lang.toUpperCase()}
            </button>
          </div>

          <Link
            href="/urunler"
            className="px-5 py-2.5 rounded-full font-bold text-sm border border-primary text-primary hover:bg-primary hover:text-white dark:hover:text-black transition-all duration-300 shadow-sm hover:shadow-md"
          >
            {t.nav.order}
          </Link>
        </div>

        <div className="lg:hidden flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-muted hover:text-primary"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button
            onClick={toggleLang}
            className="px-2 py-1 rounded-full text-muted hover:text-primary text-xs font-bold font-space"
          >
            {lang.toUpperCase()}
          </button>
          <button
            className="text-foreground p-1"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X size={28} className="text-primary" />
            ) : (
              <Menu size={28} />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-surface/95 backdrop-blur-xl border-t border-border"
          >
            <div className="flex flex-col items-center py-8 gap-5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`text-lg font-space transition-colors ${
                    isActive(link.href)
                      ? "text-primary"
                      : "text-foreground hover:text-primary"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/urunler"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-2 px-8 py-3 rounded-full font-bold text-lg border border-primary text-primary hover:bg-primary hover:text-white dark:hover:text-black transition-all"
              >
                {t.nav.order}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
