# Integration Guide - Adding Lead Forms to Existing Components

## Changes Needed in AddPerk.tsx & EditPerk.tsx

### 1. Add Imports
```tsx
import { LeadFormConfig } from "@/components/perks/LeadFormConfig";
import { useLeadForm, useCreateLeadForm } from "@/hooks/useLeadForms";
```

### 2. Add State for Lead Form
After existing state declarations, add:
```tsx
const { data: existingLeadForm } = useLeadForm(
  formData.id || null // Use perk ID if editing
);
const { mutate: saveLeadForm, isPending: isSavingLeadForm } =
  useCreateLeadForm();
```

### 3. Add Handler Function
```tsx
const handleSaveLeadForm = (fields: FormField[]) => {
  if (!formData.id) {
    toast({
      title: "Error",
      description: "Please save the perk first before configuring lead form",
      variant: "destructive",
    });
    return;
  }

  saveLeadForm(
    {
      perk_id: formData.id,
      form_fields: fields,
      submit_button_text: "Claim Deal",
      success_message: "Thank you! We'll contact you soon.",
    },
    {
      onSuccess: () => {
        toast({
          title: "Success",
          description: "Lead form saved successfully!",
        });
      },
      onError: (error: any) => {
        toast({
          title: "Error",
          description: error.message || "Failed to save lead form",
          variant: "destructive",
        });
      },
    }
  );
};
```

### 4. Add UI Section for Lead Form
In the form JSX, after the deal type selection and before the submit button, add:

```tsx
{/* LEAD FORM CONFIGURATION SECTION - Only show if lead_capture_form is selected */}
{dealTypeSelection === "lead_capture_form" && (
  <Card className="p-6 bg-blue-50 border-blue-200">
    <LeadFormConfig
      initialFields={existingLeadForm?.form_fields || []}
      onSave={handleSaveLeadForm}
      isLoading={isSavingLeadForm}
    />
  </Card>
)}
```

---

## Changes Needed in Perks Frontend Page (/src/app/perks/page.tsx)

### 1. Add Imports
```tsx
import { LeadFormModal } from "@/components/perks/LeadFormModal";
import { useLeadForm, useSubmitLead } from "@/hooks/useLeadForms";
```

### 2. Add State in Component
```tsx
const [leadFormModal, setLeadFormModal] = useState<{
  isOpen: boolean;
  perkId: string | null;
} | null>(null);
```

### 3. Add Hooks
```tsx
const { data: currentLeadForm } = useLeadForm(
  leadFormModal?.perkId || null
);
const { mutateAsync: submitLead, isPending: isSubmittingLead } =
  useSubmitLead();
```

### 4. Update Get Deal Button Click Handler
```tsx
const handleGetDeal = (perk: DisplayPerk) => {
  // Check if perk has lead capture form
  if (perk.deal_type === "lead_capture_form") {
    setLeadFormModal({ isOpen: true, perkId: perk.id });
  } else if (perk.deal_type === "affiliate_link") {
    // Handle affiliate link
    window.open(perk.deal_url, "_blank");
  } else if (perk.deal_type === "coupon_code") {
    // Handle coupon code - show in modal
    // ... existing logic
  }
};
```

### 5. Add Modal to JSX
Add this before the closing `<Footer />` tag:

```tsx
{leadFormModal && currentLeadForm && (
  <LeadFormModal
    isOpen={leadFormModal.isOpen}
    onClose={() => setLeadFormModal(null)}
    perkName={
      mockPerks.find((p) => p.id === leadFormModal.perkId)?.company ||
      "Perk"
    }
    formFields={currentLeadForm.form_fields}
    onSubmit={async (formData) => {
      await submitLead({
        perk_id: leadFormModal.perkId!,
        lead_form_id: currentLeadForm.id,
        form_data: formData,
        email_address: formData.email || "",
      });
    }}
    successMessage={currentLeadForm.success_message}
  />
)}
```

---

## Changes to Display Perk Type (Optional Enhancement)

In the perk card display, you can show the deal type:

```tsx
{/* Deal Type Badge */}
<Badge variant="secondary" className="text-xs">
  {perk.deal_type === "lead_capture_form"
    ? "📋 Lead Form"
    : perk.deal_type === "affiliate_link"
    ? "🔗 Affiliate"
    : "🎟️ Coupon"}
</Badge>
```

---

## AdminSidebar Update

Add navigation link to leads page:

```tsx
// In the navigation items array
{
  href: "/admin/leads",
  label: "Submitted Leads",
  icon: "📋",
  badge: undefined,
}
```

---

## Complete Example for Get Deal Button

Replace the existing "Get Deal" button with this enhanced version:

```tsx
<Button
  onClick={() => handleGetDeal(perk)}
  className="bg-[#e6b756] text-[#1a2233] font-semibold px-3 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm hover:bg-[#f5d488] transition-colors font-display w-full sm:w-auto"
>
  {isSubmittingLead ? (
    <>
      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
      Processing...
    </>
  ) : (
    <>
      {perk.deal_type === "lead_capture_form"
        ? "📋 Claim Deal"
        : perk.deal_type === "affiliate_link"
        ? "🔗 Get Link"
        : "🎟️ Copy Code"}
    </>
  )}
</Button>
```

---

## Email Configuration (.env.local)

Add these environment variables:

```
# Gmail Configuration for Lead Notifications
GMAIL_USER=your-email@gmail.com
GMAIL_PASSWORD=your-16-character-app-password
```

**Important**: Use Gmail App Password, not your regular password.
See: https://support.google.com/accounts/answer/185833

---

## Type Definitions to Add

If using TypeScript, add to your types file or at top of component:

```tsx
interface FormField {
  id: string;
  name: string;
  type: "text" | "email" | "phone" | "number" | "textarea" | "checkbox";
  label: string;
  required: boolean;
  placeholder?: string;
}

interface LeadForm {
  id: string;
  perk_id: string;
  form_fields: FormField[];
  submit_button_text: string;
  success_message: string;
  created_at: string;
  updated_at: string;
}
```

---

## Testing Checklist

- [ ] Run `setup-lead-forms.sql` in Supabase
- [ ] Add `.env.local` with Gmail credentials
- [ ] Add imports to AddPerk component
- [ ] Add lead form configuration UI
- [ ] Create test perk with lead capture form
- [ ] Test form submission on frontend
- [ ] Verify lead appears in `/admin/leads`
- [ ] Check email received at hello@venturenext.io
- [ ] Test form validation (required fields, email format)
- [ ] Test success message display

---

## No Breaking Changes

✅ All changes are additive
✅ Existing functionality preserved
✅ Optional feature - only active if configured
✅ Backward compatible

---

See `LEAD_FORMS_SETUP.md` for complete setup instructions.

