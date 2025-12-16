"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import AdminLayout from "@/components/AdminLayout";

// Toolbar Button Component
const ToolbarButton = ({ active, onClick, children, title, disabled }: any) => (
  <button
    type="button"
    onClick={onClick}
    disabled={disabled}
    className={`p-2 rounded-md ${active ? "bg-gray-200" : "hover:bg-gray-100"} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    title={title}
  >
    {children}
  </button>
);

// SVG Icons as React components
const BoldIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const ItalicIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const UnderlineIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 12H6m12 0l-4 4m4-4l-4-4" />
  </svg>
);

const StrikethroughIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
  </svg>
);

const ListIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const ListOrderedIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const AlignLeftIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const AlignCenterIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const AlignRightIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const QuoteIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
  </svg>
);

const LinkIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
  </svg>
);

const UndoIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
  </svg>
);

const RedoIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6" />
  </svg>
);

const Heading1Icon = () => (
  <span className="text-xs font-bold">H1</span>
);

const Heading2Icon = () => (
  <span className="text-xs font-bold">H2</span>
);

const Heading3Icon = () => (
  <span className="text-xs font-bold">H3</span>
);

// Add Link Dialog Component
const LinkDialog = ({ onClose }: any) => {
  const [url, setUrl] = useState("https://");
  const [openInNewTab, setOpenInNewTab] = useState(false);

  const addLink = () => {
    onClose();
  };

  const removeLink = () => {
    onClose();
  };

  return (
    <div className="absolute top-full left-0 mt-1 bg-white border rounded-lg shadow-lg p-4 z-50 min-w-64">
      <div className="space-y-3">
        <div>
          <label className="block text-sm font-medium mb-1">URL</label>
          <Input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com"
            className="w-full"
            autoFocus
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="new-tab"
            checked={openInNewTab}
            onChange={(e) => setOpenInNewTab(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="new-tab" className="text-sm">
            Open in new tab
          </label>
        </div>
        <div className="flex gap-2 justify-end">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={removeLink}
          >
            Remove
          </Button>
          <Button
            type="button"
            size="sm"
            onClick={addLink}
            disabled={!url.trim()}
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function NewPost() {
  const [tab, setTab] = useState<"content" | "seo">("content");
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [isClient, setIsClient] = useState(false);

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

                  {/* Editor with Toolbar */}
                  <div className="border rounded-lg overflow-hidden">
                    {/* Editor Toolbar */}
                    <div className="bg-gray-50 border-b px-4 py-2 flex flex-wrap items-center gap-1">
                      {/* Format Type */}
                      <div className="flex items-center gap-1 pr-2 border-r mr-2">
                        <span className="text-xs text-gray-500 mr-1">Visual</span>
                      </div>

                      {/* Heading Levels */}
                      <ToolbarButton
                        active={false}
                        onClick={() => {}}
                        title="Heading 1"
                      >
                        <Heading1Icon />
                      </ToolbarButton>
                      <ToolbarButton
                        active={false}
                        onClick={() => {}}
                        title="Heading 2"
                      >
                        <Heading2Icon />
                      </ToolbarButton>
                      <ToolbarButton
                        active={false}
                        onClick={() => {}}
                        title="Heading 3"
                      >
                        <Heading3Icon />
                      </ToolbarButton>

                      <div className="w-px h-6 bg-gray-300 mx-1"></div>

                      {/* Text Formatting */}
                      <ToolbarButton
                        active={false}
                        onClick={() => {}}
                        title="Bold"
                      >
                        <BoldIcon />
                      </ToolbarButton>
                      <ToolbarButton
                        active={false}
                        onClick={() => {}}
                        title="Italic"
                      >
                        <ItalicIcon />
                      </ToolbarButton>
                      <ToolbarButton
                        active={false}
                        onClick={() => {}}
                        title="Underline"
                      >
                        <UnderlineIcon />
                      </ToolbarButton>
                      <ToolbarButton
                        active={false}
                        onClick={() => {}}
                        title="Strikethrough"
                      >
                        <StrikethroughIcon />
                      </ToolbarButton>

                      <div className="w-px h-6 bg-gray-300 mx-1"></div>

                      {/* Lists */}
                      <ToolbarButton
                        active={false}
                        onClick={() => {}}
                        title="Bullet List"
                      >
                        <ListIcon />
                      </ToolbarButton>
                      <ToolbarButton
                        active={false}
                        onClick={() => {}}
                        title="Numbered List"
                      >
                        <ListOrderedIcon />
                      </ToolbarButton>

                      <div className="w-px h-6 bg-gray-300 mx-1"></div>

                      {/* Text Alignment */}
                      <ToolbarButton
                        active={false}
                        onClick={() => {}}
                        title="Align Left"
                      >
                        <AlignLeftIcon />
                      </ToolbarButton>
                      <ToolbarButton
                        active={false}
                        onClick={() => {}}
                        title="Align Center"
                      >
                        <AlignCenterIcon />
                      </ToolbarButton>
                      <ToolbarButton
                        active={false}
                        onClick={() => {}}
                        title="Align Right"
                      >
                        <AlignRightIcon />
                      </ToolbarButton>

                      <div className="w-px h-6 bg-gray-300 mx-1"></div>

                      {/* Blockquote */}
                      <ToolbarButton
                        active={false}
                        onClick={() => {}}
                        title="Blockquote"
                      >
                        <QuoteIcon />
                      </ToolbarButton>

                      {/* Link */}
                      <div className="relative">
                        <ToolbarButton
                          active={false}
                          onClick={() => setShowLinkDialog(!showLinkDialog)}
                          title="Insert Link"
                        >
                          <LinkIcon />
                        </ToolbarButton>
                        {showLinkDialog && (
                          <LinkDialog
                            onClose={() => setShowLinkDialog(false)}
                          />
                        )}
                      </div>

                      <div className="w-px h-6 bg-gray-300 mx-1"></div>

                      {/* Undo/Redo */}
                      <ToolbarButton
                        onClick={() => {}}
                        disabled={false}
                        title="Undo"
                      >
                        <UndoIcon />
                      </ToolbarButton>
                      <ToolbarButton
                        onClick={() => {}}
                        disabled={false}
                        title="Redo"
                      >
                        <RedoIcon />
                      </ToolbarButton>
                    </div>

                    {/* Textarea as content editor */}
                    <div className="min-h-[180px]">
                      <Textarea 
                        placeholder="Write your post content here..."
                        className="w-full h-full min-h-[180px] border-0 resize-none focus-visible:ring-0 focus-visible:ring-offset-0 p-4"
                      />
                    </div>
                  </div>
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