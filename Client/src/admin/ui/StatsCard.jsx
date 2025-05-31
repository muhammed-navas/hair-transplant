import "./StatsCard.scss"

const StatsCard = ({ title, value, icon, color }) => {
  return (
    <div className="stats-card" style={{ borderLeftColor: color }}>
      <div className="stats-content">
        <div className="stats-text">
          <h3>{title}</h3>
          <p>{value}</p>
        </div>
        <div className="stats-icon" style={{ backgroundColor: color }}>
          {icon}
        </div>
      </div>
    </div>
  )
}

export default StatsCard;
