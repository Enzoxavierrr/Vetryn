import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

// Dados de exemplo - você pode substituir por dados reais
const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description:
      "Plataforma completa de e-commerce com sistema de pagamento integrado, gestão de estoque e dashboard administrativo.",
    tags: ["E-commerce", "Full Stack"],
    tech: ["React", "Node.js", "PostgreSQL", "Stripe"],
    image: null, // Você pode adicionar URLs de imagens aqui
    demoUrl: "#",
    githubUrl: "#",
    link: "#",
  },
  {
    id: 2,
    title: "SaaS Dashboard",
    description:
      "Dashboard moderno e intuitivo para gestão de dados com visualizações em tempo real e relatórios personalizados.",
    tags: ["SaaS", "Dashboard"],
    tech: ["Next.js", "TypeScript", "Chart.js", "Tailwind"],
    image: null,
    demoUrl: "#",
    githubUrl: "#",
    link: "#",
  },
  {
    id: 3,
    title: "Mobile Banking App",
    description:
      "Aplicativo mobile para operações bancárias com autenticação biométrica e transferências instantâneas.",
    tags: ["Mobile", "Fintech"],
    tech: ["React Native", "Firebase", "Biometrics"],
    image: null,
    demoUrl: "#",
    githubUrl: "#",
    link: "#",
  },
  {
    id: 4,
    title: "Learning Management System",
    description:
      "Sistema completo de gestão de aprendizado com cursos online, avaliações e certificados.",
    tags: ["Education", "LMS"],
    tech: ["Vue.js", "Laravel", "MySQL", "AWS"],
    image: null,
    demoUrl: "#",
    githubUrl: "#",
    link: "#",
  },
  {
    id: 5,
    title: "Real Estate Platform",
    description:
      "Plataforma para busca e visualização de imóveis com tours virtuais e integração com mapas.",
    tags: ["Real Estate", "Web App"],
    tech: ["React", "Mapbox", "Node.js", "MongoDB"],
    image: null,
    demoUrl: "#",
    githubUrl: "#",
    link: "#",
  },
  {
    id: 6,
    title: "Healthcare Management",
    description:
      "Sistema de gestão hospitalar com agendamento de consultas, prontuários eletrônicos e telemedicina.",
    tags: ["Healthcare", "Enterprise"],
    tech: ["Angular", "Spring Boot", "PostgreSQL", "Docker"],
    image: null,
    demoUrl: "#",
    githubUrl: "#",
    link: "#",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-24 bg-white relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-primary-dark mb-4">
            Nossos Projetos
          </h2>
          <div className="w-24 h-1 bg-primary mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Conheça alguns dos projetos que desenvolvemos e que fazem a
            diferença para nossos clientes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
