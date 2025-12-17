import { Button } from "@/components/ui/button";
import { Clock, User, ChevronLeft, ChevronRight, Menu, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const featuredPost = {
  id: 1,
  category: "Remote Work",
  author: "Sarah Chen",
  readTime: "5 min read",
  title: "The Rise of Remote Work: What Founders Need to Know",
  excerpt: "How distributed teams are reshaping the startup landscape and what tools you need to thrive.",
  image: "/api/placeholder/600/300",
  date: "December 10, 2024",
  featured: true
};

const allArticles = [
  {
    id: 2,
    category: "Remote Work",
    author: "Sarah Chen",
    readTime: "5 min read",
    title: "The Rise of Remote Work: What Founders Need to Know",
    excerpt: "How distributed teams are reshaping the startup landscape and what tools you need to thrive.",
    image: "/api/placeholder/400/250",
    date: "December 10, 2024"
  },
  {
    id: 3,
    category: "Lifestyle",
    author: "Marcus Johnson",
    readTime: "8 min read",
    title: "Best Coworking Spaces for Startups in 2025",
    excerpt: "We visited 50+ coworking spaces to find the best ones for growing teams.",
    image: "/api/placeholder/400/250",
    date: "December 8, 2024"
  },
  {
    id: 4,
    category: "Technology",
    author: "Emma Watson",
    readTime: "6 min read",
    title: "AI Tools That Actually Save Founders Time",
    excerpt: "Cutting through the hype to find AI solutions that deliver real productivity gains.",
    image: "/api/placeholder/400/250",
    date: "December 5, 2024"
  },
  {
    id: 5,
    category: "Business",
    author: "Alex Thompson",
    readTime: "7 min read",
    title: "Scaling Your Startup: Lessons from 100 Founders",
    excerpt: "Key insights and common pitfalls from entrepreneurs who successfully scaled their businesses.",
    image: "/api/placeholder/400/250",
    date: "December 3, 2024"
  },
  {
    id: 6,
    category: "Funding",
    author: "Rachel Kim",
    readTime: "4 min read",
    title: "Alternative Funding Options Beyond VC",
    excerpt: "Exploring revenue-based financing, grants, and other funding alternatives for bootstrapped startups.",
    image: "/api/placeholder/400/250",
    date: "December 1, 2024"
  },
  {
    id: 7,
    category: "Productivity",
    author: "David Martinez",
    readTime: "6 min read",
    title: "Building Sustainable Work Habits as a Founder",
    excerpt: "How to maintain work-life balance while growing your business.",
    image: "/api/placeholder/400/250",
    date: "November 28, 2024"
  },
  {
    id: 8,
    category: "Marketing",
    author: "Lisa Park",
    readTime: "5 min read",
    title: "Content Marketing Strategies for B2B Startups",
    excerpt: "Proven tactics to attract and convert enterprise customers through content.",
    image: "/api/placeholder/400/250",
    date: "November 25, 2024"
  },
  {
    id: 9,
    category: "Technology",
    author: "James Wilson",
    readTime: "8 min read",
    title: "Building Your First Mobile App: A Founder's Guide",
    excerpt: "Step-by-step process from idea to app store launch for non-technical founders.",
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
    author: "Michael Adams",
    readTime: "7 min read",
    title: "Building a Sales Process from Scratch",
    excerpt: "How to systematize sales for consistent growth and predictable revenue.",
    image: "/api/placeholder/400/250",
    date: "November 8, 2024"
  },
  {
    id: 16,
    category: "Operations",
    author: "Jennifer Liu",
    readTime: "6 min read",
    title: "Automating Your Business Operations",
    excerpt: "Tools and processes to streamline operations and reduce manual work.",
    image: "/api/placeholder/400/250",
    date: "November 5, 2024"
  },
  {
    id: 17,
    category: "Culture",
    author: "Kevin O'Brien",
    readTime: "5 min read",
    title: "Building Company Culture in Remote Teams",
    excerpt: "Creating strong team bonds and shared values across distributed teams.",
    image: "/api/placeholder/400/250",
    date: "November 3, 2024"
  }
];

const Journal = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const articlesPerPage = 12;
  const totalPages = Math.ceil(allArticles.length / articlesPerPage);
  
  // Get current articles for the page
  const getCurrentArticles = () => {
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    return allArticles.slice(startIndex, endIndex);
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
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <a href="/" className="text-gray-300 hover:text-white transition-colors">Home</a>
            <a href="/perks" className="text-gray-300 hover:text-white transition-colors">Perks</a>
            <a href="/about" className="text-gray-300 hover:text-white transition-colors">About</a>
            <a href="/partner" className="text-gray-300 hover:text-white transition-colors">Partner</a>
            <a href="/journal" className="text-yellow-500 hover:text-yellow-400 transition-colors">Journal</a>
            <a href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</a>
          </nav>
          
          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="/admin" className="text-gray-300 hover:text-white transition-colors">Admin</a>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium px-4 py-2 text-sm">
              Explore Perks
            </Button>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-gray-800">
            <div className="flex flex-col space-y-4 pt-4">
              <a href="/" className="text-gray-300 hover:text-white transition-colors px-4 py-2">Home</a>
              <a href="/perks" className="text-gray-300 hover:text-white transition-colors px-4 py-2">Perks</a>
              <a href="/about" className="text-gray-300 hover:text-white transition-colors px-4 py-2">About</a>
              <a href="/partner" className="text-gray-300 hover:text-white transition-colors px-4 py-2">Partner</a>
              <a href="/journal" className="text-yellow-500 hover:text-yellow-400 transition-colors px-4 py-2">Journal</a>
              <a href="/contact" className="text-gray-300 hover:text-white transition-colors px-4 py-2">Contact</a>
              <div className="px-4 pt-2 flex flex-col space-y-3">
                <a href="/admin" className="text-gray-300 hover:text-white transition-colors">Admin</a>
                <Button className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium w-full">
                  Explore Perks
                </Button>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Featured Article */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-4 md:p-8">
            <div className="grid lg:grid-cols-2 gap-6 md:gap-8 items-center">
            <Link href={`/blog/${featuredPost.id}`} className="relative group cursor-pointer order-2 lg:order-1">
              <img src={featuredPost.image} alt={featuredPost.title} className="w-full h-48 md:h-80 object-cover rounded-xl group-hover:scale-105 transition-transform duration-300" />
              <span className="absolute top-3 md:top-4 left-3 md:left-4 bg-yellow-500 text-black text-xs md:text-sm font-medium px-2 md:px-3 py-1 rounded-full">
                Featured
              </span>
            </Link>
            <div className="space-y-3 md:space-y-4 order-1 lg:order-2">
              <div className="flex flex-wrap items-center gap-3 md:gap-4 text-sm text-gray-500">
                <span className="bg-gray-100 px-2 md:px-3 py-1 rounded-full text-xs md:text-sm">{featuredPost.category}</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-3 md:w-4 h-3 md:h-4" />
                  <span className="text-xs md:text-sm">{featuredPost.readTime}</span>
                </div>
              </div>
              
              <Link href={`/blog/${featuredPost.id}`}>
                <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight hover:text-yellow-600 transition-colors cursor-pointer">
                  {featuredPost.title}
                </h1>
              </Link>
              
              <p className="font-display text-base md:text-lg text-gray-600 leading-relaxed">
                {featuredPost.excerpt}
              </p>
              
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pt-2 md:pt-4">
                <span className="text-sm md:text-base text-gray-600">By {featuredPost.author}</span>
                <Link href={`/blog/${featuredPost.id}`}>
                  <Button variant="link" className="text-yellow-600 hover:text-yellow-700 font-medium p-0 text-sm md:text-base">
                  </Button>
                </Link>
              </div>
            </div>
          </div>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="py-8 md:py-12 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4">
    <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8">
      Latest Articles
    </h2>

    {/* Articles Grid */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
      {getCurrentArticles().map((post) => (
        <article
          key={post.id}
          className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
        >
          <Link href={`/blog/${post.id}`} className="relative h-40 md:h-48 block">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute top-2 md:top-3 left-2 md:left-3 bg-white/90 backdrop-blur text-xs font-medium px-2 md:px-3 py-1 rounded-full text-gray-700">
              {post.category}
            </span>
          </Link>

          <div className="p-4 md:p-6 space-y-2 md:space-y-3">
            <div className="flex flex-wrap items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-500">
              <span className="truncate">{post.author}</span>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{post.readTime}</span>
              </div>
            </div>

            <Link href={`/blog/${post.id}`}>
              <h3 className="font-display font-bold text-base md:text-lg text-gray-900 leading-tight group-hover:text-yellow-600 transition-colors line-clamp-2">
                {post.title}
              </h3>
            </Link>

            <p className="font-display text-gray-600 text-sm leading-relaxed line-clamp-2">
              {post.excerpt}
            </p>

            <div className="pt-2">
              <Link href={`/blog/${post.id}`}>
                <Button
                  variant="link"
                  className="text-yellow-600 hover:text-yellow-700 font-medium p-0 text-sm"
                >
                  Read article →
                </Button>
              </Link>
            </div>
          </div>
        </article>
      ))}
    </div>

    {/* Pagination */}
    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 md:mt-12">
      <Button
        variant="outline"
        onClick={handlePrevPage}
        disabled={currentPage === 1}
        className="flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="hidden sm:inline">Previous</span>
        <span className="sm:hidden">Prev</span>
      </Button>

      <div className="flex items-center gap-1 md:gap-2 overflow-x-auto max-w-full">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`w-8 h-8 md:w-10 md:h-10 rounded-lg font-medium transition-colors text-sm md:text-base flex-shrink-0 ${
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
        className="flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
      >
        <span className="hidden sm:inline">Next</span>
        <span className="sm:hidden">Next</span>
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
