import React, { useState, useEffect } from "react";
import {
  CalendarDays,
  MessageCircle,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Loader,
  AlertCircle,
  Eye,
  Tag,
} from "lucide-react";

// API URL
const API_URL = import.meta.env.VITE_API_URL || '/api';
const BASE_URL = import.meta.env.VITE_BASE_URL || (import.meta.env.VITE_API_URL?.startsWith('http') ? import.meta.env.VITE_API_URL.replace(/\/api\/?$/, '') : '');




const Allblog = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  const [categories, setCategories] = useState([]);

  const blogsPerPage = 6;

  // Helper function to get image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
    return `${BASE_URL}/${cleanPath}`;
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Fetch blogs from API
  const fetchBlogs = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: blogsPerPage.toString(),
        status: 'published', // Only show published blogs
      });

      if (searchTerm) {
        params.append('search', searchTerm);
      }

      const response = await fetch(`${API_URL}/blogs?${params}`);
      const result = await response.json();

      if (result.success) {
        setBlogs(result.data || []);
        setTotalPages(result.pagination?.totalPages || 1);
        setTotalItems(result.pagination?.totalItems || 0);
        
        // Extract unique categories from blogs
        const uniqueCategories = [...new Set(result.data?.map(blog => blog.category) || [])];
        setCategories(uniqueCategories);
      } else {
        setError(result.message || 'Failed to fetch blogs');
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      setError('Failed to fetch blogs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, [currentPage, searchTerm]);

  // Filter blogs by category (client-side filtering)
  const filteredBlogs = filterCategory === 'all' 
    ? blogs 
    : blogs.filter(blog => blog.category === filterCategory);

  // Reset to page 1 when filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [filterCategory]);

  // Get current page items after filtering
  const startIndex = (currentPage - 1) * blogsPerPage;
  const currentBlogs = filteredBlogs.slice(startIndex, startIndex + blogsPerPage);
  const totalFilteredPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchBlogs();
  };

  // Get category color
  const getCategoryColor = (category) => {
    const colors = {
      'Technology': 'bg-blue-100 text-blue-700',
      'Business': 'bg-green-100 text-green-700',
      'Marketing': 'bg-purple-100 text-purple-700',
      'Education': 'bg-yellow-100 text-yellow-700',
      'Startup': 'bg-pink-100 text-pink-700',
      'Productivity': 'bg-indigo-100 text-indigo-700',
      'SEO': 'bg-orange-100 text-orange-700',
      'Development': 'bg-cyan-100 text-cyan-700',
      'Branding': 'bg-rose-100 text-rose-700',
    };
    return colors[category] || 'bg-gray-100 text-gray-700';
  };

  if (loading && blogs.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-20">
        <Loader className="animate-spin text-indigo-600" size={48} />
        <p className="mt-4 text-gray-600">Loading blogs...</p>
      </div>
    );
  }

  if (error && blogs.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-20">
        <AlertCircle className="text-red-500" size={48} />
        <p className="mt-4 text-red-600">{error}</p>
        <button 
          onClick={fetchBlogs}
          className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <section className="py-14 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 lg:px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-2 rounded-full bg-indigo-100 text-indigo-600 text-sm font-semibold mb-4">
            Latest Articles
          </span>

          <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
            Explore Our Blogs
          </h2>

          <p className="max-w-2xl mx-auto mt-4 text-gray-600">
            Discover expert insights, industry trends, and practical tips to
            help your business grow and stay ahead in the digital world.
          </p>
        </div>

        

        

        {/* Blog Grid */}
        {currentBlogs.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-gray-400 text-lg">No blogs found</div>
            <p className="text-gray-500 mt-2">Try adjusting your search or filter</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {currentBlogs.map((blog) => (
              <article
                key={blog._id}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-500"
              >
                {/* Image */}
                <div className="overflow-hidden relative">
                  {blog.image ? (
                    <img
                      src={getImageUrl(blog.image) || ''}
                      alt={blog.title}
                      className="w-full h-[260px] object-cover group-hover:scale-110 transition duration-700"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/400x260?text=No+Image';
                      }}
                    />
                  ) : (
                    <div className="w-full h-[260px] bg-gray-200 flex items-center justify-center">
                      <span className="text-gray-400">No Image</span>
                    </div>
                  )}
                  {/* Views Badge */}
                  <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-xs flex items-center gap-1">
                    <Eye size={14} />
                    {blog.views || 0}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Meta */}
                  <div className="flex items-center gap-5 text-gray-500 text-sm mb-4 flex-wrap">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={16} />
                      <span>{formatDate(blog.createdAt)}</span>
                    </div>
                  </div>

                  <span className={`inline-block px-3 py-1 text-xs font-medium rounded-full mb-4 ${getCategoryColor(blog.category)}`}>
                    <Tag size={12} className="inline mr-1" />
                    {blog.category}
                  </span>

                  <h3 className="text-2xl font-bold text-gray-900 leading-snug mb-6 group-hover:text-indigo-600 transition line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {blog.metaDescription || blog.content?.substring(0, 150) + '...'}
                  </p>

                  <a
                    href={`/blog/${blog.slug}`}
                    className="inline-flex items-center gap-3 font-semibold text-gray-900 hover:text-indigo-600 transition"
                  >
                    Read More
                    <span className="w-10 h-10 rounded-full border flex items-center justify-center group-hover:border-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition">
                      <ArrowRight size={18} />
                    </span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Pagination */}
        {totalFilteredPages > 1 && (
          <div className="flex justify-center items-center gap-3 mt-16">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-11 h-11 rounded-full border bg-white flex items-center justify-center disabled:opacity-40 hover:bg-gray-50 transition"
            >
              <ChevronLeft size={18} />
            </button>

            {[...Array(totalFilteredPages)].map((_, index) => {
              const pageNumber = index + 1;
              // Show limited pages with ellipsis
              if (
                pageNumber === 1 ||
                pageNumber === totalFilteredPages ||
                (pageNumber >= currentPage - 1 && pageNumber <= currentPage + 1)
              ) {
                return (
                  <button
                    key={index}
                    onClick={() => handlePageChange(pageNumber)}
                    className={`w-11 h-11 rounded-full font-semibold transition ${
                      currentPage === pageNumber
                        ? "bg-indigo-600 text-white"
                        : "bg-white border text-gray-700 hover:bg-indigo-50"
                    }`}
                  >
                    {pageNumber}
                  </button>
                );
              } else if (
                pageNumber === currentPage - 2 ||
                pageNumber === currentPage + 2
              ) {
                return (
                  <span key={index} className="text-gray-400">
                    ...
                  </span>
                );
              }
              return null;
            })}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalFilteredPages}
              className="w-11 h-11 rounded-full border bg-white flex items-center justify-center disabled:opacity-40 hover:bg-gray-50 transition"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        )}
      </div>

      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default Allblog;