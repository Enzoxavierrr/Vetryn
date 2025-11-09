import { motion, useTransform, useScroll } from "framer-motion";
import { useRef } from "react";
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
    number: "01",
  },
  {
    icon: IconBulb,
    title: "Estratégia",
    description:
      "Desenvolvemos uma estratégia personalizada com roadmap claro e objetivos mensuráveis.",
    color: "from-purple-500 to-pink-600",
    number: "02",
  },
  {
    icon: IconCode,
    title: "Desenvolvimento",
    description:
      "Construímos sua solução com as melhores tecnologias, seguindo as melhores práticas do mercado.",
    color: "from-green-500 to-emerald-600",
    number: "03",
  },
  {
    icon: IconRocket,
    title: "Lançamento",
    description:
      "Entregamos e acompanhamos o lançamento, garantindo sucesso e crescimento contínuo.",
    color: "from-orange-500 to-red-600",
    number: "04",
  },
];

const terminalPrompts = [
  {
    text: "vetryn@labs:~$ git clone https://github.com/vetryn/project.git",
    color: "text-green-400",
  },
  { text: "Cloning into 'project'...", color: "text-gray-300" },
  {
    text: "remote: Counting objects: 100% (45/45), done.",
    color: "text-gray-300",
  },
  { text: "vetryn@labs:~$ cd project && npm install", color: "text-green-400" },
  { text: "added 1247 packages in 2m", color: "text-gray-300" },
  { text: "vetryn@labs:~/project$ npm run dev", color: "text-green-400" },
  {
    text: "✓ Vite server running on http://localhost:5173",
    color: "text-cyan-400",
  },
  { text: "✓ Compiled successfully in 1.2s", color: "text-green-300" },
  { text: "vetryn@labs:~/project$ npm run build", color: "text-green-400" },
  { text: "Building for production...", color: "text-yellow-400" },
  { text: "✓ 1247 modules transformed", color: "text-green-300" },
  { text: "✓ Build completed in 3.4s", color: "text-green-300" },
  { text: "vetryn@labs:~/project$ npm run deploy", color: "text-green-400" },
  { text: "Deploying to production...", color: "text-yellow-400" },
  { text: "✓ Deployment successful! 🚀", color: "text-green-300" },
];

export default function ProcessShowcase() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

  return (
    <div className="h-full w-full bg-[#0a0e27] p-4 md:p-6 overflow-hidden font-mono">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 mb-4 pb-2 border-b border-gray-700">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex-1 text-center">
          <span className="text-xs text-gray-400">
            nossoprocesso@vetrynlabs
          </span>
        </div>
      </div>

      {/* Terminal Content */}
      <div className="relative h-full flex flex-col">
        {/* Terminal Prompts - Top */}
        <div className="space-y-0.5 mb-4">
          {terminalPrompts.slice(0, 6).map((prompt, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.08 }}
              className={`text-xs font-mono ${prompt.color}`}
            >
              {prompt.text}
            </motion.div>
          ))}
        </div>

        {/* Processo - Centralizado */}
        <div className="flex-1 flex items-center justify-center my-4">
          <div className="w-full max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-4"
            >
              <p className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto">
                Um processo estruturado e transparente que garante resultados
                excepcionais
              </p>
            </motion.div>

            <section ref={targetRef} className="relative h-[200vh]">
              <div className="sticky top-0 flex h-screen items-center overflow-hidden">
                <motion.div style={{ x }} className="flex gap-4 px-4">
                  {steps.map((step, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="group relative h-[400px] w-[320px] flex-shrink-0 p-6 rounded-xl bg-[#1a1f3a] border border-gray-700 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 overflow-hidden"
                    >
                      {/* Step number badge */}
                      <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center text-sm shadow-lg">
                        {step.number}
                      </div>

                      {/* Background gradient on hover */}
                      <div
                        className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                      ></div>

                      <div className="relative z-10 h-full flex flex-col">
                        {/* Icon */}
                        <div
                          className={`inline-flex p-4 rounded-lg bg-gradient-to-br ${step.color} mb-4 group-hover:scale-110 transition-transform duration-300 w-fit shadow-lg`}
                        >
                          <step.icon className="w-8 h-8 text-white" />
                        </div>

                        {/* Title */}
                        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">
                          {step.title}
                        </h3>

                        {/* Description */}
                        <p className="text-gray-300 leading-relaxed text-sm flex-1">
                          {step.description}
                        </p>

                        {/* Progress indicator */}
                        <div className="mt-4 flex items-center gap-2">
                          <div className="flex-1 h-1 bg-gray-700 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              whileInView={{ width: "100%" }}
                              viewport={{ once: true }}
                              transition={{ duration: 1, delay: 0.5 }}
                              className={`h-full bg-gradient-to-r ${step.color} rounded-full`}
                            />
                          </div>
                          <span className="text-xs text-gray-500 font-medium">
                            {step.number}/04
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </section>
          </div>
        </div>

        {/* Terminal Prompts - Bottom */}
        <div className="space-y-0.5 mt-4">
          {terminalPrompts.slice(6).map((prompt, index) => (
            <motion.div
              key={index + 6}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: (index + 6) * 0.08 }}
              className={`text-xs font-mono ${prompt.color}`}
            >
              {prompt.text}
            </motion.div>
          ))}
        </div>

        {/* Cursor blinking */}
        <div className="mt-2">
          <span className="text-green-400 text-xs animate-pulse">_</span>
        </div>
      </div>
    </div>
  );
}
