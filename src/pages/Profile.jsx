import { useState } from "react"
import { User, Mail, Shield, Briefcase, LogOut } from "lucide-react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

import AppLayout from "../layouts/AppLayout"
import FeatureModal from "../components/FeatureModal"
import { useAuth } from "../context/AuthContext"

export default function Profile() {
  const navigate = useNavigate()
  const { currentUser, logout } = useAuth()

  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <AppLayout>
      <motion.section
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35 }}
        className="rounded-2xl border border-[#BFDBFE] bg-white p-6 shadow-sm sm:p-8"
      >
        <div className="flex flex-col gap-6 xl:flex-row xl:items-center xl:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[#F1ECFF] text-[#5140E8]">
              <User size={48} />
            </div>

            <div>
              <h1 className="text-[34px] font-extrabold leading-tight">
                {currentUser?.name || "User"}
              </h1>

              <p className="mt-2 text-[15px] text-[#64748B]">
                Manage your personal TaskFlow account.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              onClick={() => setIsFeatureModalOpen(true)}
              className="h-10 rounded-lg border border-[#CBD5E1] bg-white px-5 font-semibold hover:bg-[#F8FAFC]"
            >
              Edit profile
            </button>

            <button
              onClick={handleLogout}
              className="flex h-10 items-center justify-center gap-2 rounded-lg bg-[#5140E8] px-5 font-semibold text-white hover:bg-[#4635d8]"
            >
              <LogOut size={18} />
              Log out
            </button>
          </div>
        </div>
      </motion.section>

      <section className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-[1.4fr_0.8fr]">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.08 }}
          className="rounded-2xl border border-[#BFDBFE] bg-white p-6 sm:p-8"
        >
          <h2 className="text-[24px] font-extrabold">
            Account information
          </h2>

          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2">
            <ProfileInfo icon={User} label="Name" value={currentUser?.name} />
            <ProfileInfo icon={Mail} label="Email" value={currentUser?.email} />
            <ProfileInfo icon={Shield} label="Role" value={currentUser?.role} />
            <ProfileInfo
              icon={Briefcase}
              label="Team"
              value={currentUser?.team}
            />
          </div>
        </motion.div>

        <motion.aside
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.14 }}
          className="rounded-2xl border border-[#BFDBFE] bg-white p-6 sm:p-8"
        >
          <h2 className="text-[24px] font-extrabold">Security</h2>

          <p className="mt-3 text-[15px] leading-6 text-[#334155]">
            Password and security settings are limited in this portfolio demo.
          </p>

          <button
            onClick={() => setIsFeatureModalOpen(true)}
            className="mt-6 h-10 w-full rounded-lg border border-[#CBD5E1] font-semibold hover:bg-[#F8FAFC]"
          >
            Change password
          </button>
        </motion.aside>
      </section>

      <FeatureModal
        isOpen={isFeatureModalOpen}
        onClose={() => setIsFeatureModalOpen(false)}
      />
    </AppLayout>
  )
}

function ProfileInfo({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-5">
      <div className="flex items-center gap-3 text-[#64748B]">
        <Icon size={20} />
        <span className="text-[14px] font-semibold">{label}</span>
      </div>

      <p className="mt-3 break-words text-[18px] font-extrabold text-[#0F172A]">
        {value || "Not specified"}
      </p>
    </div>
  )
}