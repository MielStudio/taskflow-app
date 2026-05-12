import { useMemo, useState } from "react"
import { Home } from "lucide-react"
import { useNavigate } from "react-router-dom"
import AppLayout from "../layouts/AppLayout"
import PageHeader from "../components/PageHeader"
import DashboardStats from "../components/DashboardStats"
import DashboardOverview from "../components/DashboardOverview"
import UpcomingDeadlines from "../components/UpcomingDeadlines"
import { getStoredTasks } from "../utils/tasksStorage"
import { mockUsers } from "../data/mockUsers"

const getWeekRange = (date) => {
  const start = new Date(date)
  const day = start.getDay()
  const diff = day === 0 ? -6 : 1 - day

  start.setDate(start.getDate() + diff)

  const end = new Date(start)
  end.setDate(start.getDate() + 6)

  return { start, end }
}

export default function Dashboard() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 3, 26))
  const [tasks] = useState(() => getStoredTasks())
  const { start, end } = useMemo(() => getWeekRange(currentDate), [currentDate])
  const navigate = useNavigate()

  return (
    <AppLayout>
      <PageHeader
        icon={Home}
        title="Dashboard"
        subtitle="Welcome back, Stanley! Here`s what`s happening with your tasks!"
        searchPlaceholder="Search tasks, projects, people..."
        tasks={tasks}
        users={mockUsers}
      />

      <DashboardStats
        tasks={tasks}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        start={start}
        end={end}
      />

      <DashboardOverview
        tasks={tasks}
        currentDate={currentDate}
        setCurrentDate={setCurrentDate}
        start={start}
        end={end}
      />

      <UpcomingDeadlines tasks={tasks} />
    </AppLayout>
  )
}