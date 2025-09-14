import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Bell, AlertTriangle, Info } from 'lucide-react';
import type { Alert } from '@/lib/types';
import { alerts } from '@/lib/placeholder-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '../ui/button';

const alertIcons: { [key in Alert['level']]: React.ReactNode } = {
  high: <AlertTriangle className="size-5 text-destructive" />,
  medium: <AlertTriangle className="size-5 text-yellow-500" />,
  low: <Info className="size-5 text-blue-500" />,
};

export function AlertsCenter() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Bell className="size-5" />
          <CardTitle>Alerts Center</CardTitle>
        </div>
        <CardDescription>
          Recent alerts based on incoming data.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="flex items-start gap-4 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
          >
            <div className="mt-1">{alertIcons[alert.level]}</div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <p className="font-semibold">{alert.title}</p>
                <Badge
                  variant={
                    alert.level === 'high'
                      ? 'destructive'
                      : alert.level === 'medium'
                      ? 'secondary'
                      : 'outline'
                  }
                  className="capitalize"
                >
                  {alert.level} Risk
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {alert.description}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
              <div className="mt-2">
                <Button variant="link" size="sm" className="h-auto p-0">
                  Acknowledge
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
