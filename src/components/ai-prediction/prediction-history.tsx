import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { BrainCircuit, History } from 'lucide-react';
import type { Prediction } from '@/lib/types';
import { predictionHistory } from '@/lib/placeholder-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '../ui/button';

const riskBadgeVariant: { [key in Prediction['riskScore']]: 'destructive' | 'secondary' | 'outline' } = {
  High: 'destructive',
  Medium: 'secondary',
  Low: 'outline',
};

export function PredictionHistory() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <History className="size-5" />
          <CardTitle>Prediction Log</CardTitle>
        </div>
        <CardDescription>
          A log of the most recent reports and their AI-generated risk scores.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {predictionHistory.map((prediction) => (
          <div
            key={prediction.id}
            className="flex items-start gap-4 p-3 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
          >
            <div className="mt-1"><BrainCircuit className="size-5 text-primary"/></div>
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <p className="font-semibold">{prediction.location}</p>
                 <Badge
                  variant={riskBadgeVariant[prediction.riskScore]}
                  className="capitalize"
                >
                  {prediction.riskScore} Risk
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {prediction.summary}
              </p>
              <p className="text-xs text-muted-foreground mt-1">{prediction.date}</p>
              <div className="mt-2">
                <Button variant="link" size="sm" className="h-auto p-0">
                  View Details
                </Button>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
