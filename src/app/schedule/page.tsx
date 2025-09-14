
'use client';
import { useState, useMemo, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { CalendarIcon, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AddEventDialog } from '@/components/schedule/add-event-dialog';
import type { CalendarEvent } from '@/lib/types';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { useTranslation } from '@/hooks/use-translation';

export default function SchedulePage() {
  const { t } = useTranslation();

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [isAddEventDialogOpen, setIsAddEventDialogOpen] = useState(false);

  useEffect(() => {
    const today = new Date();
    setDate(today);

    const initialEvents: CalendarEvent[] = [
      {
        date: new Date(new Date().setDate(today.getDate())),
        title: t('schedule.events.1.title'),
        time: '10:00 AM - 11:00 AM',
      },
      {
        date: new Date(new Date().setDate(today.getDate())),
        title: t('schedule.events.2.title'),
        time: '2:00 PM - 3:00 PM',
      },
      {
        date: new Date(new Date().setDate(today.getDate())),
        title: t('schedule.events.3.title'),
        time: '4:30 PM',
      },
      {
        date: new Date(new Date().setDate(today.getDate() + 2)),
        title: t('schedule.events.4.title'),
        time: t('schedule.events.4.time'),
      },
    ];
    setEvents(initialEvents);
  }, [t]);


  const selectedDayEvents = date
    ? events.filter(
        (event) => format(event.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
      )
    : [];

  const handleAddEvent = (newEvent: Omit<CalendarEvent, 'date'>) => {
    if (date) {
      setEvents([...events, { ...newEvent, date }]);
    }
  };

  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <CalendarIcon className="size-8 text-primary" />
          <div>
            <h1 className="font-headline text-3xl font-bold tracking-tight">
              {t('schedule.title')}
            </h1>
            <p className="text-muted-foreground">
              {t('schedule.description')}
            </p>
          </div>
        </div>
        <Button onClick={() => setIsAddEventDialogOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          {t('schedule.newEventButton')}
        </Button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-2">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="w-full"
                modifiers={{
                  hasEvent: events.map((event) => event.date),
                }}
                modifiersStyles={{
                  hasEvent: {
                    fontWeight: 'bold',
                    textDecoration: 'underline',
                  },
                }}
                components={{
                  DayContent: (props) => {
                    const dayEvents = events.filter(
                      (event) =>
                        format(event.date, 'yyyy-MM-dd') ===
                        format(props.date, 'yyyy-MM-dd')
                    );
                    if (dayEvents.length > 0) {
                      return (
                        <Popover>
                          <PopoverTrigger asChild>
                            <div className="relative w-full h-full flex items-center justify-center">
                              {props.date.getDate()}
                            </div>
                          </PopoverTrigger>
                          <PopoverContent className="w-80">
                            <div className="grid gap-4">
                              <div className="space-y-2">
                                <h4 className="font-medium leading-none">
                                  {t('schedule.popoverTitle', { date: format(props.date, 'PPP')})}
                                </h4>
                                <div className="grid gap-2">
                                  {dayEvents.map((event, index) => (
                                    <div key={index} className="text-sm">
                                      <p className="font-semibold">{event.title}</p>
                                      <p className="text-muted-foreground">{event.time}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </PopoverContent>
                        </Popover>
                      );
                    }
                    return <div>{props.date.getDate()}</div>;
                  },
                }}
              />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>
                {date ? format(date, 'PPP') : t('schedule.upcomingEvents')}
              </CardTitle>
              <CardDescription>
                {t('schedule.daySchedule')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedDayEvents.length > 0 ? (
                selectedDayEvents.map((event, index) => (
                  <div key={index} className="p-3 bg-muted/50 rounded-lg">
                    <p className="font-semibold">{event.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {event.time}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">
                  {t('schedule.noEvents')}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      <AddEventDialog
        isOpen={isAddEventDialogOpen}
        onClose={() => setIsAddEventDialogOpen(false)}
        onAddEvent={handleAddEvent}
      />
    </div>
  );
}
