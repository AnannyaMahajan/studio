// This is a placeholder file for a potential future enhancement.
// Currently, the logic to show/hide the main AppLayout is handled
// directly within AppLayout itself based on the current route.
// This keeps the overall structure simpler for now.
// No changes are needed in this file for the current implementation.
'use client';
import { usePathname } from "next/navigation";
import { AppLayout } from "./app-layout";

export function AuthLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isAuthRoute = pathname === '/login' || pathname === '/signup';

    if (isAuthRoute) {
        return <>{children}</>
    }
    
    return (
        <div className="flex min-h-screen">
          {children}
        </div>
    );
}
