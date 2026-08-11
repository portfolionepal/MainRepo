import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export default function Counter({ end, suffix = "", duration = 2 }) {
  const count = useMotionValue(0);
  const formattedCount = useTransform(count, (latest) => 
    Math.round(latest).toLocaleString()
  );
  
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });

  useEffect(() => {
    if (inView) {
      const controls = animate(count, end, { duration, ease: "easeOut" });
      return controls.stop;
    }
  }, [count, end, inView, duration]);

  return (
    <span ref={ref}>
      <motion.span>{formattedCount}</motion.span>{suffix}
    </span>
  );
}
