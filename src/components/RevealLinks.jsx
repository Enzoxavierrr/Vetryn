import React from "react";
import { motion } from "framer-motion";

/**
 * RevealLinks
 * A ready-to-use component that shows oversized links with a flip/reveal effect on hover.
 * Usage: <RevealLinks /> or import { RevealLinks } from './components/RevealLinks'
 */
export const RevealLinks = () => {
  return (
    <section className="grid place-content-center gap-2 bg-green-300 px-8 py-24 text-black">
      <FlipLink href="#">Twitter</FlipLink>
      <FlipLink href="#">Linkedin</FlipLink>
      <FlipLink href="#">Facebook</FlipLink>
      <FlipLink href="#">Instagram</FlipLink>
    </section>
  );
};

const DURATION = 0.25;
const STAGGER = 0.025;

export const FlipLink = ({ children, href = "#" }) => {
  const letters = String(children).split("");

  return (
    <motion.a
      initial="initial"
      whileHover="hovered"
      href={href}
      className="relative block overflow-hidden whitespace-nowrap text-4xl font-black uppercase sm:text-7xl md:text-8xl lg:text-9xl"
      style={{
        lineHeight: 0.75,
      }}
    >
      <div aria-hidden>
        {letters.map((l, i) => (
          <motion.span
            variants={{
              initial: { y: 0 },
              hovered: { y: "-100%" },
            }}
            transition={{ duration: DURATION, ease: "easeInOut", delay: STAGGER * i }}
            className="inline-block"
            key={`top-${i}-${l}`}
          >
            {l}
          </motion.span>
        ))}
      </div>

      <div className="absolute inset-0" aria-hidden>
        {letters.map((l, i) => (
          <motion.span
            variants={{
              initial: { y: "100%" },
              hovered: { y: 0 },
            }}
            transition={{ duration: DURATION, ease: "easeInOut", delay: STAGGER * i }}
            className="inline-block"
            key={`bot-${i}-${l}`}
          >
            {l}
          </motion.span>
        ))}
      </div>
    </motion.a>
  );
};

export default RevealLinks;
