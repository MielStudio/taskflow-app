import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { Menu, Users, Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"
import Sidebar from "../components/Sidebar"

export default function AppLayout({ children, showCreateButton = false }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#EEF6FF]">
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <AnimatePresence>
        {isSidebarOpen && (
          <div className="fixed inset-0 z-[80] lg:hidden">
            <div
              onClick={() => setIsSidebarOpen(false)}
              className="absolute inset-0 bg-[#0F172A]/40 backdrop-blur-sm"
            />

            <div className="relative z-[90]">
              <Sidebar isMobile onClose={() => setIsSidebarOpen(false)} />
            </div>
          </div>
        )}
      </AnimatePresence>

      <main
        className="
          min-h-screen bg-[#EEF6FF]
          px-4 py-6
          sm:px-6 sm:py-8
          lg:ml-[272px] lg:px-8 lg:py-12
        "
      >
        <div className="mb-6 flex items-center justify-between lg:hidden">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="
              flex h-11 w-11 items-center justify-center
              rounded-lg border border-[#CBD5E1] bg-white
              shadow-sm
            "
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center gap-3">
            {showCreateButton && (
              <button
                onClick={() => navigate("/create-task")}
                className="
                  flex h-11 w-11 items-center justify-center
                  rounded-lg bg-[#5140E8] text-white
                  shadow-sm transition hover:bg-[#4635d8]
                "
              >
                <Plus size={24} strokeWidth={2.8} />
              </button>
            )}

            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-sm">
                <Users size={30} fill="currentColor" />
              </div>

              <span className="absolute right-0 top-[-4px] flex h-5 w-5 items-center justify-center rounded-full bg-[#9B8CFF] text-xs font-bold text-white">
                2
              </span>
            </div>
          </div>
        </div>

        {children}
      </main>
    </div>
  )
}