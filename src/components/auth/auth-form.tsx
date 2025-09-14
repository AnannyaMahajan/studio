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

interface AuthFormProps {
  mode: 'login' | 'signup';
}

export function AuthForm({ mode }: AuthFormProps) {
    const { toast } = useToast();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        toast({
            title: mode === 'login' ? 'Login Successful' : 'Account Created',
            description: mode === 'login' ? 'Welcome back!' : 'Your account has been successfully created.',
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
                <h1 className="font-headline text-2xl font-semibold">Swasthya Raksha</h1>
          </div>
          <CardTitle className="text-2xl font-bold">
            {mode === 'login' ? 'Login' : 'Sign Up'}
          </CardTitle>
          <CardDescription>
            {mode === 'login'
              ? 'Enter your email below to login to your account'
              : 'Enter your information to create an account'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-4">
            {mode === 'signup' && (
              <div className="grid gap-2">
                <Label htmlFor="full-name">Full name</Label>
                <Input id="full-name" placeholder="Asha Kumari" required />
              </div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
                <div className="flex items-center">
                    <Label htmlFor="password">Password</Label>
                    {mode === 'login' && (
                        <Link href="#" className="ml-auto inline-block text-sm underline">
                            Forgot your password?
                        </Link>
                    )}
                </div>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              {mode === 'login' ? 'Login' : 'Create an account'}
            </Button>
            <Button variant="outline" className="w-full">
              {mode === 'login' ? 'Login with Google' : 'Sign up with Google'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            {mode === 'login' ? (
              <>
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="underline">
                  Sign up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{' '}
                <Link href="/login" className="underline">
                  Login
                </Link>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
