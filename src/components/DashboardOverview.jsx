import { Check, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react"
import { useMemo, useState } from "react"
import { motion } from "framer-motion"
import { Link } from "react-router-dom"

const statusColors = {
  todo: "bg-[#CBD5E1]",
  in_progress: "bg-[#FF9B2F]",
  done: "bg-[#4ABE74]",
}

const priorityColors = {
  high: "bg-[#EF4444] text-[#EF4444]",
  medium: "bg-[#FF9B2F] text-[#FF9B2F]",
  low: "bg-[#4ABE74] text-[#4ABE74]",
}

function formatPriority(priority) {
  return priority.charAt(0).toUpperCase() + priority.slice(1)
}

function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  })
}

function isSameWeek(start, end) {
  const today = new Date()
  const todayTime = today.getTime()

  return todayTime >= start.getTime() && todayTime <= end.getTime()
}

export default function DashboardOverview({
  tasks,
  currentDate,
  setCurrentDate,
  start,
  end,
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const parseTaskDueDate = (dueDate) => new Date(`${dueDate}, 2026`)

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const taskDate = parseTaskDueDate(task.dueDate)
      return taskDate >= start && taskDate <= end
    })
  }, [tasks, start, end])

  const total = filteredTasks.length

  const todoCount = filteredTasks.filter((task) => task.status === "todo").length
  const inProgressCount = filteredTasks.filter(
    (task) => task.status === "in_progress"
  ).length
  const doneCount = filteredTasks.filter((task) => task.status === "done").length

  const statusData = [
    { label: "To Do", status: "todo", count: todoCount },
    { label: "In Progress", status: "in_progress", count: inProgressCount },
    { label: "Done", status: "done", count: doneCount },
  ]

  const myTasks = filteredTasks.slice(0, 5)

  const donePercent = total ? (doneCount / total) * 100 : 0
  const progressPercent = total ? (inProgressCount / total) * 100 : 0

  const donutStyle = {
    background: `conic-gradient(
      #4ABE74 0deg ${donePercent * 3.6}deg,
      #FF9B2F ${donePercent * 3.6}deg ${(donePercent + progressPercent) * 3.6}deg,
      #CBD5E1 ${(donePercent + progressPercent) * 3.6}deg 360deg
    )`,
  }

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

  const periodLabel = isSameWeek(start, end)
    ? "This week"
    : `${formatDate(start)} - ${formatDate(end)}`

  return (
    <motion.section
        key={start.toISOString()}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-[1.7fr_1fr]"
    >
      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className="rounded-md border border-[#BFDBFE] bg-white p-5 sm:p-6"
      >
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between lg:mb-10">
          <h2 className="text-[20px] font-extrabold sm:text-[22px]">
            Tasks by Status
          </h2>

          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="inline-flex h-10 w-full items-center justify-between gap-2 rounded-lg border border-[#CBD5E1] px-3 text-[14px] sm:w-auto"
            >
              <span>{periodLabel}</span>
              <ChevronDown size={16} />
            </button>

            {isDropdownOpen && (
              <div className="absolute left-0 right-0 top-12 z-50 rounded-xl border border-[#CBD5E1] bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.12)] sm:left-auto sm:w-[250px]">
                <p className="text-sm font-bold">Select week</p>

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
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center gap-8 lg:flex-row lg:items-center lg:gap-20">
          <motion.div
            style={donutStyle}
            initial={{ scale: 0.9, rotate: -10, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative h-[180px] w-[180px] rounded-full sm:h-[210px] sm:w-[210px]"
          >
            <div className="absolute inset-[20px] flex flex-col items-center justify-center rounded-full bg-white sm:inset-[24px]">
              <span className="text-[42px] font-extrabold leading-none sm:text-[50px]">
                {total}
              </span>
              <span className="text-[17px] leading-none sm:text-[20px]">
                Total
              </span>
            </div>
          </motion.div>

          <div className="flex w-full flex-col gap-5 text-[14px] sm:min-w-[290px] sm:gap-8 lg:w-auto">
            {statusData.map((item, index) => {
              const percent = total
                ? ((item.count / total) * 100).toFixed(1)
                : 0

              return (
                <motion.div
                    key={item.status}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.08 }}
                    className="grid grid-cols-[14px_1fr_auto_auto] items-center gap-3 sm:grid-cols-[14px_100px_80px_1fr]"
                >
                  <span
                    className={`h-3 w-3 rounded-full ${statusColors[item.status]}`}
                  />
                  <span>{item.label}</span>
                  <span>{item.count} Tasks</span>
                  <span>{percent}%</span>
                </motion.div>
              )
            })}
          </div>
        </div>
      </motion.div>

      <motion.div
        whileHover={{ y: -2 }}
        transition={{ duration: 0.2 }}
        className="rounded-md border border-[#BFDBFE] bg-white p-5 sm:p-6"
      >
        <div className="mb-6 flex items-center justify-between gap-4 sm:mb-7">
          <h2 className="text-[20px] font-extrabold sm:text-[24px]">
            My Tasks
          </h2>

          <Link
          to="/tasks"
          className="text-[14px] font-medium text-[#5140E8] hover:underline"
          >
            View all
          </Link>
        </div>

        <div className="flex flex-col gap-4">
          {myTasks.map((task, index) => {
            const isDone = task.status === "done"

            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, x: 18 }}
                animate={{ opacity: 1, x: 0 }}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.25, delay: index * 0.05 }}
                className="grid grid-cols-[24px_1fr] gap-3 rounded-lg p-2 sm:grid-cols-[24px_1fr_86px_58px] sm:items-center sm:p-0"
              >
                <div
                  className={`
                    flex h-6 w-6 items-center justify-center rounded-lg border
                    ${
                      isDone
                        ? "border-[#5140E8] bg-[#5140E8] text-white"
                        : "border-[#CBD5E1] bg-white"
                    }
                  `}
                >
                  {isDone && <Check size={16} strokeWidth={3} />}
                </div>

                <div className="min-w-0">
                  <p
                    className={`truncate text-[14px] font-medium ${
                      isDone ? "line-through" : ""
                    }`}
                  >
                    {task.title}
                  </p>
                  <p className="truncate text-[13px] text-[#64748B] sm:text-[14px]">
                    {task.category}
                  </p>
                </div>

                <div className="col-start-2 flex items-center gap-2 text-[13px] sm:col-start-auto sm:text-[14px]">
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      priorityColors[task.priority].split(" ")[0]
                    }`}
                  />
                  <span className={priorityColors[task.priority].split(" ")[1]}>
                    {formatPriority(task.priority)}
                  </span>
                </div>

                <span className="col-start-2 text-[13px] text-[#64748B] sm:col-start-auto sm:text-[14px]">
                  {task.dueDate}
                </span>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </motion.section>
  )
}