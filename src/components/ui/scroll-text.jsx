"use client";

import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export default function TextAnimation({
  text,
  as: Component = "h1",
  direction = "left",
  letterAnime = false,
  lineAnime = false,
  variants,
  classname,
  delay = 0,
  duration = 0.5,
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const spring = useSpring(scrollYProgress, springConfig);

  const getXTransform = () => {
    if (direction === "left") return useTransform(spring, [0, 1], [100, -100]);
    if (direction === "right") return useTransform(spring, [0, 1], [-100, 100]);
    return useTransform(spring, [0, 1], [0, 0]);
  };

  const getYTransform = () => {
    if (direction === "up") return useTransform(spring, [0, 1], [100, -100]);
    if (direction === "down") return useTransform(spring, [0, 1], [-100, 100]);
    return useTransform(spring, [0, 1], [0, 0]);
  };

  const x = getXTransform();
  const y = getYTransform();

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const blur = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, 10]);

  const defaultVariants = {
    hidden: {
      filter: "blur(10px)",
      opacity: 0,
      y: 20,
    },
    visible: {
      filter: "blur(0px)",
      opacity: 1,
      y: 0,
      transition: {
        ease: "linear",
        duration,
        delay,
      },
    },
  };

  const finalVariants = variants || defaultVariants;

  if (letterAnime) {
    const letters = text.split("");

    return (
      <motion.div
        ref={ref}
        className={cn("relative overflow-hidden", classname)}
        style={{ x, y, opacity, scale }}
      >
        <Component className="inline-block">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              className="inline-block"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={finalVariants}
              custom={index}
              transition={{
                delay: index * 0.03,
                ...finalVariants.visible?.transition,
              }}
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </Component>
      </motion.div>
    );
  }

  if (lineAnime) {
    const lines = text.split("\n");

    return (
      <motion.div
        ref={ref}
        className={cn("relative overflow-hidden", classname)}
        style={{ x, y, opacity, scale }}
      >
        <Component className="block">
          {lines.map((line, index) => (
            <motion.div
              key={index}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={finalVariants}
              custom={index}
              transition={{
                delay: index * 0.1,
                ...finalVariants.visible?.transition,
              }}
            >
              {line}
            </motion.div>
          ))}
        </Component>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={cn("relative overflow-hidden", classname)}
      style={{ x, y, opacity, scale, filter: blur }}
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={finalVariants}
      >
        <Component>{text}</Component>
      </motion.div>
    </motion.div>
  );
}

