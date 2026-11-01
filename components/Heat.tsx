export default function Heat({ level }: { level: number }) {
  const labels = ["No heat", "Mild", "Warm", "Hot"];
  return (
    <span className="inline-flex items-center gap-1" title={`Heat as written: ${labels[level] ?? "Mild"}`}>
      {[1, 2, 3].map((i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block h-3 w-3 rounded-full border-2 border-ink"
          style={{ background: i <= level ? "#C8321F" : "transparent" }}
        />
      ))}
      <span className="ml-1 text-xs font-extrabold uppercase tracking-wider">{labels[level] ?? "Mild"}</span>
    </span>
  );
}
