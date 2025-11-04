import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { ImageWithFallback } from "../figma/ImageWithFallback";
import { projectsStyles, projectsAnimations, animatedBorderStyle } from "./styles";

const projects = [
  {
    id: 1,
    title: "Sistema de Gestão Empresarial",
    description: "Plataforma completa para gestão de recursos, finanças e operações empresariais.",
    image: "https://images.unsplash.com/photo-1759884247264-86c2aa311632?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzb2Z0d2FyZSUyMGRldmVsb3BtZW50fGVufDF8fHx8MTc2MjI3MTU2Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["React", "Node.js", "PostgreSQL"],
    category: "Web App",
  },
  {
    id: 2,
    title: "Dashboard Analítico",
    description: "Interface intuitiva para visualização de dados e métricas em tempo real.",
    image: "https://images.unsplash.com/photo-1665470909939-959569b20021?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBhcHBsaWNhdGlvbiUyMGRhc2hib2FyZHxlbnwxfHx8fDE3NjIyNDE4MzN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["TypeScript", "Next.js", "Charts"],
    category: "Dashboard",
  },
  {
    id: 3,
    title: "Aplicativo Mobile",
    description: "App multiplataforma para melhorar a experiência do usuário em dispositivos móveis.",
    image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2JpbGUlMjBhcHAlMjBpbnRlcmZhY2V8ZW58MXx8fHwxNzYyMjI1NDQ5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["React Native", "Firebase", "Redux"],
    category: "Mobile",
  },
  {
    id: 4,
    title: "Plataforma E-commerce",
    description: "Solução completa de vendas online com checkout otimizado e gestão de estoque.",
    image: "https://images.unsplash.com/photo-1658297063569-162817482fb6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlY29tbWVyY2UlMjBwbGF0Zm9ybXxlbnwxfHx8fDE3NjIxNzQ4NDl8MA&ixlib=rb-4.1.0&q=80&w=1080",
    tags: ["Vue.js", "Stripe", "MongoDB"],
    category: "E-commerce",
  },
];

export function Projects() {
  return (
    <section className={projectsStyles.section} id="projetos">
      <div className={projectsStyles.container}>
        <motion.div
          {...projectsAnimations.fadeInUp}
          transition={{ duration: 0.6 }}
          className={projectsStyles.header}
        >
          <h2 className={projectsStyles.title}>Nossos Projetos</h2>
          <p className={projectsStyles.description}>
            Confira alguns dos projetos que desenvolvemos com dedicação e expertise.
            Cada solução foi criada pensando nas necessidades específicas de nossos clientes.
          </p>
        </motion.div>

        <div className={projectsStyles.grid}>
          {projects.map((project, index) => (
            <motion.div
              key={project.id}
              {...projectsAnimations.fadeInUp}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={projectsStyles.projectCard}
            >
              {/* Image container with overlay */}
              <div className={projectsStyles.imageContainer}>
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className={projectsStyles.image}
                />
                
                {/* Gradient overlay */}
                <div className={projectsStyles.gradientOverlay} />
                
                {/* Category badge */}
                <div className={projectsStyles.badgeContainer}>
                  <span className={projectsStyles.badge}>
                    {project.category}
                  </span>
                </div>

                {/* Hover icons */}
                <div className={projectsStyles.iconsContainer}>
                  <div className={projectsStyles.iconButton}>
                    <ExternalLink className={projectsStyles.icon} />
                  </div>
                  <div className={projectsStyles.iconButton}>
                    <Github className={projectsStyles.icon} />
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className={projectsStyles.content}>
                <h3 className={projectsStyles.projectTitle}>
                  {project.title}
                </h3>
                <p className={projectsStyles.projectDescription}>
                  {project.description}
                </p>
                
                {/* Tags */}
                <div className={projectsStyles.tagsContainer}>
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className={projectsStyles.tag}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Animated border on hover */}
              <div className={projectsStyles.animatedBorder}>
                <div className="absolute inset-0 rounded-2xl" style={animatedBorderStyle} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          {...projectsAnimations.fadeInUp}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={projectsStyles.cta}
        >
          <p className={projectsStyles.ctaText}>
            Tem um projeto em mente? Vamos conversar!
          </p>
          <button className={projectsStyles.ctaButton}>
            Iniciar Projeto
          </button>
        </motion.div>
      </div>
    </section>
  );
}
