'use client';
import * as React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Bell, AlertTriangle, Info, Handshake } from 'lucide-react';
import type { Alert } from '@/lib/types';
import { alerts as initialAlerts } from '@/lib/placeholder-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '../ui/button';

const alertIcons: { [key in Alert['level']]: React.ReactNode } = {
  high: <AlertTriangle className="size-5 text-destructive" />,
  medium: <AlertTriangle className="size-5 text-yellow-500" />,
  low: <Info className="size-5 text-blue-500" />,
};

export function AlertsCenter({ isPage = false }: { isPage?: boolean }) {
  const [alerts, setAlerts] = React.useState<Alert[]>(initialAlerts);
  const [acknowledgedAlerts, setAcknowledgedAlerts] = React.useState<Alert[]>(
    []
  );

  const handleAcknowledge = (alertId: number) => {
    const alertToAcknowledge = alerts.find((alert) => alert.id === alertId);
    if (alertToAcknowledge) {
      setAlerts(alerts.filter((alert) => alert.id !== alertId));
      setAcknowledgedAlerts((prev) => [...prev, alertToAcknowledge]);
    }
  };

  const displayedAlerts = isPage ? alerts : alerts.slice(0, 3);

  if (!isPage && alerts.length === 0) {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center gap-2">
                    <Bell className="size-5" />
                    <CardTitle>Alerts Center</CardTitle>
                </div>
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">No active alerts.</p>
            </CardContent>
        </Card>
    );
  }

  return (
    <>
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
          {displayedAlerts.length > 0 ? (
            displayedAlerts.map((alert) => (
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
                  <p className="text-xs text-muted-foreground mt-1">
                    {alert.time}
                  </p>
                  <div className="mt-2">
                    <Button
                      variant="link"
                      size="sm"
                      className="h-auto p-0"
                      onClick={() => handleAcknowledge(alert.id)}
                    >
                      Acknowledge
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
             <p className="text-sm text-muted-foreground text-center py-4">All alerts have been actioned.</p>
          )}
        </CardContent>
      </Card>

      {!isPage && (
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Handshake className="size-5" />
              <CardTitle>Acknowledgements</CardTitle>
            </div>
            <CardDescription>Recently acknowledged alerts.</CardDescription>
          </CardHeader>
          <CardContent>
            {acknowledgedAlerts.length > 0 ? (
              <div className='space-y-2'>
                {acknowledgedAlerts.map(alert => (
                    <div key={alert.id} className='text-sm p-2 bg-muted/50 rounded-md'>
                        <p className='font-medium'>{alert.title}</p>
                        <p className='text-xs text-muted-foreground'>Acknowledged just now</p>
                    </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No acknowledgements pending.
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
}
