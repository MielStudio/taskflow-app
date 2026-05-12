import { useState } from "react"
import { useParams, Link } from "react-router-dom"
import AppLayout from "../layouts/AppLayout"
import FeatureModal from "../components/FeatureModal"
import { getStoredTasks } from "../utils/tasksStorage"

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
  },
  medium: {
    label: "Medium",
    dot: "bg-[#FF9B2F]",
  },
  low: {
    label: "Low",
    dot: "bg-[#4ABE74]",
  },
}

export default function TaskDetails() {
  const { id } = useParams()
  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false)

  const tasks = getStoredTasks()
  const task = tasks.find((task) => task.id === Number(id))

  const openFeatureModal = () => {
    setIsFeatureModalOpen(true)
  }

  if (!task) {
    return (
      <AppLayout>
        <div className="rounded-xl border border-[#BFDBFE] bg-white p-8">
          <h1 className="text-[28px] font-extrabold">Task not found</h1>

          <Link
            to="/tasks"
            className="mt-6 inline-flex h-10 items-center rounded-lg bg-[#5140E8] px-4 text-white"
          >
            Back to Tasks
          </Link>
        </div>
      </AppLayout>
    )
  }

  const status = statusStyles[task.status]
  const priority = priorityStyles[task.priority]

  const checklistItems = task.checklist || []
  const hasChecklist = checklistItems.length > 0
  const completedChecklist = checklistItems.filter((item) => item.done).length

  return (
    <AppLayout>
      <div className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2 text-[14px] text-[#0F172A] sm:text-[15px]">
            <Link to="/tasks" className="hover:text-[#5140E8]">
              Tasks
            </Link>

            <span>›</span>
            <span>{task.category}</span>
            <span>›</span>
            <span>Task Details</span>
          </div>

          <Link
            to="/tasks"
            className="
              mt-6 inline-flex h-10 items-center gap-2 rounded-lg
              bg-white px-4 text-[15px] font-medium
              shadow-sm hover:bg-[#F8FAFC]
            "
          >
            ← Back to Tasks
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:flex">
          <button
            onClick={openFeatureModal}
            className="h-10 rounded-lg bg-white px-4 shadow-sm"
          >
            ✎ Edit Task
          </button>

          <button
            onClick={openFeatureModal}
            className="h-10 rounded-lg bg-[#5140E8] px-4 text-white shadow-sm"
          >
            ✓ Mark as Done
          </button>
        </div>
      </div>

      <div className="mt-9 grid grid-cols-1 gap-5 xl:grid-cols-[1.7fr_0.9fr]">
        <div className="flex flex-col gap-5">
          <section className="rounded-xl border border-[#BFDBFE] bg-white p-5 sm:p-6">
            <span
              className="
                inline-flex rounded-full bg-[#F1ECFF]
                px-3 py-1 text-[13px] font-medium text-[#6C4CF6]
              "
            >
              TASK-{task.id}
            </span>

            <h1 className="mt-4 text-[28px] font-extrabold leading-tight sm:text-[36px] xl:text-[40px]">
              {task.title}
            </h1>

            <div
              className="
                mt-4 text-[#334155]
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

            <div className="mt-7 flex flex-col gap-5 border-b border-[#CBD5E1] pb-7 sm:flex-row sm:gap-12">
              <div>
                <p className="text-[13px] text-[#334155]">Project</p>
                <p className="mt-1 text-[14px] font-bold">
                  {task.category}
                </p>
              </div>

              <div>
                <p className="text-[13px] text-[#334155]">Due date</p>
                <p className="mt-1 text-[14px] font-bold text-[#EF4444]">
                  {task.dueDate}, 2026
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-[#BFDBFE] bg-white p-5 sm:p-6">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <h2 className="text-[18px] font-extrabold">Checklist</h2>

              {hasChecklist && (
                <p className="text-[14px] text-[#0F172A]">
                  {completedChecklist} / {checklistItems.length} completed
                </p>
              )}
            </div>

            {hasChecklist ? (
              <div className="mt-5 flex flex-col gap-4">
                {checklistItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div
                      className={`
                        flex h-6 w-6 items-center justify-center rounded-md border
                        ${
                          item.done
                            ? "border-[#5140E8] bg-[#5140E8] text-white"
                            : "border-[#CBD5E1] bg-white"
                        }
                      `}
                    >
                      {item.done && "✓"}
                    </div>

                    <span
                      className={`
                        text-[14px]
                        ${
                          item.done
                            ? "text-[#64748B] line-through"
                            : "text-[#0F172A]"
                        }
                      `}
                    >
                      {item.title}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-5 rounded-xl border border-dashed border-[#CBD5E1] bg-[#F8FAFC] p-6 text-center">
                <p className="text-[15px] font-bold text-[#0F172A]">
                  No checklist added
                </p>

                <p className="mt-2 text-[14px] text-[#64748B]">
                  This task does not have any checklist items yet.
                </p>
              </div>
            )}
          </section>

          <section className="rounded-xl border border-[#BFDBFE] bg-white p-6">
            <h2 className="text-[18px] font-extrabold">Comments</h2>

            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <div className="h-10 w-10 rounded-full bg-[#0F172A]" />

              <input
                placeholder="Write a comment..."
                className="
                  h-10 w-full flex-1 rounded-lg border border-[#CBD5E1]
                  px-4 text-[14px] outline-none
                  focus:border-[#9B8CFF]
                "
              />

              <button
                onClick={openFeatureModal}
                className="h-10 rounded-lg bg-[#5140E8] px-5 text-white sm:w-auto"
              >
                Post
              </button>
            </div>

            <div className="mt-6 border-t border-[#CBD5E1] pt-5">
              <p className="flex flex-col gap-1 text-[14px] sm:block">
                <strong>Olivia Rhye</strong>
                <span className="text-[#64748B] sm:ml-4">
                  Apr 20, 2026 at 10:30 AM
                </span>
              </p>

              <p className="mt-2 text-[14px] text-[#334155]">
                Great progress! Let’s make sure the charts are interactive.
              </p>
            </div>
          </section>
        </div>

        <div className="flex flex-col gap-5">
          <section className="rounded-xl border border-[#BFDBFE] bg-white p-5">
            <h2 className="text-[18px] font-extrabold">Task Information</h2>

            <div className="mt-6 flex flex-col gap-5">
              <InfoRow
                label="Status"
                value={
                  <span
                    className={`rounded-full px-3 py-1 text-[13px] ${status.className}`}
                  >
                    {status.label}
                  </span>
                }
              />

              <InfoRow
                label="Priority"
                value={
                  <span className="flex items-center gap-2 rounded-full border border-[#E2E8F0] px-3 py-1 text-[13px]">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${priority.dot}`}
                    />
                    {priority.label}
                  </span>
                }
              />

              <InfoRow label="Assignee" value={task.assignee} />
              <InfoRow label="Created at" value={task.createdAt} />
              <InfoRow label="Updated at" value={task.updatedAt} />
            </div>
          </section>

          <section className="rounded-xl border border-[#BFDBFE] bg-white p-5">
            <h2 className="text-[18px] font-extrabold">Description</h2>

            <div
              className="
                mt-4 text-[#334155]
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

            <button
              onClick={openFeatureModal}
              className="mt-6 text-[14px] font-medium text-[#5140E8]"
            >
              ✎ Edit
            </button>
          </section>

          <section className="rounded-xl border border-[#BFDBFE] bg-white p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-[18px] font-extrabold">Activity</h2>

              <button
                onClick={openFeatureModal}
                className="text-[14px] text-[#5140E8]"
              >
                View all
              </button>
            </div>

            <div className="mt-5 flex flex-col gap-4 text-[14px]">
              <p>
                <strong>{task.assignee}</strong> created this task
              </p>

              <p>
                <strong>Olivia Rhye</strong> changed status to{" "}
                <span className="rounded-full bg-[#EAF1FF] px-2 py-1 text-[#3772F0]">
                  {status.label}
                </span>
              </p>

              <p>
                <strong>Stanley Paige</strong> updated checklist
              </p>
            </div>
          </section>
        </div>
      </div>

      <FeatureModal
        isOpen={isFeatureModalOpen}
        onClose={() => setIsFeatureModalOpen(false)}
      />
    </AppLayout>
  )
}

function InfoRow({ label, value }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <span className="text-[14px] text-[#0F172A]">{label}</span>
      <span className="text-[14px] text-[#64748B]">{value}</span>
    </div>
  )
}