import type { Metadata, Viewport } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from '@/components/ui/toaster';
import { AppLayout } from '@/components/layout/app-layout';
import { AuthLayout } from '@/components/layout/auth-layout';

export const metadata: Metadata = {
  title: 'Swasthya Raksha',
  description: 'Community Health Worker Reporting and Outbreak Prediction',
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  themeColor: '#5e60ce',
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
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className={cn('font-body antialiased')}>
        <AuthLayout>
          <AppLayout>{children}</AppLayout>
        </AuthLayout>
        <Toaster />
      </body>
    </html>
  );
}
