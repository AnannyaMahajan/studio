
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
import { WaterDropIcon } from '../icons';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/hooks/use-translation';

interface AuthFormProps {
  mode: 'login' | 'signup';
}

export function AuthForm({ mode }: AuthFormProps) {
    const { t } = useTranslation();
    const { toast } = useToast();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast({
            title: t(mode === 'login' ? 'auth.loginSuccessTitle' : 'auth.signupSuccessTitle'),
            description: t(mode === 'login' ? 'auth.loginSuccessDescription' : 'auth.signupSuccessDescription'),
        });
        router.push('/');
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/50">
      <Card className="mx-auto max-w-sm w-full">
        <CardHeader className="text-center">
            <div className="flex justify-center items-center gap-2 mb-4">
                <div className="bg-primary text-primary-foreground p-2 rounded-lg">
                    <WaterDropIcon className="size-6" />
                </div>
                <h1 className="font-headline text-2xl font-semibold">{t('appName')}</h1>
          </div>
          <CardTitle className="text-2xl font-bold">
            {t(mode === 'login' ? 'auth.loginTitle' : 'auth.signupTitle')}
          </CardTitle>
          <CardDescription>
            {t(mode === 'login'
              ? 'auth.loginDescription'
              : 'auth.signupDescription')}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            {mode === 'signup' && (
              <div className="grid gap-2">
                <Label htmlFor="full-name">{t('auth.fullNameLabel')}</Label>
                <Input id="full-name" placeholder="Asha Kumari" required />
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">{t('auth.emailLabel')}</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
                <div className="flex items-center">
                    <Label htmlFor="password">{t('auth.passwordLabel')}</Label>
                    {mode === 'login' && (
                        <Link href="#" className="ml-auto inline-block text-sm underline">
                            {t('auth.forgotPassword')}
                        </Link>
                    )}
                </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              {t(mode === 'login' ? 'auth.loginButton' : 'auth.signupButton')}
            </Button>
            <Button variant="outline" className="w-full">
              {t(mode === 'login' ? 'auth.loginWithGoogle' : 'auth.signupWithGoogle')}
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
