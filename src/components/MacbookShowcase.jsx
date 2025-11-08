import { MacbookScroll } from "./ui/macbook-scroll";
import ProcessShowcase from "./ProcessShowcase";

export default function MacbookShowcase() {
  return (
    <section className="w-full overflow-hidden bg-gradient-to-b from-white to-gray-50 py-24">
      <MacbookScroll
        title={
          <span>
            Como Trabalhamos <br /> Nosso processo em ação
          </span>
        }
        showGradient={false}
      >
        <ProcessShowcase />
      </MacbookScroll>
    </section>
  );
}
