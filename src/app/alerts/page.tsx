
'use client';
import { AlertsCenter } from '@/components/dashboard/alerts-center';
import { useTranslation } from '@/hooks/use-translation';
import { Bell } from 'lucide-react';

export default function AlertsPage() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center gap-4">
        <Bell className="size-8 text-primary" />
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            {t('alertsPage.title')}
          </h1>
          <p className="text-muted-foreground">
            {t('alertsPage.description')}
          </p>
        </div>
      </header>
      <div className="max-w-4xl mx-auto w-full">
         <AlertsCenter isPage />
      </div>
    </div>
  );
}
