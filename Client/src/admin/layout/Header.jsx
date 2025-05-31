import "./Header.scss"

const Header = ({ setIsAuthenticated, setSidebarOpen, sidebarOpen }) => {
  const handleLogout = () => {
    setIsAuthenticated(false)
  }

  return (
    <header className="header">
      <div className="header-left">
        <button className="sidebar-toggle" onClick={() => setSidebarOpen(!sidebarOpen)}>
          ☰
        </button>
        <h1 className="page-title">Admin Dashboard</h1>
      </div>

      <div className="header-right">
        <div className="user-menu">
          <div className="user-info">
            <span className="user-avatar">👤</span>
            <span className="user-name">Admin</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
