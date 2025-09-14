
'use client';
import { MapPlaceholder } from './map-placeholder';
import { AlertsCenter } from './alerts-center';
import { RiskTimeline } from './risk-timeline';
import { QuickStats } from './quick-stats';

export function DashboardClient() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <QuickStats />
        <MapPlaceholder />
        <RiskTimeline />
      </div>
      <div className="lg:col-span-1 space-y-6">
        <AlertsCenter />
      </div>
    </div>
  );
}
