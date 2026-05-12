import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { User, Mail, Lock } from "lucide-react"
import { motion } from "framer-motion"

import AuthLayout from "../components/AuthLayout"
import AuthInput from "../components/AuthInput"
import FeatureModal from "../components/FeatureModal"
import { useAuth } from "../context/AuthContext"

export default function Register() {
  const navigate = useNavigate()
  const { register } = useAuth()

  const [fullName, setFullName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [agreeTerms, setAgreeTerms] = useState(true)
  const [error, setError] = useState("")
  const [isFeatureModalOpen, setIsFeatureModalOpen] = useState(false)

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  const handleSubmit = (event) => {
    event.preventDefault()
    setError("")

    if (fullName.trim().length < 2) {
      setError("Please enter your full name.")
      return
    }

    if (!emailRegex.test(email.trim())) {
      setError("Please enter a valid email address.")
      return
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters.")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    if (!agreeTerms) {
      setError("Please agree to the Terms of Service and Privacy Policy.")
      return
    }

    const result = register({
      name: fullName.trim(),
      email: email.trim().toLowerCase(),
      password,
    })

    if (!result.success) {
      setError(result.message)
      return
    }

    navigate("/dashboard")
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Join TaskFlow and start organizing your work in a smarter way."
      cardTitle="Sign up"
      cardSubtitle="Create your account to get started with TaskFlow."
      footer={
        <p className="mt-4 text-center text-[14px]">
          Already have an account?{" "}
          <Link to="/login" className="font-bold text-[#5140E8]">
            Log in
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

      <div className="my-7 flex items-center gap-5">
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
          label="Full name"
          icon={User}
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          placeholder="Enter your full name"
          autoComplete="name"
        />

        <div className="mt-5">
          <AuthInput
            label="Email"
            icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            autoComplete="email"
          />
        </div>

        <div className="mt-5">
          <AuthInput
            label="Password"
            type="password"
            icon={Lock}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            autoComplete="new-password"
          />
        </div>

        <div className="mt-5">
          <AuthInput
            label="Confirm password"
            type="password"
            icon={Lock}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm your password"
            autoComplete="new-password"
          />
        </div>

        <label className="mt-5 flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={agreeTerms}
            onChange={(e) => setAgreeTerms(e.target.checked)}
            className="mt-0.5 h-5 w-5 cursor-pointer rounded accent-[#5140E8]"
          />

          <span className="text-[14px] leading-5">
            I agree to the{" "}
            <button
              type="button"
              onClick={() => setIsFeatureModalOpen(true)}
              className="font-medium text-[#5140E8]"
            >
              Terms of Service
            </button>{" "}
            and{" "}
            <button
              type="button"
              onClick={() => setIsFeatureModalOpen(true)}
              className="font-medium text-[#5140E8]"
            >
              Privacy Policy
            </button>
          </span>
        </label>

        <motion.button
          type="submit"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.97 }}
          className="mt-5 h-11 w-full rounded-lg bg-[#5140E8] font-semibold text-white hover:bg-[#4635D8]"
        >
          Sign up
        </motion.button>
      </form>

      <FeatureModal
        isOpen={isFeatureModalOpen}
        onClose={() => setIsFeatureModalOpen(false)}
      />
    </AuthLayout>
  )
}