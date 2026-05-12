export default function AuthInput({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  icon: Icon,
  error,
  autoComplete,
}) {
  return (
    <div>
      <label className="text-[15px] font-semibold text-[#0F172A]">
        {label}
      </label>

      <div className="relative mt-2">
        {Icon && (
          <Icon
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]"
          />
        )}

        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          className={`
            h-11 w-full rounded-xl border bg-white
            ${Icon ? "pl-10" : "pl-3"}
            pr-3 text-[15px] outline-none
            placeholder:text-[#94A3B8]
            transition
            ${
              error
                ? "border-[#EF4444] focus:border-[#EF4444]"
                : "border-[#CBD5E1] focus:border-[#9B8CFF]"
            }
          `}
        />
      </div>

      {error && (
        <p className="mt-2 text-[13px] font-medium text-[#EF4444]">
          {error}
        </p>
      )}
    </div>
  )
}