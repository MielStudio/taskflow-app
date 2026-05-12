import { motion } from "framer-motion"
import { useState } from "react"
import FeatureModal from "./FeatureModal"

const priorityColors = {
  high: "bg-[#EF4444] text-[#EF4444]",
  medium: "bg-[#FF9B2F] text-[#FF9B2F]",
  low: "bg-[#4ABE74] text-[#4ABE74]",
}

function parseTaskDueDate(dueDate) {
  return new Date(`${dueDate}, 2026`)
}

function getDateParts(dueDate) {
  const date = parseTaskDueDate(dueDate)

  const month = date.toLocaleDateString("en-US", {
    month: "short",
  }).toUpperCase()

  const day = date.toLocaleDateString("en-US", {
    day: "2-digit",
  })

  return { month, day }
}

function formatPriority(priority) {
  return priority.charAt(0).toUpperCase() + priority.slice(1)
}

export default function UpcomingDeadlines({ tasks }) {
  const upcomingTasks = [...tasks]
    .sort((a, b) => parseTaskDueDate(a.dueDate) - parseTaskDueDate(b.dueDate))
    .slice(0, 3)
  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false)

  return (
    <motion.section
      initial={{ opacity: 0, y: 22 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mt-6 rounded-md border border-[#BFDBFE] bg-white p-5 sm:p-6"
    >
      <div className="mb-6 flex items-center justify-between gap-4 sm:mb-8">
        <h2 className="text-[20px] font-extrabold sm:text-[22px]">
          Upcoming Deadlines
        </h2>

        <button
            onClick={() => setIsFeatureModalOpen(true)}
            className="shrink-0 text-[14px] font-medium text-[#5140E8]"
        >
          View calendar
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 xl:gap-10">
        {upcomingTasks.map((task, index) => {
          const { month, day } = getDateParts(task.dueDate)
          const [dotColor, textColor] = priorityColors[task.priority].split(" ")

          return (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ y: -3 }}
              transition={{
                duration: 0.3,
                delay: index * 0.08,
              }}
              className="flex min-w-0 items-center gap-3 rounded-lg p-2 sm:p-0"
            >
              <div className="flex h-[82px] w-[82px] shrink-0 flex-col items-center justify-center rounded-md bg-[#F1ECFF] sm:h-[100px] sm:w-[100px]">
                <span className="text-[17px] font-extrabold leading-none sm:text-[20px]">
                  {month}
                </span>

                <span className="mt-1 text-[40px] font-extrabold leading-none sm:text-[50px]">
                  {day}
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <h3 className="truncate text-[18px] font-extrabold sm:text-[20px]">
                  {task.title}
                </h3>

                <div className="mt-3 flex flex-col gap-2 text-[13px] sm:mt-4 sm:flex-row sm:items-center sm:gap-6 sm:text-[14px]">
                  <span className="text-[#64748B]">
                    {task.category}
                  </span>

                  <span className="flex items-center gap-2">
                    <span className={`h-2.5 w-2.5 rounded-full ${dotColor}`} />
                    <span className={textColor}>
                      {formatPriority(task.priority)}
                    </span>
                  </span>
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
      <FeatureModal
        isOpen={isFeatureModalOpen}
        onClose={() => setIsFeatureModalOpen(false)}
      />
    </motion.section>
  )
}