"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function ArticlePage({ params }: { params: { id: string } }) {
  // Mock data for demonstration
  const article = {
    id: params.id,
    tag: "Business Registration",
    title: "5 Essential Steps to Register Your Business in Singapore",
    date: "December 15, 2024",
    time: "8 min read",
    category: "Business Guide",
    author: {
      name: "Sarah Mitchell",
      title: "Senior Business Consultant",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    content: [
      "We’ve already written a blog about why encouraging our team to refer their friends and colleagues works so well for us. It’s here if you want to read it.",
      "But, to really drive the point home—and hear a little more from our lovely team about what drew them to GetYourGuide in the first place—we thought we’d write another one.",
      "Why do employee referrals work within our company culture?",
      "There are lots of answers to this question. Here are our top three.",
      "Employee referrals bring immense value, often connecting us with highly aligned and dedicated candidates. Every referral helps shape our workplace community, enabling us to expand our skill set with trusted professionals already vetted by a team member.",
      "Secondly, referred employees are more likely to stick around because they understand the company culture from the start. When our employees feel confident enough to recommend us to their friends and ex-co-workers, it’s a testament to the vibrant and welcoming environment we work hard to maintain.",
      "Lastly, giving our employees a say in the company’s structure builds collaboration, community, and personal investment. That’s why we offer cash bonuses for every successful referral, incentivizing our team to invite those they trust into the fold.",
      "Now, for the fun part. We interviewed a few dynamic duos to prove just how well employee referrals work!"
    ]
  };

  const router = useRouter();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Header />
      <main className="bg-white min-h-screen px-4 py-10">
        <div className="max-w-4xl mx-auto">
        <div className="mb-4 flex items-center gap-2">
          <span className="bg-[#ffe4c2] text-[#b48a1e] text-xs font-semibold px-3 py-1 rounded-full">{article.tag}</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#23272f] mb-4">{article.title}</h1>
        <div className="flex items-center gap-6 text-[#6b6f76] text-sm mb-6">
          <span className="flex items-center gap-1">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M8 2v2M16 2v2M3 8.5h18M4 21h16a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H4a1 1 0 0 0-1 1v13a1 1 0 0 0 1 1Z" stroke="#b48a1e" strokeWidth="1.5"/></svg>
            {article.date}
          </span>
          <span className="flex items-center gap-1">
            <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#b48a1e" strokeWidth="1.5"/><path d="M12 8v4l2 2" stroke="#b48a1e" strokeWidth="1.5"/></svg>
            {article.time}
          </span>
          <span>{article.category}</span>
        </div>
        <div className="flex items-center gap-4 mb-8">
          <img src={article.author.avatar} alt={article.author.name} className="w-12 h-12 rounded-full bg-gray-100" />
          <div>
            <div className="font-semibold text-[#23272f]">{article.author.name}</div>
            <div className="text-[#6b6f76] text-sm">{article.author.title}</div>
          </div>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 text-[#23272f] font-medium mb-10 hover:bg-gray-50">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24"><path d="M17 8a5 5 0 0 1-9.9 1M12 3v9m0 0l-3-3m3 3l3-3" stroke="#23272f" strokeWidth="1.5"/></svg>
          Share Article
        </button>
        <div className="prose max-w-none text-[#23272f]">
          {article.content.map((para, idx) =>
            para.startsWith("Why do employee referrals") ? (
              <h2 key={idx} className="text-2xl font-bold mt-10 mb-4">{para}</h2>
            ) : (
              <p key={idx} className="mb-6 text-lg leading-relaxed">{para}</p>
            )
          )}
        </div>

        {/* Share Section */}
        <div className="mt-12">
          <div className="font-bold text-lg text-[#23272f] mb-4">Share</div>
          <div className="flex gap-6">
            <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-[#f7f7f8] text-[#23272f] text-2xl hover:bg-[#ececec]" aria-label="Share on Facebook">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M17 2.1h-2.2c-2.2 0-3.6 1.3-3.6 3.4v1.5H8.1A.1.1 0 0 0 8 7v3a.1.1 0 0 0 .1.1h3.1v7.8a.1.1 0 0 0 .1.1h3.2a.1.1 0 0 0 .1-.1v-7.8h2.2a.1.1 0 0 0 .1-.1l.1-3a.1.1 0 0 0-.1-.1h-2.2V6.1c0-.5.1-.7.7-.7h1.5a.1.1 0 0 0 .1-.1V2.2a.1.1 0 0 0-.1-.1Z" fill="#23272f"/></svg>
            </a>
            <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-[#f7f7f8] text-[#23272f] text-2xl hover:bg-[#ececec]" aria-label="Share on Twitter">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M22 5.9c-.8.4-1.6.7-2.5.8a4.2 4.2 0 0 0 1.8-2.3c-.8.5-1.7.9-2.6 1.1A4.1 4.1 0 0 0 12 9.7c0 .3 0 .6.1.9-3.4-.2-6.4-1.8-8.4-4.3-.4.7-.6 1.5-.6 2.3 0 1.6.8 3 2.1 3.8-.7 0-1.4-.2-2-.5v.1c0 2.2 1.6 4 3.7 4.4-.4.1-.8.2-1.2.2-.3 0-.6 0-.8-.1.6 1.8 2.3 3.1 4.3 3.1A8.3 8.3 0 0 1 2 19.1c-.3 0-.6 0-.8-.1A11.7 11.7 0 0 0 7.3 21c7.5 0 11.6-6.2 11.6-11.6v-.5c.8-.6 1.5-1.3 2-2.1Z" fill="#23272f"/></svg>
            </a>
            <a href="#" className="w-12 h-12 flex items-center justify-center rounded-full bg-[#f7f7f8] text-[#23272f] text-2xl hover:bg-[#ececec]" aria-label="Share on LinkedIn">
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><path d="M19 3A2 2 0 0 1 21 5v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14Zm-9.5 15V10H6v8h3.5Zm-1.7-9.2c1 0 1.7-.7 1.7-1.6 0-.9-.7-1.6-1.7-1.6-1 0-1.7.7-1.7 1.6 0 .9.7 1.6 1.7 1.6Zm11.2 9.2v-4.3c0-2.3-1.2-3.3-2.8-3.3-1.3 0-1.9.7-2.2 1.2v-1h-3.5c.1.7 0 8 0 8h3.5v-4.5c0-.2 0-.4.1-.5.2-.4.6-.9 1.3-.9.9 0 1.2.7 1.2 1.7v4.2H19Z" fill="#23272f"/></svg>
            </a>
          </div>
        </div>

        {/* Tags Section */}
        <div className="mt-10">
          <div className="font-bold text-lg text-[#23272f] mb-4">Tags</div>
          <div className="flex flex-wrap gap-3">
            {['Singapore', 'Business Registration', 'ACRA', 'Startup', 'Legal'].map((tag) => (
              <span key={tag} className="px-4 py-1 rounded-full border border-[#e6e6e6] bg-white text-[#23272f] text-sm font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
