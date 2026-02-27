"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ArrowRight, PlayCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const HERO_VIDEO_SOURCES = [
  "/hero-demo.mp4",
  "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
];
const HERO_VIDEO_POSTER =
  "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?q=80&w=2000&auto=format&fit=crop";

export default function Hero() {
  const [currentPhase, setCurrentPhase] = useState(0);
  const [videoDuration, setVideoDuration] = useState(0);
  const [videoError, setVideoError] = useState(false);
  const [videoSourceIndex, setVideoSourceIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { t } = useLanguage();

  const phases = t.hero.phases;
  const phaseCount = phases.length;
  const activeVideoSrc = HERO_VIDEO_SOURCES[videoSourceIndex];
  const progress = useMemo(
    () => ((currentPhase + 1) / phaseCount) * 100,
    [currentPhase, phaseCount]
  );

  const tryPlay = () => {
    const video = videoRef.current;
    if (!video) return;

    const playPromise = video.play();
    if (playPromise) {
      playPromise.catch(() => {
        // Autoplay can be blocked on some devices/browsers.
      });
    }
  };

  const handleVideoLoadedMetadata = () => {
    const video = videoRef.current;
    if (!video) return;
    if (Number.isFinite(video.duration) && video.duration > 0) {
      setVideoDuration(video.duration);
    }
  };

  const handleVideoTimeUpdate = () => {
    const video = videoRef.current;
    if (!video || !video.duration || !Number.isFinite(video.duration)) return;
    const segment = video.duration / phaseCount;
    const next = Math.min(phaseCount - 1, Math.floor(video.currentTime / segment));
    setCurrentPhase((prev) => (prev === next ? prev : next));
  };

  const handleVideoCanPlay = () => {
    setVideoError(false);
    tryPlay();
  };

  const handleVideoError = () => {
    setVideoDuration(0);
    if (videoSourceIndex < HERO_VIDEO_SOURCES.length - 1) {
      setVideoSourceIndex((prev) => prev + 1);
      return;
    }
    setVideoError(true);
  };

  useEffect(() => {
    if (videoDuration > 0) return;
    const intervalId = window.setInterval(() => {
      setCurrentPhase((prev) => (prev + 1) % phaseCount);
    }, 5000);

    return () => window.clearInterval(intervalId);
  }, [videoDuration, phaseCount]);

  return (
    <section
      id="hero"
      className="relative min-h-screen lg:h-screen w-full overflow-hidden bg-background pt-24 md:pt-28"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(8,145,178,0.16),transparent_45%),radial-gradient(circle_at_85%_35%,rgba(14,116,144,0.14),transparent_40%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(130deg,rgba(15,23,42,0.05)_0%,rgba(15,23,42,0.15)_100%)] dark:bg-[linear-gradient(130deg,rgba(6,10,25,0.8)_0%,rgba(6,10,25,0.95)_100%)]" />
      </div>

      <div className="relative z-10 h-full">
        <div className="relative h-full grid grid-cols-1 lg:grid-cols-2 lg:gap-0">
          <div className="hidden lg:block absolute inset-y-0 left-1/2 z-30 w-px bg-gradient-to-b from-transparent via-primary/35 to-transparent pointer-events-none" />

          <motion.div
            initial={false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative z-20 h-auto lg:h-full border-y border-border/70 lg:border-l lg:border-r-0 bg-surface/80 p-6 md:p-8 lg:p-10 xl:p-12 backdrop-blur-xl flex flex-col justify-between overflow-hidden"
          >
            <div className="absolute -top-28 -right-20 w-72 h-72 rounded-full bg-primary/15 blur-3xl pointer-events-none" />
            <div className="relative space-y-8">
              <div className="inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/10 px-4 py-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="text-[11px] md:text-xs font-space tracking-[0.25em] text-primary font-bold">
                  {t.hero.badge}
                </span>
              </div>

              <div className="relative min-h-[190px] md:min-h-[230px]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={currentPhase}
                    initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, filter: "blur(8px)" }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <h1 className="text-4xl md:text-5xl xl:text-6xl font-space font-bold leading-[1.02] text-foreground">
                      {phases[currentPhase].text}
                    </h1>
                    <p className="mt-6 text-base md:text-lg text-muted max-w-xl">
                      {phases[currentPhase].sub}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="space-y-3">
                {phases.map((phase, index) => (
                  <button
                    key={`${phase.text}-${index}`}
                    type="button"
                    onClick={() => setCurrentPhase(index)}
                    className={`w-full text-left rounded-xl border px-4 py-3 transition-all duration-300 ${
                      currentPhase === index
                        ? "border-primary/40 bg-primary/10"
                        : "border-border/80 hover:border-primary/30 hover:bg-surface-alt/70"
                    }`}
                    aria-label={`Phase ${index + 1}`}
                  >
                    <p className="text-xs uppercase tracking-[0.2em] text-muted">0{index + 1}</p>
                    <p className="mt-1 text-sm md:text-base font-semibold text-foreground line-clamp-1">
                      {phase.text}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            <div className="relative pt-8">
              <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-surface-alt">
                <motion.div
                  key={currentPhase}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  className="h-full rounded-full bg-gradient-to-r from-primary to-primary-light"
                />
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/urunler"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 text-white dark:text-black font-bold transition-all hover:translate-y-[-1px] hover:shadow-[0_10px_30px_rgba(8,145,178,0.35)]"
                >
                  {t.hero.cta1}
                  <ArrowRight size={17} />
                </Link>
                <Link
                  href="/iletisim"
                  className="inline-flex items-center justify-center rounded-xl border border-border px-6 py-3.5 text-foreground font-bold hover:border-primary/40 hover:bg-surface-alt transition-all"
                >
                  {t.hero.cta2}
                </Link>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={false}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="relative z-10 h-[45vh] min-h-[320px] sm:h-[52vh] lg:h-full lg:min-h-0 overflow-hidden border-b border-border/70 lg:border-r lg:border-y bg-slate-950"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_18%,rgba(34,211,238,0.28),transparent_45%),linear-gradient(135deg,#0f172a_0%,#111f34_42%,#0d3a4b_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(56,189,248,0.13)_0%,rgba(15,23,42,0)_35%,rgba(34,197,94,0.08)_100%)] animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/15 via-slate-900/15 to-cyan-600/20 pointer-events-none z-10" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(2,6,23,0.1)_0%,rgba(2,6,23,0.78)_100%)] z-10 pointer-events-none" />

            {!videoError ? (
              <video
                key={activeVideoSrc}
                ref={videoRef}
                className="absolute inset-0 z-[5] w-full h-full object-contain bg-black"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                poster={HERO_VIDEO_POSTER}
                onLoadedMetadata={handleVideoLoadedMetadata}
                onCanPlay={handleVideoCanPlay}
                onLoadedData={tryPlay}
                onTimeUpdate={handleVideoTimeUpdate}
                onError={handleVideoError}
              >
                <source src={activeVideoSrc} type="video/mp4" />
              </video>
            ) : (
              <div className="absolute inset-0 z-[5] bg-[linear-gradient(135deg,#0f172a_0%,#164e63_55%,#0f172a_100%)]" />
            )}

            <div className="absolute top-5 left-5 z-20 inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/25 px-3 py-2 backdrop-blur-md">
              <PlayCircle size={16} className="text-white" />
              <span className="text-[11px] tracking-[0.2em] uppercase text-white/90 font-space">
                Auto Demo
              </span>
            </div>

            <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-8">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`video-caption-${currentPhase}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.45, ease: "easeOut" }}
                >
                  <p className="text-white/70 text-xs md:text-sm uppercase tracking-[0.22em]">
                    Phase {currentPhase + 1}/{phaseCount}
                  </p>
                  <p className="mt-2 text-white text-xl md:text-3xl font-space font-semibold leading-tight max-w-2xl">
                    {phases[currentPhase].text}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {videoError && (
              <div className="absolute inset-0 z-30 grid place-items-center p-6 text-center bg-black/30">
                <p className="text-white/90 text-sm md:text-base">
                  Video kaynağı açılamadı. `/public/hero-demo.mp4` dosyasını ekleyin.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

    </section>
  );
}

