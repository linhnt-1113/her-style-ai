// "use client";

// import { useEffect, useRef, useState, type ReactNode } from "react";

// export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
//   const ref = useRef<HTMLElement>(null);
//   const [show, setShow] = useState(false);

//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const io = new IntersectionObserver(
//       ([entry]) => {
//         if (entry.isIntersecting) {
//           setShow(true);
//           io.disconnect(); // chỉ chạy một lần
//         }
//       },
//       { threshold: 0.25 }
//     );
//     io.observe(el);
//     return () => io.disconnect();
//   }, []);

//   return (
//     <section ref={ref} className={`reveal ${show ? "in" : ""} ${className}`}>
//       {children}
//     </section>
//   );
// }

"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  effect?: "up" | "left" | "right" | "zoom";
  delay?: number;      // ms, để các thẻ hiện lần lượt
  as?: ElementType;    // section | div | footer ...
};

export function Reveal({ children, className = "", effect = "up", delay = 0, as: Tag = "section" }: Props) {
  const ref = useRef<HTMLElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setShow(entry.isIntersecting), // vào khung nhìn: hiện, ra khỏi: ẩn -> chạy lại lần sau
      { threshold: 0.15 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal reveal-${effect} ${show ? "in" : ""} ${className}`}
      style={{ transitionDelay: show ? `${delay}ms` : "0ms" }}
    >
      {children}
    </Tag>
  );
}