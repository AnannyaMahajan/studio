
import type { Metadata, Viewport } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { AppLayout } from '@/components/layout/app-layout';
import { TranslationProvider } from '@/hooks/use-translation';
import { AuthProvider } from '@/hooks/use-auth';

export const metadata: Metadata = {
  title: 'Swasthya Raksha',
  description: 'Community Health Worker Reporting and Outbreak Prediction',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.svg',
  },
};

export const viewport: Viewport = {
  themeColor: '#2563eb',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('font-body antialiased animated-gradient')}>
        <AuthProvider>
          <TranslationProvider>
            <AppLayout>{children}</AppLayout>
            <Toaster />
          </TranslationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
