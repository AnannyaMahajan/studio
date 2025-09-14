import { ReportForm } from '@/components/report/report-form';
import { FileQuestion } from 'lucide-react';

export default function ReportPage() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      <header className="flex items-center gap-4">
        <FileQuestion className="size-8 text-primary" />
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            CHW Quick Report
          </h1>
          <p className="text-muted-foreground">
            Submit a new report for potential outbreak analysis.
          </p>
        </div>
      </header>
      <ReportForm />
    </div>
  );
}
