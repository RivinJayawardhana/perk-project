import { useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ImageUpload } from "@/components/perks/ImageUpload";
import { PerkTypeSelector } from "@/components/perks/PerkTypeSelector";
import { LeadCaptureForm } from "@/components/perks/LeadCaptureForm";
import { DealTypeAndBestForFields } from "@/components/perks/DealTypeAndBestForFields";

export default function AddPerk() {
  const [perkType, setPerkType] = useState("lead");
  const [dealType, setDealType] = useState<string[]>([]);
  const [bestFor, setBestFor] = useState<string[]>([]);

  return (
    <div className="p-8 max-w-4xl">
      <Link
        href="/perks"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        Back
      </Link>

      <div className="mb-8">
        <h1 className="font-display text-2xl font-bold text-foreground">Add New Perk</h1>
        <p className="font-display text-muted-foreground">
          Fill in the details below to create a new perk for founders
        </p>
      </div>

      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Media</CardTitle>
          </CardHeader>
          <CardContent>
            <ImageUpload 
              label="Banner Image" 
              description="Recommended: 1200 x 400px" 
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Perk Title</Label>
                <Input id="title" placeholder="e.g., $200 credit" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company Name</Label>
                <Input id="company" placeholder="e.g., CloudScale" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe the perk and its benefits..."
                rows={4}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="saas">SaaS & AI Tools</SelectItem>
                    <SelectItem value="b2b">B2B Services</SelectItem>
                    <SelectItem value="design">Design</SelectItem>
                    <SelectItem value="marketing">Marketing</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="global">Global</SelectItem>
                    <SelectItem value="us">United States</SelectItem>
                    <SelectItem value="europe">Europe</SelectItem>
                    <SelectItem value="asia">Asia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="validUntil">Valid Until</Label>
              <Input id="validUntil" type="date" className="max-w-xs" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Perk Type</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <PerkTypeSelector value={perkType} onChange={setPerkType} />
            
            {perkType === "lead" && <LeadCaptureForm />}
            
            {perkType === "affiliate" && (
              <div className="space-y-2">
                <Label htmlFor="affiliateUrl">Affiliate URL</Label>
                <Input id="affiliateUrl" placeholder="https://example.com/signup?ref=..." />
              </div>
            )}
            
            {perkType === "coupon" && (
              <div className="space-y-2">
                <Label htmlFor="couponCode">Coupon Code</Label>
                <Input id="couponCode" placeholder="e.g., FOUNDER50" />
              </div>
            )}
          </CardContent>
        </Card>

        <DealTypeAndBestForFields
          dealType={dealType}
          setDealType={setDealType}
          bestFor={bestFor}
          setBestFor={setBestFor}
        />

        <div className="flex items-center justify-end gap-4 pt-4">
          <Button variant="outline">Save as Draft</Button>
          <Button>Publish Perk</Button>
        </div>
      </div>
    </div>
  );
}
