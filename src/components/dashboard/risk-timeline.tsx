
'use client';

import { TrendingUp } from 'lucide-react';
import { Area, AreaChart, CartesianGrid, XAxis, Tooltip } from 'recharts';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';
import { riskTimelineData } from '@/lib/placeholder-data';
import { useTranslation } from '@/hooks/use-translation';

const chartConfig = {
  riskScore: {
    label: 'Risk Score',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export function RiskTimeline() {
  const { t } = useTranslation();
  
  const translatedData = riskTimelineData.map((item, index) => ({
    ...item,
    week: t(`riskTimeline.weeks.${index}`)
  }));


  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <TrendingUp className="size-5" />
          <CardTitle>{t('riskTimeline.title')}</CardTitle>
        </div>
        <CardDescription>
          {t('riskTimeline.description')}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[200px] w-full">
          <AreaChart
            accessibilityLayer
            data={translatedData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="week"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 10)}
            />
            <Tooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <defs>
              <linearGradient id="fillRiskScore" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-riskScore)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-riskScore)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <Area
              dataKey="riskScore"
              type="natural"
              fill="url(#fillRiskScore)"
              fillOpacity={0.4}
              stroke="var(--color-riskScore)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
