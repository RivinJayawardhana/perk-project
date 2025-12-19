"use client";

import { useLeads } from "@/hooks/useLeadForms";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";

interface Lead {
  id: string;
  perk_id: string;
  lead_form_id: string;
  form_data: Record<string, any>;
  email_address: string;
  submission_timestamp: string;
  email_sent: boolean;
  email_sent_at: string | null;
  perks?: {
    name: string;
  };
}

export default function AdminLeadsList() {
  const { data: leads = [], isLoading } = useLeads();
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    const newExpanded = new Set(expandedIds);
    if (newExpanded.has(id)) {
      newExpanded.delete(id);
    } else {
      newExpanded.add(id);
    }
    setExpandedIds(newExpanded);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Submitted Leads</h1>
        <p className="text-muted-foreground">
          View all leads submitted through perk forms
        </p>
      </div>

      {leads.length === 0 ? (
        <Card className="p-8 text-center">
          <p className="text-muted-foreground">No leads submitted yet</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {leads.map((lead: Lead) => (
            <Card
              key={lead.id}
              className="p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => toggleExpanded(lead.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-lg">
                      {lead.perks?.name || "Unknown Perk"}
                    </h3>
                    <Badge
                      variant={lead.email_sent ? "default" : "outline"}
                      className="text-xs"
                    >
                      {lead.email_sent ? "Email Sent" : "Pending Email"}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Submitted: {formatDate(lead.submission_timestamp)}
                  </p>
                  {lead.email_address && (
                    <p className="text-sm text-muted-foreground">
                      Email: {lead.email_address}
                    </p>
                  )}
                </div>
                {expandedIds.has(lead.id) ? (
                  <ChevronUp className="w-5 h-5 text-muted-foreground" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-muted-foreground" />
                )}
              </div>

              {expandedIds.has(lead.id) && (
                <div className="mt-4 pt-4 border-t">
                  <div className="space-y-3">
                    <h4 className="font-medium text-sm">Submitted Information:</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(lead.form_data).map(([key, value]) => (
                        <div key={key} className="bg-muted p-3 rounded-lg">
                          <p className="text-xs font-medium text-muted-foreground uppercase mb-1">
                            {key.replace(/_/g, " ")}
                          </p>
                          <p className="text-sm break-words">
                            {typeof value === "boolean"
                              ? value
                                ? "Yes"
                                : "No"
                              : String(value)}
                          </p>
                        </div>
                      ))}
                    </div>
                    {lead.email_sent && lead.email_sent_at && (
                      <div className="text-xs text-muted-foreground">
                        Email sent at: {formatDate(lead.email_sent_at)}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
