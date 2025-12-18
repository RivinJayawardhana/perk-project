"use client";

import { useState } from "react";
import { ArrowLeft, Upload, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Card } from "@/components/ui/card";
import { ImageUpload } from "@/components/perks/ImageUpload";
import { LeadCaptureForm } from "@/components/perks/LeadCaptureForm";
import { DealTypeAndBestForFields } from "@/components/perks/DealTypeAndBestForFields";
import { useCreatePerk } from "@/hooks/usePerks";
import { useCategories } from "@/hooks/useCategories";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

export default function AddPerk() {
  const router = useRouter();
  const { toast } = useToast();
  const { data: categories } = useCategories();
  const { mutate: createPerk, isPending } = useCreatePerk();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    discount: "",
    expiry: "",
    image_url: "",
    logo_url: "",
    deal_type: "affiliate",
    deal_url: "",
    best_for: "",
  });

  const [dealTypeSelection, setDealTypeSelection] = useState("affiliate");
  const [dealType, setDealType] = useState<string[]>([]);
  const [bestFor, setBestFor] = useState<string[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      category: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.category || !formData.discount || !formData.expiry) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    createPerk(
      {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        discount: formData.discount,
        expiry: formData.expiry,
        image_url: formData.image_url,
        logo_url: formData.logo_url,
        deal_type: dealTypeSelection,
        best_for: bestFor.join(", "),
      },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Perk created successfully!",
          });
          router.push("/admin/perks");
        },
        onError: (error: any) => {
          toast({
            title: "Error",
            description: error.message || "Failed to create perk",
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center gap-2 mb-6">
        <Link href="/admin/perks">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-4 h-4" />
          </Button>
        </Link>
        <span className="text-sm text-muted-foreground">Back</span>
      </div>

      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-foreground mb-2">Add New Perk</h1>
        <p className="text-muted-foreground">Fill in the details below to create a new perk for founders</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* MEDIA SECTION */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Media</h2>
          <div className="space-y-6">
            <div>
              <Label className="text-sm font-medium mb-2 block">Banner Image</Label>
              <Input
                type="url"
                placeholder="https://..."
                value={formData.image_url}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    image_url: e.target.value,
                  }))
                }
              />
              <p className="text-xs text-muted-foreground mt-1">Recommended: 1200 x 400px</p>
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Company Logo</Label>
              <Input
                type="url"
                placeholder="https://..."
                value={formData.logo_url}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    logo_url: e.target.value,
                  }))
                }
              />
              <p className="text-xs text-muted-foreground mt-1">Square image, min 100x100px</p>
            </div>
          </div>
        </Card>

        {/* COMPANY DETAILS SECTION */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Company Details</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-sm font-medium mb-2 block">
                  Company Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="name"
                  placeholder="e.g., CloudScale"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">
                  Category <span className="text-destructive">*</span>
                </Label>
                <Select value={formData.category} onValueChange={handleCategoryChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((cat: any) => (
                      <SelectItem key={cat.id} value={cat.name}>
                        {cat.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </Card>

        {/* PERK DETAILS SECTION */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Perk Details</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="discount" className="text-sm font-medium mb-2 block">
                Discount / Offer <span className="text-destructive">*</span>
              </Label>
              <Input
                id="discount"
                placeholder="e.g., $200 credit, 40% off"
                value={formData.discount}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="description" className="text-sm font-medium mb-2 block">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Describe the perk and what founders get..."
                value={formData.description}
                onChange={handleInputChange}
                className="min-h-[120px]"
              />
            </div>
          </div>
        </Card>

        {/* VALIDITY SECTION */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Validity</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="expiry" className="text-sm font-medium mb-2 block">
                Valid Until <span className="text-destructive">*</span>
              </Label>
              <Input
                id="expiry"
                type="date"
                value={formData.expiry}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
        </Card>

        {/* DEAL TYPE AND BEST FOR SECTION */}
        <Card className="p-6">
          <DealTypeAndBestForFields
            dealType={dealType}
            setDealType={setDealType}
            bestFor={bestFor}
            setBestFor={setBestFor}
          />
        </Card>

        {/* HOW TO CLAIM SECTION */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">How to Claim</h2>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-3 block">Deal Type</Label>
              <div className="grid grid-cols-3 gap-4">
                <label
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    dealTypeSelection === "affiliate"
                      ? "border-orange-400 bg-orange-50"
                      : "border-border"
                  }`}
                >
                  <RadioGroup value={dealTypeSelection} onValueChange={setDealTypeSelection}>
                    <div className="flex items-start gap-3">
                      <RadioGroupItem value="affiliate" className="mt-1" />
                      <div>
                        <p className="font-medium text-sm">🔗 Affiliate Link</p>
                        <p className="text-xs text-muted-foreground">Direct URL to claim</p>
                      </div>
                    </div>
                  </RadioGroup>
                </label>
                <label
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    dealTypeSelection === "coupon"
                      ? "border-orange-400 bg-orange-50"
                      : "border-border"
                  }`}
                >
                  <RadioGroup value={dealTypeSelection} onValueChange={setDealTypeSelection}>
                    <div className="flex items-start gap-3">
                      <RadioGroupItem value="coupon" className="mt-1" />
                      <div>
                        <p className="font-medium text-sm">🎟️ Coupon Code</p>
                        <p className="text-xs text-muted-foreground">Code to use at checkout</p>
                      </div>
                    </div>
                  </RadioGroup>
                </label>
                <label
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                    dealTypeSelection === "lead"
                      ? "border-orange-400 bg-orange-50"
                      : "border-border"
                  }`}
                >
                  <RadioGroup value={dealTypeSelection} onValueChange={setDealTypeSelection}>
                    <div className="flex items-start gap-3">
                      <RadioGroupItem value="lead" className="mt-1" />
                      <div>
                        <p className="font-medium text-sm">📋 Lead Capture</p>
                        <p className="text-xs text-muted-foreground">Collect user details</p>
                      </div>
                    </div>
                  </RadioGroup>
                </label>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Deal URL</Label>
              <Input
                placeholder="https://..."
                value={formData.deal_url}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    deal_url: e.target.value,
                  }))
                }
              />
              <p className="text-xs text-muted-foreground mt-1">Affiliate or partner link</p>
            </div>
          </div>
        </Card>

        {/* LEAD CAPTURE FORM SECTION */}
        {dealTypeSelection === "lead" && (
          <Card className="p-6">
            <LeadCaptureForm />
            <p className="text-xs text-muted-foreground mt-4">
              Configure fields to collect from users. Common fields: Budget, Purchase Timeline, etc.
            </p>
          </Card>
        )}

        {/* ACTION BUTTONS */}
        <div className="flex justify-end gap-3 pt-4">
          <Link href="/admin/perks">
            <Button variant="outline" type="button">
              Cancel
            </Button>
          </Link>
          <Button
            type="submit"
            className="bg-amber-400 hover:bg-amber-500 text-black"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              "Publish Perk"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
