
'use client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "@/hooks/use-translation";
import { Settings } from "lucide-react";

export default function SettingsPage() {
    const { t, setLanguage, language } = useTranslation();
    const { toast } = useToast();

    const handleSave = (section: string) => {
        toast({
            title: t('settings.toast.title'),
            description: t('settings.toast.description', { section }),
        });
    }

  return (
    <div className="flex flex-col gap-8">
        <header className="flex items-center gap-4">
            <Settings className="size-8 text-primary" />
            <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight">
                {t('settings.title')}
            </h1>
            <p className="text-muted-foreground">
                {t('settings.description')}
            </p>
            </div>
      </header>
        <Card id="profile">
            <CardHeader>
                <CardTitle>{t('settings.profile.title')}</CardTitle>
                <CardDescription>{t('settings.profile.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="space-y-2">
                    <Label htmlFor="name">{t('settings.profile.nameLabel')}</Label>
                    <Input id="name" defaultValue="Asha Kumari" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="email">{t('settings.profile.emailLabel')}</Label>
                    <Input id="email" type="email" defaultValue="asha.kumari@example.com" />
                </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
                <Button onClick={() => handleSave(t('settings.profile.title'))}>{t('settings.saveButton')}</Button>
            </CardFooter>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>{t('settings.notifications.title')}</CardTitle>
                <CardDescription>{t('settings.notifications.description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                    <Checkbox id="email-notifications" defaultChecked />
                    <label
                        htmlFor="email-notifications"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                       {t('settings.notifications.emailLabel')}
                    </label>
                </div>
                 <div className="flex items-center space-x-2">
                    <Checkbox id="push-notifications" />
                    <label
                        htmlFor="push-notifications"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                       {t('settings.notifications.pushLabel')}
                    </label>
                </div>
            </CardContent>
             <CardFooter className="border-t px-6 py-4">
                <Button onClick={() => handleSave(t('settings.notifications.title'))}>{t('settings.saveButton')}</Button>
            </CardFooter>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>{t('settings.language.title')}</CardTitle>
                <CardDescription>{t('settings.language.description')}</CardDescription>
            </CardHeader>
            <CardContent>
                <Select value={language} onValueChange={(value) => setLanguage(value as any)}>
                    <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder={t('settings.language.selectPlaceholder')} />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="hi">Hindi</SelectItem>
                         <SelectItem value="ho">Ho (Tribal Language)</SelectItem>
                    </SelectContent>
                </Select>
            </CardContent>
        </Card>
    </div>
  );
}
