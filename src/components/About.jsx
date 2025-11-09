import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
import {
  IconCode,
  IconHeart,
  IconRocket,
  IconShield,
  IconTarget,
  IconUsersGroup,
  IconSparkles,
} from "@tabler/icons-react";

const values = [
  {
    icon: IconCode,
    title: "Código de Qualidade",
    description:
      "Comprometidos com as melhores práticas e tecnologias modernas em cada linha de código.",
    color: "from-primary to-primary-light",
  },
  {
    icon: IconHeart,
    title: "Paixão pelo Que Fazemos",
    description:
      "Amamos tecnologia e acreditamos que isso se reflete na qualidade dos nossos projetos.",
    color: "from-primary-light to-primary-content",
  },
  {
    icon: IconRocket,
    title: "Inovação Constante",
    description:
      "Sempre buscando as soluções mais modernas e eficientes para os desafios dos nossos clientes.",
    color: "from-primary-content to-primary",
  },
  {
    icon: IconShield,
    title: "Compromisso e Transparência",
    description:
      "Trabalhamos com honestidade, transparência e dedicação em cada projeto que assumimos.",
    color: "from-primary-dark to-primary",
  },
  {
    icon: IconTarget,
    title: "Foco em Resultados",
    description:
      "Cada projeto é uma oportunidade de fazer a diferença. Trabalhamos com dedicação para entregar soluções que realmente impactem o negócio dos nossos clientes.",
    color: "from-primary to-primary-light",
  },
  {
    icon: IconUsersGroup,
    title: "Parceria de Longo Prazo",
    description:
      "Não somos apenas prestadores de serviço. Queremos ser parceiros estratégicos que crescem junto com você, oferecendo suporte contínuo e evolução constante.",
    color: "from-primary-light to-primary-content",
  },
  {
    icon: IconSparkles,
    title: "Inovação e Excelência",
    description:
      "Buscamos sempre as melhores tecnologias e práticas do mercado. Cada projeto é uma chance de superar expectativas e criar algo verdadeiramente especial.",
    color: "from-primary-content to-primary",
  },
];

const HorizontalScrollCarousel = () => {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-white">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden">
        <motion.div style={{ x }} className="flex gap-6 px-4">
          {values.map((value, index) => (
            <ValueCard value={value} key={index} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const ValueCard = ({ value }) => {
  return (
    <div className="group relative h-[450px] w-[450px] flex-shrink-0 overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-primary/30 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}
      ></div>

      <div className="relative z-10 h-full flex flex-col p-8">
        <div
          className={`inline-flex p-5 rounded-xl bg-gradient-to-br ${value.color} mb-6 group-hover:scale-110 transition-transform duration-300 w-fit shadow-lg`}
        >
          <value.icon className="w-10 h-10 text-white" />
        </div>

        <h3 className="text-2xl font-bold text-primary-dark mb-4 group-hover:text-primary transition-colors">
          {value.title}
        </h3>

        <p className="text-gray-600 leading-relaxed text-base flex-1">
          {value.description}
        </p>
      </div>
    </div>
  );
};

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary-dark mb-4">
            Nossos Valores
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A Vetryn nasceu da paixão por criar soluções digitais que fazem a
            diferença. Os princípios que guiam nosso trabalho e definem como
            construímos soluções digitais.
          </p>
        </motion.div>

        <HorizontalScrollCarousel />
      </div>
    </section>
  );
}
