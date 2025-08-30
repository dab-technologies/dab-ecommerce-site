'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Plus,
  Edit,
  Trash2,
  LogOut,
  Package,
  TrendingUp,
  Users,
  Eye,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import './admin-dashboard.css';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState('');
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalInterests: 0,
    availableProducts: 0,
    soldOutProducts: 0,
  });
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    brand: '',
    image: '',
    tags: [],
    status: 'available',
    featured: false,
    whatsappNumber: '',
  });

  useEffect(() => {
    // Keep your original client-side guard
    const adminSession = localStorage.getItem('adminSession');
    if (!adminSession) {
      router.push('/admin/login');
      return;
    }
    fetchProducts();
  }, []);

  useEffect(() => {
    calculateStats();
  }, [products]);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      setMessage('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = () => {
    const totalProducts = products.length;
    const totalInterests = products.reduce((sum, product) => sum + (product.interests || 0), 0);
    const availableProducts = products.filter(p => p.status === 'available').length;
    const soldOutProducts = products.filter(p => p.status === 'sold out').length;

    setStats({
      totalProducts,
      totalInterests,
      availableProducts,
      soldOutProducts,
    });
  };

  const handleLogout = () => {
    // Clear both localStorage and the cookie used by middleware
    localStorage.removeItem('adminSession');
    document.cookie = 'adminSession=; Max-Age=0; Path=/; SameSite=Lax';
    router.push('/admin/login');
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: '',
      brand: '',
      image: '',
      tags: [],
      status: 'available',
      featured: false,
      whatsappNumber: '',
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = editingProduct ? `/api/products/${editingProduct._id}` : '/api/products';
      const method = editingProduct ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          price: parseFloat(formData.price),
        }),
      });

      if (response.ok) {
        setMessage(editingProduct ? 'Product updated successfully!' : 'Product created successfully!');
        fetchProducts();
        resetForm();
      } else {
        const error = await response.json();
        setMessage(error.error || 'Failed to save product');
      }
    } catch (error) {
      setMessage('Failed to save product');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (product) => {
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      category: product.category,
      brand: product.brand,
      image: product.image,
      tags: product.tags || [],
      status: product.status,
      featured: product.featured || false,
      whatsappNumber: product.whatsappNumber,
    });
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('Product deleted successfully!');
        fetchProducts();
      } else {
        setMessage('Failed to delete product');
      }
    } catch (error) {
      setMessage('Failed to delete product');
    } finally {
      setLoading(false);
    }
  };

  const handleTagChange = (tag, checked) => {
    setFormData(prev => ({
      ...prev,
      tags: checked
        ? [...prev.tags, tag]
        : prev.tags.filter(t => t !== tag)
    }));
  };

  return (
    <>
      <Head>
        <title>Admin Dashboard - EcoStore</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
              <button onClick={handleLogout} className="btn btn-outline bg-[#0E949A]">
                <LogOut className="w-4 h-4 mr-2 " />
                Logout
              </button>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {message && (
            <div className={`alert mb-6 ${message.includes('successfully') ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
              {message.includes('successfully') ?
                <CheckCircle className="h-4 w-4 text-green-600" /> :
                <AlertCircle className="h-4 w-4 text-red-600" />
              }
              <div className={`alert-description ${message.includes('successfully') ? 'text-green-800' : 'text-red-800'}`}>
                {message}
              </div>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="card">
              <div className="card-header flex justify-between items-center space-y-0 pb-2">
                <div className="card-title text-sm font-medium">Total Products</div>
                <Package className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="card-content">
                <div className="text-2xl font-bold">{stats.totalProducts}</div>
              </div>
            </div>

            <div className="card">
              <div className="card-header flex justify-between items-center space-y-0 pb-2">
                <div className="card-title text-sm font-medium">Total Interests</div>
                <Users className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="card-content">
                <div className="text-2xl font-bold">{stats.totalInterests}</div>
              </div>
            </div>

            <div className="card">
              <div className="card-header flex justify-between items-center space-y-0 pb-2">
                <div className="card-title text-sm font-medium">Available</div>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
              <div className="card-content">
                <div className="text-2xl font-bold text-green-600">{stats.availableProducts}</div>
              </div>
            </div>

            <div className="card">
              <div className="card-header flex justify-between items-center space-y-0 pb-2">
                <div className="card-title text-sm font-medium">Sold Out</div>
                <AlertCircle className="h-4 w-4 text-red-600" />
              </div>
              <div className="card-content">
                <div className="text-2xl font-bold text-red-600">{stats.soldOutProducts}</div>
              </div>
            </div>
          </div>

          <div className="tabs space-y-6">
            <div className="tabs-list">
              <button className="tabs-trigger" data-state="active">Manage Products</button>
              <button className="tabs-trigger">Add Product</button>
            </div>

            <div className="tabs-content">
              <div className="card">
                <div className="card-header">
                  <div className="card-title">Products Management</div>
                </div>
                <div className="card-content">
                  <div className="space-y-4">
                    {products.map((product) => (
                      <div key={product._id} className="flex items-center space-x-4 p-4 border rounded-lg">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold">{product.name}</h3>
                          <p className="text-sm text-gray-600">GHS {product.price} • {product.brand}</p>
                          <div className="flex gap-2 mt-1">
                            <span className="badge badge-outline">{product.category}</span>
                            <span className={`badge ${product.status === 'available' ? 'badge-default' : 'badge-secondary'}`}>
                              {product.status}
                            </span>
                            {product.featured && <span className="badge badge-destructive">Featured</span>}

                            {product.tags?.map(tag => (
                              <span key={tag} className="badge badge-outline">{tag}</span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-500 flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            {product.interests || 0}
                          </span>
                          <button
                            onClick={() => handleEdit(product)}
                            className="btn btn-sm btn-outline"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(product._id)}
                            className="btn btn-sm btn-outline btn-red"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="tabs-content">
              <div className="card">
                <div className="card-header">
                  <div className="card-title">{editingProduct ? 'Edit Product' : 'Add New Product'}</div>
                </div>
                <div className="card-content">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label htmlFor="name" className="label">Product Name *</label>
                        <input
                          id="name"
                          className="input"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="price" className="label">Price (GHS) *</label>
                        <input
                          id="price"
                          type="number"
                          step="0.01"
                          className="input"
                          value={formData.price}
                          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="category" className="label">Category *</label>
                        <select
                          className="input"
                          value={formData.category}
                          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                          required
                        >
                          <option value="">Select category</option>
                          <option value="phones">Phones</option>
                          <option value="laptops">Laptops</option>
                          <option value="cars">Cars</option>
                          <option value="accessories">Accessories</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="brand" className="label">Brand *</label>
                        <input
                          id="brand"
                          className="input"
                          value={formData.brand}
                          onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="whatsapp" className="label">WhatsApp Number *</label>
                        <input
                          id="whatsapp"
                          className="input"
                          placeholder="1234567890 (without +)"
                          value={formData.whatsappNumber}
                          onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                          required
                        />
                      </div>

                      <div className="space-y-2">
                        <label htmlFor="status" className="label">Status</label>
                        <select
                          className="input"
                          value={formData.status}
                          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        >
                          <option value="available">Available</option>
                          <option value="sold out">Sold Out</option>
                        </select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="image" className="label">Image URL *</label>
                      <input
                        id="image"
                        type="url"
                        className="input"
                        placeholder="https://example.com/image.jpg"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="description" className="label">Description *</label>
                      <textarea
                        id="description"
                        rows={4}
                        className="textarea"
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-3">
                      <div className="label">Tags</div>
                      <div className="flex gap-4">
                        {['new', 'hot deal', 'used'].map((tag) => (
                          <div key={tag} className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id={tag}
                              className="checkbox"
                              checked={formData.tags.includes(tag)}
                              onChange={(e) => handleTagChange(tag, e.target.checked)}
                            />
                            <label htmlFor={tag} className="label capitalize">{tag}</label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="featured"
                        className="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      />
                      <label htmlFor="featured" className="label">Featured Product</label>
                    </div>

                    <div className="flex gap-4">
                      <button type="submit" className={`btn btn-primary ${loading ? 'loading' : ''}`} disabled={loading}>
                        {loading ? 'Saving...' : editingProduct ? 'Update Product' : 'Add Product'}
                      </button>
                      {editingProduct && (
                        <button type="button" className="btn btn-outline" onClick={resetForm}>
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
