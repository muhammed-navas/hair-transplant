import { useContext, useState, useEffect } from "react";
import "./profile.scss";
import { axiosInterceptorPage } from "../../componets/Interceptor/interceptor";
import { ContextApi } from "../../componets/Contextapi/Context";
import { toast, Toaster } from 'react-hot-toast';

const ProfilePage = () => {
  const { handleLogout, user, setUser } = useContext(ContextApi); // Added setUser to update context

  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const [profileData, setProfileData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    mobile: user?.mobile || "",
    location: {
      state: user?.location?.state || "",
      area: user?.location?.area || "",
    },
  });

  const [editData, setEditData] = useState({ ...profileData });

  const axiosInstance = axiosInterceptorPage();

  // Update profileData when user context changes
  useEffect(() => {
    if (user) {
      const updatedData = {
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        mobile: user.mobile || "",
        location: {
          state: user.location?.state || "",
          area: user.location?.area || "",
        },
      };
      setProfileData(updatedData);
      setEditData(updatedData);
    }
  }, [user]);

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
    {
      id: "ORD-002",
      productName: "Smart Watch Series 5",
      productImage:
        "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&h=150&fit=crop",
      orderDate: "2024-05-15",
      price: "$299.99",
      status: "Shipped",
    },
  ]);

  const handleEdit = () => {
    setIsEditing(true);
    setEditData({ ...profileData });
    setError("");
    setSuccessMessage("");
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditData({ ...profileData });
    setError("");
    setSuccessMessage("");
  };

  const validateForm = () => {
    if (!editData.firstName.trim()) {
      setError("First name is required");
      return false;
    }
    if (!editData.lastName.trim()) {
      setError("Last name is required");
      return false;
    }
    if (!editData.email.trim()) {
      setError("Email is required");
      return false;
    }

    // Email validation
    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(editData.email)) {
      setError("Please enter a valid email address");
      return false;
    }

    return true;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccessMessage("");

    try {
      const response = await axiosInstance.put(
        "http://localhost:5000/api/user/profile",
        editData
      );

      if (response.status === 200 && response.data.success) {

        toast.success("Profile updated Successful..!", {
          position: "top-center",
        });
        const updatedUser = response.data.data;

        // Update local state
        setProfileData({ ...editData });
        setIsEditing(false);

        // Update user context if setUser is available
        if (setUser) {
          setUser(updatedUser);
        }

        setSuccessMessage("Profile updated successfully!");

        // Clear success message after 3 seconds
        setTimeout(() => {
          setSuccessMessage("");
        }, 3000);
      }
    } catch (error) {
      console.error("Error updating profile:", error);

      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.response?.data?.errors) {
        setError(error.response.data.errors.join(", "));
      } else {
        setError("Failed to update profile. Please try again.");
      }
    } finally {
      setIsLoading(false);
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

    // Clear error when user starts typing
    if (error) {
      setError("");
    }
  };

  const getInitials = () => {
    const firstName = profileData.firstName || "";
    const lastName = profileData.lastName || "";
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="profile-main">
      <div className="profile-container">
        <div className="profile-header">
          <h1>My Profile</h1>
          <button className="logout-btn" onClick={handleLogout}>
            <span className="icon">⏻</span>
            Logout
          </button>
        </div>

        <div className="profile-content">
          {/* Profile Information Card */}
          <div className="profile-card">
            <div className="profile-card-header">
              <div className="avatar-section">
                <div className="avatar">
                  {getInitials() || <span className="icon-large">👤</span>}
                </div>
                <div className="user-info">
                  <h2 className="user-name">
                    {`${profileData.firstName} ${profileData.lastName}`.trim() ||
                      "User"}
                  </h2>
                  <div className="user-status">
                    <span className="status-dot"></span>
                    Premium User
                  </div>
                </div>
              </div>
              <div className="edit-actions">
                {!isEditing ? (
                  <button className="edit-btn" onClick={handleEdit}>
                    <span className="icon">✏️</span>
                    Edit Profile
                  </button>
                ) : (
                  <div className="edit-controls">
                    <button
                      className="save-btn"
                      onClick={handleSave}
                      disabled={isLoading}
                    >
                      <span className="icon">💾</span>
                      {isLoading ? "Saving..." : "Save"}
                    </button>
                    <button
                      className="cancel-btn"
                      onClick={handleCancel}
                      disabled={isLoading}
                    >
                      <span className="icon">✕</span>
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>

            {error && (
              <div className="error-message">
                <span className="icon-small">⚠️</span>
                {error}
              </div>
            )}

            {successMessage && (
              <div className="success-message">
                <span className="icon-small">✅</span>
                {successMessage}
              </div>
            )}

            <div className="profile-fields">
              <div className="field-group">
                <div className="name-fields">
                  <div className="field">
                    <label>
                      <span className="icon">👤</span>
                      First Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="firstName"
                        value={editData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        className="edit-input"
                        placeholder="Enter first name"
                        required
                      />
                    ) : (
                      <span className="field-value">
                        {profileData.firstName || "Not provided"}
                      </span>
                    )}
                  </div>
                  <div className="field">
                    <label>
                      <span className="icon">👤</span>
                      Last Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="lastName"
                        value={editData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        className="edit-input"
                        placeholder="Enter last name"
                        required
                      />
                    ) : (
                      <span className="field-value">
                        {profileData.lastName || "Not provided"}
                      </span>
                    )}
                  </div>
                </div>

                <div className="field">
                  <label>
                    <span className="icon">✉️</span>
                    Email Address
                  </label>
                  {isEditing ? (
                    <input
                      type="email"
                      value={editData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="edit-input"
                      placeholder="Enter email address"
                      required
                    />
                  ) : (
                    <span className="field-value">
                      {profileData.email || "Not provided"}
                    </span>
                  )}
                </div>

                <div className="field">
                  <label>
                    <span className="icon">📞</span>
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
                      placeholder="Enter mobile number"
                    />
                  ) : (
                    <span className="field-value">
                      {profileData.mobile || "Not provided"}
                    </span>
                  )}
                </div>

                <div className="location-fields">
                  <div className="field">
                    <label>
                      <span className="icon">📍</span>
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
                        placeholder="Enter state"
                      />
                    ) : (
                      <span className="field-value">
                        {profileData.location.state || "Not provided"}
                      </span>
                    )}
                  </div>

                  <div className="field">
                    <label>
                      <span className="icon">📍</span>
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
                        placeholder="Enter area"
                      />
                    ) : (
                      <span className="field-value">
                        {profileData.location.area || "Not provided"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Orders Section */}
          <div className="orders-section">
            <div className="section-header">
              <h2>Recent Orders</h2>
              <span className="order-count">{recentOrders.length} orders</span>
            </div>

            {recentOrders.length > 0 ? (
              <div className="orders-grid">
                {recentOrders.map((order) => (
                  <div key={order.id} className="order-card">
                    <div className="order-image">
                      <img
                        src={order.productImage || "/placeholder.svg"}
                        alt={order.productName}
                      />
                    </div>
                    <div className="order-details">
                      <h3>{order.productName}</h3>
                      <div className="order-info">
                        <span className="order-id">#{order.id}</span>
                        <span className="order-date">
                          <span className="icon-small">📅</span>
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
                <span className="icon-xl">📦</span>
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
              <div className="stat-icon">
                <span className="icon">📦</span>
              </div>
              <div className="stat-info">
                <span className="stat-number">{recentOrders.length}</span>
                <span className="stat-label">Total Orders</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <span className="icon">⭐</span>
              </div>
              <div className="stat-info">
                <span className="stat-number">5.0</span>
                <span className="stat-label">Rating</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <span className="icon">📅</span>
              </div>
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
