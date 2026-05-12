import { createContext, useContext, useEffect, useState } from "react"
import { defaultAccount } from "../data/defaultAccount"

const AuthContext = createContext(null)

const USERS_KEY = "taskflow_users"
const CURRENT_USER_KEY = "taskflow_current_user"

function getStoredUsers() {
  const savedUsers = localStorage.getItem(USERS_KEY)

  if (!savedUsers) {
    localStorage.setItem(USERS_KEY, JSON.stringify([defaultAccount]))
    return [defaultAccount]
  }

  return JSON.parse(savedUsers)
}

export function AuthProvider({ children }) {
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    const storedUsers = getStoredUsers()
    const savedCurrentUser = localStorage.getItem(CURRENT_USER_KEY)

    setUsers(storedUsers)

    if (savedCurrentUser) {
      setCurrentUser(JSON.parse(savedCurrentUser))
    }
  }, [])

  const login = ({ email, password }) => {
    const foundUser = users.find(
      (user) => user.email === email && user.password === password
    )

    if (!foundUser) {
      return {
        success: false,
        message: "Invalid email or password.",
      }
    }

    setCurrentUser(foundUser)
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(foundUser))

    return {
      success: true,
      user: foundUser,
    }
  }

  const register = ({ name, email, password }) => {
    const normalizedEmail = email.trim().toLowerCase()

    const emailExists = users.some(
      (user) => user.email.toLowerCase() === normalizedEmail
    )

    if (emailExists) {
      return {
        success: false,
        message: "User with this email already exists.",
      }
    }

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: normalizedEmail,
      password,
      role: "Member",
      team: "Personal Workspace",
    }

    const updatedUsers = [...users, newUser]

    setUsers(updatedUsers)
    setCurrentUser(newUser)

    localStorage.setItem(USERS_KEY, JSON.stringify(updatedUsers))
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(newUser))

    return {
      success: true,
      user: newUser,
    }
  }

  const logout = () => {
    setCurrentUser(null)
    localStorage.removeItem(CURRENT_USER_KEY)
  }

  return (
    <AuthContext.Provider
      value={{
        users,
        currentUser,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}