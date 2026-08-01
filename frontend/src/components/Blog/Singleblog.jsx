import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { Helmet } from 'react-helmet-async'; // Add this import
import {
  CalendarDays,
  ArrowLeft,
  User,
  Tag,
  Heart,
  Bookmark,
  Facebook,
  Twitter,
  Linkedin,
  Link2,
  ChevronRight,
  Loader,
  AlertCircle,
  Eye,
  ChevronDown,
  Clock,
  Share2,
  MessageCircle,
  Phone,
  Map,
  X,
  Check,
  Globe,
  Compass,
  Plane,
} from "lucide-react";
import Breadcrumb from "../Breadcrumb"; 
import blogbread from "../../assets/blog.webp";

// API URL
// const API_URL = 'http://localhost:5000/api';
// const BASE_URL = 'http://localhost:5000';

const API_URL = 'https://api.creovatetechnologies.in/api';
const BASE_URL = 'https://api.creovatetechnologies.in';


// Share Modal Component
const ShareModal = ({ isOpen, onClose, blog, onShare }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const shareOptions = [
    { 
      name: "WhatsApp", 
      icon: "💬", 
      color: "bg-green-500 hover:bg-green-600",
      share: (url, text) => `https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + url)}`
    },
    { 
      name: "Facebook", 
      icon: "👍", 
      color: "bg-blue-600 hover:bg-blue-700",
      share: (url, text) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`
    },
    { 
      name: "Twitter", 
      icon: "🐦", 
      color: "bg-sky-500 hover:bg-sky-600",
      share: (url, text) => `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    },
    { 
      name: "LinkedIn", 
      icon: "🔗", 
      color: "bg-blue-700 hover:bg-blue-800",
      share: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
    },
    { 
      name: "Copy Link", 
      icon: "📋", 
      color: "bg-gray-600 hover:bg-gray-700",
      share: null
    },
  ];

  const handleShare = (option) => {
    const currentUrl = window.location.href;
    const text = `Check out this article: ${blog?.title || 'Interesting article'}`;

    if (option.name === "Copy Link") {
      navigator.clipboard.writeText(currentUrl).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
        if (onShare) onShare('copy', blog);
      });
      return;
    }

    const shareLink = option.share(currentUrl, text);
    if (shareLink) {
      window.open(shareLink, '_blank', 'width=600,height=400');
      if (onShare) onShare(option.name.toLowerCase(), blog);
      setTimeout(onClose, 1000);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-[#0B1B52]">Share Article</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {blog && (
          <div className="mb-6 p-4 bg-gray-50 rounded-xl">
            <p className="font-semibold text-[#0B1B52] line-clamp-2">{blog.title}</p>
            <p className="text-sm text-gray-600 mt-1">{blog.category}</p>
          </div>
        )}

        <div className="grid grid-cols-3 gap-4">
          {shareOptions.map((option) => (
            <button
              key={option.name}
              onClick={() => handleShare(option)}
              className={`${option.color} text-white rounded-xl p-4 flex flex-col items-center gap-2 transition-all shadow-lg hover:shadow-xl hover:scale-105`}
            >
              <span className="text-2xl">{option.icon}</span>
              <span className="text-xs font-medium">{option.name}</span>
            </button>
          ))}
        </div>

        {copied && (
          <div className="mt-4 p-3 bg-green-50 text-green-600 rounded-xl flex items-center gap-2 justify-center">
            <Check className="w-5 h-5" />
            <span>Link copied to clipboard!</span>
          </div>
        )}
      </div>
    </div>
  );
};

const Singleblog = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { id, slug } = useParams();
  
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [recentPosts, setRecentPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showCategories, setShowCategories] = useState(true);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [blogSlug, setBlogSlug] = useState("");

  // Helper function to get image URL
  const getImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;
    const cleanPath = imagePath.startsWith('/') ? imagePath.substring(1) : imagePath;
    return `${BASE_URL}/${cleanPath}`;
  };

  // Format date
  const formatDate = (dateString) => {
    if (!dateString) return 'Date not available';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Format slug for display
  const formatSlugForDisplay = (slugString) => {
    if (!slugString) return 'Blog';
    return slugString
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Fetch all categories
  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/categories?limit=100`);
      const result = await response.json();
      
      if (result.success) {
        setCategories(result.data || []);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  }, []);

  // Fetch recent posts
  const fetchRecentPosts = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/blogs?limit=5&status=published`);
      const result = await response.json();
      if (result.success) {
        setRecentPosts(result.data || []);
      }
    } catch (error) {
      console.error('Error fetching recent posts:', error);
    }
  }, []);

  // Fetch single blog by ID or Slug
  const fetchBlog = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      let url;
      if (slug) {
        setBlogSlug(slug);
        url = `${API_URL}/blogs/slug/${slug}`;
      } else if (id) {
        url = `${API_URL}/blogs/${id}`;
      } else {
        if (location.state?.blog) {
          setBlog(location.state.blog);
          setBlogSlug(location.state.blog.slug || location.state.blog._id);
          fetchRelatedPosts(location.state.blog.category);
          setLoading(false);
          return;
        }
        setError('No blog identifier provided');
        setLoading(false);
        return;
      }

      const response = await fetch(url);
      const result = await response.json();

      if (result.success) {
        setBlog(result.data);
        setBlogSlug(result.data.slug || slug);
        if (result.data.category) {
          fetchRelatedPosts(result.data.category, result.data._id);
        }
      } else {
        setError(result.message || 'Blog not found');
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
      setError('Failed to fetch blog. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [id, slug, location.state]);

  // Fetch related posts
  const fetchRelatedPosts = useCallback(async (category, currentId) => {
    try {
      const response = await fetch(`${API_URL}/blogs?category=${encodeURIComponent(category)}&limit=4&status=published`);
      const result = await response.json();
      
      if (result.success) {
        const filtered = result.data?.filter(blog => blog._id !== currentId) || [];
        setRelatedPosts(filtered.slice(0, 3));
      }
    } catch (error) {
      console.error('Error fetching related posts:', error);
    }
  }, []);

  // Handle navigation to blog
  const handleBlogClick = (post) => {
    navigate(`/blog/${post.slug || post._id}`, { 
      state: { blog: post } 
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle share
  const handleShare = (platform) => {
    const url = window.location.href;
    const text = blog?.title || 'Check out this blog post';
    
    const shareUrls = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(text + " " + url)}`,
    };
    
    if (shareUrls[platform]) {
      window.open(shareUrls[platform], '_blank', 'width=600,height=400');
    }
  };

  // Handle copy link
  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

  // Handle like
  const handleLike = () => {
    setLiked(!liked);
  };

  // Handle bookmark
  const handleBookmark = () => {
    setBookmarked(!bookmarked);
  };

  // Get dynamic breadcrumb paths
  const getBreadcrumbPaths = () => {
    const paths = [
      { name: "Home", link: "/" },
      { name: "Blog", link: "/blog" },
    ];
    
    if (blogSlug) {
      const displayName = formatSlugForDisplay(blogSlug);
      paths.push({ 
        name: displayName, 
        link: `/blog/${blogSlug}` 
      });
    } else if (blog) {
      paths.push({ 
        name: blog.title?.substring(0, 30) + (blog.title?.length > 30 ? '...' : ''), 
        link: `/blog/${blog.slug || id}` 
      });
    }
    
    return paths;
  };

  useEffect(() => {
    if (location.state?.blog) {
      setBlog(location.state.blog);
      setBlogSlug(location.state.blog.slug || location.state.blog._id);
      fetchRelatedPosts(location.state.blog.category, location.state.blog._id);
      setLoading(false);
      return;
    }
    
    fetchBlog();
    fetchCategories();
    fetchRecentPosts();
  }, [id, slug, location.state, fetchBlog, fetchCategories, fetchRecentPosts, fetchRelatedPosts]);

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-20 bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#2563EB]"></div>
        <p className="mt-4 text-gray-600">Loading blog post...</p>
      </div>
    );
  }

  // Error state
  if (error || !blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-20 bg-gray-50">
        <AlertCircle className="text-red-500" size={48} />
        <p className="mt-4 text-red-600">{error || 'Blog not found'}</p>
        <button 
          onClick={() => navigate('/blog')}
          className="mt-4 px-6 py-2 bg-[#2563EB] text-white rounded-lg hover:bg-[#1d4ed8] transition"
        >
          Back to Blogs
        </button>
      </div>
    );
  }

  const imageUrl = getImageUrl(blog.image);

  // Generate meta tags dynamically from blog data
  const getMetaTitle = () => {
    if (blog.metaTitle) return blog.metaTitle;
    return `${blog.title} | Blog | Creatovate Technologies`;
  };

  const getMetaDescription = () => {
    if (blog.metaDescription) return blog.metaDescription;
    // Generate description from content if no meta description
    const plainText = blog.content?.replace(/<[^>]*>/g, '') || '';
    const description = plainText.substring(0, 157) + (plainText.length > 157 ? '...' : '');
    return description || `Read about ${blog.title} on Creatovate Technologies blog.`;
  };

  const getMetaKeywords = () => {
    if (blog.metaKeywords) return blog.metaKeywords;
    // Generate keywords from title and category
    const keywords = [blog.title, blog.category, 'Creatovate Technologies', 'blog', 'technology'];
    return keywords.join(', ');
  };

  return (
    <>
      {/* Dynamic Meta Tags */}
      <Helmet>
  {/* Basic SEO */}
  <title>{getMetaTitle()}</title>
  <meta name="description" content={getMetaDescription()} />
  <meta name="keywords" content={getMetaKeywords()} />
  <meta name="robots" content="index, follow" />
  <meta name="author" content="Creovate Technologies" />

  {/* Canonical */}
  <link
    rel="canonical"
    href={`https://creovatetechnologies.in/blog/${blog.slug}`}
  />

  {/* Open Graph */}
  <meta property="og:title" content={getMetaTitle()} />
  <meta property="og:description" content={getMetaDescription()} />
  <meta property="og:type" content="article" />
  <meta
    property="og:url"
    content={`https://creovatetechnologies.in/blog/${blog.slug}`}
  />
  <meta property="og:site_name" content="Creovate Technologies" />

 

  {/* Schema */}
  <script type="application/ld+json">
    {JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: getMetaTitle(),
      description: getMetaDescription(),
      image: imageUrl,
      author: {
        "@type": "Organization",
        name: "Creovate Technologies",
      },
      publisher: {
        "@type": "Organization",
        name: "Creovate Technologies",
        logo: {
          "@type": "ImageObject",
          url: "https://creovatetechnologies.in/assets/images/creovate_new.png",
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `https://creovatetechnologies.in/blog/${blog.slug}`,
      },
      datePublished: blog.createdAt,
      dateModified: blog.updatedAt || blog.createdAt,
    })}
  </script>
</Helmet>

      <Breadcrumb
        title={formatSlugForDisplay(blogSlug || slug || blog.title)}
        bgImage={blogbread}
        paths={getBreadcrumbPaths()}
      />

      <article className="bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8 lg:py-12">
          {/* Back Button */}
          <button
            onClick={() => navigate('/blogs')}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-[#2563EB] transition mb-6 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back to Blog</span>
          </button>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Left Side */}
            <div className="lg:col-span-2">
              {/* Blog Post Card */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
                {/* Featured Image */}
                <div className="relative h-[400px] lg:h-[450px] overflow-hidden">
                  {imageUrl ? (
                    <img
                      src={imageUrl}
                      alt={blog.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/1200x450?text=Blog+Image';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-[#2563EB] flex items-center justify-center">
                      <span className="text-white text-6xl font-bold">{blog.title?.charAt(0)}</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
                  
                  {/* Category Badge */}
                  <div className="absolute bottom-6 left-6">
                    <span className="inline-block px-4 py-2 rounded-full bg-[#2563EB] text-white text-sm font-semibold shadow-lg">
                      {blog.category || 'Uncategorized'}
                    </span>
                  </div>

                  {/* View Count */}
                  <div className="absolute top-6 right-6 flex flex-col gap-2">
                    <div className="bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 text-white text-xs">
                      <Eye size={14} />
                      {blog.views || 0} views
                    </div>
                  </div>

                  
                </div>

                {/* Content */}
                <div className="p-6 md:p-8 lg:p-10">
                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 md:gap-6 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <CalendarDays size={16} className="text-[#2563EB]" />
                      <span>{formatDate(blog.createdAt)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <User size={16} className="text-[#2563EB]" />
                      <span>Admin</span>
                    </div>
                    {blog.status && (
                      <span className={`px-2 py-0.5 text-xs rounded-full font-medium ${
                        blog.status === 'published' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {blog.status.charAt(0).toUpperCase() + blog.status.slice(1)}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                    {blog.title}
                  </h1>

                  {/* Content Body */}
                  <div 
                    className="prose prose-lg max-w-none blog-content"
                    dangerouslySetInnerHTML={{ 
                      __html: blog.content || '<p>No content available for this blog post.</p>'
                    }}
                  />


                  {/* Divider */}
                  <div className="my-8 border-t border-gray-200"></div>

                 {/* Share Section */}
<div className="p-6 bg-gray-50 rounded-xl border border-gray-200">
  <div className="flex flex-wrap items-center justify-between gap-4">
    <div>
      <p className="text-sm font-semibold text-gray-700">Share this article</p>
      <p className="text-xs text-gray-500">Help others discover valuable insights</p>
    </div>
    <div className="flex gap-2 flex-wrap">
      {/* WhatsApp */}
      <button 
        onClick={() => handleShare('whatsapp')}
        className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-green-50 hover:border-green-300 transition hover:scale-110 group"
        aria-label="Share on WhatsApp"
      >
        <svg 
          className="w-4 h-4 text-green-500 group-hover:text-green-600" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </button>

      {/* Facebook */}
      <button 
        onClick={() => handleShare('facebook')}
        className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-blue-50 hover:border-blue-300 transition hover:scale-110 group"
        aria-label="Share on Facebook"
      >
        <svg 
          className="w-4 h-4 text-blue-600 group-hover:text-blue-700" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      </button>

      {/* Twitter/X */}
      <button 
        onClick={() => handleShare('twitter')}
        className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-sky-50 hover:border-sky-300 transition hover:scale-110 group"
        aria-label="Share on Twitter/X"
      >
        <svg 
          className="w-4 h-4 text-sky-500 group-hover:text-sky-600" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      </button>

      {/* LinkedIn */}
      <button 
        onClick={() => handleShare('linkedin')}
        className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-blue-50 hover:border-blue-300 transition hover:scale-110 group"
        aria-label="Share on LinkedIn"
      >
        <svg 
          className="w-4 h-4 text-blue-700 group-hover:text-blue-800" 
          fill="currentColor" 
          viewBox="0 0 24 24"
        >
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .792 23.2 0 22.222 0h.003z"/>
        </svg>
      </button>

      {/* Copy Link */}
      <button 
        onClick={handleCopyLink}
        className="w-9 h-9 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-gray-300 transition hover:scale-110 group"
        aria-label="Copy link"
      >
        <Link2 size={16} className="text-gray-600 group-hover:text-gray-700" />
      </button>

      
    </div>
  </div>
</div>
                </div>
              </div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-xl font-bold text-gray-900 mb-5 flex items-center gap-2">
                    Related Posts
                    <ChevronRight size={18} className="text-[#2563EB]" />
                  </h3>
                  <div className="grid md:grid-cols-3 gap-5">
                    {relatedPosts.map((post) => (
                      <div
                        key={post._id}
                        className="group bg-white rounded-xl overflow-hidden border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer hover:-translate-y-1"
                        onClick={() => handleBlogClick(post)}
                      >
                        <div className="overflow-hidden">
                          {post.image ? (
                            <img
                              src={getImageUrl(post.image)}
                              alt={post.title}
                              className="w-full h-40 object-cover group-hover:scale-110 transition duration-500"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/400x200?text=No+Image';
                              }}
                            />
                          ) : (
                            <div className="w-full h-40 bg-[#2563EB] flex items-center justify-center">
                              <span className="text-white text-2xl font-bold">{post.title?.charAt(0)}</span>
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <span className="inline-block px-2 py-0.5 text-xs font-medium rounded-full bg-[#2563EB] text-white mb-2">
                            {post.category || 'Uncategorized'}
                          </span>
                          <h4 className="font-semibold text-gray-800 text-sm leading-snug group-hover:text-[#2563EB] transition line-clamp-2">
                            {post.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1.5">
                            {formatDate(post.createdAt)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar - Right Side */}
            <div className="lg:col-span-1">
              <div className="sticky top-8 space-y-5">


                  {/* Recent Posts Widget */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                  <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Clock size={18} className="text-[#2563EB]" />
                    Recent Posts
                  </h3>
                  <div className="space-y-3">
                    {recentPosts.length > 0 ? (
                      recentPosts.slice(0, 5).map((post) => (
                        <div
                          key={post._id}
                          className="flex gap-3 cursor-pointer group"
                          onClick={() => handleBlogClick(post)}
                        >
                          {post.image ? (
                            <img
                              src={getImageUrl(post.image)}
                              alt={post.title}
                              className="w-14 h-14 rounded-lg object-cover flex-shrink-0"
                              onError={(e) => {
                                e.target.src = 'https://via.placeholder.com/56x56?text=No+Image';
                              }}
                            />
                          ) : (
                            <div className="w-14 h-14 rounded-lg bg-[#2563EB] flex-shrink-0 flex items-center justify-center">
                              <span className="text-white text-lg font-bold">{post.title?.charAt(0)}</span>
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-gray-800 group-hover:text-[#2563EB] transition line-clamp-2">
                              {post.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-0.5">
                              {formatDate(post.createdAt)}
                            </p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No recent posts</p>
                    )}
                  </div>
                </div>
                 {/* Categories Widget - Flex Grid */}
                <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-200">
                  <div 
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => setShowCategories(!showCategories)}
                  >
                    <h3 className="text-base font-bold text-gray-900 flex items-center gap-2">
                      <Tag size={18} className="text-[#2563EB]" />
                      Categories
                    </h3>
                    <ChevronDown 
                      size={18} 
                      className={`text-gray-500 transition-transform ${showCategories ? 'rotate-180' : ''}`} 
                    />
                  </div>
                  
                  {showCategories && (
                    <div className="mt-3">
                      <div className="flex flex-wrap gap-2">
                        {categories.length > 0 ? (
                          categories.map((category) => (
                            <button
                              key={category._id}
                              onClick={() => navigate(`/blogs?category=${encodeURIComponent(category.name)}`)}
                              className="px-3 py-1.5 text-xs font-medium rounded-full bg-gray-100 text-gray-700 hover:bg-[#2563EB] hover:text-white transition-all duration-300 whitespace-nowrap"
                            >
                              {category.name}
                            </button>
                          ))
                        ) : (
                          <p className="text-gray-500 text-sm">No categories available</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                {/* Travel CTA Section - Now properly placed at the top of sidebar */}
                <div className="bg-gradient-to-r from-[#0B1B52] via-[#1a3a8a] to-[#2563EB] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 opacity-10">
                    <Plane size={150} className="transform rotate-45" />
                  </div>
                  <div className="absolute bottom-0 left-0 opacity-10">
                    <Compass size={130} className="transform -rotate-12" />
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      <Globe className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                      <span className="text-yellow-400 font-semibold text-xs uppercase tracking-wider">
                        Plan Your Perfect Trip
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-3">
                      Plan Your Perfect Trip
                    </h3>
                    
                    <p className="text-white/80 text-sm mb-4">
                      Have questions about destinations, packages, or bookings? Our travel experts are here to guide you.
                    </p>
                    
                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => navigate('/contact')}
                        className="w-full px-4 py-2.5 bg-yellow-400 text-[#0B1B52] font-bold rounded-lg hover:bg-yellow-300 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 text-sm"
                      >
                        <Phone size={16} />
                        Contact Us
                      </button>
                      <button
                        onClick={() => navigate('/destinations')}
                        className="w-full px-4 py-2.5 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg hover:bg-white/20 transition-all duration-300 flex items-center justify-center gap-2 border border-white/30 text-sm"
                      >
                        <Map size={16} />
                        Explore Destinations
                      </button>
                    </div>
                  </div>
                </div>

               

              
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Share Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        blog={blog}
        onShare={(platform, article) => {
          console.log(`Shared ${article?.title} on ${platform}`);
        }}
      />

      <style>{`
        .blog-content {
          color: #374151;
        }
        .blog-content p {
          margin-bottom: 1.25rem;
          line-height: 1.8;
        }
        .blog-content strong {
          color: #1F2937;
          font-weight: 600;
        }
        .blog-content h1, .blog-content h2, .blog-content h3, .blog-content h4 {
          color: #1F2937;
          font-weight: 700;
          margin-top: 1.5rem;
          margin-bottom: 1rem;
        }
        .blog-content h1 { font-size: 2rem; }
        .blog-content h2 { font-size: 1.75rem; }
        .blog-content h3 { font-size: 1.5rem; }
        .blog-content h4 { font-size: 1.25rem; }
        .blog-content ul, .blog-content ol {
          margin-bottom: 1.25rem;
          padding-left: 1.5rem;
        }
        .blog-content ul { list-style-type: disc; }
        .blog-content ol { list-style-type: decimal; }
        .blog-content li {
          margin-bottom: 0.5rem;
          line-height: 1.8;
        }
        .blog-content a {
          color: #2563EB;
          text-decoration: underline;
        }
        .blog-content a:hover {
          color: #1d4ed8;
        }
        .blog-content blockquote {
          border-left: 4px solid #2563EB;
          padding-left: 1rem;
          margin: 1.5rem 0;
          color: #4B5563;
          font-style: italic;
        }
        .blog-content img {
          max-width: 100%;
          height: auto;
          border-radius: 0.5rem;
          margin: 1.5rem 0;
        }
        .blog-content table {
          width: 100%;
          border-collapse: collapse;
          margin: 1.5rem 0;
        }
        .blog-content table th,
        .blog-content table td {
          border: 1px solid #E5E7EB;
          padding: 0.75rem;
          text-align: left;
        }
        .blog-content table th {
          background-color: #F3F4F6;
          font-weight: 600;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};

export default Singleblog;