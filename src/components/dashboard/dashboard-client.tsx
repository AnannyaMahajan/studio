'use client';
import { MapPlaceholder } from './map-placeholder';
import { AlertsCenter } from './alerts-center';
import { RiskTimeline } from './risk-timeline';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Handshake } from 'lucide-react';

export function DashboardClient() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <MapPlaceholder />
        <RiskTimeline />
      </div>
      <div className="lg:col-span-1 space-y-6">
        <AlertsCenter />
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Handshake className="size-5" />
              <CardTitle>Acknowledgements</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No acknowledgements pending.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
