import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
        <header className="flex items-center gap-4">
            <Settings className="size-8 text-primary" />
            <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight">
                Settings
            </h1>
            <p className="text-muted-foreground">
                Manage your account and application settings.
            </p>
            </div>
      </header>
        <Card>
            <CardHeader>
                <CardTitle>Profile</CardTitle>
                <CardDescription>Update your personal information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" defaultValue="Asha Kumari" />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="asha.kumari@example.com" />
                </div>
            </CardContent>
            <CardFooter className="border-t px-6 py-4">
                <Button>Save</Button>
            </CardFooter>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle>Notifications</CardTitle>
                <CardDescription>Choose how you want to be notified.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                    <Checkbox id="email-notifications" defaultChecked />
                    <label
                        htmlFor="email-notifications"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                       Email Notifications
                    </label>
                </div>
                 <div className="flex items-center space-x-2">
                    <Checkbox id="push-notifications" />
                    <label
                        htmlFor="push-notifications"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                       Push Notifications (App)
                    </label>
                </div>
            </CardContent>
             <CardFooter className="border-t px-6 py-4">
                <Button>Save</Button>
            </CardFooter>
        </Card>
         <Card>
            <CardHeader>
                <CardTitle>Language</CardTitle>
                <CardDescription>Set your preferred language for the app.</CardDescription>
            </CardHeader>
            <CardContent>
                <Select defaultValue="en">
                    <SelectTrigger className="w-[280px]">
                        <SelectValue placeholder="Select a language" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="hi">Hindi (Placeholder)</SelectItem>
                         <SelectItem value="ho">Tribal Language (Placeholder)</SelectItem>
                    </SelectContent>
                </Select>
            </CardContent>
        </Card>
    </div>
  );
}
