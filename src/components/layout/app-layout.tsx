
'use client';
import { usePathname } from 'next/navigation';
import { Header } from './header';
import { Chatbot } from '../chatbot/chatbot';

export function AppLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAuthPage =
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname === '/forgot-password';

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 p-4 md:p-8 animate-in fade-in-50 duration-500">
        {children}
      </main>
      <Chatbot />
    </div>
  );
}
