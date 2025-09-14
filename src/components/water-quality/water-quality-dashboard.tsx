
'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Bar, BarChart, CartesianGrid, XAxis, Tooltip } from 'recharts';
import { ChartContainer, ChartTooltipContent } from '@/components/ui/chart';
import { TestTube2, Activity, Thermometer, Zap, Target } from 'lucide-react';
import { useTranslation } from '@/hooks/use-translation';

export function WaterQualityDashboard() {
  const { t } = useTranslation();

  const waterQualityData = [
    {
      location: t('waterQuality.data.1.location'),
      turbidity: 45,
      pH: 6.8,
      bacteria: t('waterQuality.data.bacteria.high'),
      conductivity: 550,
      status: t('waterQuality.data.status.poor'),
    },
    {
      location: t('waterQuality.data.2.location'),
      turbidity: 12,
      pH: 7.1,
      bacteria: t('waterQuality.data.bacteria.low'),
      conductivity: 320,
      status: t('waterQuality.data.status.good'),
    },
    {
      location: t('waterQuality.data.3.location'),
      turbidity: 25,
      pH: 6.9,
      bacteria: t('waterQuality.data.bacteria.medium'),
      conductivity: 410,
      status: t('waterQuality.data.status.average'),
    },
    {
      location: t('waterQuality.data.4.location'),
      turbidity: 5,
      pH: 7.5,
      bacteria: t('waterQuality.data.bacteria.none'),
      conductivity: 250,
      status: t('waterQuality.data.status.excellent'),
    },
  ];

  const chartData = waterQualityData.map(item => ({
      name: item.location.split(' - ')[0],
      turbidity: item.turbidity
  }));


  const chartConfig = {
    turbidity: {
      label: t('waterQuality.chart.label'),
      color: 'hsl(var(--primary))',
    },
  };

  const statusVariant: { [key: string]: 'destructive' | 'secondary' | 'outline' } = {
      [t('waterQuality.data.status.poor')]: 'destructive',
      [t('waterQuality.data.status.average')]: 'secondary',
      [t('waterQuality.data.status.good')]: 'outline',
      [t('waterQuality.data.status.excellent')]: 'outline',
  };

  return (
    <div className="grid gap-6">
      <Card>
        <CardHeader>
           <div className="flex items-center gap-2">
            <Target className="size-5" />
            <CardTitle>Your Area: Community Well</CardTitle>
          </div>
          <CardDescription>
            A summary of the latest water quality readings from your local community well.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
           <Card>
             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Turbidity</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">25 NTU</div>
              <p className="text-xs text-muted-foreground">Status: Average</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">pH Level</CardTitle>
              <Thermometer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">6.9</div>
               <p className="text-xs text-muted-foreground">Within acceptable range</p>
            </CardContent>
          </Card>
          <Card>
             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bacteria</CardTitle>
              <TestTube2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">Medium</div>
              <p className="text-xs text-muted-foreground">Coliform detected</p>
            </CardContent>
          </Card>
           <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conductivity</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">410 µS/cm</div>
              <p className="text-xs text-muted-foreground">Slightly elevated</p>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <TestTube2 className="size-5" />
              <CardTitle>{t('waterQuality.table.title')}</CardTitle>
            </div>
            <CardDescription>
              {t('waterQuality.table.description')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t('waterQuality.table.headers.location')}</TableHead>
                  <TableHead className="text-center">{t('waterQuality.table.headers.turbidity')}</TableHead>
                  <TableHead className="text-center">{t('waterQuality.table.headers.ph')}</TableHead>
                  <TableHead>{t('waterQuality.table.headers.bacteria')}</TableHead>
                  <TableHead className="text-right">{t('waterQuality.table.headers.status')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {waterQualityData.map((sample, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{sample.location}</TableCell>
                    <TableCell className="text-center">{sample.turbidity}</TableCell>
                    <TableCell className="text-center">{sample.pH}</TableCell>
                    <TableCell>{sample.bacteria}</TableCell>
                    <TableCell className="text-right">
                      <Badge variant={statusVariant[sample.status] || 'default'}>
                        {sample.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

          <Card>
              <CardHeader>
                  <div className="flex items-center gap-2">
                      <Activity className="size-5" />
                      <CardTitle>{t('waterQuality.chart.title')}</CardTitle>
                  </div>
                  <CardDescription>
                      {t('waterQuality.chart.description')}
                  </CardDescription>
              </CardHeader>
              <CardContent>
                  <ChartContainer config={chartConfig} className="h-[250px] w-full">
                      <BarChart accessibilityLayer data={chartData}>
                          <CartesianGrid vertical={false} />
                          <XAxis
                          dataKey="name"
                          tickLine={false}
                          tickMargin={10}
                          axisLine={false}
                          />
                           <Tooltip
                              cursor={false}
                              content={<ChartTooltipContent indicator="line" />}
                          />
                          <Bar
                          dataKey="turbidity"
                          fill="var(--color-turbidity)"
                          radius={4}
                          />
                      </BarChart>
                  </ChartContainer>
              </CardContent>
          </Card>
      </div>
    </div>
  );
}
