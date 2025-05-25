import React, { useState } from "react";
import {
  User,
  MapPin,
  Phone,
  Mail,
  Edit3,
  Save,
  X,
  Package,
  Calendar,
  Star,
  LogOut,
} from "lucide-react";
import "./profile.scss";
import { axiosInterceptorPage } from "../../componets/Interceptor/interceptor";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "Maria Fernanda",
    email: "maria.fernanda@email.com",
    mobile: "+1 (555) 123-4567",
    location: {
      state: "California",
      area: "Los Angeles",
    },
  });

  const [editData, setEditData] = useState({ ...profileData });

  const axiosInstance = axiosInterceptorPage();

  // Sample recent order data
  const [recentOrders] = useState([
    {
      id: "ORD-001",
      productName: "Wireless Bluetooth Headphones",
      productImage:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&h=150&fit=crop",
      orderDate: "2024-05-20",
      price: "$89.99",
      status: "Delivered",
    },
  ]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...profileData });
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({ ...profileData });
  };

  const handleSave = async () => {
    try {
      const response = await axiosInstance.post(
        "http://localhost:5000/api/user/profile",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editData),
        }
      );

      if (response.ok) {
        setProfileData({ ...editData });
        setIsEditing(false);
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    }
  };

  const handleInputChange = (field, value) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      setEditData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setEditData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      // Add logout logic here
      console.log("Logging out...");
    }
  };

  return (
    <div className="profile-main">
    <div className="profile-container">
      <div className="profile-header">
        <h1>My Profile</h1>
        <button className="logout-btn" onClick={handleLogout}>
          <LogOut size={20} />
          Logout
        </button>
      </div>

      <div className="profile-content">
        {/* Profile Information Card */}
        <div className="profile-card">
          <div className="profile-card-header">
            <div className="avatar-section">
              <div className="avatar">
                <User size={40} />
              </div>
              <div className="user-status">
                <span className="status-dot"></span>
                Premium User
              </div>
            </div>
            <div className="edit-actions">
              {!isEditing ? (
                <button className="edit-btn" onClick={handleEdit}>
                  <Edit3 size={18} />
                  Edit Profile
                </button>
              ) : (
                <div className="edit-controls">
                  <button className="save-btn" onClick={handleSave}>
                    <Save size={18} />
                    Save
                  </button>
                  <button className="cancel-btn" onClick={handleCancel}>
                    <X size={18} />
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="profile-fields">
            <div className="field-group">
              <div className="field">
                <label>
                  <User size={18} />
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="edit-input"
                  />
                ) : (
                  <span className="field-value">{profileData.name}</span>
                )}
              </div>

              <div className="field">
                <label>
                  <Mail size={18} />
                  Email Address
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={editData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="edit-input"
                  />
                ) : (
                  <span className="field-value">{profileData.email}</span>
                )}
              </div>

              <div className="field">
                <label>
                  <Phone size={18} />
                  Mobile Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editData.mobile}
                    onChange={(e) =>
                      handleInputChange("mobile", e.target.value)
                    }
                    className="edit-input"
                  />
                ) : (
                  <span className="field-value">{profileData.mobile}</span>
                )}
              </div>

              <div className="location-fields">
                <div className="field">
                  <label>
                    <MapPin size={18} />
                    State
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.location.state}
                      onChange={(e) =>
                        handleInputChange("location.state", e.target.value)
                      }
                      className="edit-input"
                    />
                  ) : (
                    <span className="field-value">
                      {profileData.location.state}
                    </span>
                  )}
                </div>

                <div className="field">
                  <label>
                    <MapPin size={18} />
                    Area
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editData.location.area}
                      onChange={(e) =>
                        handleInputChange("location.area", e.target.value)
                      }
                      className="edit-input"
                    />
                  ) : (
                    <span className="field-value">
                      {profileData.location.area}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Orders Section */}
        <div className="orders-section">
          <h2>Recent Orders</h2>

          {recentOrders.length > 0 ? (
            <div className="orders-grid">
              {recentOrders.map((order) => (
                <div key={order.id} className="order-card">
                  <div className="order-image">
                    <img src={order.productImage} alt={order.productName} />
                  </div>
                  <div className="order-details">
                    <h3>{order.productName}</h3>
                    <div className="order-info">
                      <span className="order-id">#{order.id}</span>
                      <span className="order-date">
                        <Calendar size={14} />
                        {new Date(order.orderDate).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="order-footer">
                      <span className="order-price">{order.price}</span>
                      <span
                        className={`order-status ${order.status.toLowerCase()}`}
                      >
                        {order.status}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="empty-orders">
              <Package size={48} />
              <h3>No Recent Orders</h3>
              <p>
                You haven't placed any orders yet. Start shopping to see your
                orders here!
              </p>
              <button className="shop-now-btn">Start Shopping</button>
            </div>
          )}
        </div>

        {/* Additional Profile Stats */}
        <div className="profile-stats">
          <div className="stat-card">
            <Package size={24} />
            <div className="stat-info">
              <span className="stat-number">1</span>
              <span className="stat-label">Total Orders</span>
            </div>
          </div>
          <div className="stat-card">
            <Star size={24} />
            <div className="stat-info">
              <span className="stat-number">5.0</span>
              <span className="stat-label">Rating</span>
            </div>
          </div>
          <div className="stat-card">
            <Calendar size={24} />
            <div className="stat-info">
              <span className="stat-number">2</span>
              <span className="stat-label">Years with us</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default ProfilePage;
