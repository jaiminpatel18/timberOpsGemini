"use client"; 

import type { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Axe, Users, ClipboardList, TrendingUp, CalendarCheck, Clock } from 'lucide-react';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend } from "recharts"
import type { ChartConfig } from "@/components/ui/chart"

interface StatCardProps {
  title: string;
  value: string;
  description?: string;
  icon: ReactNode;
  colorClass?: string;
}

const StatCard = ({ title, value, description, icon, colorClass = 'text-primary' }: StatCardProps) => (
  <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className={`h-8 w-8 ${colorClass} bg-opacity-10 rounded-full flex items-center justify-center bg-current`}>
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold">{value}</div>
      {description && <p className="text-xs text-muted-foreground pt-1">{description}</p>}
    </CardContent>
  </Card>
);

const productionData = [
  { day: "Mon", processed: 120, target: 150 },
  { day: "Tue", processed: 135, target: 150 },
  { day: "Wed", processed: 140, target: 150 },
  { day: "Thu", processed: 110, target: 150 },
  { day: "Fri", processed: 160, target: 150 },
  { day: "Sat", processed: 90, target: 100 },
];

const chartConfig = {
  processed: {
    label: "Processed",
    color: "hsl(var(--primary))",
  },
  target: {
    label: "Target",
    color: "hsl(var(--secondary))",
  },
} satisfies ChartConfig

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <StatCard 
          title="Timber Processed Today" 
          value="135 m³" 
          description="+12% from yesterday"
          icon={<Axe className="h-5 w-5" />} 
          colorClass="text-green-600"
        />
        <StatCard 
          title="Employees Present" 
          value="18 / 20" 
          description="90% attendance rate"
          icon={<Users className="h-5 w-5" />} 
          colorClass="text-blue-600"
        />
        <StatCard 
          title="Pending Tasks" 
          value="3 Logs" 
          description="Awaiting quality check"
          icon={<ClipboardList className="h-5 w-5" />}
          colorClass="text-orange-500"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              Weekly Production Overview
            </CardTitle>
            <CardDescription>Timber processed (m³) vs Target</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px] p-2">
            <ChartContainer config={chartConfig} className="w-full h-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productionData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="processed" fill="var(--color-processed)" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="target" fill="var(--color-target)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <CalendarCheck className="h-6 w-6 text-primary" />
                Upcoming Schedule
            </CardTitle>
            <CardDescription>Key activities for the next few days</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Mahogany Log Shipment Arrival</p>
                  <p className="text-sm text-muted-foreground">Tomorrow, 09:00 AM</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Equipment Maintenance (Saw A3)</p>
                  <p className="text-sm text-muted-foreground">Wednesday, 02:00 PM - 04:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="h-5 w-5 text-muted-foreground mt-0.5 shrink-0" />
                <div>
                  <p className="font-medium">Client Visit: PineWood Corp</p>
                  <p className="text-sm text-muted-foreground">Friday, 11:00 AM</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
