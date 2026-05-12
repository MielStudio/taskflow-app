import { useMemo, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  ListTodo,
  CheckCircle2,
  Clock3,
} from "lucide-react"

const formatDate = (date) => {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  })
}

export default function DashboardStats({ tasks, currentDate, setCurrentDate, start, end }) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  const parseTaskDueDate = (dueDate) => {
    return new Date(`${dueDate}, 2026`)
  }

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
        const taskDate = parseTaskDueDate(task.dueDate)

        return taskDate >= start && taskDate <= end
    })
  }, [tasks, start, end])

  const totalTasks = filteredTasks.length

  const completedTasks = filteredTasks.filter(
    (task) => task.status === "done"
  ).length

  const inProgressTasks = filteredTasks.filter(
    (task) => task.status === "in_progress"
  ).length

  const myTasks = filteredTasks.filter(
    (task) => task.assignee === "Stanley Paige"
  ).length

  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() - 7)
    setCurrentDate(newDate)
  }

  const goToNextWeek = () => {
    const newDate = new Date(currentDate)
    newDate.setDate(currentDate.getDate() + 7)
    setCurrentDate(newDate)
  }

  const goToCurrentWeek = () => {
    setCurrentDate(new Date())
  }

  const cards = [
    {
      title: "Total Tasks",
      value: totalTasks,
      icon: ClipboardCheck,
      bg: "bg-[#F1ECFF]",
      color: "text-[#6C4CF6]",
    },
    {
      title: "My Tasks",
      value: myTasks,
      icon: ListTodo,
      bg: "bg-[#EAF1FF]",
      color: "text-[#3772F0]",
    },
    {
      title: "Completed",
      value: completedTasks,
      icon: CheckCircle2,
      bg: "bg-[#EAF8EF]",
      color: "text-[#3DBE6E]",
    },
    {
      title: "In Progress",
      value: inProgressTasks,
      icon: Clock3,
      bg: "bg-[#FFF0DD]",
      color: "text-[#FF9B2F]",
    },
  ]

  return (
    <>
      <div className="relative mt-8 inline-block w-full sm:mt-10 sm:w-auto lg:mt-12">
        <button
          onClick={() => setIsCalendarOpen(!isCalendarOpen)}
          className="inline-flex h-10 w-full items-center justify-between gap-2 rounded-lg border border-[#CBD5E1] bg-white px-3 text-[14px] sm:w-auto"
        >
          <Calendar size={20} />
          <span>
            {formatDate(start)} - {formatDate(end)}
          </span>
          <ChevronDown size={18} strokeWidth={2.2} />
        </button>

        {isCalendarOpen && (
          <div className="absolute left-0 right-0 top-12 z-50 rounded-xl border border-[#CBD5E1] bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.12)] sm:right-auto sm:w-[260px]">
            <p className="text-sm font-bold">
              Select week
            </p>

            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={goToPreviousWeek}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#CBD5E1] hover:bg-[#F8FAFC]"
              >
                <ChevronLeft size={18} />
              </button>

              <div className="text-center">
                <p className="text-sm font-semibold">
                  {formatDate(start)} - {formatDate(end)}
                </p>
                <p className="mt-1 text-xs text-[#64748B]">
                  Weekly range
                </p>
              </div>

              <button
                onClick={goToNextWeek}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#CBD5E1] hover:bg-[#F8FAFC]"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <button
              onClick={goToCurrentWeek}
              className="mt-4 h-9 w-full rounded-lg bg-[#F1ECFF] text-sm font-semibold text-[#6C4CF6] hover:bg-[#E8E0FF]"
            >
              Current week
            </button>
          </div>
        )}
      </div>

      <section className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 xl:gap-5">
        <AnimatePresence mode="wait">
            {cards.map((card, index) => {
            const Icon = card.icon

            return (
                <motion.div
                key={`${card.title}-${start.toISOString()}`}
                initial={{ opacity: 0, y: 18, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -12, scale: 0.97 }}
                transition={{
                    duration: 0.35,
                    delay: index * 0.06,
                    ease: "easeOut",
                }}
                className="flex min-h-[120px] items-center gap-4 rounded-md border border-[#BFDBFE] bg-white p-5 sm:h-[136px] sm:p-7"
                >
                <motion.div
                    initial={{ rotate: -8, scale: 0.9 }}
                    animate={{ rotate: 0, scale: 1 }}
                    transition={{
                    duration: 0.35,
                    delay: index * 0.06 + 0.1,
                    ease: "easeOut",
                    }}
                    className={`flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-md sm:h-[76px] sm:w-[76px] ${card.bg} ${card.color}`}
                >
                    <Icon size={38} strokeWidth={2.5} className="sm:h-11 sm:w-11" />
                </motion.div>

                <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-semibold">
                    {card.title}
                    </p>

                    <motion.div
                    key={`${card.value}-${start.toISOString()}`}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.3,
                        delay: index * 0.06 + 0.15,
                    }}
                    className="mt-2 flex items-end gap-2"
                    >
                    <span className="text-[30px] font-extrabold leading-none sm:text-[34px]">
                        {card.value}
                    </span>
                    </motion.div>

                    <div className="mt-2 h-px w-full bg-[#64748B]" />
                </div>
                </motion.div>
            )
            })}
        </AnimatePresence>
        </section>
    </>
  )
}