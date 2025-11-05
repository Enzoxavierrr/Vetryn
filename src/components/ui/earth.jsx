"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Earth() {
  const globeRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let rotationY = 0;
    let rotationX = 0;
    let autoRotation = 0;
    let isMouseMoving = false;
    
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      
      isMouseMoving = true;
      const rect = containerRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      rotationX = (y - centerY) / 15;
      rotationY = (centerX - x) / 15;
    };

    const handleMouseLeave = () => {
      isMouseMoving = false;
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
      
      // Auto-rotation animation
      const animate = () => {
        if (!isMouseMoving) {
          autoRotation += 0.3;
        }
        
        if (globeRef.current) {
          globeRef.current.style.transform = `perspective(1200px) rotateX(${rotationX}deg) rotateY(${rotationY + autoRotation}deg)`;
        }
        
        requestAnimationFrame(animate);
      };
      
      animate();
      
      return () => {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full flex items-center justify-center"
      style={{
        perspective: "1200px",
        perspectiveOrigin: "center center",
      }}
    >
      <motion.div
        ref={globeRef}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
        className="relative w-[400px] h-[400px] lg:w-[500px] lg:h-[500px]"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        {/* 3D Globe Sphere Container */}
        <div 
          className="absolute inset-0"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {/* Main Sphere - 3D Effect with Dot Pattern */}
          <div
            className="absolute inset-0"
            style={{
              borderRadius: "50%",
              transformStyle: "preserve-3d",
              background: `
                radial-gradient(circle at 30% 30%, rgba(122, 221, 173, 0.15), rgba(8, 29, 19, 0.95) 70%),
                url('https://res.cloudinary.com/eldoraui/image/upload/v1734021299/map_pcqdwb.png')
              `,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              filter: "brightness(0.8) contrast(1.2)",
              boxShadow: `
                inset -50px -50px 100px rgba(0, 0, 0, 0.8),
                inset 50px 50px 100px rgba(122, 221, 173, 0.1),
                0 0 150px rgba(122, 221, 173, 0.5)
              `,
              WebkitMaskImage: "radial-gradient(circle, black 85%, transparent 100%)",
              maskImage: "radial-gradient(circle, black 85%, transparent 100%)",
              position: "relative",
            }}
          >
            {/* Dot Pattern Overlay for Continents */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 2px 2px, rgba(122, 221, 173, 0.8) 1px, transparent 0)
                `,
                backgroundSize: "8px 8px",
                backgroundPosition: "0 0",
                mixBlendMode: "screen",
                opacity: 0.6,
                WebkitMaskImage: "url('https://res.cloudinary.com/eldoraui/image/upload/v1734021299/map_pcqdwb.png')",
                maskImage: "url('https://res.cloudinary.com/eldoraui/image/upload/v1734021299/map_pcqdwb.png')",
                WebkitMaskSize: "cover",
                maskSize: "cover",
                WebkitMaskPosition: "center",
                maskPosition: "center",
              }}
            />
          </div>

          {/* Hemisphere Overlay for 3D depth */}
          <div
            className="absolute inset-0"
            style={{
              borderRadius: "50%",
              background: "radial-gradient(circle at 30% 30%, rgba(18, 70, 45, 0.4), rgba(8, 29, 19, 0.7) 70%)",
              mixBlendMode: "multiply",
              transform: "translateZ(0px)",
            }}
          />

          {/* 3D Latitude Circles - Subtle */}
          {[...Array(4)].map((_, i) => {
            const angle = (i * 45) - 90;
            const radius = 200;
            const z = Math.cos((angle * Math.PI) / 180) * radius;
            const scale = Math.sin((angle * Math.PI) / 180);
            
            return (
              <div
                key={`lat-${i}`}
                className="absolute rounded-full border border-primary-content/8"
                style={{
                  width: "100%",
                  height: `${20 + i * 15}%`,
                  top: "50%",
                  left: "0",
                  transform: `
                    translateY(-50%)
                    translateZ(${z}px)
                    scaleX(${Math.abs(scale)})
                    rotateX(${angle}deg)
                  `,
                  transformStyle: "preserve-3d",
                  borderWidth: "0.5px",
                }}
              />
            );
          })}

          {/* 3D Longitude Lines - Subtle Grid */}
          {[...Array(8)].map((_, i) => {
            const angle = (i * 45);
            
            return (
              <motion.div
                key={`long-${i}`}
                className="absolute rounded-full"
                style={{
                  width: "1px",
                  height: "100%",
                  top: "0",
                  left: "50%",
                  transform: `
                    translateX(-50%)
                    translateZ(0px)
                    rotateY(${angle}deg)
                  `,
                  transformStyle: "preserve-3d",
                  background: "linear-gradient(to bottom, transparent, rgba(122, 221, 173, 0.2), transparent)",
                  boxShadow: "0 0 2px rgba(122, 221, 173, 0.3)",
                }}
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 3 + i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            );
          })}

          {/* 3D Shine Effect */}
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute inset-0 rounded-full"
            style={{
              background: "radial-gradient(circle at 30% 30%, rgba(122, 221, 173, 0.3), transparent 70%)",
              transform: "translateZ(10px)",
              mixBlendMode: "screen",
            }}
          />

          {/* 3D Highlight/Reflection */}
          <div
            className="absolute rounded-full"
            style={{
              width: "40%",
              height: "40%",
              top: "15%",
              left: "25%",
              background: "radial-gradient(circle, rgba(255, 255, 255, 0.2), transparent 70%)",
              filter: "blur(40px)",
              transform: "translateZ(50px)",
            }}
          />

          {/* Dark Side Shadow */}
          <div
            className="absolute rounded-full"
            style={{
              width: "100%",
              height: "100%",
              background: "radial-gradient(circle at 70% 70%, transparent 40%, rgba(0, 0, 0, 0.4) 100%)",
              transform: "translateZ(-10px)",
              mixBlendMode: "multiply",
            }}
          />
        </div>

        {/* Outer Glow Ring - Bright Halo Effect */}
        <motion.div
          animate={{
            rotate: 360,
            scale: [1, 1.08, 1],
          }}
          transition={{
            rotate: {
              duration: 30,
              repeat: Infinity,
              ease: "linear",
            },
            scale: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
          className="absolute inset-0 rounded-full"
          style={{
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(122, 221, 173, 0.6) 0%, rgba(122, 221, 173, 0.3) 40%, transparent 70%)",
            boxShadow: `
              0 0 150px rgba(122, 221, 173, 0.8),
              0 0 250px rgba(122, 221, 173, 0.5),
              0 0 350px rgba(122, 221, 173, 0.3),
              inset 0 0 100px rgba(122, 221, 173, 0.2)
            `,
            transform: "translateZ(30px)",
            filter: "blur(20px)",
          }}
        />
        
        {/* Secondary Glow Layer */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full"
          style={{
            borderRadius: "50%",
            background: "radial-gradient(circle, transparent 60%, rgba(122, 221, 173, 0.4) 80%, transparent 100%)",
            boxShadow: `
              0 0 200px rgba(122, 221, 173, 0.6),
              0 0 300px rgba(122, 221, 173, 0.4)
            `,
            transform: "translateZ(40px)",
            filter: "blur(30px)",
          }}
        />

        {/* Floating Light Particles - 3D */}
        {[...Array(8)].map((_, i) => {
          const angle = (i * 45) * (Math.PI / 180);
          const radius = 250 + Math.random() * 50;
          const x = Math.cos(angle) * radius;
          const y = Math.sin(angle) * radius;
          const z = (Math.random() - 0.5) * 100;
          
          return (
            <motion.div
              key={`light-${i}`}
              initial={{
                scale: 0,
                opacity: 0,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.8, 0],
                z: [0, z, 0],
              }}
              transition={{
                duration: 4 + i * 0.3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
              className="absolute rounded-full"
              style={{
                width: "8px",
                height: "8px",
                background: "radial-gradient(circle, rgba(122, 221, 173, 1), transparent)",
                boxShadow: "0 0 20px rgba(122, 221, 173, 0.9)",
                top: "50%",
                left: "50%",
                transform: `translate(-50%, -50%) translate3d(${x}px, ${y}px, ${z}px)`,
              }}
            />
          );
        })}
      </motion.div>

      {/* Ambient Glow - Enhanced 3D */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle at center, rgba(122, 221, 173, 0.2), transparent 70%)",
          filter: "blur(100px)",
          transform: "translateZ(-200px)",
        }}
      />
    </div>
  );
}

