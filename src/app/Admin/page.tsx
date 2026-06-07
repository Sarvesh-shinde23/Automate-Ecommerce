'use client'


import { IProduct, Product, PRODUCTS } from '@/lib/types'
import {Plus, Edit2, Trash2 } from 'lucide-react'
import { useState } from 'react'



import { toast } from 'sonner'





export default function AdminDashboard() {
  const [products, setProducts] = useState<IProduct[]>(PRODUCTS)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    description: '',
    image: '',
    color: '',
  })

  const handleAddProduct = () => {
    if (!formData.name || !formData.price) return

    if (editingId) {
      setProducts(
        products.map((p) =>
          p.id === editingId
            ? {
                ...p,
                ...formData,
                price: parseFloat(formData.price),
              }
            : p
        )
      )
      setEditingId(null)
    } else {
      const newProduct: Product = {
        id: String(Math.max(...products.map((p) => parseInt(p.id)), 0) + 1),
        name: formData.name,
        category: formData.category,
        price: parseFloat(formData.price),
        description: formData.description,
        image: formData.image,
        color: formData.color,
      }
      setProducts([...products, newProduct])
    }

    setFormData({
      name: '',
      category: '',
      price: '',
      description: '',
      image: '',
      color: '',
    })
    setShowForm(false)
  }

  const handleEdit = (product: Product) => {
    setFormData({
      name: product.name,
      category: product.category,
      price: String(product.price),
      description: product.description,
      image: product.image,
      color: product.color,
    })
    setEditingId(product.id)
    setShowForm(true)
  }

  const handleDelete = (id: string) => {
  if (confirm("Are you sure you want to delete this product?")) {
    setProducts(products.filter((p) => p.id !== id))
    toast.success("Product deleted successfully")
  }
}

  const handleCancel = () => {
    setShowForm(false)
    setEditingId(null)
    setFormData({
      name: '',
      category: '',
      price: '',
      description: '',
      image: '',
      color: '',
    })
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
  
      

      {/* Dashboard Content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-foreground">Products</h1>
          <button
            onClick={() => {
              setShowForm(!showForm)
              setEditingId(null)
              setFormData({
                name: '',
                category: '',
                price: '',
                description: '',
                image: '',
                color: '',
              })
            }}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition font-semibold"
          >
            <Plus size={20} />
            Add Product
          </button>
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="mb-8 p-6 bg-card border border-border rounded-lg">
            <h2 className="text-xl font-bold text-foreground mb-6">
              {editingId ? 'Edit Product' : 'Add New Product'}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Product Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-foreground/50 focus:outline-none focus:border-primary"
              />
              <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-foreground/50 focus:outline-none focus:border-primary"
              />
              <input
                type="number"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-foreground/50 focus:outline-none focus:border-primary"
              />
              <input
                type="text"
                placeholder="Color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-foreground/50 focus:outline-none focus:border-primary"
              />
            </div>

            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full mt-4 px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-foreground/50 focus:outline-none focus:border-primary resize-none"
              rows={3}
            />

            <input
              type="text"
              placeholder="Image URL"
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full mt-4 px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-foreground/50 focus:outline-none focus:border-primary"
            />

            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddProduct}
                className="flex-1 px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition"
              >
                {editingId ? 'Update Product' : 'Add Product'}
              </button>
              <button
                onClick={handleCancel}
                className="flex-1 px-4 py-2 border border-border text-foreground font-semibold rounded-lg hover:border-primary transition"
              >
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Products Table */}
        <div className="overflow-x-auto border border-border rounded-lg">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-border bg-card">
              <tr>
                <th className="px-6 py-3 font-semibold text-foreground">Name</th>
                <th className="px-6 py-3 font-semibold text-foreground">Category</th>
                <th className="px-6 py-3 font-semibold text-foreground">Price</th>
                <th className="px-6 py-3 font-semibold text-foreground">Color</th>
                <th className="px-6 py-3 font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-border hover:bg-card/50 transition">
                  <td className="px-6 py-3 text-foreground font-medium">{product.name}</td>
                  <td className="px-6 py-3 text-foreground/70">{product.category}</td>
                  <td className="px-6 py-3 text-primary font-semibold">${product.price}</td>
                  <td className="px-6 py-3 text-foreground/70">{product.color}</td>
                  <td className="px-6 py-3">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-2 text-foreground/70 hover:text-primary transition rounded hover:bg-card"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="p-2 text-foreground/70 hover:text-accent transition rounded hover:bg-card"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-card border border-border rounded-lg">
            <h3 className="text-foreground/70 text-sm font-semibold mb-2">Total Products</h3>
            <p className="text-3xl font-bold text-primary">{products.length}</p>
          </div>
          <div className="p-6 bg-card border border-border rounded-lg">
            <h3 className="text-foreground/70 text-sm font-semibold mb-2">Total Value</h3>
            <p className="text-3xl font-bold text-primary">
              ${products.reduce((sum, p) => sum + p.price, 0).toFixed(2)}
            </p>
          </div>
          <div className="p-6 bg-card border border-border rounded-lg">
            <h3 className="text-foreground/70 text-sm font-semibold mb-2">Avg Price</h3>
            <p className="text-3xl font-bold text-primary">
              ${(products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(2)}
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}
