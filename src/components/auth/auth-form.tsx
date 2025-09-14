
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
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/hooks/use-translation';
import { findUserByEmail, addUser } from '@/lib/user-store';
import type { FormEvent } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { WaterDropIcon } from '../icons';

interface AuthFormProps {
  mode: 'login' | 'signup';
}

export function AuthForm({ mode }: AuthFormProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const fullName = formData.get('full-name') as string;

    if (mode === 'signup') {
      if (findUserByEmail(email)) {
        toast({
          title: t('auth.userExistsTitle'),
          description: t('auth.userExistsDescription'),
          variant: 'destructive',
        });
      } else {
        addUser({ name: fullName, email, password });
        toast({
          title: t('auth.signupSuccessTitle'),
          description: t('auth.signupSuccessDescription'),
        });
        router.push('/login');
      }
    } else {
      const user = findUserByEmail(email);
      if (!user) {
        toast({
          title: t('auth.userNotFoundTitle'),
          description: t('auth.userNotFoundDescription'),
          variant: 'destructive',
        });
      } else if (user.password !== password) {
        toast({
          title: t('auth.invalidCredentialsTitle'),
          description: t('auth.invalidCredentialsDescription'),
          variant: 'destructive',
        });
      } else {
        login(user);
        toast({
          title: t('auth.loginSuccessTitle'),
          description: t('auth.loginSuccessDescription'),
        });
        router.push('/');
      }
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
            {t(mode === 'login' ? 'auth.loginTitle' : 'auth.signupTitle')}
          </CardTitle>
          <CardDescription>
            {t(
              mode === 'login'
                ? 'auth.loginDescription'
                : 'auth.signupDescription'
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            {mode === 'signup' && (
              <div className="grid gap-2">
                <Label htmlFor="full-name">{t('auth.fullNameLabel')}</Label>
                <Input
                  id="full-name"
                  name="full-name"
                  placeholder="Asha Kumari"
                  required
                />
              </div>
            )}
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
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">{t('auth.passwordLabel')}</Label>
                {mode === 'login' && (
                  <Link
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline"
                  >
                    {t('auth.forgotPassword')}
                  </Link>
                )}
              </div>
              <Input id="password" name="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              {t(mode === 'login' ? 'auth.loginButton' : 'auth.signupButton')}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            {mode === 'login' ? (
              <>
                {t('auth.noAccount')}{' '}
                <Link href="/signup" className="underline">
                  {t('auth.signupLink')}
                </Link>
              </>
            ) : (
              <>
                {t('auth.hasAccount')}{' '}
                <Link href="/login" className="underline">
                  {t('auth.loginLink')}
                </Link>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
