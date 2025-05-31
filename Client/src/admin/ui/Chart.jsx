import "./Chart.scss"

const Chart = () => {
  const data = [
    { month: "Jan", value: 65 },
    { month: "Feb", value: 78 },
    { month: "Mar", value: 52 },
    { month: "Apr", value: 85 },
    { month: "May", value: 92 },
    { month: "Jun", value: 75 },
  ]

  const maxValue = Math.max(...data.map((d) => d.value))

  return (
    <div className="chart-container">
      <h3>Orders Overview</h3>
      <div className="chart">
        {data.map((item, index) => (
          <div key={index} className="chart-bar">
            <div
              className="bar"
              style={{
                height: `${(item.value / maxValue) * 200}px`,
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <span className="value">{item.value}</span>
            </div>
            <span className="label">{item.month}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Chart
