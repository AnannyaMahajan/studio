
'use client';
import { WaterQualityDashboard } from '@/components/water-quality/water-quality-dashboard';
import { useTranslation } from '@/hooks/use-translation';
import { Droplets } from 'lucide-react';

export default function WaterQualityPage() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center gap-4">
        <Droplets className="size-8 text-primary" />
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            {t('waterQuality.title')}
          </h1>
          <p className="text-muted-foreground">
            {t('waterQuality.description')}
          </p>
        </div>
      </header>
      <WaterQualityDashboard />
    </div>
  );
}
