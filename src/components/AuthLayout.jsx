import { Link } from "react-router-dom"
import { motion } from "framer-motion"
import logo from "../assets/logo.png"
import authImage from "../assets/auth-preview.png"

export default function AuthLayout({
  title,
  subtitle,
  cardTitle,
  cardSubtitle,
  children,
  footer,
}) {
  return (
    <main className="min-h-screen px-6 py-10"
        style={{
            background: `
                radial-gradient(circle at 16% 82%, rgba(199, 195, 245, 0.75) 0%, rgba(220, 222, 248, 0.45) 28%, rgba(237, 243, 250, 0) 52%),
                linear-gradient(110deg, #EEF3FF 0%, #F5FAFF 48%, #FFFFFF 100%)
            `,
    }}>
      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-[1440px] grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <motion.section
          initial={{ opacity: 0, x: -35 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <Link to="/" className="inline-flex">
            <img src={logo} alt="TaskFlow" className="h-[110px] w-auto" />
          </Link>

          <h1 className="mt-10 text-[56px] font-extrabold leading-tight tracking-[-0.04em] lg:text-[68px]">
            {title}
          </h1>

          <p className="mt-6 max-w-[620px] text-[22px] leading-8 text-[#0F172A]">
            {subtitle}
          </p>

          <motion.img
            src={authImage}
            alt="TaskFlow dashboard preview"
            initial={{ opacity: 0, y: 30, rotate: -2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: "easeOut" }}
            className="mt-16 hidden max-w-[650px] lg:block"
          />
        </motion.section>

        <motion.section
          initial={{ opacity: 0, x: 35, scale: 0.98 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.55, delay: 0.12, ease: "easeOut" }}
          className="mx-auto w-full max-w-[520px] rounded-lg border border-[#CBD5E1] bg-white p-8 shadow-lg lg:p-12"
        >
          <h2 className="text-[38px] font-extrabold">
            {cardTitle}
          </h2>

          <p className="mt-5 text-[16px] leading-6">
            {cardSubtitle}
          </p>

          {children}

          {footer}

          <p className="mt-14 text-center text-[#888888]">
            © 2026 TaskFlow. All rights reserved.
          </p>
        </motion.section>
      </div>
    </main>
  )
}