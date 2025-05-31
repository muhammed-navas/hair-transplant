import { useState } from "react"
import Modal from "../ui/Modal"
import "./Products.scss"

const Products = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "iPhone 14", price: "$999", status: "active", category: "Electronics" },
    { id: 2, name: "MacBook Pro", price: "$1999", status: "active", category: "Electronics" },
    { id: 3, name: "Nike Shoes", price: "$129", status: "inactive", category: "Fashion" },
    { id: 4, name: "Coffee Mug", price: "$19", status: "active", category: "Home" },
  ])

  const [showModal, setShowModal] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)
  const [filters, setFilters] = useState({ name: "", status: "all" })

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    status: "active",
  })

  const handleAddProduct = () => {
    setEditingProduct(null)
    setFormData({ name: "", price: "", category: "", status: "active" })
    setShowModal(true)
  }

  const handleEditProduct = (product) => {
    setEditingProduct(product)
    setFormData(product)
    setShowModal(true)
  }

  const handleDeleteProduct = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      setProducts(products.filter((p) => p.id !== id))
    }
  }

  const handleToggleStatus = (id) => {
    setProducts(
      products.map((p) => (p.id === id ? { ...p, status: p.status === "active" ? "inactive" : "active" } : p)),
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (editingProduct) {
      setProducts(products.map((p) => (p.id === editingProduct.id ? { ...formData, id: editingProduct.id } : p)))
    } else {
      setProducts([...products, { ...formData, id: Date.now() }])
    }
    setShowModal(false)
  }

  const filteredProducts = products.filter((product) => {
    const nameMatch = product.name.toLowerCase().includes(filters.name.toLowerCase())
    const statusMatch = filters.status === "all" || product.status === filters.status
    return nameMatch && statusMatch
  })

  return (
    <div className="products-page">
      <div className="page-header">
        <h2>Products Management</h2>
        <button className="add-btn" onClick={handleAddProduct}>
          + Add Product
        </button>
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <input
            type="text"
            placeholder="Search by product name..."
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
            className="search-input"
          />
        </div>
        <div className="filter-group">
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            className="status-filter"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      <div className="products-table">
        <table>
          <thead>
            <tr>
              <th>Product Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>
                  <span className={`status ${product.status}`}>{product.status}</span>
                </td>
                <td>
                  <div className="actions">
                    <button className="edit-btn" onClick={() => handleEditProduct(product)}>
                      Edit
                    </button>
                    <button className={`toggle-btn ${product.status}`} onClick={() => handleToggleStatus(product.id)}>
                      {product.status === "active" ? "Disable" : "Enable"}
                    </button>
                    <button className="delete-btn" onClick={() => handleDeleteProduct(product.id)}>
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <form onSubmit={handleSubmit} className="product-form">
            <h3>{editingProduct ? "Edit Product" : "Add New Product"}</h3>

            <div className="form-group">
              <label>Product Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Price</label>
              <input
                type="text"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label>Status</label>
              <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })}>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>

            <div className="form-actions">
              <button type="button" onClick={() => setShowModal(false)}>
                Cancel
              </button>
              <button type="submit">{editingProduct ? "Update" : "Add"} Product</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}

export default Products
