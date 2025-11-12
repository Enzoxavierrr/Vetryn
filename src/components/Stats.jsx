import { motion } from "framer-motion";
import {
  IconCode,
  IconHeart,
  IconRocket,
  IconShield,
} from "@tabler/icons-react";

const values = [
  {
    icon: IconCode,
    title: "Código de Qualidade",
    description:
      "Comprometidos com as melhores práticas e tecnologias modernas em cada linha de código.",
  },
  {
    icon: IconHeart,
    title: "Paixão pelo Que Fazemos",
    description:
      "Amamos tecnologia e acreditamos que isso se reflete na qualidade dos nossos projetos.",
  },
  {
    icon: IconRocket,
    title: "Inovação Constante",
    description:
      "Sempre buscando as soluções mais modernas e eficientes para os desafios dos nossos clientes.",
  },
  {
    icon: IconShield,
    title: "Compromisso e Transparência",
    description:
      "Trabalhamos com honestidade, transparência e dedicação em cada projeto que assumimos.",
  },
];

export default function Stats() {
  return (
    <section className="py-24 bg-gradient-to-br from-primary-dark via-primary to-primary-light relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-content rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Nossos Valores
          </h2>
          <div className="w-24 h-1 bg-white mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-white/90 max-w-3xl mx-auto">
            Os princípios que guiam nosso trabalho e definem como construímos
            soluções digitais
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative p-8 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              <div className="text-center">
                <div className="inline-flex p-4 rounded-xl bg-white/20 mb-4 group-hover:bg-white group-hover:scale-110 transition-all duration-300">
                  <value.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3">
                  {value.title}
                </h3>

                <p className="text-white/80 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
