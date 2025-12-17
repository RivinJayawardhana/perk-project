"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Plus, Edit2, Trash2 } from "lucide-react";

interface Subcategory {
  id: string;
  name: string;
  categoryId: string;
  categoryName: string;
  slug: string;
  createdDate: string;
}

interface Category {
  id: string;
  name: string;
}

const DEFAULT_CATEGORIES: Category[] = [
  { id: "1", name: "Lifestyle" },
  { id: "2", name: "SaaS & AI Tools" },
  { id: "3", name: "B2B Services" },
];

const DEFAULT_SUBCATEGORIES: Subcategory[] = [
  { id: "l1", name: "Live & Work Anywhere", categoryId: "1", categoryName: "Lifestyle", slug: "live-work-anywhere", createdDate: "Dec 6, 2025" },
  { id: "l2", name: "Health & Wellbeing", categoryId: "1", categoryName: "Lifestyle", slug: "health-wellbeing", createdDate: "Dec 6, 2025" },
  { id: "l3", name: "Manage Your Money", categoryId: "1", categoryName: "Lifestyle", slug: "manage-money", createdDate: "Dec 6, 2025" },
  { id: "l4", name: "Fuel Your Team", categoryId: "1", categoryName: "Lifestyle", slug: "fuel-team", createdDate: "Dec 6, 2025" },
  { id: "l5", name: "Community & Experiences", categoryId: "1", categoryName: "Lifestyle", slug: "community-experiences", createdDate: "Dec 6, 2025" },
  { id: "l6", name: "Founder Essentials", categoryId: "1", categoryName: "Lifestyle", slug: "founder-essentials", createdDate: "Dec 6, 2025" },
  { id: "s1", name: "Close More Deals", categoryId: "2", categoryName: "SaaS & AI Tools", slug: "close-deals", createdDate: "Dec 6, 2025" },
  { id: "s2", name: "Market Like a Pro", categoryId: "2", categoryName: "SaaS & AI Tools", slug: "market-pro", createdDate: "Dec 6, 2025" },
  { id: "s3", name: "Work Smarter Together", categoryId: "2", categoryName: "SaaS & AI Tools", slug: "work-smarter", createdDate: "Dec 6, 2025" },
  { id: "s4", name: "Build & Deploy Fast", categoryId: "2", categoryName: "SaaS & AI Tools", slug: "build-deploy", createdDate: "Dec 6, 2025" },
  { id: "s5", name: "Automate with AI", categoryId: "2", categoryName: "SaaS & AI Tools", slug: "automate-ai", createdDate: "Dec 6, 2025" },
  { id: "s6", name: "Stay Secure", categoryId: "2", categoryName: "SaaS & AI Tools", slug: "stay-secure", createdDate: "Dec 6, 2025" },
  { id: "s7", name: "Support Your Customers", categoryId: "2", categoryName: "SaaS & AI Tools", slug: "support-customers", createdDate: "Dec 6, 2025" },
  { id: "s8", name: "Handle the Numbers", categoryId: "2", categoryName: "SaaS & AI Tools", slug: "handle-numbers", createdDate: "Dec 6, 2025" },
  { id: "b1", name: "Grow Your Reach", categoryId: "3", categoryName: "B2B Services", slug: "grow-reach", createdDate: "Dec 6, 2025" },
  { id: "b2", name: "Handle Legal Stuff", categoryId: "3", categoryName: "B2B Services", slug: "legal", createdDate: "Dec 6, 2025" },
  { id: "b3", name: "Manage Your Books", categoryId: "3", categoryName: "B2B Services", slug: "manage-books", createdDate: "Dec 6, 2025" },
  { id: "b4", name: "Build Your Team", categoryId: "3", categoryName: "B2B Services", slug: "build-team", createdDate: "Dec 6, 2025" },
  { id: "b5", name: "Get Expert Advice", categoryId: "3", categoryName: "B2B Services", slug: "expert-advice", createdDate: "Dec 6, 2025" },
  { id: "b6", name: "Design Your Brand", categoryId: "3", categoryName: "B2B Services", slug: "design-brand", createdDate: "Dec 6, 2025" },
  { id: "b7", name: "Tell Your Story", categoryId: "3", categoryName: "B2B Services", slug: "tell-story", createdDate: "Dec 6, 2025" },
  { id: "b8", name: "Find New Opportunities", categoryId: "3", categoryName: "B2B Services", slug: "find-opportunities", createdDate: "Dec 6, 2025" },
];

export default function Subcategories() {
  const [subcategories, setSubcategories] = useState<Subcategory[]>(DEFAULT_SUBCATEGORIES);
  const [editingSubcategory, setEditingSubcategory] = useState<Subcategory | null>(null);
  const [newSubcategoryName, setNewSubcategoryName] = useState("");
  const [newSubcategorySlug, setNewSubcategorySlug] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("1");
  const [openDialog, setOpenDialog] = useState(false);

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  };

  const getCategoryName = (categoryId: string) => {
    return DEFAULT_CATEGORIES.find(c => c.id === categoryId)?.name || "";
  };

  const handleAddSubcategory = () => {
    if (!newSubcategoryName.trim()) return;

    const slug = newSubcategorySlug || generateSlug(newSubcategoryName);
    const newSubcategory: Subcategory = {
      id: Date.now().toString(),
      name: newSubcategoryName,
      categoryId: selectedCategoryId,
      categoryName: getCategoryName(selectedCategoryId),
      slug,
      createdDate: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    };

    setSubcategories([...subcategories, newSubcategory]);
    setNewSubcategoryName("");
    setNewSubcategorySlug("");
    setSelectedCategoryId("1");
    setOpenDialog(false);
  };

  const handleUpdateSubcategory = () => {
    if (!editingSubcategory || !newSubcategoryName.trim()) return;

    const slug = newSubcategorySlug || generateSlug(newSubcategoryName);
    setSubcategories(
      subcategories.map((s) =>
        s.id === editingSubcategory.id
          ? {
              ...s,
              name: newSubcategoryName,
              categoryId: selectedCategoryId,
              categoryName: getCategoryName(selectedCategoryId),
              slug,
            }
          : s
      )
    );
    setEditingSubcategory(null);
    setNewSubcategoryName("");
    setNewSubcategorySlug("");
    setSelectedCategoryId("1");
    setOpenDialog(false);
  };

  const handleDeleteSubcategory = (id: string) => {
    setSubcategories(subcategories.filter((s) => s.id !== id));
  };

  const handleEditSubcategory = (subcategory: Subcategory) => {
    setEditingSubcategory(subcategory);
    setNewSubcategoryName(subcategory.name);
    setNewSubcategorySlug(subcategory.slug);
    setSelectedCategoryId(subcategory.categoryId);
    setOpenDialog(true);
  };

  return (
    <div className="p-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Subcategories</h1>
        <p className="text-muted-foreground">Manage subcategories for perks</p>
      </div>

      <div className="space-y-4">
        <div className="flex justify-end mb-4">
          <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger asChild>
              <Button
                className="bg-amber-400 hover:bg-amber-500 text-black gap-2"
                onClick={() => {
                  setEditingSubcategory(null);
                  setNewSubcategoryName("");
                  setNewSubcategorySlug("");
                  setSelectedCategoryId("1");
                }}
              >
                <Plus className="w-4 h-4" />
                Add Subcategory
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  {editingSubcategory ? "Edit Subcategory" : "Add New Subcategory"}
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Parent Category *
                  </label>
                  <select
                    value={selectedCategoryId}
                    onChange={(e) => setSelectedCategoryId(e.target.value)}
                    className="w-full border rounded-md px-3 py-2 bg-background"
                  >
                    {DEFAULT_CATEGORIES.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Subcategory Name *
                  </label>
                  <Input
                    placeholder="e.g., Close More Deals"
                    value={newSubcategoryName}
                    onChange={(e) => setNewSubcategoryName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Slug (auto-generated)
                  </label>
                  <Input
                    placeholder="close-deals"
                    value={newSubcategorySlug || generateSlug(newSubcategoryName)}
                    onChange={(e) => setNewSubcategorySlug(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 justify-end pt-4">
                  <Button
                    variant="outline"
                    onClick={() => setOpenDialog(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={
                      editingSubcategory
                        ? handleUpdateSubcategory
                        : handleAddSubcategory
                    }
                    className="bg-amber-400 hover:bg-amber-500 text-black"
                  >
                    {editingSubcategory ? "Update" : "Add"}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted/50">
              <tr>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Parent Category
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Slug
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {subcategories.map((subcategory) => (
                <tr key={subcategory.id} className="hover:bg-muted/30">
                  <td className="px-6 py-4 text-sm font-medium">{subcategory.name}</td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {subcategory.categoryName}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {subcategory.slug}
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {subcategory.createdDate}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditSubcategory(subcategory)}
                      >
                        <Edit2 className="w-4 h-4 text-blue-500" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteSubcategory(subcategory.id)}
                      >
                        <Trash2 className="w-4 h-4 text-destructive" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
