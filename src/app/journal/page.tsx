"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const mockArticles = [
  {
    id: 1,
    title: "The Rise of Remote Work: What Founders Need to Know",
    description:
      "How distributed teams are reshaping the startup landscape and what tools you need to thrive.",
    author: "Sarah Chen",
    tag: "Remote Work",
    time: "5 min read",
    image:
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
    featured: true,
  },
  {
    id: 2,
    title: "Best Coworking Spaces for Startups in 2025",
    description:
      "We visited 150+ coworking spaces to find the best ones for growing teams.",
    author: "Marcus Johnson",
    tag: "Lifestyle",
    time: "8 min read",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
  },
  {
    id: 3,
    title: "AI Tools That Actually Save Founders Time",
    description:
      "Cutting through the hype to find AI solutions that deliver real productivity gains.",
    author: "Emma Watson",
    tag: "Technology",
    time: "6 min read",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
  },
  ...Array.from({ length: 20 }).map((_, i) => ({
    id: i + 4,
    title: `Sample Article ${i + 4}`,
    description:
      "This is a sample article description for testing pagination.",
    author: `Author ${i + 4}`,
    tag: ["Remote Work", "Lifestyle", "Technology"][i % 3],
    time: `${4 + (i % 5)} min read`,
    image: [
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80",
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=600&q=80",
    ][i % 3],
  })),
];

const ARTICLES_PER_PAGE = 12;

export default function Journal() {
  const [page, setPage] = useState(1);

  const startIdx = (page - 1) * ARTICLES_PER_PAGE;
  const endIdx = startIdx + ARTICLES_PER_PAGE;
  const pagedArticles = mockArticles.slice(startIdx, endIdx);
  const pageCount = Math.ceil(mockArticles.length / ARTICLES_PER_PAGE);

  const featured = mockArticles[0];

  return (
    <>
      <Header />
      <main className="bg-[#fcfaf7] min-h-screen">

      {/* Featured Article */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row gap-8 items-stretch">
          <Link href={`/journal/${featured.id}`} className="flex-1 relative min-w-[320px] group cursor-pointer">
            <img
              src={featured.image}
              alt={featured.title}
              className="rounded-2xl object-cover w-full h-64 md:h-full group-hover:opacity-90 transition"
            />
            <span className="absolute top-4 left-4 bg-[#e6b756] text-[#1a2233] text-xs font-semibold px-3 py-1 rounded-full font-display">
              Featured
            </span>
          </Link>

          <div className="flex-1 bg-white rounded-2xl shadow-sm p-10 flex flex-col justify-center">
            <div className="mb-2 flex gap-2 items-center">
              <span className="bg-[#f3f3f3] text-[#23272f] text-xs font-semibold px-3 py-1 rounded-full font-display">
                {featured.tag}
              </span>
              <span className="text-[#6b6f76] text-xs">
                • {featured.time}
              </span>
            </div>

            <Link href={`/journal/${featured.id}`} className="hover:underline">
              <h2 className="text-2xl md:text-3xl font-bold text-[#23272f] mb-2 cursor-pointer font-display">{featured.title}</h2>
            </Link>
            <p className="text-[#6b6f76] mb-4">
              {featured.description}
            </p>
            <div className="text-sm text-[#6b6f76] mb-2">
              By {featured.author}
            </div>
            <Link
              href={`/journal/${featured.id}`}
              className="text-[#e6b756] font-semibold text-sm mt-2 hover:underline"
            >
              Read article →
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="bg-[#fcfaf7] py-10">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-[#23272f] mb-6 font-display">
            Latest Articles
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {pagedArticles.map((article) => (
              <Link
                key={article.id}
                href={`/journal/${article.id}`}
                className="bg-white rounded-2xl shadow-sm overflow-hidden flex flex-col group cursor-pointer"
              >
                <div className="relative">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-40 object-cover group-hover:opacity-90 transition"
                  />
                  <span className="absolute top-3 left-3 bg-[#f3f3f3] text-[#23272f] text-xs font-semibold px-3 py-1 rounded-full font-display">
                    {article.tag}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-xs text-[#6b6f76] mb-1">
                    {article.author} • {article.time}
                  </div>
                  <div className="font-semibold text-[#23272f] mb-1 font-display">{article.title}</div>
                  <div className="text-[#6b6f76] text-sm mb-3 flex-1">{article.description}</div>
                  <span className="text-[#e6b756] font-semibold text-sm mt-auto group-hover:underline font-display">Read article →</span>
                </div>
              </Link>
            ))}
          </div>

          {pageCount > 1 && (
            <div className="flex justify-end mt-10">
              <Button
                className="bg-[#e6b756] text-[#1a2233] font-semibold px-6 py-2 rounded-full hover:bg-[#f5d488] font-display"
                disabled={page === pageCount}
                onClick={() => setPage(page + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}
