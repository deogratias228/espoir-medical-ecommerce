"use client"
import React from "react"

interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  onCheckedChange?: (checked: boolean) => void
}

export const Checkbox: React.FC<CheckboxProps> = ({
  className = "",
  onCheckedChange,
  checked,
  ...props
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onCheckedChange?.(e.target.checked)
  }

  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={handleChange}
      className={`h-4 w-4 border-gray-300 rounded focus:ring-2 focus:ring-blue-400 accent-blue-500 cursor-pointer ${className}`}
      {...props}
    />
  )
}
