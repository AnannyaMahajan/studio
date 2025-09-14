'use client';
import {
  SidebarProvider,
  Sidebar,
  SidebarInset,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { Header } from '@/components/layout/header';
import { SidebarNav } from './sidebar-nav';
import { WaterDropIcon } from '../icons';

export function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2 p-2">
             <div className="bg-primary text-primary-foreground p-2 rounded-lg">
               <WaterDropIcon className="size-6" />
             </div>
            <h1 className="font-headline text-xl font-semibold">Swasthya Raksha</h1>
          </div>
        </SidebarHeader>

        <SidebarContent>
          <SidebarNav />
        </SidebarContent>

        <SidebarFooter>
          <div className="flex items-center gap-2 p-2 text-sm text-muted-foreground">
             <p>&copy; 2024 Swasthya Raksha</p>
          </div>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <Header />
        <main>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
