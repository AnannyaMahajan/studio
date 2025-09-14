
'use client';
import { DashboardClient } from '@/components/dashboard/dashboard-client';
import { useTranslation } from '@/hooks/use-translation';
import { LayoutDashboard } from 'lucide-react';

export default function DashboardPage() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center gap-4">
        <LayoutDashboard className="size-8 text-primary" />
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            {t('dashboard.title')}
          </h1>
          <p className="text-muted-foreground">{t('dashboard.description')}</p>
        </div>
      </header>
      <DashboardClient />
    </div>
  );
}
