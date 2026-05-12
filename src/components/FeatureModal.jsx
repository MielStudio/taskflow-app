import { motion, AnimatePresence } from "framer-motion"
import { X, Info } from "lucide-react"

export default function FeatureModal({ isOpen, onClose }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[200] bg-[#0F172A]/50 backdrop-blur-sm"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ duration: 0.2 }}
            className="
              fixed left-1/2 top-1/2 z-[210]
              w-[92%] max-w-[520px]
              -translate-x-1/2 -translate-y-1/2
              rounded-2xl border border-[#BFDBFE]
              bg-white p-7 shadow-[0_20px_60px_rgba(15,23,42,0.25)]
            "
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#F1ECFF] text-[#6C4CF6]">
                  <Info size={24} />
                </div>

                <div>
                  <h2 className="text-[24px] font-extrabold">
                    Feature unavailable
                  </h2>

                  <p className="mt-1 text-sm text-[#64748B]">
                    Demo portfolio limitation
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="
                  flex h-10 w-10 items-center justify-center
                  rounded-lg border border-[#CBD5E1]
                  hover:bg-[#F8FAFC]
                "
              >
                <X size={20} />
              </button>
            </div>

            <div className="mt-6 space-y-4 text-[15px] leading-7 text-[#334155]">
              <p>
                This feature is not implemented in the demo version.
              </p>

              <p>
                TaskFlow is a portfolio showcase project created to demonstrate
                UI/UX design, responsive layouts, animations, frontend
                architecture, and dashboard interactions.
              </p>

              <p>
                This is not a fully functional production task management
                system.
              </p>
            </div>

            <button
              onClick={onClose}
              className="
                mt-7 h-11 w-full rounded-xl
                bg-[#5140E8]
                text-[15px] font-semibold text-white
                transition hover:bg-[#4635d8]
              "
            >
              Got it
            </button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}