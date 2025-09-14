import { WaterQualityDashboard } from '@/components/water-quality/water-quality-dashboard';
import { Droplets } from 'lucide-react';

export default function WaterQualityPage() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      <header className="flex items-center gap-4">
        <Droplets className="size-8 text-primary" />
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            Water Quality Monitoring
          </h1>
          <p className="text-muted-foreground">
            Detailed analysis of water samples from various locations.
          </p>
        </div>
      </header>
      <WaterQualityDashboard />
    </div>
  );
}
