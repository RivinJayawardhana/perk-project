import { Gift, Users, TrendingUp, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  { 
    title: "Total Perks", 
    value: "24", 
    change: "+3 this month",
    icon: Gift,
    color: "text-primary"
  },
  { 
    title: "Active Users", 
    value: "1,284", 
    change: "+12% from last month",
    icon: Users,
    color: "text-success"
  },
  { 
    title: "Claims This Month", 
    value: "847", 
    change: "+8% from last month",
    icon: TrendingUp,
    color: "text-primary"
  },
  { 
    title: "Expiring Soon", 
    value: "5", 
    change: "In the next 30 days",
    icon: Clock,
    color: "text-warning"
  },
];

export default function Dashboard() {
  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's an overview of your perks platform.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <stat.icon className={`w-5 h-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { user: "John D.", action: "claimed", perk: "$200 CloudScale credit", time: "2 min ago" },
                { user: "Sarah M.", action: "claimed", perk: "40% off LegalEase", time: "15 min ago" },
                { user: "Mike R.", action: "viewed", perk: "DesignPro trial", time: "1 hour ago" },
                { user: "Emily K.", action: "claimed", perk: "MarketBoost discount", time: "3 hours ago" },
              ].map((activity, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium text-sm">
                      {activity.user.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm text-foreground">
                        <span className="font-medium">{activity.user}</span>{" "}
                        {activity.action}{" "}
                        <span className="text-primary">{activity.perk}</span>
                      </p>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Perks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "$200 CloudScale credit", claims: 245, category: "SaaS & AI Tools" },
                { name: "40% off LegalEase", claims: 189, category: "B2B Services" },
                { name: "DesignPro trial", claims: 156, category: "Design" },
                { name: "MarketBoost 50% off", claims: 134, category: "Marketing" },
              ].map((perk, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b last:border-0">
                  <div>
                    <p className="text-sm font-medium text-foreground">{perk.name}</p>
                    <p className="text-xs text-muted-foreground">{perk.category}</p>
                  </div>
                  <span className="text-sm font-semibold text-primary">{perk.claims} claims</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
