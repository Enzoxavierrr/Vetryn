import {
  IconSend,
  IconBrandLinkedin,
  IconBrandInstagram,
  IconMapPin,
  IconMail,
  IconBrandGithub,
  IconBrandWhatsapp,
  IconUsers,
  IconUser,
  IconMessage,
  IconSparkles,
} from "@tabler/icons-react";
import { useState } from "react";
import { useAnimate } from "framer-motion";

const socialLinks = [
  {
    Icon: IconBrandLinkedin,
    href: "https://www.linkedin.com/in/vetryn-labs-944a52395/",
    label: "LinkedIn",
  },
  {
    Icon: IconBrandInstagram,
    href: "https://instagram.com/vetrynlabs",
    label: "Instagram",
  },
  {
    Icon: IconMapPin,
    href: "https://share.google/1GO9w9aB4jRWXQ8XB",
    label: "Localização",
  },
  {
    Icon: IconMail,
    href: "mailto:vetrynlabs@gmail.com",
    label: "Email",
  },
  {
    Icon: IconBrandGithub,
    href: "https://github.com/Vetryn-Labs",
    label: "GitHub",
  },
  {
    Icon: IconBrandWhatsapp,
    href: "https://wa.me/5554984364122",
    label: "WhatsApp",
  },
];

// Clip-path constants
const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)";
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)";
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";

const ENTRANCE_KEYFRAMES = {
  left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  right: [TOP_LEFT_CLIP, NO_CLIP],
};

const EXIT_KEYFRAMES = {
  left: [NO_CLIP, TOP_RIGHT_CLIP],
  bottom: [NO_CLIP, TOP_RIGHT_CLIP],
  top: [NO_CLIP, TOP_RIGHT_CLIP],
  right: [NO_CLIP, BOTTOM_LEFT_CLIP],
};

const SocialLinkBox = ({ Icon, href, label }) => {
  const [scope, animate] = useAnimate();

  const getNearestSide = (e) => {
    const box = e.target.getBoundingClientRect();

    const proximityToLeft = {
      proximity: Math.abs(box.left - e.clientX),
      side: "left",
    };
    const proximityToRight = {
      proximity: Math.abs(box.right - e.clientX),
      side: "right",
    };
    const proximityToTop = {
      proximity: Math.abs(box.top - e.clientY),
      side: "top",
    };
    const proximityToBottom = {
      proximity: Math.abs(box.bottom - e.clientY),
      side: "bottom",
    };

    const sortedProximity = [
      proximityToLeft,
      proximityToRight,
      proximityToTop,
      proximityToBottom,
    ].sort((a, b) => a.proximity - b.proximity);

    return sortedProximity[0].side;
  };

  const handleMouseEnter = (e) => {
    const side = getNearestSide(e);
    animate(scope.current, {
      clipPath: ENTRANCE_KEYFRAMES[side],
    });
  };

  const handleMouseLeave = (e) => {
    const side = getNearestSide(e);
    animate(scope.current, {
      clipPath: EXIT_KEYFRAMES[side],
    });
  };

  const isInternalLink = href.startsWith("#");

  return (
    <a
      href={href}
      target={isInternalLink ? undefined : "_blank"}
      rel={isInternalLink ? undefined : "noopener noreferrer"}
      aria-label={label}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative grid h-full w-full place-content-center transition-all duration-300"
    >
      <Icon className="text-xl sm:text-3xl lg:text-4xl text-primary-dark" />

      <div
        ref={scope}
        style={{
          clipPath: BOTTOM_RIGHT_CLIP,
        }}
        className="absolute inset-0 grid place-content-center bg-primary text-white"
      >
        <Icon className="text-xl sm:text-3xl md:text-4xl" />
      </div>
    </a>
  );
};

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="h-full w-full bg-white p-6 md:p-8 lg:p-12 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-dark mb-4">
            Entre em Contato
          </h2>
          <p className="text-base md:text-lg text-gray-600">
            Estamos prontos para ajudar você a transformar suas ideias em
            realidade.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Social Media Links */}
          <div className="flex flex-col">
            <div className="divide-y divide-primary-dark border border-primary-dark rounded-lg overflow-hidden bg-white flex-1 flex flex-col h-full">
              <div className="grid grid-cols-2 divide-x divide-primary-dark flex-1">
                <SocialLinkBox
                  Icon={socialLinks[0].Icon}
                  href={socialLinks[0].href}
                  label={socialLinks[0].label}
                />
                <SocialLinkBox
                  Icon={socialLinks[1].Icon}
                  href={socialLinks[1].href}
                  label={socialLinks[1].label}
                />
              </div>
              <div className="grid grid-cols-3 divide-x divide-primary-dark flex-1">
                <SocialLinkBox
                  Icon={socialLinks[2].Icon}
                  href={socialLinks[2].href}
                  label={socialLinks[2].label}
                />
                <SocialLinkBox
                  Icon={socialLinks[3].Icon}
                  href={socialLinks[3].href}
                  label={socialLinks[3].label}
                />
                <SocialLinkBox
                  Icon={socialLinks[4].Icon}
                  href={socialLinks[4].href}
                  label={socialLinks[4].label}
                />
              </div>
              <div className="grid grid-cols-2 divide-x divide-primary-dark flex-1">
                <SocialLinkBox
                  Icon={socialLinks[5].Icon}
                  href={socialLinks[5].href}
                  label={socialLinks[5].label}
                />
                <SocialLinkBox
                  Icon={IconUsers}
                  href="#about"
                  label="Nossa Equipe"
                />
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="p-6 md:p-8 rounded-2xl bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-xl">
              <div className="mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-3 mb-3">
                  <IconSparkles className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                  <h3 className="text-xl md:text-2xl font-bold text-primary-dark">
                    Vamos conversar?
                  </h3>
                </div>
                <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                  Estamos aqui para ajudar! Envie uma mensagem e vamos
                  transformar sua visão em realidade. ✨
                </p>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="flex items-center gap-2 text-sm md:text-base font-medium text-gray-700 mb-2"
                    >
                      <IconUser className="w-4 h-4 text-primary" />
                      Nome
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 text-base rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all bg-white"
                      placeholder="Seu nome"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="flex items-center gap-2 text-sm md:text-base font-medium text-gray-700 mb-2"
                    >
                      <IconMail className="w-4 h-4 text-primary" />
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 text-base rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all bg-white"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm md:text-base font-medium text-gray-700 mb-2"
                  >
                    Assunto
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 text-base rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all bg-white"
                    placeholder="Ex: Novo projeto..."
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="flex items-center gap-2 text-sm md:text-base font-medium text-gray-700 mb-2"
                  >
                    <IconMessage className="w-4 h-4 text-primary" />
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 text-base rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none transition-all resize-none bg-white"
                    placeholder="Conte-nos sobre seu projeto..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-primary to-primary-light text-white font-bold rounded-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 group text-base md:text-lg"
                >
                  <IconSend className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <span>Fale conosco</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
