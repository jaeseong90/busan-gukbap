export function Rating({
  value,
  count,
  size = "sm",
}: {
  value: number;
  count?: number;
  size?: "sm" | "lg";
}) {
  const stars = Math.round(value);
  const text = size === "lg" ? "text-base" : "text-sm";
  return (
    <span className={`inline-flex items-center gap-1 ${text} text-ink/80`}>
      <span className="text-orange">
        {"★".repeat(stars)}
        <span className="text-ink/15">{"★".repeat(5 - stars)}</span>
      </span>
      <span className="font-medium">{value.toFixed(1)}</span>
      {typeof count === "number" && (
        <span className="text-ink/50">({count})</span>
      )}
    </span>
  );
}
