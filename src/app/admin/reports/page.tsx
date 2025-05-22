"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { Bar, BarChart, Line, LineChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from "recharts"
import type { ChartConfig } from "@/components/ui/chart"
import { Download, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { ReportData } from '@/types';

const dailyReportData: ReportData[] = [
  { period: '2024-07-20', totalProduction: 150, productionUnit: 'm³', averageAttendance: 85 },
  { period: '2024-07-21', totalProduction: 135, productionUnit: 'm³', averageAttendance: 90 },
  { period: '2024-07-22', totalProduction: 160, productionUnit: 'm³', averageAttendance: 88 },
];

const weeklyReportData: ReportData[] = [
  { period: 'Week 28, 2024', totalProduction: 750, productionUnit: 'm³', averageAttendance: 87 },
  { period: 'Week 29, 2024', totalProduction: 780, productionUnit: 'm³', averageAttendance: 89 },
  { period: 'Week 30, 2024', totalProduction: 720, productionUnit: 'm³', averageAttendance: 85 },
];

const monthlyReportData: ReportData[] = [
  { period: 'May 2024', totalProduction: 3000, productionUnit: 'm³', averageAttendance: 86 },
  { period: 'June 2024', totalProduction: 3150, productionUnit: 'm³', averageAttendance: 88 },
  { period: 'July 2024', totalProduction: 2900, productionUnit: 'm³', averageAttendance: 87 },
];

const chartConfig: ChartConfig = {
  production: {
    label: "Production (m³)",
    color: "hsl(var(--primary))",
  },
  attendance: {
    label: "Attendance (%)",
    color: "hsl(var(--accent))",
  },
};

const ReportTable = ({ data }: { data: ReportData[] }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Period</TableHead>
        <TableHead className="text-right">Total Production</TableHead>
        <TableHead className="text-right">Avg. Attendance</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {data.map((item) => (
        <TableRow key={item.period}>
          <TableCell className="font-medium">{item.period}</TableCell>
          <TableCell className="text-right">{item.totalProduction} {item.productionUnit}</TableCell>
          <TableCell className="text-right">{item.averageAttendance}%</TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

const ReportChart = ({ data, title }: { data: ReportData[], title: string }) => (
 <Card className="shadow-md">
    <CardHeader>
        <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent className="h-[350px] p-2">
        <ChartContainer config={chartConfig} className="w-full h-full">
        <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="period" tickFormatter={(value) => value.split(', ')[0].split(' ')[0]} />
            <YAxis yAxisId="left" orientation="left" stroke="var(--color-production)" />
            <YAxis yAxisId="right" orientation="right" stroke="var(--color-attendance)" />
            <ChartTooltip content={<ChartTooltipContent />} />
            <ChartLegend content={<ChartLegendContent />} />
            <Line yAxisId="left" type="monotone" dataKey="totalProduction" stroke="var(--color-production)" strokeWidth={2} name="Production (m³)" />
            <Line yAxisId="right" type="monotone" dataKey="averageAttendance" stroke="var(--color-attendance)" strokeWidth={2} name="Attendance (%)" />
            </LineChart>
        </ResponsiveContainer>
        </ChartContainer>
    </CardContent>
 </Card>
);


export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Reports & History</h1>
            <p className="text-muted-foreground">Analyze production and attendance trends.</p>
        </div>
        <div className="flex gap-2">
            <Button variant="outline"><Download className="mr-2 h-4 w-4" /> Export All</Button>
            <Button variant="outline"><Share2 className="mr-2 h-4 w-4" /> Share Report</Button>
        </div>
      </div>

      <Tabs defaultValue="daily" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-flex">
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-4 mt-4">
          <ReportChart data={dailyReportData} title="Daily Trends" />
          <Card className="shadow-md">
            <CardHeader><CardTitle>Daily Detailed Report</CardTitle></CardHeader>
            <CardContent><ReportTable data={dailyReportData} /></CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weekly" className="space-y-4 mt-4">
          <ReportChart data={weeklyReportData} title="Weekly Trends" />
          <Card className="shadow-md">
            <CardHeader><CardTitle>Weekly Detailed Report</CardTitle></CardHeader>
            <CardContent><ReportTable data={weeklyReportData} /></CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-4 mt-4">
          <ReportChart data={monthlyReportData} title="Monthly Trends" />
          <Card className="shadow-md">
            <CardHeader><CardTitle>Monthly Detailed Report</CardTitle></CardHeader>
            <CardContent><ReportTable data={monthlyReportData} /></CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
