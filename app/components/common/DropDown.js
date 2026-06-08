export default function Dropdown({
  label,
  value,
  options,
  onChange,
}) {
  return (
    <div>

      {label && (
        <label className="block mb-2 text-sm">
          {label}
        </label>
      )}

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="w-full border rounded-lg px-4 py-2"
      >

        <option value="">
          Select
        </option>

        {options.map((item) => (
          <option
            key={item.value}
            value={item.value}
          >
            {item.label}
          </option>
        ))}

      </select>

    </div>
  );
}