import { Button } from "@/components/ui/button";
import { Clock, User, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const featuredPost = {
  id: 1,
  category: "Business Registration",
  author: "Sarah Mitchell",
  readTime: "8 min read",
  title: "5 Essential Steps to Register Your Business in Singapore",
  excerpt: "Navigate the business registration process in Singapore with our comprehensive guide. From choosing business structure to completing paperwork.",
  image: "/api/placeholder/600/400",
  date: "December 15, 2024"
};

const articles = [
  {
    id: 1,
    category: "Business Registration",
    author: "Sarah Mitchell", 
    readTime: "8 min read",
    title: "5 Essential Steps to Register Your Business in Singapore",
    excerpt: "Navigate the business registration process in Singapore with our comprehensive guide.",
    image: "/api/placeholder/400/250",
    date: "December 15, 2024"
  },
  {
    id: 2,
    category: "Remote Work",
    author: "Sarah Chen",
    readTime: "5 min read", 
    title: "The Rise of Remote Work: What Founders Need to Know",
    excerpt: "How remote work is reshaping startup culture and what it means for your business.",
    image: "/api/placeholder/400/250",
    date: "December 10, 2024"
  },
  {
    id: 3,
    category: "Technology",
    author: "Alex Johnson",
    readTime: "6 min read",
    title: "AI and Machine Learning for Small Businesses",
    excerpt: "Practical applications of AI that can help your startup compete with larger companies.",
    image: "/api/placeholder/400/250", 
    date: "December 8, 2024"
  },
  {
    id: 4,
    category: "Business",
    author: "Emily Rodriguez",
    readTime: "7 min read",
    title: "Scaling Your Startup: From MVP to Market Leader",
    excerpt: "Strategic approaches to growing your business without losing your startup agility.",
    image: "/api/placeholder/400/250",
    date: "December 5, 2024"
  },
  {
    id: 5,
    category: "Funding",
    author: "Michael Park",
    readTime: "4 min read",
    title: "Venture Capital vs. Angel Investment: Which is Right?",
    excerpt: "Understanding different funding options and choosing the best path for your startup.",
    image: "/api/placeholder/400/250",
    date: "December 3, 2024"
  },
  {
    id: 6,
    category: "Marketing",
    author: "Jessica Wong",
    readTime: "5 min read",
    title: "Content Marketing Strategies That Actually Convert",
    excerpt: "Build a content strategy that drives real business results and customer engagement.",
    image: "/api/placeholder/400/250",
    date: "December 1, 2024"
  },
  {
    id: 7,
    category: "Product",
    author: "David Kim",
    readTime: "8 min read",
    title: "Building Products Users Love: A Design Thinking Approach",
    excerpt: "User-centered design principles for creating products that solve real problems.",
    image: "/api/placeholder/400/250",
    date: "November 28, 2024"
  },
  {
    id: 8,
    category: "Operations",
    author: "Lisa Zhang",
    readTime: "6 min read",
    title: "Streamlining Operations: Tools and Workflows That Scale",
    excerpt: "Optimize your business processes for growth without adding complexity.",
    image: "/api/placeholder/400/250",
    date: "November 25, 2024"
  },
  {
    id: 9,
    category: "Culture",
    author: "James Wilson",
    readTime: "5 min read",
    title: "Building a Strong Company Culture in Remote Teams",
    excerpt: "Foster connection and shared values when your team is distributed globally.",
    image: "/api/placeholder/400/250",
    date: "November 22, 2024"
  },
  {
    id: 10,
    category: "Leadership",
    author: "Maria Garcia",
    readTime: "7 min read",
    title: "Managing Remote Teams: Best Practices for 2025",
    excerpt: "Essential strategies for leading distributed teams in a post-pandemic world.",
    image: "/api/placeholder/400/250",
    date: "November 20, 2024"
  },
  {
    id: 11,
    category: "Finance",
    author: "Thomas Brown",
    readTime: "6 min read",
    title: "Understanding Startup Valuations and Equity",
    excerpt: "A comprehensive guide to equity distribution and company valuation basics.",
    image: "/api/placeholder/400/250",
    date: "November 18, 2024"
  },
  {
    id: 12,
    category: "Growth",
    author: "Anna Lee",
    readTime: "5 min read",
    title: "Customer Acquisition Strategies That Actually Work",
    excerpt: "Data-driven approaches to finding and retaining your ideal customers.",
    image: "/api/placeholder/400/250",
    date: "November 15, 2024"
  },
  {
    id: 13,
    category: "Legal",
    author: "Robert Taylor",
    readTime: "9 min read",
    title: "Legal Essentials Every Founder Should Know",
    excerpt: "Navigate contracts, intellectual property, and compliance without breaking the bank.",
    image: "/api/placeholder/400/250",
    date: "November 12, 2024"
  },
  {
    id: 14,
    category: "Design",
    author: "Sophie Chen",
    readTime: "4 min read",
    title: "UX Design Principles for Early-Stage Startups",
    excerpt: "Creating user-centered products when resources are limited.",
    image: "/api/placeholder/400/250",
    date: "November 10, 2024"
  },
  {
    id: 15,
    category: "Sales",
    author: "Mark Johnson",
    readTime: "6 min read",
    title: "Sales Strategies for B2B SaaS Startups",
    excerpt: "Build a sales process that scales with your growing customer base.",
    image: "/api/placeholder/400/250",
    date: "November 8, 2024"
  },
  {
    id: 16,
    category: "Analytics",
    author: "Rachel Kim",
    readTime: "7 min read",
    title: "Data-Driven Decision Making for Startups",
    excerpt: "Turn your business data into actionable insights for better decision making.",
    image: "/api/placeholder/400/250",
    date: "November 5, 2024"
  }
];

const Journal = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 12;
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const getCurrentArticles = () => {
    const startIndex = (currentPage - 1) * articlesPerPage;
    return articles.slice(startIndex, startIndex + articlesPerPage);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gray-900 text-white px-4 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
              <span className="text-black font-bold text-sm">V</span>
            </div>
            <span className="text-xl font-semibold">VentureNext</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="/" className="text-gray-300 hover:text-white">Home</a>
            <a href="/perks" className="text-gray-300 hover:text-white">Perks</a>
            <a href="/about" className="text-gray-300 hover:text-white">About</a>
            <a href="/partner" className="text-gray-300 hover:text-white">Partner</a>
            <a href="/journal" className="text-yellow-500 hover:text-yellow-400">Journal</a>
            <a href="/contact" className="text-gray-300 hover:text-white">Contact</a>
          </nav>
          <div className="flex items-center space-x-4">
            <a href="/admin" className="text-gray-300 hover:text-white">Admin</a>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium">
              Explore Perks
            </Button>
          </div>
        </div>
      </header>

      {/* Featured Article */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              <Link to={`/blog/${featuredPost.id}`} className="relative group cursor-pointer">
                <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-80 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300" />
                <span className="absolute top-4 left-4 bg-yellow-500 text-black text-sm font-medium px-3 py-1 rounded-full">
                  Featured
                </span>
              </Link>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="bg-gray-100 px-3 py-1 rounded-full">{featuredPost.category}</span>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{featuredPost.readTime}</span>
                  </div>
                </div>
                
                <Link to={`/blog/${featuredPost.id}`}>
                  <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight hover:text-yellow-600 transition-colors cursor-pointer">
                    {featuredPost.title}
                  </h1>
                </Link>
                
                <p className="text-lg text-gray-600 leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                
                <div className="flex items-center justify-between pt-4">
                  <span className="text-gray-600">By {featuredPost.author}</span>
                  <Link to={`/blog/${featuredPost.id}`}>
                    <Button variant="link" className="text-yellow-600 hover:text-yellow-700 font-medium p-0">
                      Read article →
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Articles</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {getCurrentArticles().map((post) => (
              <article key={post.id} className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group">
                <Link to={`/blog/${post.id}`} className="relative h-48 block">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur text-xs font-medium px-3 py-1 rounded-full text-gray-700">
                    {post.category}
                  </span>
                </Link>
                
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{post.author}</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                  
                  <Link to={`/blog/${post.id}`}>
                    <h3 className="font-bold text-lg text-gray-900 leading-tight group-hover:text-yellow-600 transition-colors cursor-pointer">
                      {post.title}
                    </h3>
                  </Link>
                  
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="pt-2">
                    <Link to={`/blog/${post.id}`}>
                      <Button variant="link" className="text-yellow-600 hover:text-yellow-700 font-medium p-0 text-sm">
                        Read article →
                      </Button>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <Button 
              variant="outline" 
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </Button>
            
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-yellow-500 text-black'
                      : 'bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
            
            <Button 
              variant="outline" 
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center">
                  <span className="text-black font-bold text-sm">V</span>
                </div>
                <span className="text-xl font-semibold">VentureNext</span>
              </div>
              <p className="text-gray-400">
                Empowering entrepreneurs with exclusive perks and resources.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/perks" className="hover:text-white">Perks</a></li>
                <li><a href="/about" className="hover:text-white">About</a></li>
                <li><a href="/partner" className="hover:text-white">Partner</a></li>
                <li><a href="/journal" className="hover:text-white">Journal</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="/contact" className="hover:text-white">Contact</a></li>
                <li><a href="#" className="hover:text-white">Privacy</a></li>
                <li><a href="#" className="hover:text-white">Terms</a></li>
                <li><a href="#" className="hover:text-white">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Twitter</a></li>
                <li><a href="#" className="hover:text-white">LinkedIn</a></li>
                <li><a href="#" className="hover:text-white">Instagram</a></li>
                <li><a href="#" className="hover:text-white">Newsletter</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 VentureNext. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Journal;