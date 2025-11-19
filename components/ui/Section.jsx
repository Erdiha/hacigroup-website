export default function Section({
  children,
  className = "",
  variant = "primary", // "primary" | "secondary" | "tertiary"
  noPadding = false,
}) {
  const bgClasses = {
    primary: "bg-primary",
    secondary: "bg-secondary",
    tertiary: "bg-tertiary",
  };

  return (
    <section
      className={`
        ${bgClasses[variant]}
        ${noPadding ? "" : "section-padding"}
        ${className}
      `.trim()}
    >
      {children}
    </section>
  );
}
