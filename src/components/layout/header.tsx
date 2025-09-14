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

const navLinks = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/report', label: 'New Report', icon: FileQuestion },
  { href: '/ai-prediction', label: 'AI Prediction', icon: BrainCircuit },
  { href: '/water-quality', label: 'Water Quality', icon: Droplets },
  { href: '/alerts', label: 'Alerts', icon: Bell },
  { href: '/schedule', label: 'Schedule', icon: Calendar },
  { href: '/education', label: 'Education', icon: GraduationCap },
];

export function Header() {
  const { toast } = useToast();
  const pathname = usePathname();
  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const handleLogout = () => {
    setIsLoggedIn(false);
    toast({
      title: 'Logged Out',
      description: 'You have been successfully logged out.',
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
            Swasthya Raksha
          </h1>
        </Link>
      </div>

      <nav className="flex-1 flex justify-center">
        <TooltipProvider>
          <div className="flex items-center gap-2 rounded-full border bg-card/80 p-1.5">
            {navLinks.map(({ href, label, icon: Icon }) => {
                const isActive = (pathname.startsWith(href) && href !== '/') || pathname === href;
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
                            <span className="sr-only">{label}</span>
                            </Link>
                        </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                        <p>{label}</p>
                        </TooltipContent>
                    </Tooltip>
                )
            })}
          </div>
        </TooltipProvider>
      </nav>

      <div className="flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Globe className="h-5 w-5" />
              <span className="sr-only">Change language</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Language</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>English</DropdownMenuItem>
            <DropdownMenuItem>Hindi</DropdownMenuItem>
            <DropdownMenuItem>Ho (Tribal Language)</DropdownMenuItem>
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
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>
        )}
      </div>
    </header>
  );
}
