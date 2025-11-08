import { motion } from "framer-motion";
import {
  IconDeviceDesktop,
  IconDeviceMobile,
  IconCloud,
  IconDatabase,
  IconApi,
  IconBrandFigma,
} from "@tabler/icons-react";
import FloatingPhone from "./FloatingPhone";

const services = [
  {
    icon: IconDeviceDesktop,
    title: "Web Development",
    description:
      "Aplicações web modernas e responsivas com React, Vue e Next.js.",
    tags: ["React", "Vue", "Next.js"],
  },
  {
    icon: IconDeviceMobile,
    title: "Mobile Apps",
    description: "Aplicativos nativos e cross-platform para iOS e Android.",
    tags: ["React Native", "Flutter", "Swift"],
  },
  {
    icon: IconCloud,
    title: "Cloud Solutions",
    description: "Infraestrutura escalável na nuvem com AWS, Azure e GCP.",
    tags: ["AWS", "Azure", "Docker"],
  },
  {
    icon: IconDatabase,
    title: "Backend Development",
    description: "APIs robustas e sistemas de backend performáticos e seguros.",
    tags: ["Node.js", "Python", "PostgreSQL"],
  },
  {
    icon: IconApi,
    title: "API Integration",
    description: "Integrações com sistemas externos e APIs de terceiros.",
    tags: ["REST", "GraphQL", "Webhooks"],
  },
  {
    icon: IconBrandFigma,
    title: "UI/UX Design",
    description: "Design de interfaces intuitivas e experiências memoráveis.",
    tags: ["Figma", "Design System", "Prototyping"],
  },
];

export default function Services() {
  return (
    <section
      id="services"
      className="py-24 bg-gradient-to-b from-gray-50 to-white"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary-dark mb-4">
            Nossos Serviços
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Oferecemos soluções completas para transformar sua ideia em
            realidade digital.
          </p>
        </motion.div>

        {/* Layout: FloatingPhone à esquerda, Cards à direita */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Floating Phone - Mobile Apps showcase */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-center lg:justify-center lg:pl-8"
          >
            <div className="scale-125 lg:scale-150">
              <FloatingPhone />
            </div>
          </motion.div>

          {/* Cards em grid 2x2x2 */}
          <div className="grid grid-cols-2 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group relative p-6 rounded-2xl bg-white border border-gray-200 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 overflow-hidden"
              >
                {/* Background gradient on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-primary-content/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Animated border effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute inset-0 rounded-2xl border-2 border-primary/20 animate-pulse"></div>
                </div>

                <div className="relative z-10">
                  <div className="inline-flex p-3 rounded-xl bg-primary/10 mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <service.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                  </div>

                  <h3 className="text-lg font-bold text-primary-dark mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-3 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
