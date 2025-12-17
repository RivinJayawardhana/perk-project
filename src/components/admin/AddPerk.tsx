"use client";

import { useState } from "react";
import { ArrowLeft, Upload } from "lucide-react";
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

export default function AddPerk() {
  const [availability, setAvailability] = useState("global");
  const [dealTypeSelection, setDealTypeSelection] = useState("affiliate");
  const [dealType, setDealType] = useState<string[]>([]);
  const [bestFor, setBestFor] = useState<string[]>([]);

  return (
    <div className="p-8 max-w-4xl">
      <div className="flex items-center gap-2 mb-6">
        <Button variant="ghost" size="icon">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <span className="text-sm text-muted-foreground">Back</span>
      </div>

      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-foreground mb-2">Add New Perk</h1>
        <p className="text-muted-foreground">Fill in the details below to create a new perk for founders</p>
      </div>

      <div className="space-y-6">
        {/* MEDIA SECTION */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Media</h2>
          <div className="space-y-6">
            <div>
              <Label className="text-sm font-medium mb-2 block">Banner Image</Label>
              <ImageUpload description="Recommended: 1200 x 400px" />
            </div>
            <div>
              <Label className="text-sm font-medium mb-2 block">Company Logo</Label>
              <div className="flex gap-4">
                <div className="w-24 h-24 border-2 border-dashed border-border rounded-lg flex items-center justify-center bg-background">
                  <Upload className="w-6 h-6 text-muted-foreground" />
                </div>
                <div className="flex-1">
                  <Input
                    placeholder="Paste logo URL"
                    className="mb-1"
                  />
                  <p className="text-xs text-muted-foreground">Square image, min 100x100px</p>
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
                <Label htmlFor="company" className="text-sm font-medium mb-2 block">
                  Company Name <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="company"
                  placeholder="e.g., CloudScale"
                  className="border-orange-400"
                />
              </div>
              <div>
                <Label htmlFor="category" className="text-sm font-medium mb-2 block">
                  Category <span className="text-destructive">*</span>
                </Label>
                <Select>
                  <SelectTrigger className="border-orange-400">
                    <SelectValue placeholder="Cloud & Infrastructure" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cloud">Cloud & Infrastructure</SelectItem>
                    <SelectItem value="saas">SaaS & AI Tools</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="subcategory" className="text-sm font-medium mb-2 block">
                Subcategory
              </Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select subcategory" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sub1">Subcategory 1</SelectItem>
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
                <Label htmlFor="title" className="text-sm font-medium mb-2 block">
                  Perk Title <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="title"
                  placeholder="e.g., $200 credit"
                />
              </div>
              <div>
                <Label htmlFor="slug" className="text-sm font-medium mb-2 block">
                  URL Slug
                </Label>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">🔗</span>
                  <Input
                    id="slug"
                    placeholder="perk-url-slug"
                    className="flex-1"
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">Auto-generated from title</p>
              </div>
            </div>
            <div>
              <Label htmlFor="badge" className="text-sm font-medium mb-2 block">
                Deal Badge Text
              </Label>
              <Input
                id="badge"
                placeholder="e.g., $200 credit, 40% off"
              />
              <p className="text-xs text-muted-foreground mt-1">Short text shown on the card badge</p>
            </div>
            <div>
              <Label htmlFor="description" className="text-sm font-medium mb-2 block">
                Description
              </Label>
              <Textarea
                id="description"
                placeholder="Describe the perk and what founders get..."
                className="min-h-[120px]"
              />
            </div>
          </div>
        </Card>

        {/* AVAILABILITY SECTION */}
        <Card className="p-6">
          <h2 className="text-lg font-semibold text-foreground mb-4">Availability</h2>
          <div className="space-y-4">
            <div>
              <Label className="text-sm font-medium mb-3 block">
                Available In <span className="text-destructive">*</span>
              </Label>
              <RadioGroup value={availability} onValueChange={setAvailability}>
                <div className="flex gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <RadioGroupItem value="malaysia" />
                    <span>Malaysia</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <RadioGroupItem value="singapore" />
                    <span>Singapore</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <RadioGroupItem value="global" />
                    <span>Global</span>
                  </label>
                </div>
              </RadioGroup>
              <p className="text-xs text-muted-foreground mt-2">
                Selecting "Global" will show the perk in both Malaysia and Singapore
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="location" className="text-sm font-medium mb-2 block">
                  Location / Region
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="global">Global</SelectItem>
                    <SelectItem value="malaysia">Malaysia</SelectItem>
                    <SelectItem value="singapore">Singapore</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">Global perks appear in both Malaysia and Singapore</p>
              </div>
              <div>
                <Label htmlFor="validUntil" className="text-sm font-medium mb-2 block">
                  Valid Until
                </Label>
                <Input
                  id="validUntil"
                  type="text"
                  placeholder="dd/mm/yyyy"
                />
              </div>
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
                <label className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  dealTypeSelection === "affiliate" ? "border-orange-400 bg-orange-50" : "border-border"
                }`}>
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
                <label className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  dealTypeSelection === "coupon" ? "border-orange-400 bg-orange-50" : "border-border"
                }`}>
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
                <label className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  dealTypeSelection === "lead" ? "border-orange-400 bg-orange-50" : "border-border"
                }`}>
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
              <Label htmlFor="dealUrl" className="text-sm font-medium mb-2 block">
                Deal URL
              </Label>
              <Input
                id="dealUrl"
                placeholder="https://..."
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
          <Button variant="outline">Save as Draft</Button>
          <Button className="bg-amber-400 hover:bg-amber-500 text-black">
            Publish Perk
          </Button>
        </div>
      </div>
    </div>
  );
}
