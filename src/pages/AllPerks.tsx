import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PerksTable } from "@/components/perks/PerksTable";

export default function AllPerks() {
  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl font-bold text-foreground">All Perks</h1>
          <p className="font-display text-muted-foreground">Manage and organize all founder perks</p>
        </div>
        <Button asChild>
          <Link to="/perks/add">
            <Plus className="w-4 h-4 mr-2" />
            Add Perk
          </Link>
        </Button>
      </div>
      <PerksTable />
    </div>
  );
}
