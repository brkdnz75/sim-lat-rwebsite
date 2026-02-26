"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, MapPin, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      console.log("Form Data Submitted:", formData);
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({ name: "", phone: "", email: "", message: "" });
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const inputClass =
    "w-full bg-surface-alt border border-border rounded-xl px-4 py-3.5 text-foreground focus:outline-none focus:border-primary/70 focus:ring-1 focus:ring-primary/50 transition-all placeholder:text-muted/50";

  return (
    <section className="py-24 bg-background relative border-t border-border">
      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-space font-bold text-foreground mb-4">
            {t.contact.title}{" "}
            <span className="text-primary">{t.contact.titleAccent}</span>
          </h2>
          <p className="text-muted text-lg max-w-2xl mx-auto">
            {t.contact.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2 space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-2xl border border-border bg-surface relative overflow-hidden h-full"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 blur-[50px] rounded-full" />

              <h3 className="text-2xl font-space font-bold text-foreground mb-8">
                {t.contact.infoTitle}
              </h3>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/30 text-primary">
                    <Phone size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-muted font-space mb-1">
                      {t.contact.phone}
                    </p>
                    <a
                      href="tel:+908501234567"
                      className="text-foreground text-lg font-medium hover:text-primary transition-colors"
                    >
                      +90 (850) 123 45 67
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/30 text-primary">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-muted font-space mb-1">
                      {t.contact.email}
                    </p>
                    <a
                      href="mailto:info@modernsimulator.com"
                      className="text-foreground text-lg font-medium hover:text-primary transition-colors"
                    >
                      info@modernsimulator.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0 border border-primary/30 text-primary">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-sm text-muted font-space mb-1">
                      {t.contact.address}
                    </p>
                    <p className="text-foreground font-medium leading-relaxed whitespace-pre-line">
                      {t.contact.addressText}
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
            </motion.div>
          </div>

          <div className="lg:col-span-3">
            <motion.form
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              onSubmit={handleSubmit}
              className="p-8 md:p-10 rounded-2xl border border-border bg-surface"
            >
              <h3 className="text-2xl font-space font-bold text-foreground mb-6">
                {t.contact.formTitle}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-2">
                  <label className="text-sm text-muted font-medium">
                    {t.contact.nameLabel}
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    placeholder={t.contact.namePlaceholder}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-muted font-medium">
                    {t.contact.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className={inputClass}
                    placeholder={t.contact.phonePlaceholder}
                  />
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <label className="text-sm text-muted font-medium">
                  {t.contact.emailLabel}
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={inputClass}
                  placeholder={t.contact.emailPlaceholder}
                />
              </div>

              <div className="space-y-2 mb-8">
                <label className="text-sm text-muted font-medium">
                  {t.contact.messageLabel}
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className={`${inputClass} resize-none`}
                  placeholder={t.contact.messagePlaceholder}
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full relative group overflow-hidden bg-transparent border border-primary text-primary font-bold py-4 rounded-xl transition-all duration-300 hover:shadow-lg disabled:opacity-70 disabled:cursor-not-allowed"
              >
                <div className="absolute inset-0 bg-primary w-0 group-hover:w-full transition-all duration-300 ease-out z-0" />
                <div className="relative z-10 flex items-center justify-center gap-2 group-hover:text-white dark:group-hover:text-black transition-colors">
                  {isSubmitting ? (
                    <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin group-hover:border-white dark:group-hover:border-black group-hover:border-t-transparent" />
                  ) : (
                    <>
                      <span>{t.contact.submit}</span>
                      <Send size={18} />
                    </>
                  )}
                </div>
              </button>

              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 rounded-lg bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400 text-center text-sm font-medium"
                >
                  {t.contact.success}
                </motion.div>
              )}
            </motion.form>
          </div>
        </div>
      </div>
    </section>
  );
}
