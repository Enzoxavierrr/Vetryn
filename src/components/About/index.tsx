import { motion } from "framer-motion";
import { Rocket, Users, Lightbulb, Target } from "lucide-react";
import { aboutStyles, aboutAnimations } from "./styles";

const features = [
  {
    icon: Rocket,
    title: "Inovação Constante",
    description: "Utilizamos as tecnologias mais modernas para criar soluções que se destacam no mercado.",
  },
  {
    icon: Users,
    title: "Time Experiente",
    description: "Profissionais qualificados e apaixonados por tecnologia, prontos para realizar seu projeto.",
  },
  {
    icon: Lightbulb,
    title: "Soluções Criativas",
    description: "Pensamos fora da caixa para entregar produtos únicos e impactantes.",
  },
  {
    icon: Target,
    title: "Foco em Resultados",
    description: "Comprometidos em entregar projetos que geram valor real para o seu negócio.",
  },
];

export function About() {
  return (
    <section className={aboutStyles.section} id="sobre">
      <div className={aboutStyles.container}>
        <motion.div
          {...aboutAnimations.fadeInUp}
          transition={{ duration: 0.6 }}
          className={aboutStyles.header}
        >
          <h2 className={aboutStyles.title}>Sobre a Vetryn</h2>
          <p className={aboutStyles.description}>
            Somos uma software house dedicada a transformar visões em realidade digital.
            Com expertise em desenvolvimento de software, criamos soluções que impulsionam negócios.
          </p>
        </motion.div>

        <div className={aboutStyles.grid}>
          {features.map((feature, index) => (
            <motion.div
              key={index}
              {...aboutAnimations.fadeInUp}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={aboutStyles.featureCard}
            >
              <div className={aboutStyles.iconContainer}>
                <feature.icon className={aboutStyles.icon} />
              </div>
              <h3 className={aboutStyles.featureTitle}>
                {feature.title}
              </h3>
              <p className={aboutStyles.featureDescription}>{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          {...aboutAnimations.fadeInUp}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={aboutStyles.missionCard}
        >
          <h3 className={aboutStyles.missionTitle}>Nossa Missão</h3>
          <p className={aboutStyles.missionText}>
            Empoderar empresas através de tecnologia de ponta, criando software que não apenas atende,
            mas supera expectativas. Acreditamos que cada linha de código deve agregar valor e impulsionar
            o sucesso de nossos clientes.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
