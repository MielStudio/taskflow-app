import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Mail, Lock } from "lucide-react"
import { motion } from "framer-motion"

import AuthLayout from "../components/AuthLayout"
import AuthInput from "../components/AuthInput"
import FeatureModal from "../components/FeatureModal"
import { useAuth } from "../context/AuthContext"

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState("")
  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const handleSubmit = (event) => {
    event.preventDefault()
    setError("")

    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.")
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }

    const result = login({
      email: email.trim().toLowerCase(),
      password,
      rememberMe,
    })

    if (!result.success) {
      setError(result.message)
      return
    }

    navigate("/dashboard")
  }

  return (
    <AuthLayout
      title="Welcome back!"
      subtitle="Log in to your account and continue managing your tasks and projects."
      cardTitle="Log In"
      cardSubtitle="Enter your email and password to access your account."
      footer={
        <p className="mt-4 text-center text-[14px]">
          Don't have an account?{" "}
          <Link to="/register" className="font-bold text-[#5140E8]">
            Sign up
          </Link>
        </p>
      }
>
      <div className="mt-8 flex flex-col gap-4">
        <motion.button
          type="button"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsFeatureModalOpen(true)}
          className="
            h-10 rounded-lg border border-[#CBD5E1]
            font-semibold transition hover:bg-[#F8FAFC]
          "
        >
          Continue with Google
        </motion.button>

        <motion.button
          type="button"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => setIsFeatureModalOpen(true)}
          className="
            h-10 rounded-lg border border-[#CBD5E1]
            font-semibold transition hover:bg-[#F8FAFC]
          "
        >
          Continue with Microsoft
        </motion.button>
      </div>

      <div className="my-8 flex items-center gap-5">
        <div className="h-px flex-1 bg-[#CBD5E1]" />
        <span className="font-semibold">or</span>
        <div className="h-px flex-1 bg-[#CBD5E1]" />
      </div>

      <form onSubmit={handleSubmit}>
        {error && (
          <div className="mb-5 rounded-lg border border-[#FECACA] bg-[#FEF2F2] px-4 py-3 text-sm font-semibold text-[#DC2626]">
            {error}
          </div>
        )}

        <AuthInput
          label="Email"
          icon={Mail}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          autoComplete="email"
        />

        <div className="mt-6">
          <AuthInput
            label="Password"
            type="password"
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            autoComplete="current-password"
          />
        </div>

        <div className="mt-6 flex items-center justify-between gap-4">
          <label className="flex cursor-pointer items-center gap-3">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-5 w-5 cursor-pointer rounded accent-[#5140E8]"
            />

            <span className="text-[15px]">Remember me</span>
          </label>

          <button
            type="button"
            onClick={() => setIsFeatureModalOpen(true)}
            className="text-[15px] font-medium text-[#9B8CFF] hover:text-[#5140E8]"
          >
            Forgot password?
          </button>
        </div>

        <motion.button
          type="submit"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="mt-7 h-11 w-full rounded-lg bg-[#5140E8] font-semibold text-white hover:bg-[#4635D8]"
        >
          Log in
        </motion.button>
      </form>

      <FeatureModal
        isOpen={isFeatureModalOpen}
        onClose={() => setIsFeatureModalOpen(false)}
      />
    </AuthLayout>
  )
}