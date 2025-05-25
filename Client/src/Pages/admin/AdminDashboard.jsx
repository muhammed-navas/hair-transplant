import React, { useState } from "react";
import "./admin.scss"; 

const AdminDashboard = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    price: "",
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Product name is required" ;
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.image.trim()) newErrors.image = "Image URL is required";
    if (!formData.price.trim()) {
      newErrors.price = "Price is required";
    } else if (isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = "Please enter a valid price";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setSuccessMessage("");

    try {
      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        image: formData.image.trim(),
        price: parseFloat(formData.price),
      };

      const response = await fetch(
        "http://localhost:5000/api/admin/add-product",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        setSuccessMessage("Product added successfully!");
        setFormData({ name: "", description: "", image: "", price: "" });
        console.log("Product added:", result);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add product");
      }
    } catch (error) {
      console.error("Error adding product:", error);
      setErrors({
        submit: error.message || "Failed to add product. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="adminDashboard">
      {/* <div className="dashboardHeader">
        <h1 className="title">Admin Dashboard</h1>
        <p className="subtitle">Manage your products</p>
      </div> */}

      <div className="productFormContainer">
        <div className="productFormBox">
          <h2 className="formTitle">Add New Product</h2>

          {successMessage && (
            <div className="successMessage">{successMessage}</div>
          )}

          <form onSubmit={handleSubmit} className="productForm">
            <div className="inputGroup">
              <label htmlFor="name" className="label">
                Product Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className="input"
              />
              {errors.name && <span className="error">{errors.name}</span>}
            </div>

            <div className="inputGroup">
              <label htmlFor="image" className="label">
                Image URL
              </label>
              <input
                type="url"
                name="image"
                id="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="input"
              />
              {errors.image && <span className="error">{errors.image}</span>}
            </div>

            <div className="inputGroup">
              <label htmlFor="description" className="label">
                Description
              </label>
              <textarea
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter product description"
                className="input textarea"
              />
              {errors.description && (
                <span className="error">{errors.description}</span>
              )}
            </div>

            <div className="inputGroup">
              <label htmlFor="price" className="label">
                Price ($)
              </label>
              <input
                type="number"
                name="price"
                id="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="0.00"
                step="0.01"
                min="0"
                className="input"
              />
              {errors.price && <span className="error">{errors.price}</span>}
            </div>

            {errors.submit && (
              <div className="errorMessage">{errors.submit}</div>
            )}

            <button
              type="submit"
              className={`submitBtn ${loading ? "submitBtnDisabled" : ""}`}
              disabled={loading}
            >
              {loading ? "Adding Product..." : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;


// A premium, medically-approved solution for permanent hair restoration. Ideal for individuals experiencing hair thinning or pattern baldness. Delivers natural-looking results using advanced FUE or FUT techniques. Boosts self-esteem and appearance with minimal downtime and long-term benefits.