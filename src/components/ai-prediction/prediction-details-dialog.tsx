
'use client';
import type { Prediction } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  CheckCircle,
  AlertTriangle,
  ShieldAlert,
  ListChecks,
  ListTodo,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '../ui/card';
import { useTranslation } from '@/hooks/use-translation';

interface PredictionDetailsDialogProps {
  prediction: Prediction | null;
  isOpen: boolean;
  onClose: () => void;
}

export function PredictionDetailsDialog({
  prediction,
  isOpen,
  onClose,
}: PredictionDetailsDialogProps) {
  const { t } = useTranslation();
  
  const riskLevelConfig = {
    Low: {
      badgeVariant: 'outline' as const,
      icon: <CheckCircle className="h-8 w-8 text-green-500" />,
      title: t('predictionDialog.riskLevels.low'),
      bgColor: 'bg-green-50',
      textColor: 'text-green-800',
    },
    Medium: {
      badgeVariant: 'secondary' as const,
      icon: <AlertTriangle className="h-8 w-8 text-yellow-500" />,
      title: t('predictionDialog.riskLevels.medium'),
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-800',
    },
    High: {
      badgeVariant: 'destructive' as const,
      icon: <ShieldAlert className="h-8 w-8 text-destructive" />,
      title: t('predictionDialog.riskLevels.high'),
      bgColor: 'bg-red-50',
      textColor: 'text-destructive',
    },
  };
  
  if (!prediction) return null;

  const config =
    riskLevelConfig[prediction.riskScore] || riskLevelConfig.Low;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl">
            {t('predictionDialog.title', { location: prediction.location })}
          </DialogTitle>
          <DialogDescription>
            {t('predictionDialog.description', { date: prediction.date })}
          </DialogDescription>
        </DialogHeader>
        <div className="py-4 space-y-6">
          <Card className={cn(config.bgColor)}>
            <CardHeader className="flex flex-row items-center gap-4 space-y-0 p-4">
              {config.icon}
              <div>
                <h3 className={cn('text-xl font-bold', config.textColor)}>
                  {config.title}
                </h3>
                <Badge variant={config.badgeVariant} className="text-md">
                  {t(`predictionDialog.riskScores.${prediction.riskScore.toLowerCase()}`)}
                </Badge>
              </div>
            </CardHeader>
          </Card>

          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ListChecks />
              {t('predictionDialog.factorsTitle')}
            </h3>
            <ul className="space-y-2">
              {prediction.details.explainabilityFactors.map((factor, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 p-3 bg-muted/50 rounded-md"
                >
                  <span className="font-bold text-primary">{index + 1}.</span>
                  <span className="text-sm text-foreground">{factor}</span>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ListTodo />
              {t('predictionDialog.actionPlanTitle')}
            </h3>
            <ul className="space-y-2">
              {prediction.details.actionPlan.map((step, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 p-3 bg-blue-50/50 rounded-md border border-blue-200"
                >
                  <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs mt-0.5">
                    {index + 1}
                  </div>
                  <span className="text-sm text-foreground">{step}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
