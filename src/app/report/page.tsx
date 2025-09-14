
'use client';
import { ReportForm } from '@/components/report/report-form';
import { useTranslation } from '@/hooks/use-translation';
import { FileQuestion } from 'lucide-react';

export default function ReportPage() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center gap-4">
        <FileQuestion className="size-8 text-primary" />
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            {t('report.title')}
          </h1>
          <p className="text-muted-foreground">
            {t('report.description')}
          </p>
        </div>
      </header>
      <div className="max-w-4xl mx-auto w-full">
         <ReportForm />
      </div>
    </div>
  );
}
