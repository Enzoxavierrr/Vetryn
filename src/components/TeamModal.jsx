import { motion, AnimatePresence } from "framer-motion";
import { IconX, IconBrandLinkedin } from "@tabler/icons-react";
import { useState } from "react";

// Componente para cada membro do time
const TeamMemberCard = ({ member, index }) => {
  const [imageError, setImageError] = useState(false);

  // Debug: verificar se o imagePosition está sendo passado
  const imagePosition = member.imagePosition || "50% 20%";

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="p-6 rounded-xl bg-gradient-to-br from-gray-50 to-white border border-gray-200 hover:border-primary/50 transition-all duration-300 hover:shadow-lg"
    >
      <div className="flex flex-col items-center text-center">
        {/* Foto ou Inicial */}
        <div className="relative mb-4 w-20 h-20 overflow-hidden rounded-full">
          {member.image && !imageError ? (
            <img
              src={member.image}
              alt={member.name}
              className="w-20 h-20 rounded-full object-cover border-2 border-primary/20 shadow-lg"
              style={{
                objectPosition: imagePosition,
                objectFit: "cover",
              }}
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary-light flex items-center justify-center text-white font-bold text-2xl shadow-lg">
              {member.initial}
            </div>
          )}
        </div>
        <h3 className="text-xl font-bold text-primary-dark mb-2">
          {member.name}
        </h3>
        <p className="text-sm text-primary mb-3 font-medium">{member.role}</p>
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {member.description}
        </p>
        {/* Link do LinkedIn */}
        {member.linkedin && (
          <a
            href={member.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all duration-300 group"
          >
            <IconBrandLinkedin className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span className="text-sm font-medium">LinkedIn</span>
          </a>
        )}
      </div>
    </motion.div>
  );
};

const teamMembers = [
  {
    name: "Arthur Maciel",
    role: "",
    description:
      "Responsável pela visão e posicionamento da Vetryn Labs. Atua desde a estratégia até o desenvolvimento dos produtos, garantindo direção, qualidade e propósito em cada etapa. Une visão de negócio e prática técnica com foco em resultados reais.",
    initial: "A",
    linkedin: "", // Adicione o link do LinkedIn aqui (ex: "https://www.linkedin.com/in/arthur-maciel")
    image: "/images/arthur.jpg", // Primeira imagem - Adicione a foto do Arthur aqui
    imagePosition: "50% 30%", // Posicionamento da imagem (Arthur - abaixado mais)
  },
  {
    name: "Enzo Xavier",
    role: "",
    description:
      "Líder da frente técnica e da produção. Especialista em transformar conceitos em código de alta performance, conduz o desenvolvimento com agilidade, precisão e inovação. É o motor que leva as ideias da Vetryn Labs à prática.",
    initial: "E",
    linkedin: "", // Adicione o link do LinkedIn aqui (ex: "https://www.linkedin.com/in/enzo-xavier")
    image: "/images/enzo.jpg", // Terceira imagem - Adicione a foto do Enzo aqui
    imagePosition: "50% 15%", // Posicionamento da imagem (abaixado um pouco mais)
  },
];

export default function TeamModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
                <h2 className="text-2xl md:text-3xl font-bold text-primary-dark">
                  Nossa Equipe
                </h2>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                  aria-label="Fechar"
                >
                  <IconX className="w-6 h-6 text-gray-600" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 md:p-8">
                <div className="mb-8 text-center">
                  <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Dois engenheiros de software que compartilham uma missão:
                    transformar ideias em tecnologia de alto impacto. Juntos,
                    formamos o time c-level da Vetryn Labs, unindo estratégia,
                    inovação e execução.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {teamMembers.map((member, index) => (
                    <TeamMemberCard key={index} member={member} index={index} />
                  ))}
                </div>

                <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-primary/5 to-primary-content/5 border border-primary/20">
                  <h3 className="text-lg font-bold text-primary-dark mb-3">
                    Quer fazer parte do time?
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    Estamos sempre em busca de talentos apaixonados por
                    tecnologia. Entre em contato conosco!
                  </p>
                  <a
                    href="#contact"
                    onClick={onClose}
                    className="inline-block px-6 py-2 bg-primary text-white font-semibold rounded-lg hover:bg-primary-dark transition-colors"
                  >
                    Entre em Contato
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
