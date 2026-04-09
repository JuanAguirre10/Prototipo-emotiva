"use client";
import { useEffect, useRef, ReactNode } from "react";

type Animation = "fade-up" | "fade-left" | "fade-right" | "zoom-in";

const animClass: Record<Animation, string> = {
  "fade-up":    "anim-fade-up",
  "fade-left":  "anim-fade-left",
  "fade-right": "anim-fade-right",
  "zoom-in":    "anim-zoom-in",
};

export default function AnimateIn({
  children,
  animation = "fade-up",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  animation?: Animation;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay) el.style.animationDelay = `${delay}ms`;
          el.classList.add(animClass[animation]);
          el.style.opacity = "1";
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [animation, delay]);

  return (
    <div ref={ref} style={{ opacity: 0 }} className={className}>
      {children}
    </div>
  );
}
