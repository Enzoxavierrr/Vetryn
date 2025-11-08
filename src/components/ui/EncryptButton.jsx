import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { IconRocket } from "@tabler/icons-react";

const CYCLES_PER_LETTER = 2;
const SHUFFLE_TIME = 50;
const CHARS = "!@#$%^&*():{};|,.<>/?";

export const EncryptButton = ({
  text = "Criptografar",
  onClick,
  href,
  className = "",
  icon: Icon = IconRocket,
}) => {
  const intervalRef = useRef(null);
  const [displayText, setDisplayText] = useState(text);

  // Atualiza o displayText quando o text muda
  useEffect(() => {
    setDisplayText(text);
  }, [text]);

  const scramble = () => {
    let pos = 0;

    intervalRef.current = setInterval(() => {
      const scrambled = text
        .split("")
        .map((char, index) => {
          if (pos / CYCLES_PER_LETTER > index) {
            return char;
          }

          const randomCharIndex = Math.floor(Math.random() * CHARS.length);
          const randomChar = CHARS[randomCharIndex];

          return randomChar;
        })
        .join("");

      setDisplayText(scrambled);
      pos++;

      if (pos >= text.length * CYCLES_PER_LETTER) {
        stopScramble();
      }
    }, SHUFFLE_TIME);
  };

  const stopScramble = () => {
    clearInterval(intervalRef.current || undefined);
    setDisplayText(text);
  };

  const buttonClasses = `group relative overflow-hidden rounded-lg border border-neutral-500 bg-neutral-700 px-4 py-2 font-mono font-medium uppercase text-neutral-300 transition-colors hover:text-primary ${className}`;

  const buttonContent = (
    <>
      <div className="relative z-10 flex items-center gap-2">
        <Icon className="w-4 h-4" />
        <span>{displayText}</span>
      </div>
      <motion.span
        initial={{
          y: "100%",
        }}
        animate={{
          y: "-100%",
        }}
        transition={{
          repeat: Infinity,
          repeatType: "mirror",
          duration: 1,
          ease: "linear",
        }}
        className="duration-300 absolute inset-0 z-0 scale-125 bg-gradient-to-t from-primary/0 from-40% via-primary/100 to-primary/0 to-60% opacity-0 transition-opacity group-hover:opacity-100"
      />
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        onClick={onClick}
        onMouseEnter={scramble}
        onMouseLeave={stopScramble}
        className={buttonClasses}
      >
        <motion.div
          whileHover={{
            scale: 1.025,
          }}
          whileTap={{
            scale: 0.975,
          }}
          className="relative"
        >
          {buttonContent}
        </motion.div>
      </a>
    );
  }

  return (
    <motion.button
      whileHover={{
        scale: 1.025,
      }}
      whileTap={{
        scale: 0.975,
      }}
      onMouseEnter={scramble}
      onMouseLeave={stopScramble}
      onClick={onClick}
      className={buttonClasses}
    >
      {buttonContent}
    </motion.button>
  );
};
