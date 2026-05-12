import { ListTodo } from "lucide-react"
import { useMemo, useState } from "react"
import { useNavigate } from "react-router-dom"
import AppLayout from "../layouts/AppLayout"
import PageHeader from "../components/PageHeader"
import TasksFilters from "../components/TasksFilters"
import TasksTable from "../components/TasksTable"
import { getStoredTasks } from "../utils/tasksStorage"

export default function Tasks() {
  const [tasks] = useState(() => getStoredTasks())
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [assigneeFilter, setAssigneeFilter] = useState("all")
  const [dueDateFilter, setDueDateFilter] = useState("")
  const navigate = useNavigate()

  const assignees = useMemo(() => {
    return [...new Set(tasks.map((task) => task.assignee))]
  }, [tasks])

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchesStatus =
        statusFilter === "all" || task.status === statusFilter

      const matchesPriority =
        priorityFilter === "all" || task.priority === priorityFilter

      const matchesAssignee =
        assigneeFilter === "all" || task.assignee === assigneeFilter

      const matchesDueDate =
        !dueDateFilter ||
        new Date(`${task.dueDate}, 2026`).toDateString() ===
          new Date(dueDateFilter).toDateString()

      return (
        matchesStatus &&
        matchesPriority &&
        matchesAssignee &&
        matchesDueDate
      )
    })
  }, [tasks, statusFilter, priorityFilter, assigneeFilter, dueDateFilter])

  const clearFilters = () => {
    setStatusFilter("all")
    setPriorityFilter("all")
    setAssigneeFilter("all")
    setDueDateFilter("")
  }

  return (
    <AppLayout showCreateButton>
      <PageHeader
        icon={ListTodo}
        title="Tasks"
        subtitle="Manage and organize all your tasks in one place."
        searchPlaceholder="Search tasks..."
        actionText="+ Create Task"
        onActionClick={() => navigate("/create-task")}
        tasks={tasks}
      />

      <TasksFilters
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        assigneeFilter={assigneeFilter}
        dueDateFilter={dueDateFilter}
        setStatusFilter={setStatusFilter}
        setPriorityFilter={setPriorityFilter}
        setAssigneeFilter={setAssigneeFilter}
        setDueDateFilter={setDueDateFilter}
        clearFilters={clearFilters}
        assignees={assignees}
      />

      <TasksTable tasks={filteredTasks} />
    </AppLayout>
  )
}