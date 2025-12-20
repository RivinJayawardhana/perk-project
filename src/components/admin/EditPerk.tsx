"use client";

import { useState, useEffect, useRef } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { useUpdatePerk, usePerk } from "@/hooks/usePerks";
import { useCategories } from "@/hooks/useCategories";
import { useSubcategories } from "@/hooks/useSubcategories";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

const DEAL_TYPE_OPTIONS = [
  "Free trial",
  "Discount",
  "Credits included",
  "Free consultation",
  "Free perks / Add-ons",
  "Bundle deal",
  "Exclusive deal",
  "Intro/First-time offer",
];

const BEST_FOR_OPTIONS = [
  "Solopreneurs",
  "Startups",
  "SMEs",
  "Agencies",
  "Enterprises",
  "Remote teams",
];

interface EditPerkProps {
  perkId: string;
}

export default function EditPerk({ perkId }: EditPerkProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { data: perkData, isLoading } = usePerk(perkId);
  const { data: categories } = useCategories();
  const { data: allSubcategories } = useSubcategories();
  const { mutate: updatePerk, isPending } = useUpdatePerk(perkId);
  const { upload, isUploading } = useImageUpload();
  const bannerInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    subcategory: "",
    discount: "",
    expiry: "",
    location: "Global",
    image_url: "",
    logo_url: "",
    deal_type: "",
    deal_url: "",
    best_for: "",
    status: "Active",
  });

  const [dealType, setDealType] = useState<string[]>([]);
  const [bestFor, setBestFor] = useState<string[]>([]);
  const [dealTypeSelection, setDealTypeSelection] = useState("affiliate");

  useEffect(() => {
    if (perkData) {
      setFormData({
        name: perkData.name || "",
        description: perkData.description || "",
        category: perkData.category || "",
        subcategory: perkData.subcategory || "",
        discount: perkData.discount || "",
        expiry: perkData.expiry || "",
        location: perkData.location || "Global",
        image_url: perkData.image_url || "",
        logo_url: perkData.logo_url || "",
        deal_type: perkData.deal_type || "",
        deal_url: perkData.deal_url || "",
        best_for: perkData.best_for || "",
        status: perkData.status || "Active",
      });

      if (perkData.deal_type) {
        setDealType(perkData.deal_type.split(", ").filter((t: string) => t));
      }
      if (perkData.best_for) {
        setBestFor(perkData.best_for.split(", ").filter((b: string) => b));
      }
    }
  }, [perkData]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleDealTypeChange = (option: string) => {
    setDealType((prev) =>
      prev.includes(option) ? prev.filter((t) => t !== option) : [...prev, option]
    );
  };

  const handleBestForChange = (option: string) => {
    setBestFor((prev) =>
      prev.includes(option) ? prev.filter((b) => b !== option) : [...prev, option]
    );
  };

  const handleBannerUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    toast({
      title: "Uploading...",
      description: "Please wait while your image is being uploaded",
    });

    const url = await upload(file, "banners");
    if (url) {
      setFormData((prev) => ({ ...prev, image_url: url }));
      toast({
        title: "Success",
        description: "Banner uploaded successfully!",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to upload banner image",
        variant: "destructive",
      });
    }
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    toast({
      title: "Uploading...",
      description: "Please wait while your image is being uploaded",
    });

    const url = await upload(file, "logos");
    if (url) {
      setFormData((prev) => ({ ...prev, logo_url: url }));
      toast({
        title: "Success",
        description: "Logo uploaded successfully!",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to upload logo",
        variant: "destructive",
      });
    }
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

    updatePerk(
      {
        name: formData.name,
        description: formData.description,
        category: formData.category,
        discount: formData.discount,
        expiry: formData.expiry,
        location: formData.location,
        image_url: formData.image_url,
        logo_url: formData.logo_url,
        deal_type: dealType.join(", "),
        deal_url: formData.deal_url,
        best_for: bestFor.join(", "),
        status: formData.status,
      },
      {
        onSuccess: () => {
          toast({
            title: "Success",
            description: "Perk updated successfully!",
          });
          router.push("/admin/perks");
        },
        onError: (error: any) => {
          toast({
            title: "Error",
            description: error.message || "Failed to update perk",
            variant: "destructive",
          });
        },
      }
    );
  };

  if (isLoading) {
    return (
      <div className="p-8 flex items-center justify-center">
        <Loader2 className="w-6 h-6 animate-spin" />
      </div>
    );
  }

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
        <h1 className="font-display text-2xl font-bold text-foreground mb-2">Edit Perk</h1>
        <p className="text-muted-foreground">Update the details of this perk</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* MEDIA SECTION */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Media</h2>
          <div className="space-y-6">
            <div>
              <Label className="text-sm font-medium mb-3 block">Banner Image</Label>
              {formData.image_url && (
                <div className="mb-3 relative w-full h-40 bg-muted rounded-lg overflow-hidden">
                  <img src={formData.image_url} alt="Banner" className="w-full h-full object-cover" />
                </div>
              )}
              <div 
                onClick={() => bannerInputRef.current?.click()}
                className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
              >
                <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm font-medium text-foreground mb-1">Click to upload or drag and drop</p>
                <p className="text-xs text-muted-foreground">Recommended: 1200 x 400px</p>
                <input
                  ref={bannerInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleBannerUpload}
                  className="hidden"
                  disabled={isUploading}
                />
              </div>
              <div className="mt-3">
                <Label className="text-xs font-medium mb-2 block text-muted-foreground">Or paste URL:</Label>
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
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Company Logo</Label>
              <div className="flex items-start gap-4">
                {formData.logo_url && (
                  <div className="relative w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                    <img src={formData.logo_url} alt="Logo" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex-1">
                  <div 
                    onClick={() => logoInputRef.current?.click()}
                    className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-4 text-center hover:border-muted-foreground/50 transition-colors cursor-pointer"
                  >
                    <Upload className="w-6 h-6 mx-auto mb-1 text-muted-foreground" />
                    <p className="text-xs font-medium text-foreground mb-1">Click to upload</p>
                    <p className="text-xs text-muted-foreground mb-2">Square image, min 100x100px</p>
                    <input
                      ref={logoInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                      disabled={isUploading}
                    />
                  </div>
                  <div className="mt-3">
                    <Label className="text-xs font-medium mb-2 block text-muted-foreground">Or paste URL:</Label>
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
                  </div>
                </div>
              </div>
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
                <Select value={formData.category} onValueChange={(value) => 
                  setFormData(prev => ({ ...prev, category: value }))
                }>
                  <SelectTrigger className="border-amber-200">
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
            <div>
              <Label className="text-sm font-medium mb-2 block">Subcategory</Label>
              <Select value={formData.subcategory || ""} onValueChange={(value) => 
                setFormData(prev => ({ ...prev, subcategory: value }))
              }>
                <SelectTrigger>
                  <SelectValue placeholder="Select subcategory (optional)" />
                </SelectTrigger>
                <SelectContent>
                  {formData.category && allSubcategories ? (
                    allSubcategories
                      .filter((sub: any) => {
                        const selectedCat = categories?.find((c: any) => c.name === formData.category);
                        return sub.category_id === selectedCat?.id;
                      })
                      .map((sub: any) => (
                        <SelectItem key={sub.id} value={sub.id}>
                          {sub.name}
                        </SelectItem>
                      ))
                  ) : (
                    <SelectItem value="none" disabled>
                      Select a category first
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground mt-1">Subcategories are managed in the Categories tab</p>
            </div>
          </div>
        </Card>

        {/* PERK DETAILS SECTION */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Perk Details</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="discount" className="text-sm font-medium mb-2 block">
                  Perk Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="discount"
                  placeholder="e.g., $200 credit"
                  value={formData.discount}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label className="text-sm font-medium mb-2 block">URL Slug</Label>
                <Input
                  placeholder="auto-generated from title"
                  value={(formData.discount?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')) || ''}
                  disabled
                />
                <p className="text-xs text-muted-foreground mt-1">Auto-generated from title</p>
              </div>
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

        {/* AVAILABILITY SECTION */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Availability</h2>
          <div className="space-y-6">
            <div>
              <Label className="text-sm font-medium mb-3 block">
                Available In <span className="text-destructive">*</span>
              </Label>
              <RadioGroup 
                value={formData.location} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, location: value }))}
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="Malaysia" id="malaysia" />
                  <Label htmlFor="malaysia" className="font-normal cursor-pointer">Malaysia</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="Singapore" id="singapore" />
                  <Label htmlFor="singapore" className="font-normal cursor-pointer">Singapore</Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="Global" id="global" />
                  <Label htmlFor="global" className="font-normal cursor-pointer">Global</Label>
                </div>
              </RadioGroup>
              <p className="text-xs text-muted-foreground mt-3">Selecting "Global" will show the perk in both Malaysia and Singapore</p>
            </div>
            <div>
              <Label htmlFor="expiry" className="text-sm font-medium mb-2 block">
                📅 Valid Until <span className="text-destructive">*</span>
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

        {/* DEAL TYPE SECTION */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Deal Type</h2>
          <div className="grid grid-cols-2 gap-4">
            {DEAL_TYPE_OPTIONS.map((option) => (
              <div key={option} className="flex items-center gap-3">
                <Checkbox
                  id={`deal-${option}`}
                  checked={dealType.includes(option)}
                  onCheckedChange={() => handleDealTypeChange(option)}
                />
                <Label htmlFor={`deal-${option}`} className="font-normal cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </Card>

        {/* BEST FOR SECTION */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Best For</h2>
          <div className="grid grid-cols-2 gap-4">
            {BEST_FOR_OPTIONS.map((option) => (
              <div key={option} className="flex items-center gap-3">
                <Checkbox
                  id={`best-${option}`}
                  checked={bestFor.includes(option)}
                  onCheckedChange={() => handleBestForChange(option)}
                />
                <Label htmlFor={`best-${option}`} className="font-normal cursor-pointer">
                  {option}
                </Label>
              </div>
            ))}
          </div>
        </Card>

        {/* HOW TO CLAIM SECTION */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">How to Claim</h2>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-3 block">Claim Method</Label>
              <div className="space-y-3">
                <label className="p-3 border-2 rounded-lg cursor-pointer hover:border-amber-400 transition-colors">
                  <RadioGroup value={dealTypeSelection} onValueChange={setDealTypeSelection}>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="affiliate" />
                      <Label className="font-normal cursor-pointer">🔗 Affiliate Link</Label>
                    </div>
                  </RadioGroup>
                </label>
                <label className="p-3 border-2 rounded-lg cursor-pointer hover:border-amber-400 transition-colors">
                  <RadioGroup value={dealTypeSelection} onValueChange={setDealTypeSelection}>
                    <div className="flex items-center gap-3">
                      <RadioGroupItem value="coupon" />
                      <Label className="font-normal cursor-pointer">🎟️ Coupon Code</Label>
                    </div>
                  </RadioGroup>
                </label>
              </div>
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Deal URL or Code</Label>
              <Input
                placeholder="https://... or coupon code"
                value={formData.deal_url}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    deal_url: e.target.value,
                  }))
                }
              />
              <p className="text-xs text-muted-foreground mt-1">Affiliate link or coupon code</p>
            </div>
          </div>
        </Card>

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
                Updating...
              </>
            ) : (
              "Update Perk"
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
