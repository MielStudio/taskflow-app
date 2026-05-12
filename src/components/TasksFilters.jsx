import { useState } from "react"
import { Calendar, ChevronDown, SlidersHorizontal, X } from "lucide-react"
import { AnimatePresence, motion } from "framer-motion"

function FilterDropdown({ label, value, options, onChange }) {
  const [isOpen, setIsOpen] = useState(false)

  const selectedOption = options.find((option) => option.value === value)

  return (
    <div className="relative w-full xl:w-auto">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
            group flex h-[60px] w-full items-center justify-between
            rounded-xl border border-[#CBD5E1] bg-white px-4 text-left
            shadow-sm transition
            hover:border-[#9B8CFF] hover:shadow-md
            xl:w-[180px]
        "
      >
        <span>
          <span className="block text-[13px] text-[#64748B]">
            {label}
          </span>

          <span className="block text-[14px] font-bold text-[#0F172A]">
            {selectedOption?.label}
          </span>
        </span>

        <ChevronDown
          size={20}
          className={`transition ${
            isOpen ? "rotate-180 text-[#6C4CF6]" : "text-[#0F172A]"
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.98 }}
            animate={{ opacity: 1, y: 8, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            className="
                absolute left-0 right-0 top-[62px] z-50
                overflow-hidden rounded-xl border border-[#CBD5E1]
                bg-white p-1 shadow-[0_12px_30px_rgba(15,23,42,0.16)]
                xl:right-auto xl:w-[180px]
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

export default function TasksFilters({
  statusFilter,
  priorityFilter,
  assigneeFilter,
  dueDateFilter,
  setStatusFilter,
  setPriorityFilter,
  setAssigneeFilter,
  setDueDateFilter,
  clearFilters,
  assignees = [],
}) {
  const statusOptions = [
    { label: "All Statuses", value: "all" },
    { label: "To Do", value: "todo" },
    { label: "In Progress", value: "in_progress" },
    { label: "Done", value: "done" },
  ]

  const priorityOptions = [
    { label: "All Priorities", value: "all" },
    { label: "High", value: "high" },
    { label: "Medium", value: "medium" },
    { label: "Low", value: "low" },
  ]

  const assigneeOptions = [
    { label: "All Assignees", value: "all" },
    ...assignees.map((assignee) => ({
      label: assignee,
      value: assignee,
    })),
  ]

  return (
    <motion.section
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="
        mt-8 rounded-xl border border-[#BFDBFE]
        bg-white/90 px-4 py-5
        shadow-[0_10px_30px_rgba(15,23,42,0.04)]
        sm:mt-10 sm:px-5
        lg:mt-12 lg:px-7
      "
    >
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:flex xl:flex-wrap xl:items-center xl:gap-5">
          <FilterDropdown
            label="Status"
            value={statusFilter}
            options={statusOptions}
            onChange={setStatusFilter}
          />

          <FilterDropdown
            label="Priority"
            value={priorityFilter}
            options={priorityOptions}
            onChange={setPriorityFilter}
          />

          <FilterDropdown
            label="Assignee"
            value={assigneeFilter}
            options={assigneeOptions}
            onChange={setAssigneeFilter}
          />

          <div
            className="
                group relative flex h-[60px] w-full items-center
                rounded-xl border border-[#CBD5E1] bg-white px-4
                shadow-sm transition
                hover:border-[#9B8CFF] hover:shadow-md
                xl:w-[180px]
            "
          >
            <Calendar
              size={20}
              className="mr-3 shrink-0 text-[#64748B] group-hover:text-[#6C4CF6]"
            />

            <input
              type="date"
              value={dueDateFilter}
              onChange={(e) => setDueDateFilter(e.target.value)}
              className="
                h-full w-full bg-transparent text-[14px]
                text-[#0F172A] outline-none
                placeholder:text-[#64748B]
              "
            />
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end sm:gap-5">
          <button
            onClick={clearFilters}
            className="
                flex h-10 items-center justify-center gap-2 text-[14px] font-medium
                text-[#9B8CFF] transition hover:text-[#6C4CF6]
                sm:h-auto sm:justify-start
            "
          >
            <X size={16} />
            Clear filters
          </button>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="
                flex h-[50px] w-full items-center justify-center gap-2 rounded-xl
                border border-[#0F172A] bg-white px-7
                text-[15px] font-semibold
                transition hover:bg-[#0F172A] hover:text-white
                sm:w-auto
            "
          >
            <SlidersHorizontal size={18} />
            Filters
          </motion.button>
        </div>
      </div>
    </motion.section>
  )
}