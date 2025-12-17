"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Clock, User } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const featuredPost = {
  id: 1,
  category: "Remote Work",
  author: "Sarah Chen",
  readTime: "5 min read",
  title: "The Rise of Remote Work: What Founders Need to Know",
  excerpt: "How distributed teams are reshaping the startup landscape and what tools you need to thrive.",
  image: "/api/placeholder/600/400",
  date: "December 10, 2024",
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
    date: "December 10, 2024",
  },
  {
    id: 3,
    category: "Lifestyle",
    author: "Marcus Johnson",
    readTime: "8 min read",
    title: "Best Coworking Spaces for Startups in 2025",
    excerpt: "We visited 50+ coworking spaces to find the best ones for growing teams.",
    image: "/api/placeholder/400/250",
    date: "December 8, 2024",
  },
  {
    id: 4,
    category: "Technology",
    author: "Emma Watson",
    readTime: "6 min read",
    title: "AI Tools That Actually Save Founders Time",
    excerpt: "Cutting through the hype to find AI solutions that deliver real productivity gains.",
    image: "/api/placeholder/400/250",
    date: "December 5, 2024",
  },
  {
    id: 5,
    category: "Business",
    author: "Alex Thompson",
    readTime: "7 min read",
    title: "Scaling Your Startup: Lessons from 100 Founders",
    excerpt: "Key insights and common pitfalls from entrepreneurs who successfully scaled their businesses.",
    image: "/api/placeholder/400/250",
    date: "December 3, 2024",
  },
  {
    id: 6,
    category: "Funding",
    author: "Rachel Kim",
    readTime: "4 min read",
    title: "Alternative Funding Options Beyond VC",
    excerpt: "Exploring revenue-based financing, grants, and other funding alternatives for bootstrapped startups.",
    image: "/api/placeholder/400/250",
    date: "December 1, 2024",
  },
  {
    id: 7,
    category: "Productivity",
    author: "David Martinez",
    readTime: "6 min read",
    title: "Building Sustainable Work Habits as a Founder",
    excerpt: "How to maintain work-life balance while growing your business.",
    image: "/api/placeholder/400/250",
    date: "November 28, 2024",
  },
  {
    id: 8,
    category: "Marketing",
    author: "Lisa Park",
    readTime: "5 min read",
    title: "Content Marketing Strategies for B2B Startups",
    excerpt: "Proven tactics to attract and convert enterprise customers through content.",
    image: "/api/placeholder/400/250",
    date: "November 25, 2024",
  },
  {
    id: 9,
    category: "Technology",
    author: "James Wilson",
    readTime: "8 min read",
    title: "Building Your First Mobile App: A Founder's Guide",
    excerpt: "Step-by-step process from idea to app store launch for non-technical founders.",
    image: "/api/placeholder/400/250",
    date: "November 22, 2024",
  },
  {
    id: 10,
    category: "Leadership",
    author: "Maria Garcia",
    readTime: "7 min read",
    title: "Managing Remote Teams: Best Practices for 2025",
    excerpt: "Essential strategies for leading distributed teams in a post-pandemic world.",
    image: "/api/placeholder/400/250",
    date: "November 20, 2024",
  },
  {
    id: 11,
    category: "Finance",
    author: "Thomas Brown",
    readTime: "6 min read",
    title: "Understanding Startup Valuations and Equity",
    excerpt: "A comprehensive guide to equity distribution and company valuation basics.",
    image: "/api/placeholder/400/250",
    date: "November 18, 2024",
  },
  {
    id: 12,
    category: "Growth",
    author: "Anna Lee",
    readTime: "5 min read",
    title: "Customer Acquisition Strategies That Actually Work",
    excerpt: "Data-driven approaches to finding and retaining your ideal customers.",
    image: "/api/placeholder/400/250",
    date: "November 15, 2024",
  },
  {
    id: 13,
    category: "Legal",
    author: "Robert Taylor",
    readTime: "9 min read",
    title: "Legal Essentials Every Founder Should Know",
    excerpt: "Navigate contracts, intellectual property, and compliance without breaking the bank.",
    image: "/api/placeholder/400/250",
    date: "November 12, 2024",
  },
  {
    id: 14,
    category: "Design",
    author: "Sophie Chen",
    readTime: "4 min read",
    title: "UX Design Principles for Early-Stage Startups",
    excerpt: "Creating user-centered products when resources are limited.",
    image: "/api/placeholder/400/250",
    date: "November 10, 2024",
  },
  {
    id: 15,
    category: "Sales",
    author: "Michael Adams",
    readTime: "7 min read",
    title: "Building a Sales Process from Scratch",
    excerpt: "How to systematize sales for consistent growth and predictable revenue.",
    image: "/api/placeholder/400/250",
    date: "November 8, 2024",
  },
  {
    id: 16,
    category: "Operations",
    author: "Jennifer Liu",
    readTime: "6 min read",
    title: "Automating Your Business Operations",
    excerpt: "Tools and processes to streamline operations and reduce manual work.",
    image: "/api/placeholder/400/250",
    date: "November 5, 2024",
  },
  {
    id: 17,
    category: "Culture",
    author: "Kevin O'Brien",
    readTime: "5 min read",
    title: "Building Company Culture in Remote Teams",
    excerpt: "Creating strong team bonds and shared values across distributed teams.",
    image: "/api/placeholder/400/250",
    date: "November 3, 2024",
  },
  {
    id: 18,
    category: "Analytics",
    author: "Nina Patel",
    readTime: "6 min read",
    title: "Metrics That Matter: Tracking Startup Success",
    excerpt: "Understanding KPIs that actually predict business growth and success.",
    image: "/api/placeholder/400/250",
    date: "November 1, 2024",
  },
  {
    id: 19,
    category: "Partnerships",
    author: "Chris Martinez",
    readTime: "5 min read",
    title: "Strategic Partnerships That Accelerate Growth",
    excerpt: "How to identify and cultivate partnerships that benefit your startup.",
    image: "/api/placeholder/400/250",
    date: "October 28, 2024",
  },
  {
    id: 20,
    category: "Security",
    author: "Monica Singh",
    readTime: "7 min read",
    title: "Cybersecurity Basics for Startup Founders",
    excerpt: "Essential security practices to protect your business and customer data.",
    image: "/api/placeholder/400/250",
    date: "October 25, 2024",
  },
  {
    id: 21,
    category: "Expansion",
    author: "David Lee",
    readTime: "8 min read",
    title: "Expanding Your Startup Internationally",
    excerpt: "Key considerations and strategies for taking your startup global.",
    image: "/api/placeholder/400/250",
    date: "October 22, 2024",
  },
  {
    id: 22,
    category: "Innovation",
    author: "Sarah Williams",
    readTime: "6 min read",
    title: "Fostering Innovation in Your Organization",
    excerpt: "Creating a culture and processes that encourage continuous innovation.",
    image: "/api/placeholder/400/250",
    date: "October 20, 2024",
  },
  {
    id: 23,
    category: "Mentorship",
    author: "Peter Johnson",
    readTime: "5 min read",
    title: "Finding and Leveraging Mentors for Your Startup",
    excerpt: "How to find the right mentors and get the most value from mentorship.",
    image: "/api/placeholder/400/250",
    date: "October 18, 2024",
  },
  {
    id: 24,
    category: "Sustainability",
    author: "Laura Chen",
    readTime: "6 min read",
    title: "Building Sustainable and Socially Responsible Startups",
    excerpt: "Balancing profit with purpose in your startup journey.",
    image: "/api/placeholder/400/250",
    date: "October 15, 2024",
  },
];

const getCategoryColor = (category: string) => {
  const colors: { [key: string]: string } = {
    "Remote Work": "bg-blue-100 text-blue-800",
    "Lifestyle": "bg-green-100 text-green-800",
    "Technology": "bg-purple-100 text-purple-800",
    "Business": "bg-orange-100 text-orange-800",
    "Funding": "bg-red-100 text-red-800",
    "Productivity": "bg-yellow-100 text-yellow-800",
    "Marketing": "bg-pink-100 text-pink-800",
    "Leadership": "bg-indigo-100 text-indigo-800",
    "Finance": "bg-cyan-100 text-cyan-800",
    "Growth": "bg-emerald-100 text-emerald-800",
    "Legal": "bg-slate-100 text-slate-800",
    "Design": "bg-teal-100 text-teal-800",
    "Sales": "bg-fuchsia-100 text-fuchsia-800",
    "Operations": "bg-lime-100 text-lime-800",
    "Culture": "bg-rose-100 text-rose-800",
    "Analytics": "bg-amber-100 text-amber-800",
    "Partnerships": "bg-violet-100 text-violet-800",
    "Security": "bg-sky-100 text-sky-800",
    "Expansion": "bg-bronze-100 text-bronze-800",
    "Innovation": "bg-stone-100 text-stone-800",
    "Mentorship": "bg-zinc-100 text-zinc-800",
    "Sustainability": "bg-neutral-100 text-neutral-800",
  };
  return colors[category] || "bg-gray-100 text-gray-800";
};

export default function JournalPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 12;
  const totalPages = Math.ceil(allArticles.length / articlesPerPage);

  const getCurrentArticles = () => {
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    return allArticles.slice(startIndex, endIndex);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const currentArticles = getCurrentArticles();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
      {/* Featured Article Section */}
      <section className="bg-[#faf8f6] py-16 border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Featured Image */}
            <div className="relative">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="rounded-xl object-cover w-full h-80 md:h-96 shadow-lg"
              />
              <div className="absolute top-4 left-4">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-amber-400 text-black">
                  Featured
                </span>
              </div>
            </div>

            {/* Featured Content */}
            <div className="space-y-5">
              <div className="flex gap-3 items-center">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                  {featuredPost.category}
                </span>
                <span className="flex items-center gap-1 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  {featuredPost.readTime}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-slate-900">
                {featuredPost.title}
              </h1>
              
              <p className="text-lg text-gray-700 leading-relaxed">
                {featuredPost.excerpt}
              </p>
              
              <div className="flex items-center gap-2 pt-4">
                <span className="text-sm text-gray-600">
                  By <span className="font-semibold text-slate-900">{featuredPost.author}</span>
                </span>
              </div>
              
              <Link href={`/journal/${featuredPost.id}`}>
                <span className="inline-block text-amber-500 hover:text-amber-600 font-semibold text-lg">
                  Read article →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="py-16 bg-[#f5f3f0]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-900 mb-12">Latest Articles</h2>

          {/* Articles Grid - 3 columns x 4 rows = 12 per page */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {currentArticles.map((article) => (
              <Link key={article.id} href={`/journal/${article.id}`}>
                <div className="group cursor-pointer h-full flex flex-col bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                  {/* Article Image Container */}
                  <div className="relative overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(article.category)}`}>
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Article Content */}
                  <div className="p-5 flex flex-col flex-grow">
                    {/* Article Meta - Author and Read Time */}
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      <span>{article.author}</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {article.readTime}
                      </span>
                    </div>

                    {/* Article Title */}
                    <h3 className="text-lg font-bold text-slate-900 mb-3 group-hover:text-amber-500 transition-colors line-clamp-2">
                      {article.title}
                    </h3>

                    {/* Article Excerpt */}
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-4 pt-8 border-t">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-slate-900 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => {
                    setCurrentPage(page);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={`w-10 h-10 rounded-lg font-semibold transition-colors ${
                    currentPage === page
                      ? "bg-amber-400 text-black"
                      : "border border-gray-300 text-slate-900 hover:bg-gray-50"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-slate-900 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Next
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Page Info */}
          <div className="text-center mt-6 text-sm text-gray-600">
            Page {currentPage} of {totalPages} • Showing {currentArticles.length} of {allArticles.length} articles
          </div>
        </div>
      </section>
      </div>
      <Footer />
    </div>
  );
}
