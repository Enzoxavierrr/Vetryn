import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export const SpotlightButton = ({
  children,
  onClick,
  className = "",
  href,
  type = "button",
}) => {
  const btnRef = useRef(null);
  const spanRef = useRef(null);

  useEffect(() => {
    if (!btnRef.current || !spanRef.current) return;

    const handleMouseMove = (e) => {
      const { width } = e.target.getBoundingClientRect();
      const offset = e.offsetX;
      const left = `${(offset / width) * 100}%`;
      spanRef.current.animate({ left }, { duration: 250, fill: "forwards" });
    };

    const handleMouseLeave = () => {
      spanRef.current.animate(
        { left: "50%" },
        { duration: 100, fill: "forwards" }
      );
    };

    const btn = btnRef.current;
    btn.addEventListener("mousemove", handleMouseMove);
    btn.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      btn.removeEventListener("mousemove", handleMouseMove);
      btn.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const buttonClasses = `relative w-full overflow-hidden rounded-lg bg-slate-950 px-4 py-3 text-lg font-medium text-white ${className}`;

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        ref={btnRef}
        className={`block ${buttonClasses}`}
      >
        <motion.div whileTap={{ scale: 0.985 }} className="relative">
          <span className="pointer-events-none relative z-20">{children}</span>
          <span
            ref={spanRef}
            className="pointer-events-none absolute left-[50%] top-[50%] h-32 w-32 -translate-x-[50%] -translate-y-[50%] rounded-full bg-white/30 blur-xl"
          />
        </motion.div>
      </a>
    );
  }

  return (
    <motion.button
      type={type}
      whileTap={{ scale: 0.985 }}
      ref={btnRef}
      onClick={onClick}
      className={buttonClasses}
    >
      <span className="pointer-events-none relative z-20">{children}</span>
      <span
        ref={spanRef}
        className="pointer-events-none absolute left-[50%] top-[50%] h-32 w-32 -translate-x-[50%] -translate-y-[50%] rounded-full bg-white/30 blur-xl"
      />
    </motion.button>
  );
};
