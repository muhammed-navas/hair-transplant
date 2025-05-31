import Chart from "../ui/Chart";
import StatsCard from "../ui/StatsCard";
import "./DashboardHome.scss"

const DashboardHome = () => {
  const stats = [
    { title: "Total Users", value: "1,234", icon: "👥", color: "#667eea" },
    { title: "Total Products", value: "567", icon: "📦", color: "#28a745" },
    { title: "Total Orders", value: "890", icon: "🛒", color: "#ffc107" },
    { title: "Revenue", value: "$12,345", icon: "💰", color: "#dc3545" },
  ];

  return (
    <div className="dashboard-home">
      <div className="page-header">
        <h2>Dashboard Overview</h2>
        <p>Welcome back, Admin! Here's what's happening with your store.</p>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      <div className="charts-section">
        <div className="chart-container">
          <Chart />
        </div>
      </div>
    </div>
  );
};

export default DashboardHome
