"use client"

import { useState } from "react"
import "./Orders.scss"

const Orders = () => {
  const [orders] = useState([
    { id: 1, customer: "John Doe", total: "$299", status: "success", date: "2024-01-15" },
    { id: 2, customer: "Jane Smith", total: "$199", status: "pending", date: "2024-01-14" },
    { id: 3, customer: "Bob Johnson", total: "$399", status: "return", date: "2024-01-13" },
    { id: 4, customer: "Alice Brown", total: "$149", status: "success", date: "2024-01-12" },
    { id: 5, customer: "Charlie Wilson", total: "$249", status: "pending", date: "2024-01-11" },
  ])

  const [statusFilter, setStatusFilter] = useState("all")

  const filteredOrders = orders.filter((order) => statusFilter === "all" || order.status === statusFilter)

  const getStatusColor = (status) => {
    switch (status) {
      case "success":
        return "#28a745"
      case "pending":
        return "#ffc107"
      case "return":
        return "#dc3545"
      default:
        return "#6c757d"
    }
  }

  return (
    <div className="orders-page">
      <div className="page-header">
        <h2>Orders Management</h2>
        <div className="order-stats">
          <div className="stat">
            <span className="stat-value">{orders.filter((o) => o.status === "success").length}</span>
            <span className="stat-label">Success</span>
          </div>
          <div className="stat">
            <span className="stat-value">{orders.filter((o) => o.status === "pending").length}</span>
            <span className="stat-label">Pending</span>
          </div>
          <div className="stat">
            <span className="stat-value">{orders.filter((o) => o.status === "return").length}</span>
            <span className="stat-label">Returns</span>
          </div>
        </div>
      </div>

      <div className="filters-section">
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="status-filter">
          <option value="all">All Orders</option>
          <option value="success">Success</option>
          <option value="pending">Pending</option>
          <option value="return">Returns</option>
        </select>
      </div>

      <div className="orders-table">
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td>#{order.id.toString().padStart(4, "0")}</td>
                <td>{order.customer}</td>
                <td>{order.total}</td>
                <td>
                  <span className={`status ${order.status}`} style={{ backgroundColor: getStatusColor(order.status) }}>
                    {order.status}
                  </span>
                </td>
                <td>{order.date}</td>
                <td>
                  <div className="actions">
                    <button className="view-btn">View</button>
                    <button className="edit-btn">Edit</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Orders
