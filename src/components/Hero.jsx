import { motion } from "framer-motion";
import { IconArrowRight } from "@tabler/icons-react";
import TextAnimation from "@/components/ui/scroll-text";
import { useEffect, useRef } from "react";

export default function Hero() {
  const splineViewerRef = useRef(null);

  useEffect(() => {
    // Carregar o script do Spline Viewer dinamicamente
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.10.97/build/spline-viewer.js';
    document.head.appendChild(script);

    return () => {
      // Cleanup: remover o script quando o componente desmontar
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return (
    <section className="relative min-h-[120vh] flex items-start overflow-hidden bg-gradient-to-br from-primary-dark via-primary to-primary-light pt-16 md:pt-24 lg:pt-28">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0YzAtMS4xLS45LTItMi0ySDI2Yy0xLjEgMC0yIC45LTIgMnY4YzAgMS4xLjkgMiAyIDJoOGMxLjEgMCAyLS45IDItMnYtOHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
      
      <div className="container mx-auto px-4 relative z-10 py-10">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-10 md:gap-16 lg:gap-24 xl:gap-32">
          {/* Company Name and Content - Left Side */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex-1 text-left max-w-2xl lg:pr-10 xl:pr-14"
          >
            <div className="mb-10">
              <TextAnimation
                text="Vetry"
                as="h1"
                letterAnime={true}
                direction="down"
                variants={{
                  hidden: { filter: 'blur(10px)', opacity: 0, y: 10 },
                  visible: {
                    filter: 'blur(0px)',
                    opacity: 1,
                    y: 0,
                    transition: { ease: 'linear', duration: 0.6 },
                  },
                }}
                classname="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tighter leading-none whitespace-nowrap"
              />
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "120px" }}
                transition={{ duration: 1, delay: 0.8 }}
                className="h-1 bg-gradient-to-r from-primary-content via-primary-content to-transparent rounded-full"
              />
            </div>

            <TextAnimation
              text="Transformando ideias em soluções digitais de alto impacto"
              as="p"
              letterAnime={true}
              direction="left"
              variants={{
                hidden: { filter: 'blur(4px)', opacity: 0, y: 20 },
                visible: {
                  filter: 'blur(0px)',
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.3,
                  },
                },
              }}
              classname="text-2xl md:text-3xl lg:text-4xl text-primary-content mb-8 font-light leading-relaxed"
            />

            <TextAnimation
              text="Somos uma software house especializada em criar produtos digitais que impulsionam o crescimento do seu negócio."
              as="p"
              direction="up"
              variants={{
                hidden: { filter: 'blur(4px)', opacity: 0, y: 20 },
                visible: {
                  filter: 'blur(0px)',
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.4,
                  },
                },
              }}
              classname="text-lg md:text-xl text-white/80 mb-16 max-w-2xl mx-auto leading-relaxed font-light"
            />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-col sm:flex-row gap-6 items-center sm:items-start"
            >
              <a
                href="#projects"
                className="group relative px-10 py-4 bg-white text-primary-dark font-bold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <span className="relative z-10 flex items-center gap-3 text-lg">
                  Ver Projetos
                  <IconArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary-content to-primary-light opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>

              <a
                href="#contact"
                className="group relative px-10 py-4 border-2 border-white/80 text-white font-bold rounded-full transition-all duration-300 hover:bg-white hover:text-primary-dark hover:scale-105 hover:border-white overflow-hidden backdrop-blur-sm"
              >
                <span className="relative z-10 text-lg">
                  Fale Conosco
                </span>
              </a>
            </motion.div>
          </motion.div>

          {/* 3D Spline Animation - Right Side (Square and larger) */}
          <div className="flex-1 w-full lg:flex-none lg:w-auto relative">
            <div className="ml-auto w-[420px] md:w-[560px] lg:w-[800px] aspect-square relative rounded-2xl overflow-hidden">
              <script type="module" src="https://unpkg.com/@splinetool/viewer@1.10.97/build/spline-viewer.js"></script>
                    <spline-viewer 
                    url="https://prod.spline.design/us3Fz8uT6hdnzrTA/scene.splinecode"
                    >
                    </spline-viewer>
            </div>
          </div>
  </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-1 h-3 bg-white/50 rounded-full mt-2"
            />
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}

