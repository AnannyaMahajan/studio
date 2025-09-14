import type { RiskScoreAndExplainabilityOutput } from '@/ai/flows/generate-risk-score-and-explainability';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, AlertTriangle, ShieldAlert, ListChecks } from 'lucide-react';
import { cn } from '@/lib/utils';

interface RiskScoreDisplayProps {
  result: RiskScoreAndExplainabilityOutput;
}

const riskLevelConfig = {
  Low: {
    badgeVariant: 'outline' as const,
    icon: <CheckCircle className="h-16 w-16 text-green-500" />,
    title: 'Low Risk',
    bgColor: 'bg-green-50',
    textColor: 'text-green-800'
  },
  Medium: {
    badgeVariant: 'secondary' as const,
    icon: <AlertTriangle className="h-16 w-16 text-yellow-500" />,
    title: 'Medium Risk',
    bgColor: 'bg-yellow-50',
    textColor: 'text-yellow-800'
  },
  High: {
    badgeVariant: 'destructive' as const,
    icon: <ShieldAlert className="h-16 w-16 text-destructive" />,
    title: 'High Risk',
    bgColor: 'bg-red-50',
    textColor: 'text-destructive'
  },
};


export function RiskScoreDisplay({ result }: RiskScoreDisplayProps) {
    const config = riskLevelConfig[result.riskScore] || riskLevelConfig.Low;

  return (
    <Card className="animate-in fade-in-50">
      <CardHeader className={cn("text-center items-center p-6 rounded-t-lg", config.bgColor)}>
        {config.icon}
        <CardTitle className={cn("text-3xl font-bold", config.textColor)}>
          {config.title} Detected
        </CardTitle>
        <Badge variant={config.badgeVariant} className="text-lg px-4 py-1">{result.riskScore}</Badge>
      </CardHeader>
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <ListChecks/>
            Top 3 Contributing Factors
        </h3>
        <ul className="space-y-2">
          {result.explainabilityFactors.map((factor, index) => (
            <li key={index} className="flex items-start gap-3 p-3 bg-muted/50 rounded-md">
              <span className="font-bold text-primary">{index + 1}.</span>
              <span className="text-sm text-foreground">{factor}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
