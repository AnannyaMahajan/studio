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
import { TestTube2, Activity, Thermometer, Zap } from 'lucide-react';

const waterQualityData = [
  {
    location: 'Sector 7 - Well',
    turbidity: 45,
    pH: 6.8,
    bacteria: 'High',
    conductivity: 550,
    status: 'Poor',
  },
  {
    location: 'North Village River',
    turbidity: 12,
    pH: 7.1,
    bacteria: 'Low',
    conductivity: 320,
    status: 'Good',
  },
  {
    location: 'Community Pump',
    turbidity: 25,
    pH: 6.9,
    bacteria: 'Medium',
    conductivity: 410,
    status: 'Average',
  },
  {
    location: 'East Sector Borehole',
    turbidity: 5,
    pH: 7.5,
    bacteria: 'None',
    conductivity: 250,
    status: 'Excellent',
  },
];

const chartData = waterQualityData.map(item => ({
    name: item.location.split(' - ')[0],
    turbidity: item.turbidity
}));


const chartConfig = {
  turbidity: {
    label: 'Turbidity (NTU)',
    color: 'hsl(var(--primary))',
  },
};

const statusVariant: { [key: string]: 'destructive' | 'secondary' | 'outline' } = {
    Poor: 'destructive',
    Average: 'secondary',
    Good: 'outline',
    Excellent: 'outline',
};

export function WaterQualityDashboard() {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <TestTube2 className="size-5" />
            <CardTitle>Recent Sample Results</CardTitle>
          </div>
          <CardDescription>
            Overview of the latest water quality tests.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Location</TableHead>
                <TableHead className="text-center">Turbidity (NTU)</TableHead>
                <TableHead className="text-center">pH</TableHead>
                <TableHead>Bacteria</TableHead>
                <TableHead className="text-right">Status</TableHead>
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
                    <CardTitle>Turbidity Levels by Location</CardTitle>
                </div>
                <CardDescription>
                    Higher turbidity can indicate a higher risk of contaminants.
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
  );
}
