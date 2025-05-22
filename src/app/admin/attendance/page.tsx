"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AttendanceTable } from '@/components/attendance/AttendanceTable';
import type { AttendanceRecord } from '@/types';
import { format } from 'date-fns';
import { CalendarIcon, Save } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AttendancePage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentAttendance, setCurrentAttendance] = useState<AttendanceRecord[]>([]);
  const { toast } = useToast();

  const handleDateChange = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      // Here you would typically fetch attendance records for the new date
      // For now, we just reset currentAttendance or pass it to AttendanceTable
      // which will initialize based on the new date.
    }
  };

  const handleSaveAttendance = () => {
    // In a real app, you'd send `currentAttendance` to your backend
    console.log('Saving attendance:', currentAttendance);
    toast({
      title: 'Attendance Saved',
      description: `Attendance for ${format(selectedDate, 'PPP')} has been saved.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Employee Attendance</h1>
          <p className="text-muted-foreground">Track daily employee presence and work hours.</p>
        </div>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full sm:w-auto text-lg py-3">
              <CalendarIcon className="mr-2 h-5 w-5" />
              {format(selectedDate, 'PPP')}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateChange}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Attendance for {format(selectedDate, 'MMMM dd, yyyy')}</CardTitle>
          <CardDescription>Mark employees as present/absent and record their work times.</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="max-h-[600px] w-full">
            <AttendanceTable 
              date={selectedDate} 
              onAttendanceChange={setCurrentAttendance} 
              // initialRecords could be fetched based on selectedDate
            />
          </ScrollArea>
        </CardContent>
      </Card>
      <div className="flex justify-end">
        <Button onClick={handleSaveAttendance} size="lg">
          <Save className="mr-2 h-5 w-5" /> Save Attendance
        </Button>
      </div>
    </div>
  );
}
