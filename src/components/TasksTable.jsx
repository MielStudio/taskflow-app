import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import {
  MoreHorizontal,
  User,
  Check,
  Grid2X2,
  List,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

const statusStyles = {
  todo: {
    label: "To Do",
    className: "bg-[#F1F3F5] text-[#737373]",
  },
  in_progress: {
    label: "In Progress",
    className: "bg-[#EAF1FF] text-[#3772F0]",
  },
  done: {
    label: "Done",
    className: "bg-[#EAF8EF] text-[#3DBE6E]",
  },
}

const priorityStyles = {
  high: {
    label: "High",
    dot: "bg-[#EF4444]",
    value: 3,
  },
  medium: {
    label: "Medium",
    dot: "bg-[#FF9B2F]",
    value: 2,
  },
  low: {
    label: "Low",
    dot: "bg-[#4ABE74]",
    value: 1,
  },
}

function parseDate(dueDate) {
  return new Date(`${dueDate}, 2026`)
}

function formatDate(dueDate) {
  return `${dueDate}, 2026`
}

function SortDropdown({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false)

  const options = [
    { label: "Sort by: Due date", value: "dueDate" },
    { label: "Sort by: Priority", value: "priority" },
    { label: "Sort by: Title", value: "title" },
  ]

  const selectedOption = options.find((option) => option.value === value)

  return (
    <div className="relative flex-1 sm:flex-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
            flex h-9 w-full min-w-[190px] items-center justify-between
            rounded-lg border border-[#CBD5E1] bg-white px-4
            text-[14px] whitespace-nowrap transition
            hover:border-[#9B8CFF] hover:shadow-sm
        "
      >
        {selectedOption.label}
        <ChevronDown
          size={16}
          className={`transition ${isOpen ? "rotate-180 text-[#6C4CF6]" : ""}`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 8, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="
                absolute left-0 right-0 top-9 z-50
                overflow-hidden rounded-xl border border-[#CBD5E1]
                bg-white p-1 shadow-[0_12px_30px_rgba(15,23,42,0.16)]
                sm:left-auto sm:w-[180px]
            "
          >
            {options.map((option) => {
              const isActive = option.value === value

              return (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value)
                    setIsOpen(false)
                  }}
                  className={`
                    flex h-10 w-full items-center rounded-lg px-3
                    text-left text-[14px] transition
                    ${
                      isActive
                        ? "bg-[#F1ECFF] font-bold text-[#6C4CF6]"
                        : "text-[#0F172A] hover:bg-[#F8FAFC]"
                    }
                  `}
                >
                  {option.label}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default function TasksTable({ tasks = [] }) {
  const [activeTab, setActiveTab] = useState("all")
  const [sortBy, setSortBy] = useState("dueDate")
  const [viewMode, setViewMode] = useState("list")
  const [selectedTasks, setSelectedTasks] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  const tasksPerPage = 5

  const tabs = [
    { label: "All Tasks", value: "all" },
    { label: "To do", value: "todo" },
    { label: "In Progress", value: "in_progress" },
    { label: "Done", value: "done" },
  ]

  const visibleTasks = useMemo(() => {
    let result = [...tasks]

    if (activeTab !== "all") {
      result = result.filter((task) => task.status === activeTab)
    }

    result.sort((a, b) => {
      if (sortBy === "dueDate") {
        return parseDate(a.dueDate) - parseDate(b.dueDate)
      }

      if (sortBy === "priority") {
        return (
          priorityStyles[b.priority].value -
          priorityStyles[a.priority].value
        )
      }

      if (sortBy === "title") {
        return a.title.localeCompare(b.title)
      }

      return 0
    })

    return result
  }, [tasks, activeTab, sortBy])

  const totalPages = Math.max(1, Math.ceil(visibleTasks.length / tasksPerPage))

  const paginatedTasks = visibleTasks.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  )

  const toggleTask = (taskId) => {
    setSelectedTasks((prev) =>
      prev.includes(taskId)
        ? prev.filter((id) => id !== taskId)
        : [...prev, taskId]
    )
  }

  const toggleAllTasks = () => {
    const pageIds = paginatedTasks.map((task) => task.id)

    const isAllSelected = pageIds.every((id) => selectedTasks.includes(id))

    if (isAllSelected) {
      setSelectedTasks((prev) => prev.filter((id) => !pageIds.includes(id)))
    } else {
      setSelectedTasks((prev) => [...new Set([...prev, ...pageIds])])
    }
  }

  const changeTab = (tab) => {
    setActiveTab(tab)
    setCurrentPage(1)
    setSelectedTasks([])
  }

  const isAllPageSelected =
    paginatedTasks.length > 0 &&
    paginatedTasks.every((task) => selectedTasks.includes(task.id))

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="mt-5 overflow-hidden rounded-xl border border-[#BFDBFE] bg-white"
    >
      <div className="flex flex-col gap-4 border-b border-[#CBD5E1] px-4 py-4 sm:px-6 lg:px-8 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex gap-5 overflow-x-auto pb-1 sm:flex-wrap sm:gap-7 sm:overflow-visible">
          {tabs.map((tab) => {
            const count =
              tab.value === "all"
                ? tasks.length
                : tasks.filter((task) => task.status === tab.value).length

            const isActive = activeTab === tab.value

            return (
              <button
                key={tab.value}
                onClick={() => changeTab(tab.value)}
                className={`shrink-0 pb-2 text-[14px] font-bold transition ${
                  isActive
                    ? "border-b-2 border-[#6C4CF6] text-[#5140E8]"
                    : "text-[#0F172A] hover:text-[#5140E8]"
                }`}
              >
                {tab.label}

                <span
                  className={`ml-2 rounded-md px-2 py-1 text-xs ${
                    isActive
                      ? "bg-[#E8E0FF] text-[#6C4CF6]"
                      : "bg-[#E2E8F0] text-[#64748B]"
                  }`}
                >
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap">
          <SortDropdown
            value={sortBy}
            onChange={(value) => {
                setSortBy(value)
                setCurrentPage(1)
            }}
          />

          <button
            onClick={() => setViewMode("list")}
            className={`flex h-9 w-9 items-center justify-center rounded-lg border transition ${
              viewMode === "list"
                ? "border-[#9B8CFF] bg-[#F1ECFF] text-[#6C4CF6]"
                : "border-[#CBD5E1] text-[#94A3B8]"
            }`}
          >
            <List size={20} />
          </button>

          <button
            onClick={() => setViewMode("grid")}
            className={`flex h-9 w-9 items-center justify-center rounded-lg border transition ${
              viewMode === "grid"
                ? "border-[#9B8CFF] bg-[#F1ECFF] text-[#6C4CF6]"
                : "border-[#CBD5E1] text-[#94A3B8]"
            }`}
          >
            <Grid2X2 size={18} />
          </button>
        </div>
      </div>

      {viewMode === "list" ? (
        <>
          <div className="hidden grid-cols-[36px_1.7fr_150px_150px_200px_150px_40px] items-center bg-[#F8FAFC] px-8 py-4 text-[14px] font-medium lg:grid">
            <button
              onClick={toggleAllTasks}
              className="flex h-5 w-5 items-center justify-center rounded-md border border-[#CBD5E1] bg-white"
            >
              {isAllPageSelected && <Check size={14} />}
            </button>

            <span>Task</span>
            <span>Status</span>
            <span>Priority</span>
            <span>Assignee</span>
            <span>Due date</span>
            <span />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={`${activeTab}-${sortBy}-${currentPage}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {paginatedTasks.map((task, index) => {
                const status = statusStyles[task.status]
                const priority = priorityStyles[task.priority]
                const isSelected = selectedTasks.includes(task.id)

                return (
                  <>
                  <motion.div
                    key={task.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: index * 0.04 }}
                    className={`
                        hidden grid-cols-[36px_1.7fr_150px_150px_200px_150px_40px]
                        items-center border-t border-[#CBD5E1] px-8 py-3
                        text-[14px] transition lg:grid
                        ${isSelected ? "bg-[#F1ECFF]" : "hover:bg-[#F8FAFC]"}
                    `}
                  >
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`
                        flex h-5 w-5 items-center justify-center rounded-md border
                        ${
                          isSelected
                            ? "border-[#5140E8] bg-[#5140E8] text-white"
                            : "border-[#CBD5E1] bg-white"
                        }
                      `}
                    >
                      {isSelected && <Check size={14} />}
                    </button>

                    <div>
                        <Link
                            to={`/tasks/${task.id}`}
                            className="
                            font-extrabold transition
                            hover:text-[#5140E8]
                            "
                        >
                            {task.title}
                        </Link>

                       <div
                          className="
                            text-[#334155]
                            line-clamp-2
                            [&_ul]:ml-4 [&_ul]:list-disc
                            [&_ol]:ml-4 [&_ol]:list-decimal
                            [&_code]:rounded
                            [&_code]:bg-[#F1F5F9]
                            [&_code]:px-1.5
                            [&_code]:py-0.5
                            [&_code]:font-mono
                            [&_a]:text-[#5140E8]
                            [&_a]:underline
                          "
                          dangerouslySetInnerHTML={{ __html: task.description }}
                        />
                    </div>

                    <span
                      className={`w-fit rounded-full px-3 py-1 text-[14px] ${status.className}`}
                    >
                      {status.label}
                    </span>

                    <span className="flex w-[86px] items-center gap-2 rounded-full border border-[#E2E8F0] px-3 py-1">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${priority.dot}`}
                      />
                      {priority.label}
                    </span>

                    <span className="flex items-center gap-3">
                      <User size={34} fill="currentColor" />
                      {task.assignee}
                    </span>

                    <span>{formatDate(task.dueDate)}</span>

                    <button className="rounded-lg p-2 hover:bg-[#EEF6FF]">
                      <MoreHorizontal size={22} />
                    </button>
                  </motion.div>
                  <motion.div
                    key={`mobile-${task.id}`}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25, delay: index * 0.04 }}
                    className={`
                        border-t border-[#CBD5E1] p-4 text-[14px] transition lg:hidden
                        ${isSelected ? "bg-[#F1ECFF]" : "bg-white"}
                    `}
                    >
                    <div className="flex items-start justify-between gap-3">
                        <div className="flex min-w-0 items-start gap-3">
                        <button
                            onClick={() => toggleTask(task.id)}
                            className={`
                            mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border
                            ${
                                isSelected
                                ? "border-[#5140E8] bg-[#5140E8] text-white"
                                : "border-[#CBD5E1] bg-white"
                            }
                            `}
                        >
                            {isSelected && <Check size={14} />}
                        </button>

                        <div className="min-w-0">
                            <Link
                                to={`/tasks/${task.id}`}
                                className="
                                    truncate font-extrabold transition
                                    hover:text-[#5140E8]
                                "
                                >
                                {task.title}
                            </Link>

                            <div
                              className="
                                mt-1 line-clamp-2 text-[#334155]
                                [&_ul]:ml-4 [&_ul]:list-disc
                                [&_ol]:ml-4 [&_ol]:list-decimal
                                [&_code]:rounded
                                [&_code]:bg-[#F1F5F9]
                                [&_code]:px-1.5
                                [&_code]:py-0.5
                                [&_code]:font-mono
                                [&_a]:text-[#5140E8]
                                [&_a]:underline
                              "
                              dangerouslySetInnerHTML={{ __html: task.description }}
                            />
                        </div>
                        </div>

                        <button className="shrink-0 rounded-lg p-2 hover:bg-[#EEF6FF]">
                        <MoreHorizontal size={22} />
                        </button>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                        <span
                        className={`w-fit rounded-full px-3 py-1 text-[13px] ${status.className}`}
                        >
                        {status.label}
                        </span>

                        <span className="flex w-fit items-center gap-2 rounded-full border border-[#E2E8F0] px-3 py-1 text-[13px]">
                        <span className={`h-2.5 w-2.5 rounded-full ${priority.dot}`} />
                        {priority.label}
                        </span>
                    </div>

                    <div className="mt-4 flex flex-col gap-2 text-[13px] text-[#64748B] sm:flex-row sm:items-center sm:justify-between">
                        <span className="flex items-center gap-2">
                        <User size={24} fill="currentColor" />
                        {task.assignee}
                        </span>

                        <span>
                        {formatDate(task.dueDate)}
                        </span>
                    </div>
                    </motion.div>
                    </>
                )
              })}
            </motion.div>
          </AnimatePresence>
        </>
      ) : (
        <div className="grid grid-cols-1 gap-4 p-4 sm:p-6 md:grid-cols-2 xl:grid-cols-3">
          {paginatedTasks.map((task, index) => {
            const status = statusStyles[task.status]
            const priority = priorityStyles[task.priority]

            return (
              <motion.div
                key={task.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: index * 0.04 }}
                className="rounded-xl border border-[#E2E8F0] bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="truncate font-extrabold">{task.title}</h3>
                    <div
                      className="
                        text-[#334155]
                        mt-1 text-[14px]
                        line-clamp-2
                        [&_ul]:ml-4 [&_ul]:list-disc
                        [&_ol]:ml-4 [&_ol]:list-decimal
                        [&_code]:rounded
                        [&_code]:bg-[#F1F5F9]
                        [&_code]:px-1.5
                        [&_code]:py-0.5
                        [&_code]:font-mono
                        [&_a]:text-[#5140E8]
                        [&_a]:underline
                      "
                      dangerouslySetInnerHTML={{ __html: task.description }}
                    />
                  </div>

                  <button>
                    <MoreHorizontal size={22} />
                  </button>
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <span
                    className={`rounded-full px-3 py-1 text-[14px] ${status.className}`}
                  >
                    {status.label}
                  </span>

                  <span className="flex items-center gap-2 rounded-full border border-[#E2E8F0] px-3 py-1 text-[14px]">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${priority.dot}`}
                    />
                    {priority.label}
                  </span>
                </div>

                <div className="mt-5 flex flex-col gap-2 text-[14px] sm:flex-row sm:items-center sm:justify-between">
                  <span className="flex items-center gap-2">
                    <User size={28} fill="currentColor" />
                    {task.assignee}
                  </span>

                  <span>{formatDate(task.dueDate)}</span>
                </div>
              </motion.div>
            )
          })}
        </div>
      )}

      {visibleTasks.length === 0 && (
        <div className="px-4 py-12 text-center sm:px-8 sm:py-16">
          <h3 className="text-[20px] font-extrabold">No tasks found</h3>
          <p className="mt-2 text-[#64748B]">
            Try changing filters or clearing selected options.
          </p>
        </div>
      )}

      <div className="flex flex-col gap-4 border-t border-[#CBD5E1] px-4 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
        <p className="text-center text-[14px] lg:text-left">
          Showing{" "}
          {visibleTasks.length === 0 ? 0 : (currentPage - 1) * tasksPerPage + 1}{" "}
          to {Math.min(currentPage * tasksPerPage, visibleTasks.length)} of{" "}
          {visibleTasks.length} tasks
        </p>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((page) => page - 1)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E2E8F0] disabled:text-[#CBD5E1]"
          >
            <ChevronLeft size={18} />
          </button>

          {Array.from({ length: totalPages }).map((_, index) => {
            const page = index + 1

            return (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`h-10 rounded-lg border px-4 ${
                  currentPage === page
                    ? "border-[#6C4CF6] text-[#5140E8]"
                    : "border-[#E2E8F0]"
                }`}
              >
                {page}
              </button>
            )
          })}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((page) => page + 1)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#E2E8F0] disabled:text-[#CBD5E1]"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </motion.section>
  )
}