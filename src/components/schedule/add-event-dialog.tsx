
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
import { useTranslation } from '@/hooks/use-translation';

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
  const { t } = useTranslation();
  const [title, setTitle] = useState('');
  const [time, setTime] = useState('');
  const { toast } = useToast();

  const handleSubmit = () => {
    if (title && time) {
      onAddEvent({ title, time });
      toast({
        title: t('addEventDialog.toast.successTitle'),
        description: t('addEventDialog.toast.successDescription', { title }),
      });
      setTitle('');
      setTime('');
      onClose();
    } else {
        toast({
            title: t('addEventDialog.toast.errorTitle'),
            description: t('addEventDialog.toast.errorDescription'),
            variant: 'destructive'
        })
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{t('addEventDialog.title')}</DialogTitle>
          <DialogDescription>
            {t('addEventDialog.description')}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              {t('addEventDialog.titleLabel')}
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
              {t('addEventDialog.timeLabel')}
            </Label>
            <Input
              id="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder={t('addEventDialog.timePlaceholder')}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>{t('addEventDialog.cancelButton')}</Button>
          <Button onClick={handleSubmit}>{t('addEventDialog.addButton')}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
