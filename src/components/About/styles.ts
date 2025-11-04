export const aboutStyles = {
  section: "py-24 px-4 bg-white",
  container: "container mx-auto max-w-6xl",
  header: "text-center mb-16",
  title: "mb-4 text-[#12462d]",
  description: "text-gray-600 max-w-2xl mx-auto",
  grid: "grid grid-cols-1 md:grid-cols-2 gap-8",
  featureCard: "group p-8 rounded-2xl border border-gray-200 hover:border-[#7addad] hover:shadow-xl transition-all duration-300 cursor-pointer bg-white hover:bg-gradient-to-br hover:from-white hover:to-[#7addad]/5",
  iconContainer: "mb-4 inline-flex items-center justify-center w-14 h-14 rounded-xl bg-[#12462d]/5 group-hover:bg-[#12462d] transition-colors duration-300",
  icon: "w-7 h-7 text-[#12462d] group-hover:text-[#7addad] transition-colors duration-300",
  featureTitle: "mb-3 text-[#12462d] group-hover:text-[#1c6f47] transition-colors duration-300",
  featureDescription: "text-gray-600",
  missionCard: "mt-16 p-10 rounded-2xl bg-gradient-to-r from-[#12462d] to-[#1c6f47] text-center",
  missionTitle: "mb-4 text-[#7addad]",
  missionText: "text-[#7addad]/90 max-w-3xl mx-auto",
};

export const aboutAnimations = {
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
  },
};
