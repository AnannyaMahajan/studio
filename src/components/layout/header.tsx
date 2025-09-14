
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
import { usePathname } from 'next/navigation';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';
import { useTranslation } from '@/hooks/use-translation';
import { useAuth } from '@/hooks/use-auth';
import { WaterDropIcon } from '../icons';

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
  const { user, logout } = useAuth();
  const { t, setLanguage } = useTranslation();

  const handleLogout = () => {
    logout();
    toast({
      title: t('logout.title'),
      description: t('logout.description'),
    });
  };

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
      <Link href="/" className="flex items-center gap-2 font-semibold">
        <WaterDropIcon className="h-6 w-6 text-primary" />
        <span className="font-headline text-lg font-bold tracking-tight">
          {t('appName')}
        </span>
      </Link>
      <nav className="flex-1 flex justify-center">
        <TooltipProvider>
          <div className="flex items-center gap-1">
            {navLinks.map(({ href, label, icon: Icon }) => {
              const isActive =
                (href !== '/' && pathname.startsWith(href)) ||
                pathname === href;
              return (
                <Tooltip key={href} delayDuration={0}>
                  <TooltipTrigger asChild>
                    <Button
                      asChild
                      variant="ghost"
                      size="icon"
                      className={cn(
                        'rounded-full transition-all duration-300 w-10 h-10',
                        isActive
                          ? 'bg-primary/10 text-primary hover:bg-primary/20'
                          : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
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
            <DropdownMenuItem onClick={() => setLanguage('en')}>
              English
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage('hi')}>
              Hindi
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setLanguage('ho')}>
              Ho (Tribal Language)
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-8 w-8 rounded-full"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                    alt={user.name}
                  />
                  <AvatarFallback>
                    {user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
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
