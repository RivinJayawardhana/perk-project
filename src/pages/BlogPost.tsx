import { Button } from "@/components/ui/button";
import { Calendar, Clock, BookOpen, Share2, ArrowLeft } from "lucide-react";
import { Link, useParams } from "react-router-dom";

// Mock blog post data - matches the journal articles
const blogPosts = {
  1: {
    id: 1,
    category: "Business Registration",
    title: "5 Essential Steps to Register Your Business in Singapore",
    date: "December 15, 2024",
    readTime: "8 min read",
    type: "Business Guide",
    author: {
      name: "Sarah Mitchell",
      title: "Senior Business Consultant",
      avatar: "/api/placeholder/40/40"
    },
    tags: ["Singapore", "Business Registration", "ACRA", "Startup", "Legal"],
    content: `
      <p>We've already written a blog about why encouraging our team to refer their friends and colleagues works so well for us. It's <a href="#" class="text-blue-600 underline">here</a> if you want to read it.</p>
      
      <p>But, to really drive the point home—and hear a little more from our lovely team about what drew them to GetYourGuide in the first place—we thought we'd write another one.</p>
      
      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Why do employee referrals work within our company culture?</h2>
      
      <p>There are lots of answers to this question. Here are our top three.</p>
      
      <p>Employee referrals bring immense value, often connecting us with highly aligned and dedicated candidates. Every referral helps shape our workplace community, enabling us to expand our skill set with trusted professionals already vetted by a team member.</p>
      
      <p>Secondly, referred employees are more likely to stick around because they understand the company culture from the start. When our employees feel confident enough to recommend us to their friends and ex-co-workers, it's a testament to the vibrant and welcoming environment we work hard to maintain.</p>
      
      <p>Lastly, giving our employees a say in the company's structure builds collaboration, community, and personal investment. That's why we offer cash bonuses for every successful referral, incentivizing our team to invite those they trust into the fold.</p>
      
      <p>Now, for the fun part. We interviewed a few dynamic duos to prove just how well employee referrals work for us at GetYourGuide.</p>
      
      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Success Stories from Our Team</h2>
      
      <p>Our employee referral program has created some amazing partnerships within our organization. Here are just a few examples of how these connections have strengthened our team and improved our workplace culture.</p>
      
      <p>From technical innovations to creative breakthroughs, the power of personal recommendations continues to bring exceptional talent to our organization, fostering an environment where everyone can thrive and contribute to our shared success.</p>
    `
  },
  2: {
    id: 2,
    category: "Remote Work",
    title: "The Rise of Remote Work: What Founders Need to Know",
    date: "December 10, 2024",
    readTime: "5 min read",
    type: "Startup Guide",
    author: {
      name: "Sarah Chen",
      title: "Remote Work Specialist",
      avatar: "/api/placeholder/40/40"
    },
    tags: ["Remote Work", "Startup", "Management", "Productivity"],
    content: `
      <p>The landscape of work has fundamentally shifted over the past few years. Remote work, once considered a perk or exception, has become the norm for many organizations worldwide.</p>
      
      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">The Remote Revolution</h2>
      
      <p>For founders and startup leaders, understanding how to navigate this new world of distributed teams is crucial for success. The benefits are clear: access to global talent, reduced overhead costs, and improved work-life balance for employees.</p>
      
      <p>However, remote work also presents unique challenges that require intentional strategies and tools to overcome.</p>
      
      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Building Effective Remote Teams</h2>
      
      <p>Successful remote teams don't happen by accident. They require deliberate planning, the right technology stack, and a culture that supports distributed collaboration.</p>
      
      <p>Communication becomes even more critical in remote settings. Establish clear channels for different types of communication, set expectations for response times, and create opportunities for both formal and informal interactions.</p>
      
      <p>Invest in the right tools and technologies that enable seamless collaboration. This includes project management software, video conferencing platforms, and asynchronous communication tools.</p>
    `
  },
  3: {
    id: 3,
    category: "Technology",
    title: "AI and Machine Learning for Small Businesses",
    date: "December 8, 2024",
    readTime: "6 min read",
    type: "Tech Guide",
    author: {
      name: "Alex Johnson",
      title: "Tech Innovation Lead",
      avatar: "/api/placeholder/40/40"
    },
    tags: ["AI", "Machine Learning", "Technology", "Automation", "Small Business"],
    content: `
      <p>Artificial Intelligence and Machine Learning are no longer exclusive to tech giants. Small businesses can now leverage these powerful technologies to automate processes, gain insights, and improve customer experiences.</p>
      
      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Getting Started with AI</h2>
      
      <p>The key to successfully implementing AI in your business is to start small and focus on specific use cases where automation can make an immediate impact. Customer service chatbots, email marketing automation, and inventory management are excellent starting points.</p>
      
      <p>Many modern tools now come with built-in AI capabilities, making it easier than ever to incorporate intelligent features without requiring deep technical expertise or significant investment.</p>
      
      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Practical Applications</h2>
      
      <p>Consider implementing AI-powered analytics to understand customer behavior patterns, automated content generation for social media, or predictive analytics for better decision-making. These applications can provide significant returns on investment while requiring minimal technical setup.</p>
    `
  },
  4: {
    id: 4,
    category: "Business",
    title: "Scaling Your Startup: From MVP to Market Leader",
    date: "December 5, 2024",
    readTime: "7 min read",
    type: "Growth Strategy",
    author: {
      name: "Emily Rodriguez",
      title: "Business Development Director",
      avatar: "/api/placeholder/40/40"
    },
    tags: ["Scaling", "MVP", "Growth", "Strategy", "Leadership"],
    content: `
      <p>The journey from a minimum viable product to market leadership requires strategic planning, careful resource allocation, and the ability to adapt quickly to changing market conditions.</p>
      
      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Building the Foundation</h2>
      
      <p>Before you can scale effectively, you need to ensure that your foundation is solid. This means having a clear understanding of your target market, a product that truly solves a problem, and systems in place that can handle growth.</p>
      
      <p>Many startups make the mistake of trying to scale too quickly without first validating their product-market fit. Take the time to gather feedback, iterate on your offering, and build a loyal customer base before expanding aggressively.</p>
      
      <h2 class="text-2xl font-bold text-gray-900 mt-8 mb-4">Strategic Growth Planning</h2>
      
      <p>Successful scaling requires a balance between speed and sustainability. Focus on building systems and processes that can grow with your business, investing in the right technology, and hiring team members who can contribute to your long-term vision.</p>
    `
  }
};

const BlogPost = () => {
  const { id } = useParams();
  const post = blogPosts[parseInt(id) || 1];

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <div className="min-h-screen bg-white">
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

      {/* Article Content */}
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Back Link */}
        <Link to="/journal" className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-8">
          <ArrowLeft className="w-4 h-4" />
          Back to Journal
        </Link>

        {/* Category Tag */}
        <div className="mb-6">
          <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-medium">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Meta Info */}
        <div className="flex items-center gap-6 text-gray-600 mb-6">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{post.readTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4" />
            <span>{post.type}</span>
          </div>
        </div>

        {/* Author Info */}
        <div className="flex items-center gap-4 mb-8">
          <img 
            src={post.author.avatar} 
            alt={post.author.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold text-gray-900">{post.author.name}</h3>
            <p className="text-gray-600 text-sm">{post.author.title}</p>
          </div>
        </div>

        {/* Share Button */}
        <div className="mb-8">
          <Button variant="outline" className="flex items-center gap-2">
            <Share2 className="w-4 h-4" />
            Share Article
          </Button>
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none mb-12">
          <div 
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="text-gray-700 leading-relaxed"
          />
        </div>

        {/* Share Section */}
        <div className="border-t border-gray-200 pt-8 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Share</h3>
          <div className="flex items-center gap-4">
            <button className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M20 10c0-5.523-4.477-10-10-10S0 4.477 0 10c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V10h2.54V7.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V10h2.773l-.443 2.89h-2.33v6.988C16.343 19.128 20 14.991 20 10z" clipRule="evenodd" />
              </svg>
            </button>
            <button className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.073 4.073 0 01.8 7.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </button>
            <button className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Tags */}
        <div className="border-t border-gray-200 pt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 cursor-pointer"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </article>

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

export default BlogPost;