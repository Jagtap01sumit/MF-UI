export default function Card({
  title,
  children,
  className = "",
}) {
  return (
    <div
      className={`bg-white rounded-xl shadow-sm border p-5 ${className}`}
    >
      {title && (
        <h3 className="font-semibold mb-4">
          {title}
        </h3>
      )}

      {children}
    </div>
  );
}