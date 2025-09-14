import { PredictionHistory } from '@/components/ai-prediction/prediction-history';
import { Sparkles } from 'lucide-react';

export default function AIPredictionPage() {
  return (
    <div className="flex flex-col gap-8 p-4 md:p-8">
      <header className="flex items-center gap-4">
        <Sparkles className="size-8 text-primary" />
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            AI Prediction Center
          </h1>
          <p className="text-muted-foreground">
            Review historical risk assessments and predictions.
          </p>
        </div>
      </header>
      <div className="max-w-4xl mx-auto w-full">
         <PredictionHistory />
      </div>
    </div>
  );
}
