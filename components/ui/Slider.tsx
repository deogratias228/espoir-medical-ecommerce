"use client"
import React from "react"

interface SliderProps {
  min: number
  max: number
  step?: number
  value: [number, number]
  onValueChange: (value: [number, number]) => void
}

export const Slider: React.FC<SliderProps> = ({
  min,
  max,
  step = 1,
  value,
  onValueChange,
}) => {
  const [minValue, maxValue] = value

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.min(Number(e.target.value), maxValue - step)
    onValueChange([newValue, maxValue])
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.max(Number(e.target.value), minValue + step)
    onValueChange([minValue, newValue])
  }

  return (
    <div className="w-full space-y-6">
      {/* Slider MIN */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <label className="text-gray-600 font-medium">Minimum</label>
          <span className="text-green-600 font-semibold">
            {minValue.toLocaleString()} F
          </span>
        </div>
        <div className="relative flex items-center">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={minValue}
            onChange={handleMinChange}
            className="slider-green w-full appearance-none cursor-pointer bg-gre"
          />
        </div>
      </div>

      {/* Slider MAX */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <label className="text-gray-600 font-medium">Maximum</label>
          <span className="text-green-600 font-semibold">
            {maxValue.toLocaleString()} F
          </span>
        </div>
        <div className="relative flex items-center">
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={maxValue}
            onChange={handleMaxChange}
            className="slider-green w-full appearance-none cursor-pointer"
          />
        </div>
      </div>

      <style jsx>{`
        /* Barre principale (centrée verticalement avec thumb) */
        .slider-green {
          height: 24px; /* pour que le thumb soit bien centré */
          background: transparent;
          position: relative;
        }

        /* Track */
        .slider-green::-webkit-slider-runnable-track {
          height: 8px;
          background: #e5e7eb;
          border-radius: 4px;
        }

        .slider-green::-moz-range-track {
          height: 8px;
          background: #e5e7eb;
          border-radius: 4px;
        }

        /* Thumb centré */
        .slider-green::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          border: 3px solid #16a34a;
          margin-top: -6px; /* centre le thumb verticalement */
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(22, 163, 74, 0.3);
          transition: all 0.2s ease;
        }

        .slider-green::-webkit-slider-thumb:hover {
          background: #16a34a;
          transform: scale(1.1);
          box-shadow: 0 4px 10px rgba(22, 163, 74, 0.4);
        }

        /* Firefox */
        .slider-green::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: white;
          border: 3px solid #16a34a;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(22, 163, 74, 0.3);
          transition: all 0.2s ease;
        }

        .slider-green::-moz-range-thumb:hover {
          background: #16a34a;
          transform: scale(1.1);
          box-shadow: 0 4px 10px rgba(22, 163, 74, 0.4);
        }

        /* Firefox barre remplie */
        .slider-green::-moz-range-progress {
          background: #16a34a;
          height: 8px;
          border-radius: 4px;
        }
      `}</style>
    </div>
  )
}
