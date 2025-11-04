import { motion } from "framer-motion";
import { ArrowRight, Code2, Sparkles } from "lucide-react";
import { Button } from "../ui/button";
import { heroStyles, heroAnimations } from "./styles";

export function Hero() {
  return (
    <section className={heroStyles.section}>
      {/* Animated background elements */}
      <div className={heroStyles.backgroundContainer}>
        <motion.div
          className={heroStyles.blob1}
          animate={heroAnimations.blob1.animate}
          transition={heroAnimations.blob1.transition}
        />
        <motion.div
          className={heroStyles.blob2}
          animate={heroAnimations.blob2.animate}
          transition={heroAnimations.blob2.transition}
        />
      </div>

      <div className={heroStyles.container}>
        <div className={heroStyles.innerContainer}>
          <motion.div
            initial={heroAnimations.fadeInUp.initial}
            animate={heroAnimations.fadeInUp.animate}
            transition={{ duration: 0.8 }}
            className={heroStyles.badge}
          >
            <Sparkles className={heroStyles.badgeIcon} />
            <span className={heroStyles.badgeText}>Software House de Excelência</span>
          </motion.div>

          <motion.h1
            initial={heroAnimations.fadeInUp.initial}
            animate={heroAnimations.fadeInUp.animate}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={heroStyles.title}
          >
            Transformamos Ideias em{" "}
            <span className={heroStyles.titleHighlight}>Soluções Digitais</span>
          </motion.h1>

          <motion.p
            initial={heroAnimations.fadeInUp.initial}
            animate={heroAnimations.fadeInUp.animate}
            transition={{ duration: 0.8, delay: 0.4 }}
            className={heroStyles.description}
          >
            Na Vetryn, desenvolvemos software sob medida para impulsionar o seu negócio.
            Da concepção ao lançamento, estamos com você em cada etapa.
          </motion.p>

          <motion.div
            initial={heroAnimations.fadeInUp.initial}
            animate={heroAnimations.fadeInUp.animate}
            transition={{ duration: 0.8, delay: 0.6 }}
            className={heroStyles.buttonsContainer}
          >
            <Button
              size="lg"
              className={heroStyles.primaryButton}
            >
              Ver Projetos
              <ArrowRight className={heroStyles.buttonIcon} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className={heroStyles.secondaryButton}
            >
              <Code2 className={heroStyles.secondaryButtonIcon} />
              Sobre Nós
            </Button>
          </motion.div>

          {/* Floating code symbols */}
          <motion.div
            className={heroStyles.floatingIcon1}
            animate={heroAnimations.floatingIcon1.animate}
            transition={heroAnimations.floatingIcon1.transition}
          >
            <Code2 className={heroStyles.floatingIcon1Size} />
          </motion.div>
          <motion.div
            className={heroStyles.floatingIcon2}
            animate={heroAnimations.floatingIcon2.animate}
            transition={heroAnimations.floatingIcon2.transition}
          >
            <Sparkles className={heroStyles.floatingIcon2Size} />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className={heroStyles.scrollIndicator}
        animate={heroAnimations.scrollIndicator.animate}
        transition={heroAnimations.scrollIndicator.transition}
      >
        <div className={heroStyles.scrollIndicatorOuter}>
          <motion.div
            className={heroStyles.scrollIndicatorInner}
            animate={heroAnimations.scrollDot.animate}
            transition={heroAnimations.scrollDot.transition}
          />
        </div>
      </motion.div>
    </section>
  );
}
