import React from "react"

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`w-full border border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-100 rounded-md px-3 py-2 outline-none text-sm transition-all ${className}`}
        {...props}
      />
    )
  }
)

Input.displayName = "Input"
