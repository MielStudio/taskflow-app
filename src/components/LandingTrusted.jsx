import { motion } from "framer-motion"
import { CircleDot, Boxes, Cloud, Layers } from "lucide-react"

const companies = [
  {
    name: "FlowSync",
    icon: CircleDot,
  },
  {
    name: "CloudCore",
    icon: Cloud,
  },
  {
    name: "Vertex",
    icon: Boxes,
  },
  {
    name: "Nexify",
    icon: Layers,
  },
]

export default function LandingTrusted() {
  return (
    <section className="bg-[#EEF6FF] py-14 sm:py-16">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="text-center text-[20px] font-extrabold text-[#0F172A] sm:text-[22px]"
        >
          Built for teams of any size
        </motion.h2>

        <div className="mt-10 grid grid-cols-2 gap-7 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-16 lg:gap-24">
          {companies.map((company, index) => {
            const Icon = company.icon

            return (
              <motion.div
                key={company.name}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.08,
                }}
                whileHover={{ y: -3, scale: 1.03 }}
                className="
                  flex items-center justify-center gap-3
                  text-[#7A8088] transition
                  hover:text-[#5140E8]
                "
              >
                <Icon size={34} strokeWidth={2.5} />

                <span className="text-[28px] font-extrabold tracking-[-0.03em] sm:text-[34px]">
                  {company.name}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}