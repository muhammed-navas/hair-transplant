
import { useEffect, useState } from "react";
import DashboardHome from "../page/DashboardHome";
import Orders from "../page/Orders";
import Users from "../page/Users";
import Settings from "../page/Settings";
import Products from "../page/Products";
import Header from "../layout/Header";
import Sidebar from "../layout/Sidebar";
import "./Dashboard.scss";
import { productAllData } from "../api/Api";


const Dashboard = ({ setIsAuthenticated }) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [productAllDataList,setProductAllDataList] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const data = await productAllData();
      setProductAllDataList(data.products || []);
    };

    fetchData();
  }, []);

  
console.log(productAllDataList, "product data");
  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardHome />;
      case "products":
        return <Products />;
      case "orders":
        return <Orders />;
      case "users":
        return <Users />;
      case "settings":
        return <Settings />;
      default:
        return <DashboardHome />;
    }
  };

  return (
    <div className="dashboard">
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />
      <div className={`main-content ${!sidebarOpen ? "sidebar-closed" : ""}`}>
        <Header
          setIsAuthenticated={setIsAuthenticated}
          setSidebarOpen={setSidebarOpen}
          sidebarOpen={sidebarOpen}
        />
        <div className="content-dashboard">{renderContent()}</div>
      </div>
    </div>
  );
};

export default Dashboard;
