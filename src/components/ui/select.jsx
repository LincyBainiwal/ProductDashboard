import React, { useState, useRef, useEffect } from "react";

export function Select({ children, value, onValueChange }) {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (triggerRef.current && !triggerRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block w-full" ref={triggerRef}>
      <div
        className="border rounded px-3 py-2 cursor-pointer flex justify-between items-center"
        onClick={() => setOpen(!open)}
      >
        <span>{value || "Select"}</span>
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {open && (
        <div className="absolute mt-1 w-full bg-white border rounded shadow z-10 max-h-60 overflow-auto">
          {children &&
            // Pass value on click
            Array.isArray(children) &&
            children.map((child) =>
              React.cloneElement(child, {
                onClick: () => {
                  onValueChange(child.props.value);
                  setOpen(false);
                },
              })
            )}
        </div>
      )}
    </div>
  );
}

// Trigger component
export function SelectTrigger({ children }) {
  return <>{children}</>;
}

// Value display (inside Trigger)
export function SelectValue({ placeholder }) {
  return <span className="text-gray-600">{placeholder}</span>;
}

// Dropdown container
export function SelectContent({ children }) {
  return <div>{children}</div>;
}

// Single dropdown item
export function SelectItem({ value, children, onClick }) {
  return (
    <div
      className="px-3 py-2 cursor-pointer hover:bg-gray-100"
      onClick={onClick}
    >
      {children || value}
    </div>
  );
}
