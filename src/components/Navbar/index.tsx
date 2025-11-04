import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu, X, Code2 } from "lucide-react";
import { navbarStyles, navbarAnimations } from "./styles";

const navLinks = [
  { name: "Início", href: "#" },
  { name: "Sobre", href: "#sobre" },
  { name: "Projetos", href: "#projetos" },
  { name: "Contato", href: "#contato" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      {...navbarAnimations.nav}
      className={navbarStyles.nav(scrolled)}
    >
      <div className={navbarStyles.container}>
        <div className={navbarStyles.innerContainer}>
          {/* Logo */}
          <motion.a
            href="#"
            className={navbarStyles.logo}
            {...navbarAnimations.logo}
          >
            <div className={navbarStyles.logoIcon}>
              <Code2 className={navbarStyles.logoIconSvg} />
            </div>
            <span className={navbarStyles.logoText}>Vetryn</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className={navbarStyles.desktopNav}>
            {navLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                className={navbarStyles.navLink}
                {...navbarAnimations.navLink}
              >
                {link.name}
                <span className={navbarStyles.navLinkUnderline} />
              </motion.a>
            ))}
            <motion.button
              {...navbarAnimations.ctaButton}
              className={navbarStyles.ctaButton}
            >
              Fale Conosco
            </motion.button>
          </div>

          {/* Mobile menu button */}
          <button
            className={navbarStyles.mobileMenuButton}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className={navbarStyles.mobileMenuIcon} />
            ) : (
              <Menu className={navbarStyles.mobileMenuIcon} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <motion.div
          {...navbarAnimations.mobileMenu(isOpen)}
          className={navbarStyles.mobileNav}
        >
          <div className={navbarStyles.mobileNavContent}>
            {navLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className={navbarStyles.mobileNavLink}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <button className={navbarStyles.mobileCtaButton}>
              Fale Conosco
            </button>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  );
}
