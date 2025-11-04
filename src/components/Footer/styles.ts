export const footerStyles = {
  footer: "bg-[#081d13] text-[#7addad] py-16 px-4",
  container: "container mx-auto max-w-6xl",
  grid: "grid grid-cols-1 md:grid-cols-3 gap-12 mb-12",
  companyTitle: "mb-4 text-[#7addad]",
  companyDescription: "text-[#7addad]/70 mb-6",
  socialLinks: "flex gap-4",
  socialLink: "w-10 h-10 rounded-full bg-[#12462d] flex items-center justify-center hover:bg-[#1c6f47] transition-colors duration-300",
  socialIcon: "w-5 h-5 text-[#7addad]",
  sectionTitle: "mb-4 text-[#7addad]",
  quickLinks: "space-y-3",
  quickLink: "text-[#7addad]/70 hover:text-[#7addad] transition-colors duration-300 inline-block hover:translate-x-1 transform",
  contactList: "space-y-4",
  contactItem: "flex items-start gap-3 group",
  contactIcon: "w-10 h-10 rounded-lg bg-[#12462d] flex items-center justify-center flex-shrink-0 group-hover:bg-[#1c6f47] transition-colors duration-300",
  contactIconSvg: "w-5 h-5 text-[#7addad]",
  contactLabel: "text-[#7addad]/50",
  contactValue: "text-[#7addad]/90 hover:text-[#7addad] transition-colors",
  contactText: "text-[#7addad]/90",
  bottomBar: "pt-8 border-t border-[#7addad]/20 text-center",
  copyright: "text-[#7addad]/60",
};

export const footerAnimations = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  },
  fadeIn: {
    initial: { opacity: 0 },
    whileInView: { opacity: 1 },
    viewport: { once: true },
  },
  socialLink: {
    whileHover: { scale: 1.1 },
    whileTap: { scale: 0.95 },
  },
};
