import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Github, Linkedin, Twitter } from "lucide-react";
import { footerStyles, footerAnimations } from "./styles";

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

const quickLinks = ['Início', 'Sobre', 'Projetos', 'Serviços', 'Contato'];

export function Footer() {
  return (
    <footer className={footerStyles.footer}>
      <div className={footerStyles.container}>
        <div className={footerStyles.grid}>
          {/* Company info */}
          <motion.div
            {...footerAnimations.fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h3 className={footerStyles.companyTitle}>Vetryn</h3>
            <p className={footerStyles.companyDescription}>
              Transformando ideias em soluções digitais de excelência. 
              Sua parceira em desenvolvimento de software.
            </p>
            <div className={footerStyles.socialLinks}>
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className={footerStyles.socialLink}
                  {...footerAnimations.socialLink}
                >
                  <social.icon className={footerStyles.socialIcon} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick links */}
          <motion.div
            {...footerAnimations.fadeInUp}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className={footerStyles.sectionTitle}>Links Rápidos</h4>
            <ul className={footerStyles.quickLinks}>
              {quickLinks.map((item, index) => (
                <li key={index}>
                  <a
                    href={`#${item.toLowerCase()}`}
                    className={footerStyles.quickLink}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact info */}
          <motion.div
            {...footerAnimations.fadeInUp}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className={footerStyles.sectionTitle}>Contato</h4>
            <ul className={footerStyles.contactList}>
              <li className={footerStyles.contactItem}>
                <div className={footerStyles.contactIcon}>
                  <Mail className={footerStyles.contactIconSvg} />
                </div>
                <div>
                  <p className={footerStyles.contactLabel}>Email</p>
                  <a href="mailto:contato@vetryn.com" className={footerStyles.contactValue}>
                    contato@vetryn.com
                  </a>
                </div>
              </li>
              <li className={footerStyles.contactItem}>
                <div className={footerStyles.contactIcon}>
                  <Phone className={footerStyles.contactIconSvg} />
                </div>
                <div>
                  <p className={footerStyles.contactLabel}>Telefone</p>
                  <a href="tel:+5511999999999" className={footerStyles.contactValue}>
                    +55 (11) 99999-9999
                  </a>
                </div>
              </li>
              <li className={footerStyles.contactItem}>
                <div className={footerStyles.contactIcon}>
                  <MapPin className={footerStyles.contactIconSvg} />
                </div>
                <div>
                  <p className={footerStyles.contactLabel}>Localização</p>
                  <p className={footerStyles.contactText}>São Paulo, SP - Brasil</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <motion.div
          {...footerAnimations.fadeIn}
          transition={{ duration: 0.6, delay: 0.3 }}
          className={footerStyles.bottomBar}
        >
          <p className={footerStyles.copyright}>
            © {new Date().getFullYear()} Vetryn. Todos os direitos reservados.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
