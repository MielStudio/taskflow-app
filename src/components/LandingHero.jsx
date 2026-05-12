import { Link } from "react-router-dom"
import { Check, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import dashboardPreview from "../assets/landing-dashboard.png"

export default function LandingHero() {
  return (
    <section
      className="
        overflow-hidden
        bg-[#EEF6FF]
      "
    >
      <div
        className="
          mx-auto grid max-w-[1440px]
          grid-cols-1 gap-12
          px-4 py-14
          sm:px-6
          lg:grid-cols-2
          lg:items-center
          lg:gap-16
          lg:px-10
          lg:py-20
        "
      >
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55 }}
        >
          {/* Badge */}
          <div
            className="
              inline-flex items-center gap-3
              rounded-full bg-[#E8E0FF]
              px-5 py-3
            "
          >
            <span className="h-3 w-3 rounded-full bg-[#5140E8]" />

            <span
              className="
                text-[14px]
                font-semibold
                text-[#5140E8]
              "
            >
              Organize. Collaborate. Get things done.
            </span>
          </div>

          {/* Title */}
          <h1
            className="
              mt-8
              text-[56px]
              font-extrabold
              leading-[1.05]
              tracking-[-0.03em]
              text-[#0F172A]
            "
          >
            Task Management
            <br />
            Made <span className="text-[#5140E8]">Simple</span>
          </h1>

          {/* Description */}
          <p
            className="
              mt-8 max-w-[580px]
              text-[24px]
              leading-[1.45]
              text-[#334155]
            "
          >
            TaskFlow helps teams stay organized, collaborate
            effectively, and track progress in one simple and intuitive
            platform.
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              to="/register"
              className="
                flex h-[68px] items-center justify-center gap-3
                rounded-2xl bg-[#5140E8]
                px-10 text-[20px]
                font-semibold text-white
                transition hover:bg-[#4635D8]
              "
            >
              Get started free
              <ArrowRight size={22} />
            </Link>

            <Link
              to="/login"
              className="
                flex h-[68px] items-center justify-center
                rounded-2xl border border-[#94A3B8]
                bg-white px-10
                text-[20px] font-semibold
                text-[#0F172A]
                transition hover:bg-[#F8FAFC]
              "
            >
              Log in to your account
            </Link>
          </div>

          {/* Benefits */}
          <div
            className="
              mt-10 flex flex-col gap-4
              sm:flex-row sm:flex-wrap
            "
          >
            {[
              "Free forever",
              "No credit card required",
              "Easy setup",
            ].map((item) => (
              <div
                key={item}
                className="
                  flex items-center gap-3
                  rounded-full bg-white
                  px-5 py-3
                  shadow-sm
                "
              >
                <Check
                  size={18}
                  className="text-[#5140E8]"
                />

                <span className="text-[16px] font-medium">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, x: 35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, delay: 0.15 }}
          className="relative"
        >
          <div
            className="
              overflow-hidden rounded-3xl
              border border-[#CBD5E1]
              bg-white shadow-2xl
            "
          >
            <img
              src={dashboardPreview}
              alt="TaskFlow dashboard preview"
              className="w-full object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}
