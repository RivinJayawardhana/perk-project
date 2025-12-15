import { useState } from "react";
import { Search, Filter, MoreHorizontal, Eye, Pencil, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Perk {
  id: string;
  initial: string;
  name: string;
  company: string;
  category: string;
  deal: string;
  location: string;
  validUntil: string;
  status: "Active" | "Draft";
}

const mockPerks: Perk[] = [
  {
    id: "1",
    initial: "C",
    name: "$200 credit",
    company: "CloudScale",
    category: "SaaS & AI Tools",
    deal: "$200 credit",
    location: "Global",
    validUntil: "Aug 20, 2025",
    status: "Active",
  },
  {
    id: "2",
    initial: "L",
    name: "40% off legal services",
    company: "LegalEase",
    category: "B2B Services",
    deal: "40% off",
    location: "United States",
    validUntil: "Sep 30, 2025",
    status: "Active",
  },
  {
    id: "3",
    initial: "D",
    name: "Free 3-month trial",
    company: "DesignPro",
    category: "Design",
    deal: "Free trial",
    location: "Global",
    validUntil: "Dec 31, 2025",
    status: "Active",
  },
  {
    id: "4",
    initial: "M",
    name: "50% off first year",
    company: "MarketBoost",
    category: "Marketing",
    deal: "50% off",
    location: "Europe",
    validUntil: "Jul 15, 2025",
    status: "Draft",
  },
];

export function PerksTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredPerks = mockPerks.filter((perk) => {
    const matchesSearch = perk.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      perk.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || perk.status.toLowerCase() === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search perks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="bg-card rounded-lg border overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Perk</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Category</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Deal</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Location</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Valid Until</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left px-4 py-3 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredPerks.map((perk) => (
              <tr key={perk.id} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">
                      {perk.initial}
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{perk.name}</p>
                      <p className="text-sm text-muted-foreground">{perk.company}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4 text-sm text-foreground">{perk.category}</td>
                <td className="px-4 py-4">
                  <Badge variant="secondary" className="bg-primary/10 text-primary border-0">
                    {perk.deal}
                  </Badge>
                </td>
                <td className="px-4 py-4 text-sm text-foreground">{perk.location}</td>
                <td className="px-4 py-4 text-sm text-muted-foreground">{perk.validUntil}</td>
                <td className="px-4 py-4">
                  <Badge 
                    variant={perk.status === "Active" ? "default" : "secondary"}
                    className={perk.status === "Active" 
                      ? "bg-success text-success-foreground" 
                      : "bg-muted text-muted-foreground"
                    }
                  >
                    {perk.status}
                  </Badge>
                </td>
                <td className="px-4 py-4">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
