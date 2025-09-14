import { AlertsCenter } from '@/components/dashboard/alerts-center';
import { Bell } from 'lucide-react';

export default function AlertsPage() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      <header className="flex items-center gap-4">
        <Bell className="size-8 text-primary" />
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            Alerts
          </h1>
          <p className="text-muted-foreground">
            View and manage all system alerts.
          </p>
        </div>
      </header>
      <div className="max-w-4xl mx-auto w-full">
         <AlertsCenter />
      </div>
    </div>
  );
}
