import { useState } from "react";

export default function DropdownSelect({
  placeholder = "Select",
  options = [],
  theme,
  value,
  onChange,
}) {
  const [internal, setInternal] = useState("");

  const selected = value ?? internal;

   const handleChange = (e) => {
    if (value === undefined) {
      setInternal(e.target.value);
    }

    onChange?.(e);
  };


  return (
    <div className="relative md:w-80 w-full">
      <select
        className="
          w-full
          appearance-none
          rounded-lg
          px-3 py-2
          text-sm
          shadow-sm
          transition
          focus:outline-none
          focus:ring-2
        "
        value={selected}
        onChange={handleChange}
        style={{
          background: theme.card,
          color: theme.text.primary,
          border: `1px solid ${theme.border}`,
        }}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((opt, i) => (
          <option key={i} value={opt.value || opt}>
            {opt.label || opt}
          </option>
        ))}
      </select>

      {/* arrow */}
      <div
        className="absolute right-3 top-2.5 pointer-events-none"
        style={{ color: theme.text.muted }}
      >
        ▼
      </div>
    </div>
  );
}