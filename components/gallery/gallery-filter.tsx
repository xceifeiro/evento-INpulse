"use client"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface FilterOption {
  value: string
  label: string
}

interface GalleryFilterProps {
  options: FilterOption[]
  onFilterChange: (filter: string) => void
  activeFilter: string
}

export function GalleryFilter({ options, onFilterChange, activeFilter }: GalleryFilterProps) {
  return (
    <div className="mb-8 overflow-x-auto pb-2">
      <div className="flex flex-wrap gap-2 justify-center">
        <Button
          variant={activeFilter === "" ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange("")}
          className={activeFilter === "" ? "bg-[#821423] hover:bg-[#6a1019]" : ""}
        >
          Todos
        </Button>

        {options.map((option) => (
          <Button
            key={option.value}
            variant={activeFilter === option.value ? "default" : "outline"}
            size="sm"
            onClick={() => onFilterChange(option.value)}
            className={activeFilter === option.value ? "bg-[#821423] hover:bg-[#6a1019]" : ""}
          >
            {option.label}
          </Button>
        ))}
      </div>

      {/* Indicator line */}
      <div className="mt-2 relative h-0.5 bg-gray-100 rounded-full">
        <motion.div
          className="absolute h-0.5 bg-[#821423] rounded-full"
          initial={false}
          animate={{
            left: `${options.findIndex((o) => o.value === activeFilter) * (100 / (options.length + 1))}%`,
            width: `${100 / (options.length + 1)}%`,
          }}
          transition={{ duration: 0.3 }}
        />
      </div>
    </div>
  )
}
