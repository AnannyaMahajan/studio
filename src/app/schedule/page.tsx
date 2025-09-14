import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CalendarIcon, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SchedulePage() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
        <header className="flex items-center justify-between gap-4">
            <div className='flex items-center gap-4'>
                <CalendarIcon className="size-8 text-primary" />
                <div>
                <h1 className="font-headline text-3xl font-bold tracking-tight">
                    My Schedule
                </h1>
                <p className="text-muted-foreground">
                    Plan and view your upcoming tasks and appointments.
                </p>
                </div>
            </div>
            <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Event
            </Button>
        </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
            <Card>
                <CardContent className="p-2">
                     <Calendar
                        mode="single"
                        className="w-full"
                    />
                </CardContent>
            </Card>
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Events</CardTitle>
              <CardDescription>Your schedule for today.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-semibold">Water Testing in Sector 4</p>
                    <p className="text-sm text-muted-foreground">10:00 AM - 11:00 AM</p>
                </div>
                <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-semibold">Community Health Briefing</p>
                    <p className="text-sm text-muted-foreground">2:00 PM - 3:00 PM</p>
                </div>
                 <div className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-semibold">Meet with Village Elder</p>
                    <p className="text-sm text-muted-foreground">4:30 PM</p>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
