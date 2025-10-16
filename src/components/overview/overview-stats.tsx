import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, CheckCircle2, TrendingUp, Clock } from "lucide-react";

interface OverviewStatsProps {
  totalChanges: number;
  connectedAccounts: number;
}

export function OverviewStats({
  totalChanges,
  connectedAccounts,
}: OverviewStatsProps) {
  const stats = [
    {
      title: "Total Changes",
      value: totalChanges.toString(),
      description: "Changes detected today",
      icon: Activity,
    },
    {
      title: "Connected Accounts",
      value: connectedAccounts.toString(),
      description: "Ad accounts monitored",
      icon: CheckCircle2,
    },
    {
      title: "Active Monitoring",
      value: connectedAccounts > 0 ? "Live" : "Inactive",
      description: "Real-time status",
      icon: TrendingUp,
    },
    {
      title: "Response Time",
      value: "< 1m",
      description: "Average detection time",
      icon: Clock,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <stat.icon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
