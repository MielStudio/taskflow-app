import { ListTodo, Users, BarChart3 } from "lucide-react"
import { motion } from "framer-motion"

const features = [
  {
    title: "Task Management",
    text: "Create, organize, and prioritize tasks with ease.",
    icon: ListTodo,
  },
  {
    title: "Team Collaboration",
    text: "Work together, assign tasks, and communicate in one place.",
    icon: Users,
  },
  {
    title: "Progress Tracking",
    text: "Track progress with charts and real-time insights.",
    icon: BarChart3,
  },
]

export default function LandingFeatures() {
  return (
    <section className="bg-white py-10 sm:py-14">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-10">
        <motion.h2
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35 }}
          className="text-center text-[26px] font-extrabold text-[#0F172A] sm:text-[32px]"
        >
          Everything you need to manage tasks
        </motion.h2>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.35,
                  delay: index * 0.08,
                }}
                className="
                  flex items-center gap-5
                  rounded-2xl border border-transparent
                  bg-white p-5
                  transition hover:border-[#BFDBFE] hover:shadow-lg
                "
              >
                <div
                  className="
                    flex h-[78px] w-[78px] shrink-0
                    items-center justify-center rounded-xl
                    bg-[#F1ECFF] text-[#6C4CF6]
                    shadow-md
                  "
                >
                  <Icon size={44} strokeWidth={2.3} />
                </div>

                <div>
                  <h3 className="text-[22px] font-semibold text-[#0F172A]">
                    {feature.title}
                  </h3>

                  <p className="mt-2 text-[16px] leading-6 text-[#334155]">
                    {feature.text}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}