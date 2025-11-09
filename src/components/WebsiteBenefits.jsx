import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  IconWorld,
  IconBadge,
  IconClock24,
} from "@tabler/icons-react";

const benefits = [
  {
    icon: IconWorld,
    title: "Presença Online",
    description:
      "Um site proporciona uma presença online permanente, permitindo que clientes em potencial encontrem informações sobre seus produtos ou serviços a qualquer hora, em qualquer lugar.",
  },
  {
    icon: IconBadge,
    title: "Credibilidade",
    description:
      "Um site bem projetado transmite credibilidade e profissionalismo, estabelecendo confiança com seus clientes. Muitos consumidores hoje em dia pesquisam online antes de fazer uma compra ou contratar um serviço.",
  },
  {
    icon: IconClock24,
    title: "Acessibilidade",
    description:
      "Seu site está disponível 24 horas por dia, 7 dias por semana. Isso significa que os clientes podem obter informações sobre sua empresa e fazer compras a qualquer momento, independentemente do horário comercial.",
  },
];

const Card3D = ({ benefit, index }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="group relative"
    >
      <div
        style={{
          transform: "translateZ(75px)",
          transformStyle: "preserve-3d",
        }}
        className="relative p-8 rounded-3xl bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm border border-gray-700/50 shadow-2xl"
      >
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />

        {/* Shine effect */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="relative z-10" style={{ transform: "translateZ(25px)" }}>
          {/* Icon */}
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            className="inline-flex p-4 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 mb-6 backdrop-blur-sm border border-primary/20"
            style={{ transform: "translateZ(50px)" }}
          >
            <benefit.icon className="w-8 h-8 text-primary" />
          </motion.div>

          {/* Title */}
          <motion.h3
            style={{ transform: "translateZ(30px)" }}
            className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors duration-300"
          >
            {benefit.title}
          </motion.h3>

          {/* Description */}
          <motion.p
            style={{ transform: "translateZ(20px)" }}
            className="text-gray-300 leading-relaxed text-sm"
          >
            {benefit.description}
          </motion.p>
        </div>

        {/* Border glow */}
        <div className="absolute inset-0 rounded-3xl border border-primary/0 group-hover:border-primary/30 transition-colors duration-500" />
      </div>
    </motion.div>
  );
};

export default function WebsiteBenefits() {
  return (
    <section className="py-24 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6"
          >
            <span className="px-4 py-2 rounded-full bg-primary text-white text-sm font-semibold">
              WEBSITE PROFISSIONAL
            </span>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-white mb-6"
          >
            Por que o seu negócio precisa de um site profissional?
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Ter um site profissional é essencial para o sucesso do seu negócio.
            Ou seja, é uma ferramenta fundamental para construir uma presença
            online sólida, aumentar a credibilidade e atrair mais clientes para
            o seu negócio.
          </motion.p>
        </motion.div>

        {/* Benefits Cards */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          style={{
            perspective: "1000px",
            perspectiveOrigin: "center center",
          }}
        >
          {benefits.map((benefit, index) => (
            <Card3D key={index} benefit={benefit} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

