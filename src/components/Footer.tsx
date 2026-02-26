"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  const footerLinks = [
    { name: t.nav.home, href: "/" },
    { name: t.nav.about, href: "/hakkimizda" },
    { name: t.nav.products, href: "/urunler" },
    { name: t.nav.faq, href: "/sss" },
    { name: t.nav.contact, href: "/iletisim" },
  ];

  return (
    <footer className="bg-surface border-t border-border pt-16 pb-8 relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div
                className="relative w-10 h-10 rounded-full overflow-hidden shadow-md"
                style={{ position: "relative" }}
              >
                <Image
                  src="/modernlogo.png"
                  alt="Modern Simulator"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-space font-bold text-xl text-foreground">
                MODERN <span className="text-primary">2025</span>
              </span>
            </div>
            <p className="text-muted text-sm leading-relaxed">
              {t.footer.description}
            </p>
            <div className="flex gap-3">
              {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-border bg-surface-alt flex items-center justify-center text-muted hover:text-primary hover:border-primary/50 transition-all duration-300 group"
                >
                  <Icon
                    size={18}
                    className="group-hover:scale-110 transition-transform"
                  />
                </a>
              ))}
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="font-space text-lg font-bold text-foreground tracking-wide">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-3">
              {footerLinks.map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    className="text-muted hover:text-primary text-sm transition-colors flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-5">
            <h3 className="font-space text-lg font-bold text-foreground tracking-wide">
              {t.footer.contactTitle}
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-muted text-sm">
                <MapPin size={18} className="text-primary shrink-0 mt-0.5" />
                <span>
                  Teknoloji Vadisi, 2025. Sokak No:1
                  <br />
                  İstanbul, Türkiye
                </span>
              </li>
              <li className="flex items-center gap-3 text-muted text-sm">
                <Phone size={18} className="text-primary shrink-0" />
                <span>+90 (850) 123 45 67</span>
              </li>
              <li className="flex items-center gap-3 text-muted text-sm">
                <Mail size={18} className="text-primary shrink-0" />
                <span>info@modernsimulator.com</span>
              </li>
            </ul>
          </div>

          <div className="space-y-5">
            <h3 className="font-space text-lg font-bold text-foreground tracking-wide">
              {t.footer.newsletter}
            </h3>
            <p className="text-muted text-sm">{t.footer.newsletterDesc}</p>
            <form className="relative" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder={t.footer.emailPlaceholder}
                className="w-full bg-surface-alt border border-border rounded-lg px-4 py-3 text-sm text-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
              <button
                type="submit"
                className="absolute right-2 top-2 bottom-2 bg-primary/10 text-primary hover:bg-primary hover:text-white dark:hover:text-black px-4 rounded-md text-xs font-bold transition-all duration-300"
              >
                {t.footer.send}
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted text-xs">
            &copy; {new Date().getFullYear()} {t.footer.copyright}
          </p>
          <div className="flex items-center gap-4 text-xs text-muted">
            <a href="#" className="hover:text-foreground transition-colors">
              {t.footer.privacy}
            </a>
            <span>|</span>
            <a href="#" className="hover:text-foreground transition-colors">
              {t.footer.terms}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
