import { motion } from "framer-motion";
import { IconSparkles, IconTarget, IconUsersGroup } from "@tabler/icons-react";

const commitments = [
  {
    icon: IconTarget,
    title: "Foco em Resultados",
    description:
      "Cada projeto é uma oportunidade de fazer a diferença. Trabalhamos com dedicação para entregar soluções que realmente impactem o negócio dos nossos clientes.",
  },
  {
    icon: IconUsersGroup,
    title: "Parceria de Longo Prazo",
    description:
      "Não somos apenas prestadores de serviço. Queremos ser parceiros estratégicos que crescem junto com você, oferecendo suporte contínuo e evolução constante.",
  },
  {
    icon: IconSparkles,
    title: "Inovação e Excelência",
    description:
      "Buscamos sempre as melhores tecnologias e práticas do mercado. Cada projeto é uma chance de superar expectativas e criar algo verdadeiramente especial.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary-dark mb-4">
            Nosso Compromisso
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            O que você pode esperar ao trabalhar conosco
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {commitments.map((commitment, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              {/* Icon */}
              <div className="absolute top-6 right-6 opacity-10 group-hover:opacity-20 transition-opacity">
                <commitment.icon className="w-16 h-16 text-primary" />
              </div>

              <div className="relative z-10">
                <div className="inline-flex p-4 rounded-xl bg-primary/10 mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <commitment.icon className="w-8 h-8 text-primary group-hover:text-white transition-colors" />
                </div>

                <h3 className="text-xl font-bold text-primary-dark mb-4 group-hover:text-primary transition-colors">
                  {commitment.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {commitment.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
