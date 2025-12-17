"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AdminLayout from "@/components/AdminLayout";
import { RichTextEditor } from "@/components/journal/RichTextEditor";



export default function NewPost() {
  const [tab, setTab] = useState<"content" | "seo">("content");
  const [isClient, setIsClient] = useState(false);
  const [contentValue, setContentValue] = useState("");

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Loading state
  if (!isClient) {
    return (
      <AdminLayout>
        <div className="flex items-center gap-2 mb-6 text-gray-500">
          <span className="text-2xl font-bold text-[#23272f] cursor-pointer">
            &#8592;
          </span>
          <span className="text-sm cursor-pointer">Back</span>
          <h1 className="text-2xl font-bold ml-4 text-[#23272f]">New Post</h1>
        </div>
        <div className="flex gap-8">
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                <div className="h-10 bg-gray-200 rounded mb-4"></div>
                <div className="h-24 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="flex items-center gap-2 mb-6 text-gray-500">
        <span className="text-2xl font-bold text-[#23272f] cursor-pointer">
          &#8592;
        </span>
        <span className="text-sm cursor-pointer">Back</span>
        <h1 className="text-2xl font-bold ml-4 text-[#23272f]">New Post</h1>
      </div>

      <div className="flex gap-8">
        {/* Main Content */}
        <div className="flex-1">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex gap-4 mb-4">
              <Button
                variant={tab === "content" ? "default" : "ghost"}
                className="px-4 py-2"
                onClick={() => setTab("content")}
              >
                Content
              </Button>
              <Button
                variant={tab === "seo" ? "default" : "ghost"}
                className="px-4 py-2"
                onClick={() => setTab("seo")}
              >
                SEO
              </Button>
            </div>

            {tab === "content" && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Title *
                  </label>
                  <Input placeholder="Enter post title" />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Slug
                  </label>
                  <Input placeholder="post-url-slug" />
                  <div className="text-xs text-gray-400 mt-1">
                    URL: /journal/post-slug
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Excerpt
                  </label>
                  <Textarea placeholder="Brief summary for listings and previews" />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Content
                  </label>
                  <RichTextEditor
                    value={contentValue}
                    onChange={setContentValue}
                    placeholder="Write your post content here..."
                  />
                </div>
              </>
            )}

            {tab === "seo" && (
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-bold mb-4">SEO Settings</h2>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Meta Title
                  </label>
                  <Input placeholder="SEO title (max 60 chars)" maxLength={60} />
                  <div className="text-xs text-gray-400 mt-1">
                    0/60 characters
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Meta Description
                  </label>
                  <Textarea
                    placeholder="SEO description (max 160 chars)"
                    maxLength={160}
                  />
                  <div className="text-xs text-gray-400 mt-1">
                    0/160 characters
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Keywords
                  </label>
                  <Input placeholder="keyword1, keyword2, keyword3" />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    OG Image URL
                  </label>
                  <Input placeholder="Social share image URL" />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Canonical URL
                  </label>
                  <Input placeholder="https://yoursite.com/journal/post-slug" />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-96 flex flex-col gap-6">
          <div className="flex gap-2 justify-end mb-6">
            <Button variant="outline" className="px-6 py-2 rounded-full">
              Save Draft
            </Button>
            <Button className="bg-[#e6b756] text-[#1a2233] px-6 py-2 rounded-full">
              Publish
            </Button>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="font-semibold mb-2">Featured Image</div>

            <div className="border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center h-32 cursor-pointer bg-gray-50">
              <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
                <path
                  d="M12 16V8m0 0-3 3m3-3 3 3"
                  stroke="#6b6f76"
                  strokeWidth="1.5"
                />
                <rect
                  x="3"
                  y="3"
                  width="18"
                  height="18"
                  rx="2"
                  stroke="#e6e6e6"
                  strokeWidth="1.5"
                />
              </svg>
              <div className="text-gray-400 mt-2">Upload image</div>
            </div>

            <Input className="mt-2" placeholder="Or paste image URL" />
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="font-semibold mb-2">Details</div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Author</label>
              <Input value="Admin" readOnly />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Category
              </label>
              <select className="w-full border rounded-lg px-3 py-2">
                <option>Select category</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">
                Publish Date
              </label>
              <input
                type="date"
                className="w-full border rounded-lg px-3 py-2"
                value={new Date().toISOString().split("T")[0]}
              />
            </div>

            <div className="mb-3">
              <label className="block text-sm font-medium mb-1">Tags</label>
              <div className="flex gap-2">
                <Input placeholder="Add tag" />
                <Button type="button" variant="outline">
                  Add
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}