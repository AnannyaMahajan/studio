
'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Globe,
  LogOut,
  Settings,
  User,
  LayoutDashboard,
  FileQuestion,
  BrainCircuit,
  Droplets,
  Bell,
  Calendar,
  GraduationCap,
} from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { WaterDropIcon } from '../icons';
import { usePathname } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/use-translation';

const navLinks = [
  { href: '/', label: 'nav.dashboard', icon: LayoutDashboard },
  { href: '/report', label: 'nav.newReport', icon: FileQuestion },
  { href: '/ai-prediction', label: 'nav.aiPrediction', icon: BrainCircuit },
  { href: '/water-quality', label: 'nav.waterQuality', icon: Droplets },
  { href: '/alerts', label: 'nav.alerts', icon: Bell },
  { href: '/schedule', label: 'nav.schedule', icon: Calendar },
  { href: '/education', label: 'nav.education', icon: GraduationCap },
];

export function Header() {
  const { toast } = useToast();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { t, setLanguage } = useTranslation();

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast({
      title: t('logout.title'),
      description: t('logout.description'),
    });
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center gap-2">
          <div className="bg-primary text-primary-foreground p-2 rounded-lg">
            <WaterDropIcon className="size-6" />
          </div>
          <h1 className="font-headline text-xl font-semibold hidden sm:block">
            {t('appName')}
          </h1>
        </Link>
      </div>

      <nav className="flex-1 flex justify-center">
        <TooltipProvider>
          <div className="flex items-center gap-2 rounded-full border bg-card/80 p-1.5">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const isActive =
                (pathname.startsWith(href) && href !== '/') ||
                pathname === href;
              return (
                <Tooltip key={href} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button
                      asChild
                      variant="ghost"
                      size="icon"
                      className={cn(
                        'rounded-full transition-all duration-300',
                        isActive
                          ? 'bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground'
                          : 'hover:bg-muted'
                      )}
                    >
                      <Link href={href}>
                        <Icon className="size-5" />
                        <span className="sr-only">{t(label)}</span>
                      </Link>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{t(label)}</p>
                  </TooltipContent>
                </Tooltip>
              );
            })}
          </div>
        </TooltipProvider>
      </nav>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Globe className="h-5 w-5" />
              <span className="sr-only">{t('changeLanguage')}</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>{t('language')}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setLanguage('en')}>English</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage('hi')}>Hindi</DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage('ho')}>Ho (Tribal Language)</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {isLoggedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                    alt="CHW"
                  />
                  <AvatarFallback>CHW</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t('account.myAccount')}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <User className="mr-2 h-4 w-4" />
                  <span>{t('account.profile')}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>{t('account.settings')}</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>{t('account.logout')}</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild>
            <Link href="/login">{t('auth.loginTitle')}</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
