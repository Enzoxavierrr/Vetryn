export const heroStyles = {
  section: "relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#081d13] via-[#12462d] to-[#1c6f47]",
  backgroundContainer: "absolute inset-0 overflow-hidden",
  blob1: "absolute top-20 left-10 w-72 h-72 bg-[#7addad]/10 rounded-full blur-3xl",
  blob2: "absolute bottom-20 right-10 w-96 h-96 bg-[#7addad]/10 rounded-full blur-3xl",
  container: "container mx-auto px-4 relative z-10",
  innerContainer: "max-w-4xl mx-auto text-center",
  badge: "mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#7addad]/10 border border-[#7addad]/20",
  badgeIcon: "w-4 h-4 text-[#7addad]",
  badgeText: "text-[#7addad]",
  title: "mb-6 text-5xl md:text-7xl text-white",
  titleHighlight: "text-[#7addad]",
  description: "mb-10 text-xl text-[#7addad]/80 max-w-2xl mx-auto",
  buttonsContainer: "flex flex-col sm:flex-row gap-4 justify-center items-center",
  primaryButton: "bg-[#7addad] text-[#081d13] hover:bg-[#7addad]/90 group px-8",
  buttonIcon: "ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform",
  secondaryButton: "border-[#7addad] text-[#7addad] hover:bg-[#7addad]/10 px-8",
  secondaryButtonIcon: "mr-2 w-4 h-4",
  floatingIcon1: "absolute top-1/4 left-10 text-[#7addad]/20",
  floatingIcon1Size: "w-12 h-12",
  floatingIcon2: "absolute top-1/3 right-20 text-[#7addad]/20",
  floatingIcon2Size: "w-10 h-10",
  scrollIndicator: "absolute bottom-10 left-1/2 -translate-x-1/2",
  scrollIndicatorOuter: "w-6 h-10 border-2 border-[#7addad]/50 rounded-full flex items-start justify-center p-2",
  scrollIndicatorInner: "w-1.5 h-1.5 bg-[#7addad] rounded-full",
};

export const heroAnimations = {
  blob1: {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.5, 0.3],
    },
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  blob2: {
    animate: {
      scale: [1.2, 1, 1.2],
      opacity: [0.5, 0.3, 0.5],
    },
    transition: {
      duration: 8,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  fadeInUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  },
  floatingIcon1: {
    animate: { y: [0, -20, 0] },
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  floatingIcon2: {
    animate: { y: [0, 20, 0] },
    transition: {
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut",
      delay: 1,
    },
  },
  scrollIndicator: {
    animate: { y: [0, 10, 0] },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
  scrollDot: {
    animate: { y: [0, 12, 0] },
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};
