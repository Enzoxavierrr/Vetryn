import { motion } from "framer-motion";
import { IconExternalLink, IconCode, IconArrowRight } from "@tabler/icons-react";
import { useState } from "react";

export default function ProjectCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative overflow-hidden rounded-2xl bg-white border border-gray-200 hover:border-primary/50 transition-all duration-500 hover:shadow-2xl"
    >
      {/* Image Container */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-primary/20 to-primary-content/20">
        {project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <IconCode className="w-20 h-20 text-primary/30" />
          </div>
        )}
        
        {/* Overlay gradient on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        
        {/* Tags overlay */}
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {project.tags?.map((tag, tagIndex) => (
            <span
              key={tagIndex}
              className="px-3 py-1 text-xs font-bold rounded-full bg-white/90 text-primary backdrop-blur-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Hover content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 flex items-center justify-center gap-4"
        >
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white text-primary-dark font-bold rounded-full flex items-center gap-2 hover:bg-primary-content transition-colors"
            >
              <IconExternalLink className="w-5 h-5" />
              Ver Demo
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-white/20 backdrop-blur-sm text-white font-bold rounded-full border-2 border-white hover:bg-white hover:text-primary-dark transition-all"
            >
              <IconCode className="w-5 h-5 inline mr-2" />
              Código
            </a>
          )}
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-primary-dark mb-2 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed">
          {project.description}
        </p>

        {/* Tech stack */}
        {project.tech && (
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tech.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-2 py-1 text-xs font-medium rounded bg-primary/10 text-primary"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Learn more link */}
        <a
          href={project.link || "#"}
          className="inline-flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all"
        >
          Saiba mais
          <IconArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      {/* Shine effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
    </motion.div>
  );
}

