import { useRef, useState } from "react"
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link as LinkIcon,
  Code2,
  ChevronDown,
  Check,
  Calendar,
  User,
  FolderKanban,
  Flag,
  CircleDot,
} from "lucide-react"
import { Link, useNavigate } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"
import AppLayout from "../layouts/AppLayout"
import FeatureModal from "../components/FeatureModal"
import { createTask } from "../utils/tasksStorage"

export default function CreateTask() {
  const [title, setTitle] = useState("")
  const [descriptionText, setDescriptionText] = useState("")
  const [activeFormats, setActiveFormats] = useState({})
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false)
  const [linkText, setLinkText] = useState("")
  const [linkUrl, setLinkUrl] = useState("")
  const descriptionRef = useRef(null)
  const savedRangeRef = useRef(null)

  const [status, setStatus] = useState("todo")
  const [priority, setPriority] = useState("medium")
  const [assignee, setAssignee] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [project, setProject] = useState("")

  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [titleError, setTitleError] = useState("")

  const navigate = useNavigate()

  const getSelectedText = () => {
    const selection = window.getSelection()

    if (!selection || selection.rangeCount === 0) return ""

    return selection.toString()
  }

  const saveSelection = () => {
    const selection = window.getSelection()

    if (!selection || selection.rangeCount === 0) return

    const range = selection.getRangeAt(0)

    if (descriptionRef.current?.contains(range.commonAncestorContainer)) {
      savedRangeRef.current = range
    }
  }

  const restoreSelection = () => {
    const selection = window.getSelection()

    if (!selection || !savedRangeRef.current) return

    selection.removeAllRanges()
    selection.addRange(savedRangeRef.current)
  }

  const updateActiveFormats = () => {
    setActiveFormats({
      bold: document.queryCommandState("bold"),
      italic: document.queryCommandState("italic"),
      underline: document.queryCommandState("underline"),
      unorderedList: document.queryCommandState("insertUnorderedList"),
      orderedList: document.queryCommandState("insertOrderedList"),
    })
  }

  const handleDescriptionInput = () => {
    const text = descriptionRef.current?.innerText || ""

    if (text.length <= 2000) {
      setDescriptionText(text)
    } else if (descriptionRef.current) {
      descriptionRef.current.innerText = text.slice(0, 2000)
      setDescriptionText(text.slice(0, 2000))
    }

    saveSelection()
    updateActiveFormats()
  }

  const formatDescription = (command, value = null) => {
    descriptionRef.current?.focus()
    restoreSelection()

    if (command === "createLink") {
      const selectedText = getSelectedText()

      setLinkText(selectedText || "")
      setLinkUrl("")
      setIsLinkModalOpen(true)
      return
    }

    if (command === "formatCode") {
      const selection = window.getSelection()

      if (!selection || selection.rangeCount === 0) return

      const range = selection.getRangeAt(0)
      const selectedText = selection.toString()

      if (!selectedText.trim()) {
        document.execCommand(
          "insertHTML",
          false,
          `<code class="inline-code">code</code>`
        )
      } else {
        const parentElement =
          range.commonAncestorContainer.nodeType === 3
            ? range.commonAncestorContainer.parentElement
            : range.commonAncestorContainer

        if (parentElement?.tagName === "CODE") {
          const text = parentElement.textContent
          parentElement.replaceWith(document.createTextNode(text))
        } else {
          const wrapper = document.createElement("code")
          wrapper.className = "inline-code"

          try {
            range.surroundContents(wrapper)
          } catch {
            document.execCommand(
              "insertHTML",
              false,
              `<code class="inline-code">${selectedText}</code>`
            )
          }
        }
      }

      saveSelection()
      handleDescriptionInput()
      updateActiveFormats()
      return
    }

    document.execCommand(command, false, value)

    saveSelection()
    handleDescriptionInput()
    updateActiveFormats()
  }

  const insertLink = () => {
    descriptionRef.current?.focus()
    restoreSelection()

    if (!linkUrl.trim()) {
      setIsLinkModalOpen(false)
      return
    }

    const safeText = linkText.trim() || linkUrl

    document.execCommand(
      "insertHTML",
      false,
      `<a href="${linkUrl}" target="_blank" class="editor-link">${safeText}</a>`
    )

    setIsLinkModalOpen(false)
    setLinkText("")
    setLinkUrl("")

    handleDescriptionInput()
    updateActiveFormats()
  }

  const handleCreateTask = (event) => {
    event.preventDefault()

    if (isSubmitting) return

    if (!title.trim()) {
      setTitleError("Please enter a task title.")
      return
    }

    setTitleError("")
    setIsSubmitting(true)

    createTask({
      title: title.trim(),
      description: descriptionRef.current?.innerHTML || "",
      status,
      priority,
      assignee,
      dueDate,
      project,
    })

    navigate("/tasks")
  }

  return (
    <AppLayout>
      <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
        <div className="flex items-center gap-2 text-[15px] text-[#0F172A]">
          <Link to="/tasks" className="hover:text-[#5140E8]">
            Tasks
          </Link>

          <span>›</span>

          <span>Create Task</span>
        </div>

        <div className="flex gap-3">
          <Link
            to="/tasks"
            className="
              flex h-10 items-center justify-center rounded-lg
              border border-[#CBD5E1] bg-white px-6
              text-[15px] font-medium
              transition hover:bg-[#F8FAFC]
            "
          >
            Cancel
          </Link>

          <button
            type="submit"
            form="create-task-form"
            disabled={isSubmitting}
            className="
              h-10 rounded-lg bg-[#5140E8] px-7
              text-[15px] font-semibold text-white
              transition hover:bg-[#4635d8]
              disabled:cursor-not-allowed disabled:opacity-60
            "
          >
            {isSubmitting ? "Creating..." : "Create Task"}
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-5 xl:grid-cols-[1fr_370px]">
        <section className="rounded-xl border border-[#BFDBFE] bg-white p-6">
          <h1 className="text-[32px] font-extrabold leading-tight">
            Create a new task
          </h1>

          <p className="mt-2 text-[14px] text-[#334155]">
            Fill in the details below to create a new task for yourself or your
            team.
          </p>

          <form
            id="create-task-form"
            onSubmit={handleCreateTask}
            className="mt-8"
          >
            <div>
              <label className="text-[15px] font-semibold">
                Title <span className="text-[#EF4444]">*</span>
              </label>

              <div className="relative mt-2">
                <input
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value)
                    setTitleError("")
                  }}
                  maxLength={120}
                  placeholder="Enter task title"
                  className={`
                    h-10 w-full rounded-lg border
                    ${titleError ? "border-[#EF4444]" : "border-[#CBD5E1]"}
                    px-3 pr-20 text-[15px] outline-none
                    placeholder:text-[#888888]
                    focus:border-[#9B8CFF]
                  `}
                />

                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[14px] text-[#888888]">
                  {title.length} / 120
                </span>
              </div>

              {titleError && (
                <div className="mt-2 rounded-lg border border-[#FECACA] bg-[#FEF2F2] px-3 py-2 text-[14px] font-medium text-[#DC2626]">
                  {titleError}
                </div>
              )}
            </div>

            <div className="mt-6">
              <label className="text-[15px] font-semibold">
                Description
              </label>

              <div className="mt-2 overflow-hidden rounded-lg border border-[#CBD5E1] bg-white focus-within:border-[#9B8CFF]">
                <div
                  ref={descriptionRef}
                  contentEditable
                  onInput={handleDescriptionInput}
                  onMouseUp={() => {
                    saveSelection()
                    updateActiveFormats()
                  }}
                  onKeyUp={() => {
                    saveSelection()
                    updateActiveFormats()
                  }}
                  onBlur={saveSelection}
                  data-placeholder="Describe the task in detail..."
                  className="
                    min-h-[110px] w-full px-3 py-3
                    text-[15px] leading-6 outline-none
                    empty:before:content-[attr(data-placeholder)]
                    empty:before:text-[#888888]
                    [&_ul]:ml-6 [&_ul]:list-disc
                    [&_ol]:ml-6 [&_ol]:list-decimal
                    [&_a]:text-[#5140E8]
                    [&_a]:underline
                    [&_code]:rounded
                    [&_code]:bg-[#F1F5F9]
                    [&_code]:px-2
                    [&_code]:py-1
                    [&_code]:font-mono
                    [&_code]:text-[14px]
                  "
                />

                <div className="flex h-10 items-center justify-between border-t border-[#CBD5E1] px-3">
                  <div className="flex items-center gap-1 text-[#0F172A]">
                    <EditorButton
                      active={activeFormats.bold}
                      onClick={() => formatDescription("bold")}
                      icon={<Bold size={18} />}
                    />

                    <EditorButton
                      active={activeFormats.italic}
                      onClick={() => formatDescription("italic")}
                      icon={<Italic size={18} />}
                    />

                    <EditorButton
                      active={activeFormats.underline}
                      onClick={() => formatDescription("underline")}
                      icon={<Underline size={18} />}
                    />

                    <div className="mx-2 h-5 w-px bg-[#E2E8F0]" />

                    <EditorButton
                      active={activeFormats.unorderedList}
                      onClick={() => formatDescription("insertUnorderedList")}
                      icon={<List size={19} />}
                    />

                    <EditorButton
                      active={activeFormats.orderedList}
                      onClick={() => formatDescription("insertOrderedList")}
                      icon={<ListOrdered size={19} />}
                    />

                    <div className="mx-2 h-5 w-px bg-[#E2E8F0]" />

                    <EditorButton
                      onClick={() => formatDescription("createLink")}
                      icon={<LinkIcon size={18} />}
                    />

                    <EditorButton
                      onClick={() => formatDescription("formatCode")}
                      icon={<Code2 size={18} />}
                    />
                  </div>

                  <span className="text-[14px] text-[#888888]">
                    {descriptionText.length} / 2000
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
              <CreateTaskDropdown
                label="Status"
                value={status}
                onChange={setStatus}
                icon={CircleDot}
                options={[
                  {
                    label: "To Do",
                    value: "todo",
                    badge: "bg-[#F1F3F5] text-[#737373]",
                  },
                  {
                    label: "In Progress",
                    value: "in_progress",
                    badge: "bg-[#EAF1FF] text-[#3772F0]",
                  },
                  {
                    label: "Done",
                    value: "done",
                    badge: "bg-[#EAF8EF] text-[#3DBE6E]",
                  },
                ]}
              />

              <CreateTaskDropdown
                label="Priority"
                required
                value={priority}
                onChange={setPriority}
                icon={Flag}
                options={[
                  { label: "High", value: "high", dot: "bg-[#EF4444]" },
                  { label: "Medium", value: "medium", dot: "bg-[#FF9B2F]" },
                  { label: "Low", value: "low", dot: "bg-[#4ABE74]" },
                ]}
              />

              <CreateTaskDropdown
                label="Assignee"
                value={assignee}
                onChange={setAssignee}
                icon={User}
                placeholder="Select assignee"
                options={[
                  { label: "Stanley Paige", value: "Stanley Paige" },
                  { label: "Alex Morgan", value: "Alex Morgan" },
                  { label: "Kate Wilson", value: "Kate Wilson" },
                  { label: "Nina Brooks", value: "Nina Brooks" },
                ]}
              />
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="text-[15px] font-semibold">Due date</label>

                <div className="relative mt-2">
                  <Calendar
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]"
                  />

                  <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="
                      h-10 w-full rounded-lg border border-[#CBD5E1]
                      bg-white pl-10 pr-3 text-[15px] text-[#0F172A]
                      outline-none transition
                      hover:border-[#9B8CFF] hover:shadow-sm
                      focus:border-[#9B8CFF]
                    "
                  />
                </div>
              </div>

              <CreateTaskDropdown
                label="Project"
                value={project}
                onChange={setProject}
                icon={FolderKanban}
                placeholder="Select project (optional)"
                options={[
                  { label: "UI/UX Redesign", value: "UI/UX Redesign" },
                  { label: "Bug fixes", value: "Bug fixes" },
                  { label: "Mobile App", value: "Mobile App" },
                  { label: "Analytics", value: "Analytics" },
                  { label: "Documentation", value: "Documentation" },
                ]}
              />
            </div>

            <div className="mt-6">
              <p className="text-[15px] font-semibold">
                📎 Attachments (optional)
              </p>

              <button
                type="button"
                onClick={() => setIsFeatureModalOpen(true)}
                className="
                  mt-3 flex h-[100px] w-full flex-col items-center justify-center
                  rounded-lg border border-dashed border-[#BFDBFE]
                  text-center transition
                  hover:border-[#5140E8] hover:bg-[#F8FAFC]
                "
              >
                <p className="text-[14px]">
                  Drag and drop files here, or{" "}
                  <span className="text-[#5140E8]">click to browse</span>
                </p>

                <p className="mt-4 text-[14px] text-[#888888]">
                  Supports: JPG, PNG, PDF, DOCX (Max 10MB)
                </p>
              </button>
            </div>
          </form>
        </section>

        <aside className="rounded-xl border border-[#BFDBFE] bg-white p-5">
          <h2 className="text-[18px] font-extrabold">Task tips</h2>

          <div className="mt-6 flex flex-col gap-6">
            <TipItem
              icon="✎"
              title="Be clear and concise"
              text="Use a descriptive title and clear description."
            />

            <TipItem
              icon="⚑"
              title="Set priority"
              text="Choose the right priority to help your team focus."
            />

            <TipItem
              icon="♙"
              title="Assign task"
              text="Assign to the right person to ensure accountability."
            />

            <TipItem
              icon="▣"
              title="Add due date"
              text="Setting a due date helps keep the project on track."
            />
          </div>
        </aside>

        <FeatureModal
          isOpen={isFeatureModalOpen}
          onClose={() => setIsFeatureModalOpen(false)}
        />
      </div>

      {isLinkModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-[420px] rounded-2xl border border-[#BFDBFE] bg-white p-6 shadow-xl">
            <h2 className="text-[24px] font-extrabold">Insert Link</h2>

            <div className="mt-5">
              <label className="text-[14px] font-semibold">
                Link text
              </label>

              <input
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                className="
                  mt-2 h-11 w-full rounded-lg border border-[#CBD5E1]
                  px-3 outline-none focus:border-[#9B8CFF]
                "
              />
            </div>

            <div className="mt-4">
              <label className="text-[14px] font-semibold">
                URL
              </label>

              <input
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                placeholder="https://..."
                className="
                  mt-2 h-11 w-full rounded-lg border border-[#CBD5E1]
                  px-3 outline-none focus:border-[#9B8CFF]
                "
              />
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setIsLinkModalOpen(false)}
                className="
                  h-10 rounded-lg border border-[#CBD5E1]
                  px-5
                "
              >
                Cancel
              </button>

              <button
                onClick={insertLink}
                className="
                  h-10 rounded-lg bg-[#5140E8]
                  px-5 font-semibold text-white
                "
              >
                Insert
              </button>
            </div>
          </div>
        </div>
      )}
    </AppLayout>
  )
}

function TipItem({ icon, title, text }) {
  return (
    <div className="flex gap-4">
      <div className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-lg bg-[#F1ECFF] text-[34px] text-[#5140E8]">
        {icon}
      </div>

      <div>
        <h3 className="text-[15px] font-extrabold">{title}</h3>

        <p className="mt-2 text-[14px] leading-4 text-[#0F172A]">
          {text}
        </p>
      </div>
    </div>
  )
}

function EditorButton({ icon, active = false, onClick }) {
  return (
    <button
      type="button"
      onMouseDown={(e) => e.preventDefault()}
      onClick={onClick}
      className={`
        flex h-8 w-8 items-center justify-center rounded-md
        border transition
        ${
          active
            ? "border-[#5140E8] bg-[#F1ECFF] text-[#5140E8] shadow-sm"
            : "border-transparent text-[#0F172A] hover:border-[#CBD5E1] hover:bg-[#F8FAFC]"
        }
      `}
    >
      {icon}
    </button>
  )
}

function CreateTaskDropdown({
  label,
  required = false,
  value,
  onChange,
  options,
  placeholder = "Select option",
  icon: Icon,
}) {
  const [isOpen, setIsOpen] = useState(false)
  const selectedOption = options.find((option) => option.value === value)

  return (
    <div className="relative">
      <label className="text-[15px] font-semibold">
        {label} {required && <span className="text-[#EF4444]">*</span>}
      </label>

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="
          mt-2 flex h-10 w-full items-center justify-between
          rounded-lg border border-[#CBD5E1] bg-white px-3
          text-left text-[15px] outline-none transition
          hover:border-[#9B8CFF] hover:shadow-sm
        "
      >
        <span className="flex min-w-0 items-center gap-2">
          {Icon && <Icon size={17} className="shrink-0 text-[#64748B]" />}

          {selectedOption ? (
            <span className="flex min-w-0 items-center gap-2">
              {selectedOption.dot && (
                <span
                  className={`h-2.5 w-2.5 rounded-full ${selectedOption.dot}`}
                />
              )}

              {selectedOption.badge ? (
                <span
                  className={`rounded-full px-2 py-0.5 text-[13px] ${selectedOption.badge}`}
                >
                  {selectedOption.label}
                </span>
              ) : (
                <span className="truncate text-[#0F172A]">
                  {selectedOption.label}
                </span>
              )}
            </span>
          ) : (
            <span className="truncate text-[#888888]">{placeholder}</span>
          )}
        </span>

        <ChevronDown
          size={18}
          className={`shrink-0 transition ${
            isOpen ? "rotate-180 text-[#5140E8]" : "text-[#64748B]"
          }`}
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
              absolute left-0 right-0 top-[74px] z-50
              overflow-hidden rounded-xl border border-[#CBD5E1]
              bg-white p-1
              shadow-[0_12px_30px_rgba(15,23,42,0.16)]
            "
          >
            {options.map((option) => {
              const isActive = option.value === value

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => {
                    onChange(option.value)
                    setIsOpen(false)
                  }}
                  className={`
                    flex h-10 w-full items-center justify-between
                    rounded-lg px-3 text-left text-[14px] transition
                    ${
                      isActive
                        ? "bg-[#F1ECFF] font-bold text-[#5140E8]"
                        : "text-[#0F172A] hover:bg-[#F8FAFC]"
                    }
                  `}
                >
                  <span className="flex items-center gap-2">
                    {option.dot && (
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${option.dot}`}
                      />
                    )}

                    {option.badge ? (
                      <span
                        className={`rounded-full px-2 py-0.5 text-[13px] ${option.badge}`}
                      >
                        {option.label}
                      </span>
                    ) : (
                      option.label
                    )}
                  </span>

                  {isActive && <Check size={16} />}
                </button>
              )
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}