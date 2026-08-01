import React, { useState, ChangeEvent, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Calendar, 
  User, 
  Tag,
  Filter,
  ChevronLeft,
  ChevronRight,
  X,
  AlertCircle,
  Loader,
  CheckCircle,
  XCircle
} from "lucide-react";

// Types
interface BlogFormData {
  id?: string;
  title: string;
  slug: string;
  category: string;
  content: string;
  metaTitle: string;
  metaKeywords: string;
  metaDescription: string;
  status: "draft" | "published";
  createdAt?: string;
  image?: string;
  views?: number;
  _id?: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  description?: string;
  status?: string;
  createdAt?: string;
}

interface ApiResponse {
  success: boolean;
  message?: string;
  data?: any;
  pagination?: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

// Get API URL from environment or use default
// const API_URL = 'http://localhost:5000/api';
// const BASE_URL = 'http://localhost:5000';
const API_URL = 'https://api.creovatetechnologies.in/api';
const BASE_URL = 'https://api.creovatetechnologies.in';

const Createblog: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogFormData[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState<boolean>(false);
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    slug: "",
    category: "",
    content: "",
    metaTitle: "",
    metaKeywords: "",
    metaDescription: "",
    status: "draft",
  });

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [imageErrors, setImageErrors] = useState<{ [key: string]: boolean }>({});
  
  const blogsPerPage = 5;
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  // Helper function to get image URL
  const getImageUrl = (imagePath: string | undefined) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
    return `${BASE_URL}/${cleanPath}`;
  };

  // Quill editor modules configuration
  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["blockquote", "code-block"],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "font",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "list",
    "bullet",
    "check",
    "indent",
    "align",
    "blockquote",
    "code-block",
    "link",
    "image",
    "video",
  ];

  // Fetch categories from API
  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const response = await fetch(`${API_URL}/categories?limit=100`);
      const result: ApiResponse = await response.json();

      if (result.success) {
        setCategories(result.data || []);
      } else {
        console.error('Failed to fetch categories:', result.message);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoadingCategories(false);
    }
  };

  // Fetch blogs from API
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: blogsPerPage.toString(),
        search: searchTerm,
        status: filterStatus,
      });

      const response = await fetch(`${API_URL}/blogs?${params}`);
      const result: ApiResponse = await response.json();

      if (result.success) {
        const mappedData = result.data?.map((item: any) => ({
          ...item,
          id: item._id,
        })) || [];
        
        setBlogs(mappedData);
        setTotalPages(result.pagination?.totalPages || 1);
        setTotalItems(result.pagination?.totalItems || 0);
        setImageErrors({});
      } else {
        showNotification('error', result.message || 'Failed to fetch blogs');
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      showNotification('error', 'Failed to fetch blogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
    fetchCategories();
  }, [currentPage, searchTerm, filterStatus]);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "title") {
      const slug = value
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, "")
        .replace(/\s+/g, "-")
        .substring(0, 60);
      
      setFormData((prev) => ({
        ...prev,
        title: value,
        slug: slug,
        metaTitle: value.length > 0 ? value : "",
      }));
    }
  };

  const handleContentChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      content: value,
    }));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        showNotification('error', 'Please upload a valid image (JPEG, PNG, GIF, or WebP)');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        showNotification('error', 'Image size should be less than 5MB');
        return;
      }

      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      title: "",
      slug: "",
      category: "",
      content: "",
      metaTitle: "",
      metaKeywords: "",
      metaDescription: "",
      status: "draft",
    });
    setImage(null);
    setImagePreview(null);
    setIsEditing(false);
    setEditingId(null);
  };

  const handleEdit = async (blog: BlogFormData) => {
    const blogId = blog._id || blog.id;
    if (!blogId) {
      showNotification('error', 'Invalid blog ID');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/blogs/${blogId}`);
      const result: ApiResponse = await response.json();

      if (result.success) {
        const blogData = result.data;
        setFormData({
          id: blogData._id,
          _id: blogData._id,
          title: blogData.title,
          slug: blogData.slug,
          category: blogData.category,
          content: blogData.content,
          metaTitle: blogData.metaTitle || '',
          metaKeywords: blogData.metaKeywords || '',
          metaDescription: blogData.metaDescription || '',
          status: blogData.status,
          image: blogData.image,
        });
        setEditingId(blogData._id);
        setIsEditing(true);
        setShowForm(true);
        if (blogData.image) {
          const imageUrl = getImageUrl(blogData.image);
          setImagePreview(imageUrl);
        } else {
          setImagePreview(null);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        showNotification('error', result.message || 'Failed to fetch blog details');
      }
    } catch (error) {
      console.error('Error fetching blog details:', error);
      showNotification('error', 'Failed to fetch blog details');
    }
  };

  const handleDelete = (id: string) => {
    if (!id) {
      showNotification('error', 'Invalid blog ID');
      return;
    }
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (deleteId) {
      try {
        const response = await fetch(`${API_URL}/blogs/${deleteId}`, {
          method: 'DELETE',
        });
        const result: ApiResponse = await response.json();

        if (result.success) {
          showNotification('success', 'Blog deleted successfully');
          fetchBlogs();
        } else {
          showNotification('error', result.message || 'Failed to delete blog');
        }
      } catch (error) {
        console.error('Error deleting blog:', error);
        showNotification('error', 'Failed to delete blog');
      } finally {
        setShowDeleteModal(false);
        setDeleteId(null);
      }
    }
  };

  const handleSubmit = async (status: "draft" | "published") => {
    setIsSubmitting(true);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      formDataToSend.append('category', formData.category);
      formDataToSend.append('content', formData.content);
      formDataToSend.append('metaTitle', formData.metaTitle);
      formDataToSend.append('metaKeywords', formData.metaKeywords);
      formDataToSend.append('metaDescription', formData.metaDescription);
      formDataToSend.append('status', status);

      if (image) {
        formDataToSend.append('image', image);
      }

      let url = `${API_URL}/blogs`;
      let method = 'POST';

      if (isEditing && editingId) {
        url = `${API_URL}/blogs/${editingId}`;
        method = 'PUT';
      }

      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });

      const result: ApiResponse = await response.json();

      if (result.success) {
        showNotification('success', result.message || (isEditing ? 'Blog updated successfully' : 'Blog created successfully'));
        resetForm();
        setShowForm(false);
        fetchBlogs();
      } else {
        showNotification('error', result.message || 'Failed to save blog');
      }
    } catch (error) {
      console.error('Error saving blog:', error);
      showNotification('error', 'Failed to save blog. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageError = (blogId: string) => {
    setImageErrors(prev => ({ ...prev, [blogId]: true }));
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center gap-3 ${
          notification.type === 'success' ? 'bg-green-100 border border-green-500 text-green-700' : 'bg-red-100 border border-red-500 text-red-700'
        }`}>
          {notification.type === 'success' ? <CheckCircle size={20} /> : <XCircle size={20} />}
          <span>{notification.message}</span>
          <button onClick={() => setNotification(null)} className="ml-4">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Top Gradient */}
      <div className="h-2 bg-gradient-to-r from-[#FF6B00] via-[#2563EB] to-[#00C2FF]" />

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="border-b p-6 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                {showForm ? (isEditing ? "Edit Blog" : "Create New Blog") : "Blog Management"}
              </h1>
              <p className="text-gray-500 mt-1">
                {showForm ? "Publish engaging content for your website." : "Manage your blog posts"}
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
                Create New Blog
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
                    placeholder="Search blogs..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#2563EB] outline-none"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Filter size={20} className="text-gray-400" />
                  <select
                    value={filterStatus}
                    onChange={(e) => {
                      setFilterStatus(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#2563EB] outline-none"
                  >
                    <option value="all">All Status</option>
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>
              <div className="text-sm text-gray-500">
                {totalItems} blog{totalItems !== 1 ? 's' : ''} found
              </div>
            </div>
          )}

          {/* Blog List */}
          {!showForm && (
            <div className="overflow-x-auto">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader className="animate-spin text-[#2563EB]" size={40} />
                </div>
              ) : blogs.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-lg">No blogs found</div>
                  <p className="text-gray-500 mt-2">Create your first blog post to get started</p>
                </div>
              ) : (
                <>
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blog</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Views</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {blogs.map((blog) => {
                        const blogId = blog._id || blog.id;
                        const imageUrl = getImageUrl(blog.image);
                        const hasImageError = imageErrors[blogId || ''];
                        
                        return (
                          <tr key={blogId} className="hover:bg-gray-50 transition">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                {imageUrl && !hasImageError ? (
                                  <img 
                                    src={imageUrl} 
                                    alt={blog.title} 
                                    className="w-12 h-12 rounded-lg object-cover"
                                    onError={() => handleImageError(blogId || '')}
                                  />
                                ) : (
                                  <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
                                    <span className="text-gray-400 text-xs">No img</span>
                                  </div>
                                )}
                                <div>
                                  <div className="font-medium text-gray-900 line-clamp-1">{blog.title}</div>
                                  <div className="text-sm text-gray-500">/{blog.slug}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-1 text-xs rounded-full bg-indigo-100 text-indigo-700">
                                {blog.category}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                                blog.status === 'published' 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-yellow-100 text-yellow-700'
                              }`}>
                                {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {blog.views || 0}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-500">
                              {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : '-'}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleEdit(blog)}
                                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                                  title="Edit blog"
                                >
                                  <Edit size={18} />
                                </button>
                                <button
                                  onClick={() => handleDelete(blogId || '')}
                                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                                  title="Delete blog"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="px-6 py-4 flex items-center justify-between border-t">
                      <div className="text-sm text-gray-500">
                        Showing {Math.min((currentPage - 1) * blogsPerPage + 1, totalItems)} to {Math.min(currentPage * blogsPerPage, totalItems)} of {totalItems} entries
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
                  {/* Blog Title */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Blog Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter blog title"
                      className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#2563EB] outline-none transition"
                      required
                    />
                  </div>

                  {/* Slug */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Blog Slug
                    </label>
                    <input
                      type="text"
                      name="slug"
                      value={formData.slug}
                      onChange={handleChange}
                      className="w-full border rounded-lg p-3 bg-gray-100"
                      placeholder="auto-generated-from-title"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      URL: /blog/{formData.slug || "your-blog-slug"}
                    </p>
                  </div>

                  {/* Content - Rich Text Editor */}
                  <div>
                    <label className="block text-sm font-semibold mb-2">
                      Blog Content <span className="text-red-500">*</span>
                    </label>
                    <div className="border rounded-lg overflow-hidden">
                      <ReactQuill
                        theme="snow"
                        value={formData.content}
                        onChange={handleContentChange}
                        modules={modules}
                        formats={formats}
                        placeholder="Write your blog content here..."
                        className="h-[400px]"
                      />
                    </div>
                  </div>

                  {/* SEO Settings */}
                  <div className="border rounded-lg p-5 bg-gray-50 mt-16">
                    <h2 className="font-bold text-lg mb-4 text-gray-800">
                      SEO Settings
                    </h2>

                    <div className="mb-4">
                      <label className="block text-sm font-semibold mb-2">
                        Meta Title
                      </label>
                      <input
                        type="text"
                        name="metaTitle"
                        value={formData.metaTitle}
                        onChange={handleChange}
                        placeholder="Enter meta title"
                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#2563EB] outline-none transition"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {formData.metaTitle.length}/60 characters
                      </p>
                    </div>

                    <div className="mb-4">
                      <label className="block text-sm font-semibold mb-2">
                        Meta Keywords
                      </label>
                      <input
                        type="text"
                        name="metaKeywords"
                        value={formData.metaKeywords}
                        onChange={handleChange}
                        placeholder="Enter meta keywords separated by commas"
                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#2563EB] outline-none transition"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Example: technology, business, marketing, web development
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold mb-2">
                        Meta Description
                      </label>
                      <textarea
                        rows={3}
                        name="metaDescription"
                        value={formData.metaDescription}
                        onChange={handleChange}
                        placeholder="Enter meta description"
                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#2563EB] outline-none transition"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        {formData.metaDescription.length}/160 characters
                      </p>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Category */}
                  <div className="bg-gray-50 border rounded-lg p-5">
                    <h3 className="font-semibold mb-4 text-gray-800">Category</h3>

                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#2563EB] outline-none transition"
                    >
                      <option value="">Select Category</option>
                      {loadingCategories ? (
                        <option value="" disabled>Loading categories...</option>
                      ) : categories.length === 0 ? (
                        <option value="" disabled>No categories available</option>
                      ) : (
                        categories.map((category) => (
                          <option key={category._id} value={category.name}>
                            {category.name}
                          </option>
                        ))
                      )}
                    </select>
                  </div>

                  {/* Featured Image */}
                  <div className="bg-gray-50 border rounded-lg p-5">
                    <h3 className="font-semibold mb-4 text-gray-800">
                      Featured Image
                    </h3>

                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="w-full text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                    />

                    {imagePreview && (
                      <div className="mt-4 relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="rounded-lg h-48 w-full object-cover"
                          onError={() => {
                            setImagePreview(null);
                            showNotification('error', 'Failed to load image preview');
                          }}
                        />
                        <button
                          onClick={() => {
                            setImage(null);
                            setImagePreview(null);
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Publish Settings */}
                  <div className="bg-gray-50 border rounded-lg p-5">
                    <h3 className="font-semibold mb-4 text-gray-800">Publish Settings</h3>

                    <div className="mb-4">
                      <label className="block text-sm font-semibold mb-2">
                        Status
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-[#2563EB] outline-none transition"
                      >
                        <option value="draft">Draft</option>
                        <option value="published">Published</option>
                      </select>
                    </div>

                    <div className="space-y-3 mt-4">
                      <button
                        onClick={() => handleSubmit("draft")}
                        disabled={isSubmitting}
                        className="w-full bg-gray-700 hover:bg-gray-800 text-white py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? <Loader className="animate-spin" size={20} /> : null}
                        {isSubmitting ? "Saving..." : "Save Draft"}
                      </button>

                      <button
                        onClick={() => handleSubmit("published")}
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-[#FF6B00] via-[#2563EB] to-[#00C2FF] hover:opacity-90 text-white py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? <Loader className="animate-spin" size={20} /> : null}
                        {isSubmitting ? "Publishing..." : "Publish Blog"}
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
                      /blog/{formData.slug || "your-blog-slug"}
                    </p>
                  </div>

                  {/* Status Indicator */}
                  <div className="bg-gray-50 border rounded-lg p-4">
                    <h4 className="font-semibold mb-2 text-gray-800">
                      Current Status
                    </h4>
                    <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium
                      ${formData.status === 'published' ? 'bg-green-100 text-green-700' : 
                        'bg-yellow-100 text-yellow-700'}`}
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
                  Delete Blog Post
                </h3>
                <p className="text-gray-600 text-sm">
                  Are you sure you want to delete this blog post? This action cannot be undone.
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

export default Createblog;