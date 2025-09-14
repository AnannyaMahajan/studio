'use client';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { CalendarEvent } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface AddEventDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onAddEvent: (event: Omit<CalendarEvent, 'date'>) => void;
}

export function AddEventDialog({
  isOpen,
  onClose,
  onAddEvent,
}: AddEventDialogProps) {
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const { toast } = useToast();

  const handleSubmit = () => {
    if (title && time) {
      onAddEvent({ title, time });
      toast({
        title: 'Event Added',
        description: `"${title}" has been added to your schedule.`,
      });
      setTitle('');
      setTime('');
      onClose();
    } else {
        toast({
            title: 'Missing Information',
            description: 'Please fill out both title and time for the event.',
            variant: 'destructive'
        })
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Event</DialogTitle>
          <DialogDescription>
            Enter the details for your new schedule item.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="time" className="text-right">
              Time
            </Label>
            <Input
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="e.g., 10:00 AM or All Day"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Add Event</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
