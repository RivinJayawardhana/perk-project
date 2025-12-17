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
}

interface Category {
  id: string;
  name: string;
  slug: string;
  subcategories: Subcategory[];
  createdDate: string;
}

const DEFAULT_CATEGORIES: Category[] = [
  {
    id: "1",
    name: "Lifestyle",
    slug: "lifestyle",
    createdDate: "Dec 6, 2025",
    subcategories: [
      { id: "l1", name: "Live & Work Anywhere" },
      { id: "l2", name: "Health & Wellbeing" },
      { id: "l3", name: "Manage Your Money" },
      { id: "l4", name: "Fuel Your Team" },
      { id: "l5", name: "Community & Experiences" },
      { id: "l6", name: "Founder Essentials" },
    ],
  },
  {
    id: "2",
    name: "SaaS & AI Tools",
    slug: "saas-tools",
    createdDate: "Dec 6, 2025",
    subcategories: [
      { id: "s1", name: "Close More Deals" },
      { id: "s2", name: "Market Like a Pro" },
      { id: "s3", name: "Work Smarter Together" },
      { id: "s4", name: "Build & Deploy Fast" },
      { id: "s5", name: "Automate with AI" },
      { id: "s6", name: "Stay Secure" },
      { id: "s7", name: "Support Your Customers" },
      { id: "s8", name: "Handle the Numbers" },
    ],
  },
  {
    id: "3",
    name: "B2B Services",
    slug: "b2b-services",
    createdDate: "Dec 6, 2025",
    subcategories: [
      { id: "b1", name: "Grow Your Reach" },
      { id: "b2", name: "Handle Legal Stuff" },
      { id: "b3", name: "Manage Your Books" },
      { id: "b4", name: "Build Your Team" },
      { id: "b5", name: "Get Expert Advice" },
      { id: "b6", name: "Design Your Brand" },
      { id: "b7", name: "Tell Your Story" },
      { id: "b8", name: "Find New Opportunities" },
    ],
  },
];

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>(DEFAULT_CATEGORIES);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategorySlug, setNewCategorySlug] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  };

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) return;

    const slug = newCategorySlug || generateSlug(newCategoryName);
    const newCategory: Category = {
      id: Date.now().toString(),
      name: newCategoryName,
      slug,
      subcategories: [],
      createdDate: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    };

    setCategories([...categories, newCategory]);
    setNewCategoryName("");
    setNewCategorySlug("");
    setOpenDialog(false);
  };

  const handleUpdateCategory = () => {
    if (!editingCategory || !newCategoryName.trim()) return;

    const slug = newCategorySlug || generateSlug(newCategoryName);
    setCategories(
      categories.map((c) =>
        c.id === editingCategory.id
          ? { ...c, name: newCategoryName, slug }
          : c
      )
    );
    setEditingCategory(null);
    setNewCategoryName("");
    setNewCategorySlug("");
    setOpenDialog(false);
  };

  const handleDeleteCategory = (id: string) => {
    setCategories(categories.filter((c) => c.id !== id));
  };

  const handleEditCategory = (category: Category) => {
    setEditingCategory(category);
    setNewCategoryName(category.name);
    setNewCategorySlug(category.slug);
    setOpenDialog(true);
  };

  return (
    <div className="p-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Categories</h1>
        <p className="text-muted-foreground">Manage perk categories and subcategories</p>
      </div>

      <div className="space-y-4">
          <div className="flex justify-end mb-4">
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
                <Button
                  className="bg-amber-400 hover:bg-amber-500 text-black gap-2"
                  onClick={() => {
                    setEditingCategory(null);
                    setNewCategoryName("");
                    setNewCategorySlug("");
                  }}
                >
                  <Plus className="w-4 h-4" />
                  Add Category
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingCategory ? "Edit Category" : "Add New Category"}
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Category Name *
                    </label>
                    <Input
                      placeholder="e.g., SaaS Tools"
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">
                      Slug (auto-generated)
                    </label>
                    <Input
                      placeholder="saas-tools"
                      value={newCategorySlug || generateSlug(newCategoryName)}
                      onChange={(e) => setNewCategorySlug(e.target.value)}
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
                        editingCategory
                          ? handleUpdateCategory
                          : handleAddCategory
                      }
                      className="bg-amber-400 hover:bg-amber-500 text-black"
                    >
                      {editingCategory ? "Update" : "Add"}
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
                    Slug
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-foreground">
                    Subcategories
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
                {categories.map((category) => (
                  <tr key={category.id} className="hover:bg-muted/30">
                    <td className="px-6 py-4 text-sm font-medium">{category.name}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {category.slug}
                    </td>
                    <td className="px-6 py-4 text-sm">{category.subcategories.length}</td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {category.createdDate}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditCategory(category)}
                        >
                          <Edit2 className="w-4 h-4 text-blue-500" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteCategory(category.id)}
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
