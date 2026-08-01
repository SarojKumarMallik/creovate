import React, { useState, ChangeEvent, useEffect } from "react";
import { 
  Plus, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  ChevronLeft,
  ChevronRight,
  X,
  AlertCircle,
  Folder,
  Tag,
  Calendar,
  Eye,
  EyeOff,
  Loader2
} from "lucide-react";
import axios from "axios";

// Types
interface CategoryFormData {
  id?: string;
  name: string;
  slug: string;
  description: string;
  parentCategory: string;
  status: "active" | "inactive";
  createdAt?: string;
  postCount?: number;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
  error?: string;
}

// const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const API_URL = 'https://api.creovatetechnologies.in/api';
// const BASE_URL = 'https://api.creovatetechnologies.in';

const Createcategory: React.FC = () => {
  const [categories, setCategories] = useState<CategoryFormData[]>([]);
  const [formData, setFormData] = useState<CategoryFormData>({
    name: "",
    slug: "",
    description: "",
    parentCategory: "",
    status: "active",
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryFormData | null>(null);
  const [showViewModal, setShowViewModal] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalCategories, setTotalCategories] = useState<number>(0);
  
  const categoriesPerPage = 5;

  // Fetch categories from API
  const fetchCategories = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${API_URL}/categories`, {
        params: {
          search: searchTerm || undefined,
          status: filterStatus !== 'all' ? filterStatus : undefined,
          page: currentPage,
          limit: categoriesPerPage,
        },
      });
      
      if (response.data.success) {
        setCategories(response.data.data);
        setTotalPages(response.data.pagination.totalPages);
        setTotalCategories(response.data.pagination.total);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
      // alert('Failed to fetch categories. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch categories on mount and when filters change
  useEffect(() => {
    fetchCategories();
  }, [searchTerm, filterStatus, currentPage]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "name") {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, "-")
        .substring(0, 50);
      
      setFormData((prev) => ({
        ...prev,
        name: value,
        slug: slug,
      }));
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      description: "",
      parentCategory: "",
      status: "active",
    });
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = (category: CategoryFormData) => {
    setFormData(category);
    setEditingId(category.id || null);
    setIsEditing(true);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (deleteId !== null) {
      try {
        const response = await axios.delete(`${API_URL}/categories/${deleteId}`);
        if (response.data.success) {
          alert('Category deleted successfully!');
          fetchCategories();
        }
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('Failed to delete category. Please try again.');
      } finally {
        setShowDeleteModal(false);
        setDeleteId(null);
      }
    }
  };

  const handleView = (category: CategoryFormData) => {
    setSelectedCategory(category);
    setShowViewModal(true);
  };

  const handleSubmit = async (status?: "active" | "inactive") => {
    setIsSubmitting(true);

    const payload = {
      name: formData.name,
      description: formData.description,
      parentCategory: formData.parentCategory || 'None',
      status: status || formData.status,
    };

    try {
      let response: any;
      
      if (isEditing && editingId) {
        // Update existing category
        response = await axios.put(`${API_URL}/categories/${editingId}`, payload);
        if (response.data.success) {
          alert('Category updated successfully!');
        }
      } else {
        // Create new category
        response = await axios.post(`${API_URL}/categories`, payload);
        if (response.data.success) {
          alert('Category created successfully!');
        }
      }
      
      resetForm();
      setShowForm(false);
      fetchCategories();
    } catch (error: any) {
      console.error('Error saving category:', error);
      const errorMessage = error.response?.data?.message || 'Failed to save category. Please try again.';
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get unique parent categories for dropdown
  const parentOptions = ["None", ...categories.map(cat => cat.name)];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Top Gradient */}
      <div className="h-2 bg-gradient-to-r from-[#FF6B00] via-[#2563EB] to-[#00C2FF]" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="border-b p-6 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {showForm ? (isEditing ? "Edit Category" : "Create New Category") : "Category Management"}
              </h1>
              <p className="text-gray-500 mt-1">
                {showForm ? "Organize your blog content with categories" : "Manage your blog categories"}
              </p>
            </div>
            {!showForm && (
              <button
                onClick={() => {
                  resetForm();
                  setShowForm(true);
                }}
                className="bg-gradient-to-r from-[#FF6B00] via-[#2563EB] to-[#00C2FF] text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:opacity-90 transition"
              >
                <Plus size={20} />
                Create New Category
              </button>
            )}
          </div>

          {/* Search and Filter */}
          {!showForm && (
            <div className="p-6 flex flex-wrap gap-4 items-center justify-between border-b">
              <div className="flex flex-wrap gap-4 items-center flex-1">
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search categories..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2563EB] outline-none"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={filterStatus}
                    onChange={(e) => {
                      setFilterStatus(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="border rounded-lg px-8 py-2 focus:ring-2 focus:ring-[#2563EB] outline-none"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {isLoading ? 'Loading...' : `${totalCategories} categor${totalCategories !== 1 ? 'ies' : 'y'} found`}
              </div>
            </div>
          )}

          {/* Category List */}
          {!showForm && (
            <div className="overflow-x-auto">
              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 text-[#2563EB] animate-spin" />
                  <span className="ml-2 text-gray-600">Loading categories...</span>
                </div>
              ) : (
                <>
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Slug</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Posts</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Parent</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {categories.map((category) => (
                        <tr key={category.id} className="hover:bg-gray-50 transition">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center">
                                <Folder size={20} className="text-indigo-600" />
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{category.name}</div>
                                <div className="text-sm text-gray-500 line-clamp-1">{category.description}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            /{category.slug}
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                              {category.postCount || 0} posts
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {category.parentCategory || "None"}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                              category.status === 'active' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {category.status.charAt(0).toUpperCase() + category.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {category.createdAt ? new Date(category.createdAt).toLocaleDateString() : '-'}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <div className="flex items-center justify-end gap-1">
                              <button
                                onClick={() => handleView(category)}
                                className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                                title="View Details"
                              >
                                <Eye size={18} />
                              </button>
                              <button
                                onClick={() => handleEdit(category)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                title="Edit"
                              >
                                <Edit size={18} />
                              </button>
                              <button
                                onClick={() => handleDelete(category.id!)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
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

                  {/* Empty State */}
                  {categories.length === 0 && (
                    <div className="text-center py-12">
                      <Folder className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 mb-2">No categories found</h3>
                      <p className="text-gray-500">Create your first category to organize your blog posts</p>
                    </div>
                  )}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="px-6 py-4 flex items-center justify-between border-t">
                      <div className="text-sm text-gray-500">
                        Showing {categories.length > 0 ? ((currentPage - 1) * categoriesPerPage) + 1 : 0} to {Math.min(currentPage * categoriesPerPage, totalCategories)} of {totalCategories} entries
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                          disabled={currentPage === 1}
                          className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ChevronLeft size={18} />
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setCurrentPage(index + 1)}
                            className={`px-3 py-1 rounded-lg ${
                              currentPage === index + 1
                                ? 'bg-[#2563EB] text-white'
                                : 'border hover:bg-gray-50'
                            }`}
                          >
                            {index + 1}
                          </button>
                        ))}
                        <button
                          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                          disabled={currentPage === totalPages}
                          className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <ChevronRight size={18} />
                        </button>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          )}

          {/* Create/Edit Form */}
          {showForm && (
            <div className="p-6">
              <div className="grid lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Category Name */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Category Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter category name"
                      className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#2563EB] outline-none transition"
                      required
                    />
                  </div>

                  {/* Slug */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Category Slug
                    </label>
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleChange}
                      className="w-full border rounded-lg p-3 bg-gray-100"
                      placeholder="auto-generated-from-name"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      URL: /category/{formData.slug || "your-category-slug"}
                    </p>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={4}
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Enter category description"
                      className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#2563EB] outline-none transition"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      {formData.description.length}/200 characters
                    </p>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Parent Category */}
                  <div className="bg-gray-50 border rounded-lg p-5">
                    <h3 className="font-semibold mb-4 text-gray-800">Parent Category</h3>

                    <select
                      name="parentCategory"
                      value={formData.parentCategory}
                      onChange={handleChange}
                      className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#2563EB] outline-none transition"
                    >
                      <option value="">Select Parent Category</option>
                      {parentOptions.map((parent) => (
                        <option key={parent} value={parent}>
                          {parent}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Status */}
                  <div className="bg-gray-50 border rounded-lg p-5">
                    <h3 className="font-semibold mb-4 text-gray-800">Status</h3>

                    <div className="space-y-2">
                      <button
                        onClick={() => handleSubmit("active")}
                        disabled={isSubmitting}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                        {isSubmitting ? "Saving..." : "Save as Active"}
                      </button>

                      <button
                        onClick={() => handleSubmit("inactive")}
                        disabled={isSubmitting}
                        className="w-full bg-gray-600 hover:bg-gray-700 text-white py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                        {isSubmitting ? "Saving..." : "Save as Inactive"}
                      </button>

                      <button
                        onClick={() => {
                          resetForm();
                          setShowForm(false);
                        }}
                        className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-50 transition"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>

                  {/* Preview URL */}
                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                    <h4 className="font-semibold mb-2 text-indigo-900">
                      Preview URL
                    </h4>
                    <p className="text-sm text-indigo-700 break-all">
                      /category/{formData.slug || "your-category-slug"}
                    </p>
                  </div>

                  {/* Status Indicator */}
                  <div className="bg-gray-50 border rounded-lg p-4">
                    <h4 className="font-semibold mb-2 text-gray-800">
                      Current Status
                    </h4>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium
                      ${formData.status === 'active' ? 'bg-green-100 text-green-700' : 
                        'bg-red-100 text-red-700'}`}
                    >
                      {formData.status.charAt(0).toUpperCase() + formData.status.slice(1)}
                    </span>
                    {isEditing && (
                      <p className="text-xs text-gray-500 mt-2">Editing: ID #{editingId}</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl animate-fadeIn">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Delete Category
                </h3>
                <p className="text-gray-600 text-sm">
                  Are you sure you want to delete this category? This action cannot be undone.
                  Posts in this category will be moved to "Uncategorized".
                </p>
                <div className="flex gap-3 mt-6">
                  <button
                    onClick={() => setShowDeleteModal(false)}
                    className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* View Category Modal */}
      {showViewModal && selectedCategory && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 shadow-2xl animate-fadeIn">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-indigo-100 to-purple-100 flex items-center justify-center">
                  <Folder size={24} className="text-indigo-600" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{selectedCategory.name}</h3>
                  <p className="text-sm text-gray-500">Category Details</p>
                </div>
              </div>
              <button
                onClick={() => setShowViewModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-semibold text-gray-500">Slug</label>
                  <p className="text-gray-900">/{selectedCategory.slug}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-500">Status</label>
                  <p>
                    <span className={`inline-block px-2 py-1 text-xs rounded-full font-medium ${
                      selectedCategory.status === 'active' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {selectedCategory.status.charAt(0).toUpperCase() + selectedCategory.status.slice(1)}
                    </span>
                  </p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-500">Parent Category</label>
                  <p className="text-gray-900">{selectedCategory.parentCategory || "None"}</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-500">Posts</label>
                  <p className="text-gray-900">{selectedCategory.postCount || 0} posts</p>
                </div>
                <div>
                  <label className="text-sm font-semibold text-gray-500">Created</label>
                  <p className="text-gray-900">{selectedCategory.createdAt ? new Date(selectedCategory.createdAt).toLocaleDateString() : '-'}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-500">Description</label>
                <p className="text-gray-900 mt-1">{selectedCategory.description}</p>
              </div>
            </div>

            <div className="flex gap-3 mt-6 pt-4 border-t">
              <button
                onClick={() => {
                  setShowViewModal(false);
                  handleEdit(selectedCategory);
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
              >
                Edit Category
              </button>
              <button
                onClick={() => setShowViewModal(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-50 transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out forwards;
        }
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default Createcategory;