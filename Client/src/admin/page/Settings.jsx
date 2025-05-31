"use client"

import { useState } from "react"
import "./Settings.scss"

const Settings = () => {
  const [settings, setSettings] = useState({
    siteName: "E-Commerce Store",
    email: "admin@store.com",
    currency: "USD",
    timezone: "UTC",
    notifications: true,
    darkMode: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("Settings saved successfully!")
  }

  return (
    <div className="settings-page">
      <div className="page-header">
        <h2>Settings</h2>
        <p>Manage your store settings and preferences</p>
      </div>

      <div className="settings-container">
        <form onSubmit={handleSubmit} className="settings-form">
          <div className="settings-section">
            <h3>General Settings</h3>

            <div className="form-group">
              <label>Site Name</label>
              <input type="text" name="siteName" value={settings.siteName} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Admin Email</label>
              <input type="email" name="email" value={settings.email} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Currency</label>
              <select name="currency" value={settings.currency} onChange={handleChange}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>

            <div className="form-group">
              <label>Timezone</label>
              <select name="timezone" value={settings.timezone} onChange={handleChange}>
                <option value="UTC">UTC</option>
                <option value="EST">EST</option>
                <option value="PST">PST</option>
              </select>
            </div>
          </div>

          <div className="settings-section">
            <h3>Preferences</h3>

            <div className="form-group checkbox-group">
              <label>
                <input type="checkbox" name="notifications" checked={settings.notifications} onChange={handleChange} />
                <span>Enable Email Notifications</span>
              </label>
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input type="checkbox" name="darkMode" checked={settings.darkMode} onChange={handleChange} />
                <span>Dark Mode</span>
              </label>
            </div>
          </div>

          <button type="submit" className="save-btn">
            Save Settings
          </button>
        </form>
      </div>
    </div>
  )
}

export default Settings
