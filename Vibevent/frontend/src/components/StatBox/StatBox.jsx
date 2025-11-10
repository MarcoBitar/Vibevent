import './StatBox.css';

// StatBox displays a labeled metric with a color-coded variant (e.g. purple, green, orange)
export default function StatBox({ label, value, variant }) {
  return (
    <div className={`stat-box ${variant}`}>
      {/* Primary metric value (e.g. 42, "Champion Club") */}
      <div className="stat-value">{value}</div>

      {/* Descriptive label (e.g. "Total Events") */}
      <div className="stat-label">{label}</div>
    </div>
  );
}