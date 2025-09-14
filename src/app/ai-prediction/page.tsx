
'use client';
import { PredictionHistory } from '@/components/ai-prediction/prediction-history';
import { useTranslation } from '@/hooks/use-translation';
import { Sparkles } from 'lucide-react';

export default function AIPredictionPage() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-8">
      <header className="flex items-center gap-4">
        <Sparkles className="size-8 text-primary" />
        <div>
          <h1 className="font-headline text-3xl font-bold tracking-tight">
            {t('aiPrediction.title')}
          </h1>
          <p className="text-muted-foreground">
            {t('aiPrediction.description')}
          </p>
        </div>
      </header>
      <div className="max-w-4xl mx-auto w-full">
         <PredictionHistory />
      </div>
    </div>
  );
}
