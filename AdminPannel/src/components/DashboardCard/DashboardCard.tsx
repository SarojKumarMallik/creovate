import React, { useState, useEffect } from "react";
import {
  FiBriefcase,
  FiBookOpen,
  FiPlusSquare,
  FiCheckCircle,
  FiArrowUpRight,
  FiArrowDownRight,
  FiFileText,
  FiTag,
  FiUsers,
  FiEye,
  FiCalendar,
  FiTrendingUp,
  FiClock,
} from "react-icons/fi";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import "./DashboardCard.css";

// API URL
const API_URL = 'http://localhost:5000/api';

interface BlogStats {
  total: number;
  published: number;
  drafts: number;
}

interface CategoryStats {
  total: number;
  active: number;
  inactive: number;
}

interface Blog {
  _id: string;
  title: string;
  category: string;
  status: string;
  views: number;
  createdAt: string;
  image?: string;
}

interface Category {
  _id: string;
  name: string;
  slug: string;
  status: string;
  createdAt: string;
}

const Dashboard: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [blogStats, setBlogStats] = useState<BlogStats>({
    total: 0,
    published: 0,
    drafts: 0
  });
  const [categoryStats, setCategoryStats] = useState<CategoryStats>({
    total: 0,
    active: 0,
    inactive: 0
  });
  const [recentBlogs, setRecentBlogs] = useState<Blog[]>([]);
  const [recentCategories, setRecentCategories] = useState<Category[]>([]);
  const [weeklyData, setWeeklyData] = useState<any[]>([]);
  const [categoryDistribution, setCategoryDistribution] = useState<any[]>([]);
  const [totalViews, setTotalViews] = useState<number>(0);

  // Fetch dashboard data
  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Fetch blog stats
      const statsRes = await fetch(`${API_URL}/blogs/stats`);
      const statsData = await statsRes.json();
      if (statsData.success) {
        setBlogStats(statsData.data);
      }

      // Fetch all blogs for charts
      const blogsRes = await fetch(`${API_URL}/blogs?limit=100`);
      const blogsData = await blogsRes.json();
      if (blogsData.success) {
        const blogs = blogsData.data || [];
        
        // Set recent blogs (last 5)
        setRecentBlogs(blogs.slice(0, 5));
        
        // Calculate total views
        const totalViews = blogs.reduce((sum: number, blog: any) => sum + (blog.views || 0), 0);
        setTotalViews(totalViews);

        // Calculate weekly data (last 7 days)
        const weekly = calculateWeeklyData(blogs);
        setWeeklyData(weekly);

        // Calculate category distribution
        const distribution = calculateCategoryDistribution(blogs);
        setCategoryDistribution(distribution);
      }

      // Fetch categories
      const categoriesRes = await fetch(`${API_URL}/categories?limit=100`);
      const categoriesData = await categoriesRes.json();
      if (categoriesData.success) {
        const categories = categoriesData.data || [];
        setRecentCategories(categories.slice(0, 5));
        
        const active = categories.filter((c: any) => c.status === 'active').length;
        const inactive = categories.filter((c: any) => c.status === 'inactive').length;
        setCategoryStats({
          total: categories.length,
          active,
          inactive
        });
      }

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  // Calculate weekly data
  const calculateWeeklyData = (blogs: any[]) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const weekData = days.map(day => ({ day, blogs: 0, views: 0 }));
    
    const now = new Date();
    const weekStart = new Date(now);
    weekStart.setDate(now.getDate() - 6);

    blogs.forEach((blog: any) => {
      const createdDate = new Date(blog.createdAt);
      if (createdDate >= weekStart && createdDate <= now) {
        const dayIndex = createdDate.getDay();
        weekData[dayIndex].blogs += 1;
        weekData[dayIndex].views += blog.views || 0;
      }
    });

    return weekData;
  };

  // Calculate category distribution
  const calculateCategoryDistribution = (blogs: any[]) => {
    const distribution: { [key: string]: number } = {};
    blogs.forEach((blog: any) => {
      const category = blog.category || 'Uncategorized';
      distribution[category] = (distribution[category] || 0) + 1;
    });

    return Object.entries(distribution)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  };

  // Colors for pie chart
  const COLORS = ['#FF6B00', '#2563EB', '#00C2FF', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  // Get status badge color
  const getStatusBadge = (status: string) => {
    const statusMap: { [key: string]: string } = {
      published: 'badge-success',
      draft: 'badge-warning',
      active: 'badge-success',
      inactive: 'badge-danger'
    };
    return statusMap[status] || 'badge-secondary';
  };

  if (loading) {
    return (
      <div className="dashboard-loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back! Here's what's happening with your blog today.</p>
      </div>

      {/* Stats Cards */}
      <div className="dashboard-stats-grid">
        <div className="stat-card">
          <div className="stat-card-top">
            <h4>Total Blogs</h4>
            <div className="stat-icon blue">
              <FiFileText />
            </div>
          </div>
          <h2 className="stat-number">{blogStats.total}</h2>
          <div className="stat-bottom">
            <span>Total blog posts</span>
            <div className="stat-growth blueText">
              <FiTrendingUp /> {blogStats.published} published
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <h4>Published</h4>
            <div className="stat-icon green">
              <FiCheckCircle />
            </div>
          </div>
          <h2 className="stat-number">{blogStats.published}</h2>
          <div className="stat-bottom">
            <span>Live on website</span>
            <div className="stat-growth greenText">
              <FiArrowUpRight /> {blogStats.total > 0 ? Math.round((blogStats.published / blogStats.total) * 100) : 0}%
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <h4>Drafts</h4>
            <div className="stat-icon yellow">
              <FiBookOpen />
            </div>
          </div>
          <h2 className="stat-number">{blogStats.drafts}</h2>
          <div className="stat-bottom">
            <span>In progress</span>
            <div className="stat-growth yellowText">
              <FiClock /> Need review
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <h4>Total Views</h4>
            <div className="stat-icon purple">
              <FiEye />
            </div>
          </div>
          <h2 className="stat-number">{totalViews.toLocaleString()}</h2>
          <div className="stat-bottom">
            <span>All time views</span>
            <div className="stat-growth purpleText">
              <FiTrendingUp /> Popular content
            </div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-card-top">
            <h4>Categories</h4>
            <div className="stat-icon pink">
              <FiTag />
            </div>
          </div>
          <h2 className="stat-number">{categoryStats.total}</h2>
          <div className="stat-bottom">
            <span>{categoryStats.active} active</span>
            <div className="stat-growth pinkText">
              <FiArrowUpRight /> {categoryStats.inactive} inactive
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="dashboard-charts-grid">
        {/* Weekly Activity Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>Weekly Activity</h3>
            <p>Blog posts created per day</p>
          </div>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="blogs" fill="#2563EB" name="Blogs Created" />
                <Bar dataKey="views" fill="#00C2FF" name="Views" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution Chart */}
        <div className="chart-card">
          <div className="chart-header">
            <h3>Category Distribution</h3>
            <p>Blog posts by category</p>
          </div>
          <div className="chart-container pie-chart-container">
            {categoryDistribution.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={categoryDistribution}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {categoryDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="no-data">No categories data available</div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div className="dashboard-recent-grid">
        {/* Recent Blogs */}
        <div className="recent-card">
          <div className="recent-header">
            <h3>Recent Blogs</h3>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="recent-list">
            {recentBlogs.length > 0 ? (
              recentBlogs.map((blog) => (
                <div key={blog._id} className="recent-item">
                  <div className="recent-item-content">
                    <div className="recent-item-left">
                      {blog.image && (
                        <img 
                          src={`http://localhost:5000${blog.image}`} 
                          alt={blog.title}
                          className="recent-item-image"
                          onError={(e) => {
                            (e.target as HTMLImageElement).style.display = 'none';
                          }}
                        />
                      )}
                      <div>
                        <h4 className="recent-item-title">{blog.title}</h4>
                        <div className="recent-item-meta">
                          <span className="recent-item-category">{blog.category}</span>
                          <span className="recent-item-date">
                            <FiCalendar size={12} />
                            {formatDate(blog.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className={`badge ${getStatusBadge(blog.status)}`}>
                      {blog.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-data">No blogs found</div>
            )}
          </div>
        </div>

        {/* Recent Categories */}
        <div className="recent-card">
          <div className="recent-header">
            <h3>Recent Categories</h3>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="recent-list">
            {recentCategories.length > 0 ? (
              recentCategories.map((category) => (
                <div key={category._id} className="recent-item">
                  <div className="recent-item-content">
                    <div className="recent-item-left">
                      <div className="category-icon-wrapper">
                        <FiTag className="category-icon" />
                      </div>
                      <div>
                        <h4 className="recent-item-title">{category.name}</h4>
                        <div className="recent-item-meta">
                          <span className="recent-item-slug">/{category.slug}</span>
                          <span className="recent-item-date">
                            <FiCalendar size={12} />
                            {formatDate(category.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <span className={`badge ${getStatusBadge(category.status)}`}>
                      {category.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-data">No categories found</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;