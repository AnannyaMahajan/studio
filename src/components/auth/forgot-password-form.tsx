
'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/use-translation';
import { findUserByEmail } from '@/lib/user-store';
import type { FormEvent } from 'react';
import { WaterDropIcon } from '../icons';

export function ForgotPasswordForm() {
  const { t } = useTranslation();
  const { toast } = useToast();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;

    const user = findUserByEmail(email);
    if (user) {
      toast({
        title: t('auth.resetLinkSentTitle'),
        description: t('auth.resetLinkSentDescription', { email }),
      });
    } else {
      toast({
        title: t('auth.userNotFoundTitle'),
        description: t('auth.userNotFoundDescription'),
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/50">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center gap-2 mb-2">
            <WaterDropIcon className="size-7 text-primary" />
            <h1 className="font-headline text-2xl font-bold tracking-tight text-primary">
              {t('appName')}
            </h1>
          </div>
          <CardTitle className="text-2xl font-bold">
            {t('auth.forgotPasswordTitle')}
          </CardTitle>
          <CardDescription>
            {t('auth.forgotPasswordDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">{t('auth.emailLabel')}</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              {t('auth.sendResetLinkButton')}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            <Link href="/login" className="underline">
              {t('auth.backToLogin')}
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
