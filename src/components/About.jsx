import { motion } from "framer-motion";
import { IconCode, IconUsers, IconRocket, IconHeart } from "@tabler/icons-react";

const features = [
  {
    icon: IconCode,
    title: "Desenvolvimento",
    description: "Criamos soluções robustas e escaláveis usando as melhores tecnologias do mercado.",
    color: "from-primary to-primary-light",
  },
  {
    icon: IconUsers,
    title: "Colaboração",
    description: "Trabalhamos em equipe para garantir que seu projeto seja entregue com excelência.",
    color: "from-primary-light to-primary-content",
  },
  {
    icon: IconRocket,
    title: "Inovação",
    description: "Buscamos sempre as soluções mais modernas e eficientes para seus desafios.",
    color: "from-primary-content to-primary",
  },
  {
    icon: IconHeart,
    title: "Paixão",
    description: "Amamos o que fazemos e isso se reflete em cada linha de código que escrevemos.",
    color: "from-primary-dark to-primary",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* animation removed from main screen */}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary-dark mb-4">
            Quem Somos
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A Vetryn nasceu da paixão por criar soluções digitais que fazem a diferença. 
            Somos um time de desenvolvedores apaixonados por tecnologia e inovação.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:border-primary/30 transition-all duration-300 hover:shadow-xl hover:-translate-y-2"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${feature.color} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-primary-dark mb-2 group-hover:text-primary transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

