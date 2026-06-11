export default function ChartCard({ title, children, theme }) {
  return (
    <div
      className="
        w-full
        rounded-2xl
        p-4 md:p-5
        shadow-sm
      "
      style={{
        background: theme.card,
        border: `1px solid ${theme.border}`,
      }}
    >
      {/* Header */}
      <h2
        className="text-sm md:text-base font-semibold mb-4"
        style={{ color: theme.text.primary }}
      >
        {title}
      </h2>

      {/* Chart content */}
      <div className="w-full h-[300px]">
        {children}
      </div>
    </div>
  );
}

