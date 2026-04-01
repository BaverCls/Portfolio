import ContactSteps from "./ContactSteps";

export default function ContactSection({ onOpenModal }) {
  return (
    <section id="contact" className="grid md:grid-cols-2 gap-12 items-center pt-20 border-t border-white/10">
      <div className="flex flex-col gap-5">
        <p className="text-xl italic text-neutral-600 border-l-2 border-[#820000] pl-4 leading-relaxed">
          "Projelerinizi fikir aşamasından alıp, arayüzden veritabanına kadar her adımda titizlikle çalışarak canlı bir ürüne dönüştürebiliriz."
        </p>
        <h2 className="text-3xl font-extrabold text-white leading-snug">
          Bir proje fikriniz mi var?
        </h2>
        <button
          onClick={onOpenModal}
          className="relative inline-flex items-center px-6 py-2.5 border border-[#820000] rounded-full font-medium text-sm text-[#A10000] overflow-hidden cursor-pointer group w-fit hover:border-black hover:scale-102 transition-all duration-500"
        >
          <span className="absolute inset-0 rounded-full opacity-0 bg-[linear-gradient(135deg,#0a0a0a,#A30000,#0a0a0a,#A30000,#0a0a0a)] bg-[length:200%_200%] group-hover:opacity-100 group-hover:animate-flow transition-opacity duration-500" />
          <span className="relative z-10 flex items-center gap-2 group-hover:text-white transition-colors duration-500">
            İletişime geç →
          </span>
        </button>
      </div>
      
      <ContactSteps />
    </section>
  );
}