export const navbarStyles = {
  nav: (scrolled: boolean) => 
    `fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? "bg-[#081d13]/95 backdrop-blur-md shadow-lg" : "bg-transparent"
    }`,
  container: "container mx-auto px-4",
  innerContainer: "flex items-center justify-between h-20",
  logo: "flex items-center gap-2 group",
  logoIcon: "w-10 h-10 rounded-lg bg-[#7addad] flex items-center justify-center group-hover:bg-[#7addad]/90 transition-colors",
  logoIconSvg: "w-6 h-6 text-[#081d13]",
  logoText: "text-2xl text-[#7addad]",
  desktopNav: "hidden md:flex items-center gap-8",
  navLink: "text-[#7addad]/80 hover:text-[#7addad] transition-colors relative group",
  navLinkUnderline: "absolute -bottom-1 left-0 w-0 h-0.5 bg-[#7addad] group-hover:w-full transition-all duration-300",
  ctaButton: "px-6 py-2 rounded-lg bg-[#7addad] text-[#081d13] hover:bg-[#7addad]/90 transition-colors",
  mobileMenuButton: "md:hidden text-[#7addad] p-2",
  mobileMenuIcon: "w-6 h-6",
  mobileNav: "md:hidden overflow-hidden",
  mobileNavContent: "py-4 space-y-4",
  mobileNavLink: "block text-[#7addad]/80 hover:text-[#7addad] transition-colors py-2",
  mobileCtaButton: "w-full px-6 py-2 rounded-lg bg-[#7addad] text-[#081d13] hover:bg-[#7addad]/90 transition-colors",
};

export const navbarAnimations = {
  nav: {
    initial: { y: -100 },
    animate: { y: 0 },
    transition: { duration: 0.6 },
  },
  logo: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  },
  navLink: {
    whileHover: { y: -2 },
  },
  ctaButton: {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  },
  mobileMenu: (isOpen: boolean) => ({
    initial: false,
    animate: {
      height: isOpen ? "auto" : 0,
      opacity: isOpen ? 1 : 0,
    },
    transition: { duration: 0.3 },
  }),
};
