import { useState } from "react";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Subcategory {
  id: string;
  name: string;
  parentCategory: string;
  slug: string;
  created: string;
}

interface SubcategoryForm {
  name: string;
  parentCategory: string;
  slug: string;
}

const categories = [
  { id: "1", name: "SaaS Tools" },
  { id: "2", name: "B2B Services" },
  { id: "3", name: "Productivity" },
];

export default function Subcategories() {
  const [subcategories, setSubcategories] = useState<Subcategory[]>([
    {
      id: "1",
      name: "Development",
      parentCategory: "SaaS Tools",
      slug: "development",
      created: "Dec 6, 2025"
    },
    {
      id: "2",
      name: "AI Tools", 
      parentCategory: "SaaS Tools",
      slug: "ai-tools",
      created: "Dec 6, 2025"
    },
    {
      id: "3",
      name: "Legal",
      parentCategory: "B2B Services",
      slug: "legal",
      created: "Dec 6, 2025"
    },
    {
      id: "4",
      name: "Project Management",
      parentCategory: "Productivity",
      slug: "project-management",
      created: "Dec 6, 2025"
    }
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingSubcategory, setEditingSubcategory] = useState<Subcategory | null>(null);
  const [formData, setFormData] = useState<SubcategoryForm>({ 
    name: "", 
    parentCategory: "", 
    slug: "" 
  });

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  };

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      slug: generateSlug(name)
    });
  };

  const openAddDialog = () => {
    setEditingSubcategory(null);
    setFormData({ name: "", parentCategory: "", slug: "" });
    setIsDialogOpen(true);
  };

  const openEditDialog = (subcategory: Subcategory) => {
    setEditingSubcategory(subcategory);
    setFormData({ 
      name: subcategory.name, 
      parentCategory: subcategory.parentCategory,
      slug: subcategory.slug 
    });
    setIsDialogOpen(true);
  };

  const handleSubmit = () => {
    if (!formData.name.trim() || !formData.parentCategory) return;

    if (editingSubcategory) {
      setSubcategories(subcategories.map(sub =>
        sub.id === editingSubcategory.id
          ? { ...sub, name: formData.name, parentCategory: formData.parentCategory, slug: formData.slug }
          : sub
      ));
    } else {
      const newSubcategory: Subcategory = {
        id: Date.now().toString(),
        name: formData.name,
        parentCategory: formData.parentCategory,
        slug: formData.slug,
        created: "Dec 15, 2025"
      };
      setSubcategories([...subcategories, newSubcategory]);
    }

    setIsDialogOpen(false);
    setFormData({ name: "", parentCategory: "", slug: "" });
  };

  const handleDelete = (id: string) => {
    setSubcategories(subcategories.filter(sub => sub.id !== id));
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Subcategories</h1>
          <p className="text-muted-foreground">Manage perk subcategories</p>
        </div>
        <Button onClick={openAddDialog} className="bg-yellow-600 hover:bg-yellow-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Subcategory
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Parent Category</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Created</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subcategories.map((subcategory) => (
                <TableRow key={subcategory.id}>
                  <TableCell className="font-medium">{subcategory.name}</TableCell>
                  <TableCell className="text-blue-600 font-medium">{subcategory.parentCategory}</TableCell>
                  <TableCell className="text-muted-foreground">{subcategory.slug}</TableCell>
                  <TableCell className="text-muted-foreground">{subcategory.created}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(subcategory)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(subcategory.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingSubcategory ? "Edit Subcategory" : "Add New Subcategory"}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="subcategory-name">Name</Label>
              <Input
                id="subcategory-name"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g., Development"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="parent-category">Parent Category</Label>
              <Select
                value={formData.parentCategory}
                onValueChange={(value) => setFormData({ ...formData, parentCategory: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.name}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subcategory-slug">Slug</Label>
              <Input
                id="subcategory-slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="development"
              />
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmit}>
                {editingSubcategory ? "Update" : "Create"} Subcategory
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}