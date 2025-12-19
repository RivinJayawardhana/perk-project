"use client";

import { useLeads } from "@/hooks/useLeadForms";
import { usePerks } from "@/hooks/usePerks";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, ChevronDown, ChevronUp, TrendingUp, FileText, Users } from "lucide-react";
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

export default function Dashboard() {
  const { data: leads = [], isLoading: leadsLoading } = useLeads();
  const { data: perks = [], isLoading: perksLoading } = usePerks();
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

  const recentLeads = leads.slice(0, 5);
  const emailsSent = leads.filter((lead: Lead) => lead.email_sent).length;

  if (leadsLoading || perksLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold mb-2">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back to Perks Admin</p>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Perks */}
        <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-200 dark:border-blue-800">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Total Perks</p>
              <p className="text-3xl font-bold text-blue-600">{perks.length}</p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </Card>

        {/* Total Leads */}
        <Card className="p-6 bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-200 dark:border-green-800">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Total Leads</p>
              <p className="text-3xl font-bold text-green-600">{leads.length}</p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
              <Users className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </Card>

        {/* Emails Sent */}
        <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-200 dark:border-purple-800">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Emails Sent</p>
              <p className="text-3xl font-bold text-purple-600">{emailsSent}</p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
              <FileText className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </Card>

        {/* Pending Emails */}
        <Card className="p-6 bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-200 dark:border-orange-800">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground mb-1">Pending Emails</p>
              <p className="text-3xl font-bold text-orange-600">{leads.length - emailsSent}</p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/30 rounded-lg">
              <FileText className="w-6 h-6 text-orange-600" />
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Leads Section */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Recent Leads</h2>
        
        {recentLeads.length === 0 ? (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No leads submitted yet</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {recentLeads.map((lead: Lead) => (
              <Card
                key={lead.id}
                className="p-4 hover:shadow-md transition-shadow cursor-pointer bg-card hover:bg-accent/50"
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
                        {lead.email_sent ? "✓ Email Sent" : "⏳ Pending"}
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
    </div>
  );
}
