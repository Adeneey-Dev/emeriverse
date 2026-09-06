// HeroSlideshow.tsx
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

interface HeroSlideshowProps {
  images: { src: string; alt: string }[];
  intervalMs?: number;
}

export function HeroSlideshow({
  images,
  intervalMs = 5000,
}: HeroSlideshowProps) {
  const [index, setIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion || images.length <= 1) return;

    let timer: ReturnType<typeof setInterval> | null = null;

    const start = () => {
      timer = setInterval(() => {
        setIndex((current) => (current + 1) % images.length);
      }, intervalMs);
    };
    const stop = () => {
      if (timer) clearInterval(timer);
    };

    const handleVisibility = () => {
      if (document.hidden) stop();
      else start();
    };

    start();
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      stop();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [images.length, intervalMs, shouldReduceMotion]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence initial={false} mode="wait">
        <motion.img
          key={images[index].src}
          src={images[index].src}
          alt={images[index].alt}
          className="absolute inset-0 h-full w-full object-cover"
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0 }}
          transition={{
            opacity: { duration: 1.5, ease: "easeInOut" },
            scale: { duration: 1.5, ease: "easeInOut" },
          }}
          fetchPriority={index === 0 ? "high" : "auto"}
          loading={index === 0 ? "eager" : "lazy"}
        />
      </AnimatePresence>

      {images.length > 1 && (
        <div
          className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-2.5"
          aria-hidden="true"
        >
          {images.map((image, i) => (
            <span
              key={image.src}
              className={`h-1.5 rounded-full transition-all duration-500 ${
                i === index ? "w-8 bg-gold-pale" : "w-1.5 bg-white/20"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
