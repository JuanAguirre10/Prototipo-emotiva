"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

interface CarouselItem {
  src: string;
  alt: string;
}

export default function Carousel({ items }: { items: CarouselItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const rafRef = useRef<number>(0);

  const ITEM_W = 140;
  const GAP = 16;
  const STEP = ITEM_W + GAP;
  const totalWidth = items.length * STEP;

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const tick = () => {
      posRef.current += 0.6;
      if (posRef.current >= totalWidth) posRef.current = 0;
      track.style.transform = `translateX(-${posRef.current}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [totalWidth]);

  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden w-full py-2">
      <div
        ref={trackRef}
        className="flex"
        style={{ gap: `${GAP}px`, width: "max-content" }}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            className="shrink-0 relative rounded-xl overflow-hidden shadow-md"
            style={{ width: `${ITEM_W}px`, height: "186px" }}
          >
            <Image src={item.src} alt={item.alt} fill className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
