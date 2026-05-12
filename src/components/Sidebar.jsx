import {
  Home,
  ListTodo,
  Users,
  CalendarDays,
  BarChart3,
  MessageSquare,
  Settings,
  Crown,
  X,
} from "lucide-react"

import { useState } from "react"
import { NavLink } from "react-router-dom"
import FeatureModal from "./FeatureModal"
import { motion } from "framer-motion"
import logo from "../assets/logo.png"

const navItems = [
  { label: "Dashboard", icon: Home, path: "/dashboard", type: "link" },
  { label: "Tasks", icon: ListTodo, path: "/tasks", type: "link" },
  { label: "Team", icon: Users, type: "modal" },
  { label: "Calendar", icon: CalendarDays, type: "modal" },
  { label: "Reports", icon: BarChart3, type: "modal" },
]

export default function Sidebar({ isMobile = false, onClose }) {
    const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false)
  return (
    <motion.aside
        initial={isMobile ? { x: -280, opacity: 0 } : false}
        animate={isMobile ? { x: 0, opacity: 1 } : false}
        exit={isMobile ? { x: -280, opacity: 0 } : false}
        transition={{ duration: 0.28, ease: "easeOut" }}
        className="
            sidebar-scroll
            fixed left-0 top-0 z-50
            flex h-screen w-[272px] flex-col
            overflow-y-auto overflow-x-hidden
            border-r border-[#E2E8F0] bg-white
            shadow-[0_4px_4px_rgba(0,0,0,0.25)]
        "
    > {isMobile && (
    <button
        onClick={onClose}
        className="
        absolute right-4 top-4
        flex h-10 w-10 items-center justify-center
        rounded-lg border border-[#CBD5E1] bg-white
        text-[#0F172A] shadow-sm
        hover:bg-[#F8FAFC]
        "
    >
        <X size={22} />
    </button>
    )}
      {/* Logo */}
      <div className="flex flex-col items-center pt-9">
        <img
          src={logo}
          alt="TaskFlow Logo"
          className="h-[97px] w-[108px] object-contain"
        />

        <div className="mt-6 h-px w-[240px] bg-[#0F172A]" />
      </div>

      {/* Main navigation */}
    <nav className="mt-[58px] flex flex-col gap-[13px] px-4">
        {navItems.map((item) => {
            const Icon = item.icon

            if (item.type === "modal") {
            return (
                <button
                key={item.label}
                onClick={() => setIsFeatureModalOpen(true)}
                className="
                    box-border flex h-10 w-full items-center gap-4 rounded-lg px-4
                    text-[22px] font-normal text-[#0F172A]
                    transition hover:bg-[#F8FAFC]
                "
                >
                <Icon size={22} strokeWidth={2.2} />
                <span>{item.label}</span>
                </button>
            )
            }

            return (
            <NavLink
                key={item.label}
                to={item.path}
                onClick={isMobile ? onClose : undefined}
                className={({ isActive }) => `
                box-border flex h-10 w-full items-center gap-4 rounded-lg px-4
                text-[22px] font-normal transition
                ${
                    isActive
                    ? "bg-[#F1ECFF] text-[#9B8CFF]"
                    : "text-[#0F172A] hover:bg-[#F8FAFC]"
                }
                `}
            >
                {({ isActive }) => (
                <>
                    <Icon
                    size={22}
                    strokeWidth={2.2}
                    className={isActive ? "text-[#9B8CFF]" : "text-[#0F172A]"}
                    fill={isActive ? "currentColor" : "none"}
                    />
                    <span>{item.label}</span>
                </>
                )}
            </NavLink>
            )
        })}
    </nav>

      {/* Bottom navigation */}
      <div className="mt-[58px] border-t border-[#0F172A] pt-[43px] mx-4">
        <nav className="flex flex-col gap-[13px]">
            <button
                onClick={() => setIsFeatureModalOpen(true)}
                className="flex h-10 items-center gap-4 rounded-lg px-4 text-[22px] hover:bg-[#F8FAFC]"
                >
                <MessageSquare size={22} strokeWidth={2.2} />
                <span>Messages</span>
                <span className="ml-1 flex h-5 min-w-5 items-center justify-center rounded bg-[#6C4CF6] px-1 text-xs font-bold text-white">
                    2
                </span>
            </button>

            <button
                onClick={() => setIsFeatureModalOpen(true)}
                className="flex h-10 items-center gap-4 rounded-lg px-4 text-[22px] hover:bg-[#F8FAFC]"
                >
                <Settings size={22} strokeWidth={2.2} />
                <span>Settings</span>
            </button>
        </nav>
      </div>

      {/* Upgrade card */}
      <div
        className="
          mx-4 mt-[88px] mb-8
          rounded-lg border border-[#BFDBFE]
          bg-[#F1F7FF] p-6
          shadow-[0_4px_8px_rgba(0,0,0,0.25)]
        "
      >
        <div className="mb-5 flex h-8 w-8 items-center justify-center rounded-lg bg-[#FFEBD2] text-[#FFC56D]">
          <Crown size={20} fill="currentColor" strokeWidth={2} />
        </div>

        <h2 className="text-[20px] font-extrabold">
          Upgrade to PRO
        </h2>

        <p className="mt-3 text-[15px] leading-[18px]">
          Get advanced features and increase your productivity.
        </p>

        <button
            onClick={() => setIsFeatureModalOpen(true)}
            className="mt-6 h-10 w-full rounded-lg bg-[#5140E8] text-[15px] font-medium text-white"
        >
          Upgrade Now
        </button>
      </div>
      <FeatureModal
        isOpen={isFeatureModalOpen}
        onClose={() => setIsFeatureModalOpen(false)}
      />
    </motion.aside>
  )
}