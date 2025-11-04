export const projectsStyles = {
  section: "py-24 px-4 bg-gradient-to-b from-gray-50 to-white",
  container: "container mx-auto max-w-6xl",
  header: "text-center mb-16",
  title: "mb-4 text-[#12462d]",
  description: "text-gray-600 max-w-2xl mx-auto",
  grid: "grid grid-cols-1 md:grid-cols-2 gap-8",
  projectCard: "group relative rounded-2xl overflow-hidden bg-white border border-gray-200 hover:border-[#7addad] hover:shadow-2xl transition-all duration-500 cursor-pointer",
  imageContainer: "relative h-64 overflow-hidden",
  image: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700",
  gradientOverlay: "absolute inset-0 bg-gradient-to-t from-[#081d13]/90 via-[#081d13]/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500",
  badgeContainer: "absolute top-4 left-4",
  badge: "px-3 py-1 rounded-full bg-[#7addad]/90 text-[#081d13] backdrop-blur-sm",
  iconsContainer: "absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300",
  iconButton: "w-10 h-10 rounded-full bg-[#7addad]/90 flex items-center justify-center hover:bg-[#7addad] transition-colors cursor-pointer",
  icon: "w-5 h-5 text-[#081d13]",
  content: "p-6",
  projectTitle: "mb-3 text-[#12462d] group-hover:text-[#1c6f47] transition-colors duration-300",
  projectDescription: "mb-4 text-gray-600 line-clamp-2",
  tagsContainer: "flex flex-wrap gap-2",
  tag: "px-3 py-1 rounded-full bg-[#12462d]/5 text-[#12462d] group-hover:bg-[#12462d]/10 transition-colors duration-300",
  animatedBorder: "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none",
  cta: "mt-16 text-center",
  ctaText: "text-gray-600 mb-6",
  ctaButton: "px-8 py-4 rounded-xl bg-[#12462d] text-[#7addad] hover:bg-[#1c6f47] transition-all duration-300 hover:scale-105 hover:shadow-lg",
};

export const projectsAnimations = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  },
};

export const animatedBorderStyle = {
  background: 'linear-gradient(90deg, #7addad, #1c6f47, #7addad)',
  backgroundSize: '200% 100%',
  animation: 'gradient 3s ease infinite',
  WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
  WebkitMaskComposite: 'xor',
  maskComposite: 'exclude',
  padding: '2px',
} as React.CSSProperties;
