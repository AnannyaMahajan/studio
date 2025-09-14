
'use client';
import { DashboardClient } from '@/components/dashboard/dashboard-client';
import { useTranslation } from '@/hooks/use-translation';

export default function DashboardPage() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      <header>
        <h1 className="font-headline text-3xl font-bold tracking-tight">
          {t('dashboard.title')}
        </h1>
        <p className="text-muted-foreground">
          {t('dashboard.description')}
        </p>
      </header>
      <DashboardClient />
    </div>
  );
}
