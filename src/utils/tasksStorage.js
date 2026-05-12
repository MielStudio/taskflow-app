import { mockTasks } from "../data/mockTasks"

const TASKS_STORAGE_KEY = "taskflow_tasks"

export function getStoredTasks() {
  try {
    const savedTasks = localStorage.getItem(TASKS_STORAGE_KEY)

    if (!savedTasks) {
      localStorage.setItem(
        TASKS_STORAGE_KEY,
        JSON.stringify(mockTasks)
      )

      return mockTasks
    }

    return JSON.parse(savedTasks)
  } catch (error) {
    console.error("Failed to load tasks:", error)
    return mockTasks
  }
}

export function saveTasks(tasks) {
  try {
    localStorage.setItem(
      TASKS_STORAGE_KEY,
      JSON.stringify(tasks)
    )
  } catch (error) {
    console.error("Failed to save tasks:", error)
  }
}

function formatTaskDate(dateString) {
  const date = new Date(dateString)

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
  })
}

export function createTask(taskData) {
  const currentTasks = getStoredTasks()

  const newTask = {
    id:
      currentTasks.length > 0
        ? Math.max(...currentTasks.map((task) => task.id)) + 1
        : 1,

    title: taskData.title,
    description: taskData.description || "No description provided.",
    status: taskData.status || "todo",
    priority: taskData.priority || "medium",
    assignee: taskData.assignee || "Unassigned",
    category: taskData.project || "General",
    dueDate: taskData.dueDate
        ? formatTaskDate(taskData.dueDate)
        : "No due date",
    createdAt: new Date().toISOString().split("T")[0],
    updatedAt: new Date().toISOString().split("T")[0],
    checklist: [],
  }

  const updatedTasks = [...currentTasks, newTask]

  saveTasks(updatedTasks)

  return newTask
}

export function clearTasksStorage() {
  localStorage.removeItem(TASKS_STORAGE_KEY)
}