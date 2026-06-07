import { motion } from "framer-motion";
import { Code2, Lightbulb, MessageSquare, Rocket } from "lucide-react";

const MotionDiv = motion.div;
 
const steps = [
  {
    num: "01",
    title: "İletişime Geçin",
    desc: "Projenizi kısaca anlatın. Fikir aşamasında olması yeterli.",
  },
  {
    num: "02",
    title: "Planlama",
    desc: "Kapsam, teknoloji yığını ve timeline'ı birlikte belirleriz.",
  },
  {
    num: "03",
    title: "Geliştirme",
    desc: "Hızlı iterasyonlarla inşa ederim, sizi süreçte güncel tutarım.",
  },
  {
    num: "04",
    title: "Teslim",
    desc: "Canlıya alır, gerekli desteği sağlarım.",
  },
];

const stepIcons = [MessageSquare, Lightbulb, Code2, Rocket];
 
export default function ContactSteps() {
  return (
    <div className="flex flex-col gap-0 md:pl-12">
      {steps.map((step, i) => (
        <MotionDiv
          key={step.num}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
          className="flex gap-5 group"
        >
          {/* Sol: numara + bağlantı çizgisi */}
          <div className="flex flex-col items-center">
            <MotionDiv
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.15 + 0.1, type: "spring", stiffness: 200 }}
              className="relative w-8 h-8 rounded-full border border-[#A30000]/70 flex items-center justify-center flex-shrink-0 overflow-hidden bg-[#050506]"
            >
              <span className="absolute inset-0 opacity-0 bg-[linear-gradient(135deg,#0a0a0a,#820000,#0a0a0a,#820000,#0a0a0a)] bg-[length:200%_200%] group-hover:opacity-100 group-hover:animate-flow transition-opacity duration-500" />
              <span className="relative z-10 text-[10px] font-mono font-bold text-[#820000] group-hover:text-white transition-colors duration-300">
                {step.num}
              </span>
            </MotionDiv>
 
            {/* Çizgi — son adımda yok */}
            {i < steps.length - 1 && (
              <MotionDiv
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15 + 0.3, ease: "easeOut" }}
                style={{ originY: 0 }}
                className="w-px flex-1 bg-white/[0.06] my-1 min-h-[32px]"
              />
            )}
          </div>
 
          {/* Sağ: içerik */}
          <div className="pb-8">
            <div className="mb-1 flex items-center gap-3">
              {(() => {
                const Icon = stepIcons[i];

                return (
                  <Icon className="h-4 w-4 text-white/28 transition-colors duration-300 group-hover:text-[#ff4a4a]" />
                );
              })()}
              <p className="text-base font-bold text-white group-hover:text-rose-100 transition-colors duration-300">
                {step.title}
              </p>
            </div>
            <p className="text-[15px] leading-relaxed text-neutral-400">
              {step.desc}
            </p>
          </div>
        </MotionDiv>
      ))}
    </div>
  );
}
