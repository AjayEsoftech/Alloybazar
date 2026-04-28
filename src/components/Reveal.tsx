import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "fade-up" | "fade-in" | "slide-left" | "slide-right" | "zoom";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  variant?: Variant;
  threshold?: number;
  once?: boolean;
};

const hiddenClasses: Record<Variant, string> = {
  "fade-up": "opacity-0 translate-y-6",
  "fade-in": "opacity-0",
  "slide-left": "opacity-0 -translate-x-6",
  "slide-right": "opacity-0 translate-x-6",
  zoom: "opacity-0 scale-[0.97]",
};

const Reveal = ({
  children,
  className,
  delay = 0,
  duration = 700,
  variant = "fade-up",
  threshold = 0.12,
  once = true,
}: RevealProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setVisible(true);
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) obs.disconnect();
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold, once]);

  return (
    <div
      ref={ref}
      style={{
        transitionDelay: visible ? `${delay}ms` : "0ms",
        transitionDuration: `${duration}ms`,
      }}
      className={cn(
        "transition-all ease-out will-change-transform motion-reduce:transition-none",
        visible ? "opacity-100 translate-y-0 translate-x-0 scale-100" : hiddenClasses[variant],
        className
      )}
    >
      {children}
    </div>
  );
};

export default Reveal;
