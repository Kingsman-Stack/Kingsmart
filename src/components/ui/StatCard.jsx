/**
 * StatCard
 * Reusable metric card for the dashboard strip.
 * Props: label, value, delta, deltaType ("pos" | "neg" | "neutral")
 */
export default function StatCard({ label, value, delta, deltaType = "pos" }) {
  return (
    <div className="stat-card">
      <div className="stat-label">{label}</div>
      <div className="stat-value">{value}</div>
      {delta && (
        <div className={`stat-delta ${deltaType === "neg" ? "neg" : ""}`}>
          {delta}
        </div>
      )}
    </div>
  );
}
