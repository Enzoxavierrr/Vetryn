import { motion } from "framer-motion";
import TextAnimation from "@/components/ui/scroll-text";
import { useEffect, useRef } from "react";

export default function Hero() {
  const splineViewerRef = useRef(null);

  useEffect(() => {
    // Verificar se o script já existe
    if (document.querySelector('script[src*="spline-viewer"]')) {
      return;
    }

    // Carregar o script do Spline Viewer dinamicamente
    const script = document.createElement('script');
    script.type = 'module';
    script.src = 'https://unpkg.com/@splinetool/viewer@1.10.99/build/spline-viewer.js';
    script.async = true;
    document.head.appendChild(script);

    // CSS para esconder a marca d'água do Spline - Abordagem mais agressiva
    const style = document.createElement('style');
    style.id = 'spline-watermark-hide';
    style.textContent = `
      spline-viewer::part(watermark) {
        display: none !important;
      }
      spline-viewer a,
      spline-viewer button,
      spline-viewer [class*="watermark"],
      spline-viewer [class*="badge"],
      spline-viewer [id*="watermark"],
      spline-viewer [id*="badge"] {
        display: none !important;
        opacity: 0 !important;
        visibility: hidden !important;
        pointer-events: none !important;
        position: absolute !important;
        left: -9999px !important;
        width: 0 !important;
        height: 0 !important;
        overflow: hidden !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      // Cleanup: remover o script quando o componente desmontar
      const existingScript = document.querySelector('script[src*="spline-viewer"]');
      if (existingScript && existingScript.parentNode) {
        existingScript.parentNode.removeChild(existingScript);
      }
      // Remover o style
      const existingStyle = document.getElementById('spline-watermark-hide');
      if (existingStyle && existingStyle.parentNode) {
        existingStyle.parentNode.removeChild(existingStyle);
      }
    };
  }, []);

  // Esconder marca d'água após o Spline carregar - Abordagem mais agressiva
  useEffect(() => {
    const hideWatermark = () => {
      const splineViewers = document.querySelectorAll('spline-viewer');
      splineViewers.forEach((viewer) => {
        // Esconder todos os links e botões diretamente no viewer
        const allLinks = viewer.querySelectorAll('a, button');
        allLinks.forEach((link) => {
          link.style.cssText = 'display: none !important; opacity: 0 !important; visibility: hidden !important; pointer-events: none !important; position: absolute !important; left: -9999px !important; width: 0 !important; height: 0 !important; overflow: hidden !important;';
        });

        // Tentar acessar o Shadow DOM
        try {
          const shadowRoot = viewer.shadowRoot;
          if (shadowRoot) {
            // Injetar CSS diretamente no Shadow DOM
            let styleElement = shadowRoot.getElementById('hide-watermark-style');
            if (!styleElement) {
              styleElement = document.createElement('style');
              styleElement.id = 'hide-watermark-style';
              styleElement.textContent = `
                a, button, [class*="badge"], [class*="watermark"], [id*="badge"], [id*="watermark"] {
                  display: none !important;
                  opacity: 0 !important;
                  visibility: hidden !important;
                  pointer-events: none !important;
                  position: absolute !important;
                  left: -9999px !important;
                  width: 0 !important;
                  height: 0 !important;
                  overflow: hidden !important;
                }
              `;
              shadowRoot.appendChild(styleElement);
            }

            // Esconder todos os links e botões no Shadow DOM
            const shadowLinks = shadowRoot.querySelectorAll('a, button, [class*="badge"], [class*="watermark"], [id*="badge"], [id*="watermark"]');
            shadowLinks.forEach((el) => {
              el.style.cssText = 'display: none !important; opacity: 0 !important; visibility: hidden !important; pointer-events: none !important; position: absolute !important; left: -9999px !important; width: 0 !important; height: 0 !important; overflow: hidden !important;';
            });

            // Procurar por todos os elementos que podem ser a marca d'água
            const allElements = shadowRoot.querySelectorAll('*');
            allElements.forEach((el) => {
              const text = el.textContent || '';
              const className = el.className?.toString() || '';
              const id = el.id || '';
              const href = el.href || '';
              const tagName = el.tagName?.toLowerCase() || '';
              
              // Esconder qualquer link ou botão
              if (tagName === 'a' || tagName === 'button') {
                el.style.cssText = 'display: none !important; opacity: 0 !important; visibility: hidden !important; pointer-events: none !important; position: absolute !important; left: -9999px !important; width: 0 !important; height: 0 !important; overflow: hidden !important;';
              }
              
              if (
                text.includes('Built with') ||
                text.includes('Spline') ||
                className.toLowerCase().includes('watermark') ||
                className.toLowerCase().includes('badge') ||
                id.toLowerCase().includes('watermark') ||
                id.toLowerCase().includes('badge') ||
                href.includes('spline')
              ) {
                el.style.cssText = 'display: none !important; opacity: 0 !important; visibility: hidden !important; pointer-events: none !important; position: absolute !important; left: -9999px !important; width: 0 !important; height: 0 !important; overflow: hidden !important;';
              }
            });
          }
        } catch (e) {
          // Shadow DOM pode não estar acessível
        }
      });
    };

    // Usar MutationObserver para detectar quando a marca d'água aparece
    const observer = new MutationObserver((mutations) => {
      hideWatermark();
      // Também observar mudanças dentro dos spline-viewers
      mutations.forEach((mutation) => {
        if (mutation.addedNodes) {
          mutation.addedNodes.forEach((node) => {
            if (node.nodeType === 1) {
              if (node.tagName === 'SPLINE-VIEWER' || node.querySelector?.('spline-viewer')) {
                setTimeout(hideWatermark, 100);
              }
            }
          });
        }
      });
    });

    // Observar mudanças no documento
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class', 'id', 'style'],
    });

    // Tentar esconder imediatamente e depois de um delay
    hideWatermark();
    const interval = setInterval(hideWatermark, 100);
    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 30000);

    return () => {
      observer.disconnect();
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-x-hidden overflow-y-visible bg-gradient-to-br from-primary-dark via-primary to-primary-light">
      {/* Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0YzAtMS4xLS45LTItMi0ySDI2Yy0xLjEgMC0yIC45LTIgMnY4YzAgMS4xLjkgMiAyIDJoOGMxLjEgMCAyLS45IDItMnYtOHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>

      {/* 3D Grid Animation Background */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <motion.div
          className="absolute inset-0"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "linear",
          }}
          style={{
            backgroundImage: `
              linear-gradient(rgba(122, 221, 173, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(122, 221, 173, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
            transform: "perspective(1000px) rotateX(60deg) scale(1.5)",
            transformOrigin: "center center",
            transformStyle: "preserve-3d",
          }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-20 pt-8 pb-12 w-full">
        <div className="flex flex-col items-center justify-center min-h-[95vh] relative w-full">
          {/* 3D Spline Animation - Background/Behind content */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-50">
            <div className="relative w-full max-w-[600px] aspect-square">
              <div
                className="absolute inset-0"
                style={{
                  transform: "perspective(1200px) rotateY(-18deg) rotateX(8deg)",
                  transformOrigin: "center",
                  willChange: "transform",
                }}
              >
                <spline-viewer
                  hint
                  loading-anim-type="spinner-small-dark"
                  url="https://prod.spline.design/HEFHEapkcxW232BX/scene.splinecode"
                  className="block origin-center scale-[0.3] md:scale-70 lg:scale-90"
                  style={{ width: '100%', height: '100%', display: 'block' }}
                >
                </spline-viewer>
              </div>
            </div>
          </div>

          {/* Company Name and Content - Centered */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto relative z-30 w-full px-4 sm:px-6 lg:px-8"
          >
            <div className="mb-8">
              <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold text-white mb-6 tracking-tighter leading-tight whitespace-nowrap inline-block">
                <TextAnimation
                  text="Vetryn Labs"
                  as="span"
                  letterAnime={true}
                  direction="down"
                  variants={{
                    hidden: { filter: "blur(10px)", opacity: 0, y: 10 },
                    visible: {
                      filter: "blur(0px)",
                      opacity: 1,
                      y: 0,
                      transition: { ease: "linear", duration: 0.6 },
                    },
                  }}
                  classname="inline-block"
                />
              </h1>
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "120px" }}
                transition={{ duration: 1, delay: 0.8 }}
                className="h-1 bg-gradient-to-r from-primary-content via-primary-content to-transparent rounded-full mx-auto"
              />
            </div>

            <TextAnimation
              text="Transformando ideias em soluções digitais de alto impacto"
              as="p"
              letterAnime={true}
              direction="left"
              variants={{
                hidden: { filter: "blur(4px)", opacity: 0, y: 20 },
                visible: {
                  filter: "blur(0px)",
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.3,
                  },
                },
              }}
              classname="text-xl md:text-2xl lg:text-3xl text-primary-content mb-6 font-light leading-relaxed px-2"
            />

            <TextAnimation
              text="Somos uma software house especializada em criar produtos digitais que impulsionam o crescimento do seu negócio."
              as="p"
              direction="up"
              variants={{
                hidden: { filter: "blur(4px)", opacity: 0, y: 20 },
                visible: {
                  filter: "blur(0px)",
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.4,
                  },
                },
              }}
              classname="text-base md:text-lg lg:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light px-2"
            />
          </motion.div>
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
