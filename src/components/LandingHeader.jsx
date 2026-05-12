import { Link } from "react-router-dom"
import { Menu, X } from "lucide-react"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import logo from "../assets/logo.png"
import FeatureModal from "./FeatureModal"

const navItems = [
  "Features",
  "How it works",
  "Pricing",
  "Testimonials",
  "About",
]


export default function LandingHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false)
  useEffect(() => {
    if (isMobileMenuOpen) {
        document.body.style.overflow = "hidden"
    } else {
        document.body.style.overflow = ""
    }

    return () => {
        document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  return (
    <>
    <header
      className="
        sticky top-0 z-50
        border-b border-[#CBD5E1]
        bg-white/95 backdrop-blur-md
      "
    >
      <div
        className="
          mx-auto flex h-[92px] max-w-[1440px]
          items-center justify-between
          px-4 sm:px-6 lg:px-10
        "
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="TaskFlow Logo"
            className="h-[54px] w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-10 lg:flex">
            {navItems.map((item) => (
                <button
                    key={item}
                    onClick={() => setIsFeatureModalOpen(true)}
                    className="
                        text-[17px] font-medium text-[#334155]
                        transition hover:text-[#5140E8]
                    "
                >
                    {item}
                </button>
            ))}
        </nav>

        {/* Desktop buttons */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link
            to="/login"
            className="
              flex h-12 items-center rounded-xl
              border border-[#CBD5E1]
              px-7 text-[16px] font-semibold
              transition hover:bg-[#F8FAFC]
            "
          >
            Log in
          </Link>

          <Link
            to="/register"
            className="
              flex h-12 items-center rounded-xl
              bg-[#5140E8] px-7
              text-[16px] font-semibold text-white
              transition hover:bg-[#4635D8]
            "
          >
            Sign up free
          </Link>
        </div>

        {/* Mobile burger */}
        <button
          onClick={() => setIsMobileMenuOpen(true)}
          className="
            flex h-11 w-11 items-center justify-center
            rounded-lg border border-[#CBD5E1]
            lg:hidden
          "
        >
          <Menu size={24} />
        </button>
      </div>
    </header>
    {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 z-[90] bg-[#0F172A]/40 backdrop-blur-sm"
            />

            <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ duration: 0.28 }}
                className="
                    fixed right-0 top-0 z-[100]
                    flex h-dvh w-[320px]
                    max-w-[85vw]
                    flex-col bg-white p-6
                    shadow-2xl
                "
            >
              <div className="mb-10 flex items-center justify-between">
                <span className="text-[22px] font-extrabold">
                  Menu
                </span>

                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="
                    flex h-10 w-10 items-center justify-center
                    rounded-lg border border-[#CBD5E1]
                  "
                >
                  <X size={22} />
                </button>
              </div>

              <nav className="flex flex-col gap-5">
                {navItems.map((item) => (
                    <button
                        key={item}
                        onClick={() => setIsFeatureModalOpen(true)}
                        className="
                            text-left text-[18px]
                            font-medium text-[#334155]
                        "
                    >
                        {item}
                    </button>
                ))}
               </nav>

              <div className="mt-auto flex flex-col gap-4">
                <Link
                  to="/login"
                  className="
                    flex h-12 items-center justify-center
                    rounded-xl border border-[#CBD5E1]
                    font-semibold
                  "
                >
                  Log in
                </Link>

                <Link
                  to="/register"
                  className="
                    flex h-12 items-center justify-center
                    rounded-xl bg-[#5140E8]
                    font-semibold text-white
                  "
                >
                  Sign up free
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    <FeatureModal
        isOpen={isFeatureModalOpen}
        onClose={() => setIsFeatureModalOpen(false)}
    />
    </>
  )
}