"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function CustomSelect({
  value,
  onChange,
  options = [],
  placeholder = "Select an option",
  name,
  className = "",
  required = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  // Handle click outside to close
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    setIsOpen(false);
    if (onChange) {
      // Mimic native event
      onChange({
        target: {
          name,
          value: optionValue,
        },
      });
    }
  };

  // Normalize options to { value, label } format
  const normalizedOptions = options.map((opt) => {
    if (typeof opt === "string") {
      return { value: opt, label: opt };
    }
    return opt;
  });

  const selectedOption = normalizedOptions.find((opt) => opt.value === value);

  return (
    <div className={`relative ${className}`} ref={containerRef}>
      {/* Hidden input for form submission compatibility */}
      <input
        type="hidden"
        name={name}
        value={value}
        required={required}
      />

      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-white/5 border-2 ${
          isOpen ? "border-purple-500" : "border-white/10"
        } rounded-xl px-4 py-3 text-left flex items-center justify-between transition-colors focus:outline-none focus:border-purple-500`}
      >
        <span className={selectedOption ? "text-white" : "text-white/30"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className={`text-white/50 transition-transform ${isOpen ? "rotate-180" : ""}`}>
          ▼
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-2 bg-[#0f1528] border-2 border-white/10 rounded-xl shadow-xl overflow-hidden max-h-60 overflow-y-auto"
          >
            {normalizedOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => handleSelect(option.value)}
                className={`w-full px-4 py-3 text-left hover:bg-white/5 transition-colors ${
                  value === option.value ? "text-purple-400 font-bold bg-white/5" : "text-white/80"
                }`}
              >
                {option.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
