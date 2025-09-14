
import type { RiskScoreAndExplainabilityOutput } from '@/ai/flows/generate-risk-score-and-explainability';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, ShieldAlert, ListChecks, ListTodo } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';
import { useTranslation } from '@/hooks/use-translation';

interface RiskScoreDisplayProps {
  result: RiskScoreAndExplainabilityOutput;
}

export function RiskScoreDisplay({ result }: RiskScoreDisplayProps) {
  const { t } = useTranslation();

  const riskLevelConfig = {
    Low: {
      badgeVariant: 'outline' as const,
      icon: <CheckCircle className="h-16 w-16 text-green-500" />,
      title: t('riskDisplay.riskLevels.low'),
      bgColor: 'bg-green-50',
      textColor: 'text-green-800'
    },
    Medium: {
      badgeVariant: 'secondary' as const,
      icon: <AlertTriangle className="h-16 w-16 text-yellow-500" />,
      title: t('riskDisplay.riskLevels.medium'),
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-800'
    },
    High: {
      badgeVariant: 'destructive' as const,
      icon: <ShieldAlert className="h-16 w-16 text-destructive" />,
      title: t('riskDisplay.riskLevels.high'),
      bgColor: 'bg-red-50',
      textColor: 'text-destructive'
    },
  };
  
    const config = riskLevelConfig[result.riskScore] || riskLevelConfig.Low;

  return (
    <Card className="animate-in fade-in-50">
      <CardHeader className={cn("text-center items-center p-6 rounded-t-lg", config.bgColor)}>
        {config.icon}
        <CardTitle className={cn("text-3xl font-bold", config.textColor)}>
          {config.title}
        </CardTitle>
        <Badge variant={config.badgeVariant} className="text-lg px-4 py-1">{t(`riskDisplay.riskScores.${result.riskScore.toLowerCase()}`)}</Badge>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <ListChecks/>
                {t('riskDisplay.factorsTitle')}
            </h3>
            <ul className="space-y-2">
            {result.explainabilityFactors.map((factor, index) => (
                <li key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-md">
                <span className="font-bold text-primary">{index + 1}.</span>
                <span className="text-sm text-foreground">{factor}</span>
                </li>
            ))}
            </ul>
        </div>

        <Separator />
        
        <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <ListTodo/>
                {t('riskDisplay.actionPlanTitle')}
            </h3>
            <ul className="space-y-2">
            {result.actionPlan.map((step, index) => (
                <li key={index} className="flex items-start gap-3 p-3 bg-blue-50/50 rounded-md border border-blue-200">
                 <div className="flex-shrink-0 h-6 w-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-xs mt-0.5">{index + 1}</div>
                 <span className="text-sm text-foreground">{step}</span>
                </li>
            ))}
            </ul>
        </div>
      </CardContent>
    </Card>
  );
}
