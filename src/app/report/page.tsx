import { ChatReport } from '@/components/report/chat-report';
import { MessageSquare } from 'lucide-react';

export default function ReportPage() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8 h-[calc(100vh-4rem)]">
      <header className="flex items-center gap-4">
        <MessageSquare className="size-8 text-primary" />
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            Conversational Report
          </h1>
          <p className="text-muted-foreground">
            Chat with an AI assistant to file your report.
          </p>
        </div>
      </header>
      <ChatReport />
    </div>
  );
}
