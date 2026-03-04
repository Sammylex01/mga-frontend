import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface FadeInProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export default function FadeIn({ children, className, delay = 0 }: FadeInProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
