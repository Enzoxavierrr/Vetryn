import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export function Globe() {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      containerRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      
      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center"
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      {/* Globe Container */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative w-[500px] h-[500px] lg:w-[600px] lg:h-[600px]"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* Outer Glow Ring */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 rounded-full border-2 border-primary-content/30"
          style={{
            boxShadow: "0 0 60px rgba(122, 221, 173, 0.3), inset 0 0 60px rgba(122, 221, 173, 0.1)",
          }}
        />

        {/* Main Globe Sphere */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          {/* Base gradient sphere */}
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle at 30% 30%, rgba(18, 70, 45, 0.9), rgba(8, 29, 19, 0.95))",
              boxShadow: "inset -20px -20px 50px rgba(0, 0, 0, 0.5), inset 20px 20px 50px rgba(122, 221, 173, 0.2)",
            }}
          />

          {/* Latitude Lines */}
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={`lat-${i}`}
              className="absolute rounded-full border border-primary-content/20"
              style={{
                width: "100%",
                height: `${20 + i * 20}%`,
                top: `${40 - i * 10}%`,
                left: "0%",
                transform: `rotateX(${75 + i * 5}deg)`,
                transformStyle: "preserve-3d",
              }}
            />
          ))}

          {/* Longitude Lines */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`long-${i}`}
              animate={{
                rotateY: [0, 360],
              }}
              transition={{
                duration: 20 + i * 2,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute rounded-full border border-primary-content/15"
              style={{
                width: `${10 + i * 5}%`,
                height: "100%",
                top: "0%",
                left: "50%",
                transform: `translateX(-50%) rotateZ(${i * 45}deg)`,
                transformStyle: "preserve-3d",
              }}
            />
          ))}

          {/* Animated Grid Pattern */}
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `
                linear-gradient(rgba(122, 221, 173, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(122, 221, 173, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "30px 30px",
            }}
          />

          {/* Shine Effect */}
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle at 30% 30%, rgba(122, 221, 173, 0.3), transparent 70%)",
            }}
          />

          {/* Highlight */}
          <div
            className="absolute rounded-full"
            style={{
              width: "40%",
              height: "40%",
              top: "10%",
              left: "20%",
              background: "radial-gradient(circle, rgba(255, 255, 255, 0.1), transparent)",
              filter: "blur(20px)",
            }}
          />
        </div>

        {/* Floating Particles */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={`particle-${i}`}
            initial={{
              scale: 0,
              opacity: 0,
            }}
            animate={{
              scale: [0, 1, 0],
              opacity: [0, 1, 0],
              y: [0, -100],
              x: [0, Math.random() * 100 - 50],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeInOut",
            }}
            className="absolute rounded-full"
            style={{
              width: "8px",
              height: "8px",
              background: "radial-gradient(circle, rgba(122, 221, 173, 0.8), transparent)",
              boxShadow: "0 0 10px rgba(122, 221, 173, 0.6)",
              top: `${50 + Math.random() * 20}%`,
              left: `${50 + Math.random() * 20}%`,
            }}
          />
        ))}

        {/* Outer Ring Animation */}
        <motion.div
          animate={{
            rotate: -360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: {
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            },
            scale: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="absolute inset-0 rounded-full border border-primary-content/20"
          style={{
            boxShadow: "0 0 40px rgba(122, 221, 173, 0.2)",
          }}
        />
      </motion.div>

      {/* Ambient Light Effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(122, 221, 173, 0.1), transparent 70%)",
          filter: "blur(60px)",
        }}
      />
    </div>
  );
}

