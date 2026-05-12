import { useMemo, useState } from "react"
import { Search, Users, ClipboardList, User } from "lucide-react"
import { Link, useNavigate } from "react-router-dom"

export default function PageHeader({
  icon: Icon,
  title,
  subtitle,
  searchPlaceholder = "Search...",
  actionText,
  onActionClick,
  tasks = [],
  users = [],
}) {
  const [searchValue, setSearchValue] = useState("")

  const normalizedSearch = searchValue.trim().toLowerCase()
  const navigate = useNavigate()

  const foundTasks = useMemo(() => {
    if (!normalizedSearch) return []

    return tasks.filter((task) => {
      return (
        task.title.toLowerCase().includes(normalizedSearch) ||
        task.description.toLowerCase().includes(normalizedSearch) ||
        task.assignee.toLowerCase().includes(normalizedSearch) ||
        task.category.toLowerCase().includes(normalizedSearch) ||
        task.priority.toLowerCase().includes(normalizedSearch) ||
        task.status.toLowerCase().includes(normalizedSearch)
      )
    })
  }, [normalizedSearch, tasks])

  const foundUsers = useMemo(() => {
    if (!normalizedSearch) return []

    return users.filter((user) => {
      return (
        user.name.toLowerCase().includes(normalizedSearch) ||
        user.email.toLowerCase().includes(normalizedSearch) ||
        user.role.toLowerCase().includes(normalizedSearch) ||
        user.team.toLowerCase().includes(normalizedSearch)
      )
    })
  }, [normalizedSearch, users])

  const hasSearch = normalizedSearch.length > 0
  const hasResults = foundTasks.length > 0 || foundUsers.length > 0

  return (
    <header className="flex flex-col gap-5 xl:flex-row xl:items-start xl:justify-between">
      <div className="flex items-start gap-4 sm:gap-5">
        {Icon && (
          <Icon
            size={52}
            fill="currentColor"
            className="mt-1 hidden sm:block"
          />
        )}

        <div>
          <h1 className="text-[28px] font-extrabold leading-tight sm:text-[34px]">
            {title}
          </h1>

          <p className="mt-1 max-w-[520px] text-[14px] leading-5 text-[#334155]">
            {subtitle}
          </p>
        </div>
      </div>

      <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center xl:w-auto xl:gap-8">
        <div className="relative w-full xl:w-auto">
          <Search
            size={22}
            className="absolute left-3 top-1/2 -translate-y-1/2"
          />

          <input
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
            className="
                h-10 w-full rounded-lg border border-[#CBD5E1]
                bg-white pl-11 pr-4 text-[14px]
                outline-none
                placeholder:text-[#64748B]
                focus:border-[#9B8CFF]
                xl:w-[360px]
            "
            placeholder={searchPlaceholder}
          />

          {hasSearch && (
            <div
              className="
                absolute left-0 right-0 top-[50px] z-50
                overflow-hidden rounded-xl
                border border-[#CBD5E1] bg-white
                shadow-[0_8px_24px_rgba(15,23,42,0.12)]
                xl:left-auto xl:right-0 xl:w-[360px]
              "
            >
              {hasResults ? (
                <div className="max-h-[360px] overflow-y-auto py-2">
                  {foundTasks.length > 0 && (
                    <div>
                      <p className="px-4 pb-2 pt-2 text-xs font-bold uppercase tracking-wide text-[#64748B]">
                        Tasks
                      </p>

                      {foundTasks.map((task) => (
                        <button
                          key={`task-${task.id}`}
                          onClick={() => {
                            navigate(`/tasks/${task.id}`)
                            setSearchValue("")
                          }}
                          className="
                            flex w-full cursor-pointer items-start gap-3
                            px-4 py-3 text-left
                            transition hover:bg-[#F8FAFC]
                          "
                        >
                          <div
                            className="
                              mt-1 h-2.5 w-2.5 shrink-0 rounded-full
                              bg-[#5140E8]
                            "
                          />

                          <div className="min-w-0">
                            <p className="truncate font-semibold text-[#0F172A]">
                              {task.title}
                            </p>

                            <p className="text-sm text-[#64748B]">
                              {task.status}
                            </p>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}

                  {foundUsers.length > 0 && (
                    <div>
                      <p className="px-4 pb-2 pt-3 text-xs font-bold uppercase tracking-wide text-[#64748B]">
                        People
                      </p>

                      {foundUsers.map((user) => (
                        <div
                          key={`user-${user.id}`}
                          className="flex cursor-pointer items-start gap-3 px-4 py-3 hover:bg-[#F8FAFC]"
                        >
                          <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#EEF6FF] text-[#0F172A]">
                            <User size={18} />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-bold">
                              {user.name}
                            </p>
                            <p className="truncate text-xs text-[#64748B]">
                              {user.role} • {user.team}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="px-4 py-6 text-center">
                  <p className="text-sm font-bold">
                    Nothing found
                  </p>
                  <p className="mt-1 text-xs text-[#64748B]">
                    No tasks or people match “{searchValue}”.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between gap-4 sm:justify-start">
            <Link to="/profile" className="relative hidden lg:block group">
              <div
                className="
                  flex h-12 w-12 items-center justify-center
                  rounded-full bg-white shadow-sm
                  transition duration-200
                  group-hover:scale-105
                  group-hover:shadow-md
                "
              >
                <Users
                  size={30}
                  fill="currentColor"
                  className="transition group-hover:text-[#5140E8]"
                />
              </div>

              <span
                className="
                  absolute right-0 top-[-4px]
                  flex h-5 w-5 items-center justify-center
                  rounded-full bg-[#9B8CFF]
                  text-xs font-bold text-white
                "
              >
                2
              </span>
            </Link>

            {actionText && (
            <button
                onClick={onActionClick}
                className="
                    hidden h-10 rounded-lg bg-[#5140E8] px-7
                    text-[15px] font-semibold text-white
                    hover:bg-[#4635d8]
                    lg:block
                "
            >
                {actionText}
            </button>
            )}
        </div>
      </div>
    </header>
  )
}