"use client";
import AnimatedNumbers from "react-animated-numbers";
export default function KpiCard({
  title,
  value,
  icon: Icon,
  color,
  theme,
  prefix,
  suffix,
  subtitle,
}) {

  return (
    <div
      className="
        w-full
        min-h-[150px] md:min-h-[160px]
        rounded-2xl
        p-4 md:p-5 md:pb-0
        transition-all duration-300
        hover:-translate-y-1
        cursor-pointer
        flex  md:flex-row
        md:justify-between
        gap-4
       flex-col-reverse
       md:mt-2 mt-1
      "
      style={{
        background: theme.card,
        border: `1px solid ${theme.border}`,
      }}
    >
      {/* LEFT / CONTENT */}
      <div className="flex flex-col flex-1 min-w-0">
        <p
          className="text-sm md:text-sm font-medium"
          style={{ color: theme.text.secondary }}
        >
          {title}
        </p>{" "}
        <div>
          {" "}
          {prefix && <label className="text-lg md:text-lg font-bold mt-2" style={{ color: theme.text.primary }}>{prefix}</label>}
        
          <AnimatedNumbers
            animateToNumber={value}
            className="text-lg md:text-lg font-bold mt-2"
            transitions={(index) => ({
              type: "spring",
              duration: index + 0.3,
            })}
            fontStyle={{ color: theme.text.primary }}
          />
          {suffix && <label className="text-lg md:text-lg font-bold mt-2" style={{ color: theme.text.primary}}>{suffix}</label>}
        </div>
      
        {subtitle && (
          <p className="text-sm mt-2" style={{ color: theme.text.muted }}>
            {subtitle}
          </p>
        )}
      </div>

      {/* ICON */}
      {Icon && (
        <div
          className="
            flex items-center justify-center
            w-12 h-12 md:w-14 md:h-8
            rounded-xl
            shrink-0
            shadow-lg
            self-start md:self-start md:ml-auto
          "
          style={{
            background: `${color}20`,
            boxShadow: `0 8px 20px ${color}30`,
          }}
        >
          <Icon size={24} style={{ color }} />
        </div>
      )}
    </div>
  );
}
