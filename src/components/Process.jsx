import { motion } from "framer-motion";
import {
  IconSearch,
  IconBulb,
  IconCode,
  IconRocket,
} from "@tabler/icons-react";

const steps = [
  {
    icon: IconSearch,
    title: "Descoberta",
    description:
      "Entendemos profundamente seu negócio, objetivos e desafios para criar a melhor solução.",
    color: "from-blue-500 to-cyan-600",
  },
  {
    icon: IconBulb,
    title: "Estratégia",
    description:
      "Desenvolvemos uma estratégia personalizada com roadmap claro e objetivos mensuráveis.",
    color: "from-purple-500 to-pink-600",
  },
  {
    icon: IconCode,
    title: "Desenvolvimento",
    description:
      "Construímos sua solução com as melhores tecnologias, seguindo as melhores práticas do mercado.",
    color: "from-green-500 to-emerald-600",
  },
  {
    icon: IconRocket,
    title: "Lançamento",
    description:
      "Entregamos e acompanhamos o lançamento, garantindo sucesso e crescimento contínuo.",
    color: "from-orange-500 to-red-600",
  },
];

export default function Process() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        ></motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Connection line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary/30 to-transparent z-0">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    className="h-full bg-gradient-to-r from-primary to-primary-light"
                  />
                </div>
              )}

              <div className="relative p-8 rounded-2xl bg-white border border-gray-200 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                {/* Step number */}
                <div className="absolute -top-4 left-8 w-8 h-8 rounded-full bg-primary text-white font-bold flex items-center justify-center text-sm">
                  {index + 1}
                </div>

                {/* Icon */}
                <div
                  className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${step.color} mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-primary-dark mb-3 group-hover:text-primary transition-colors">
                  {step.title}
                </h3>

                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
