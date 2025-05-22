"use client";

import { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Employee, AttendanceRecord } from '@/types';
import { mockEmployees } from '@/types'; // Using mock employees
import { format } from 'date-fns';

interface AttendanceTableProps {
  date: Date;
  onAttendanceChange: (records: AttendanceRecord[]) => void;
  initialRecords?: AttendanceRecord[];
}

export function AttendanceTable({ date, onAttendanceChange, initialRecords = [] }: AttendanceTableProps) {
  const [attendanceRecords, setAttendanceRecords] = useState<AttendanceRecord[]>(() => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return mockEmployees.map(emp => {
      const existingRecord = initialRecords.find(r => r.employeeId === emp.id && r.date === dateStr);
      return existingRecord || {
        id: `${emp.id}-${dateStr}`,
        employeeId: emp.id,
        employeeName: emp.name,
        date: dateStr,
        status: 'Absent',
        timeIn: '',
        timeOut: '',
      };
    });
  });

  const handleStatusChange = (employeeId: string, checked: boolean) => {
    const updatedRecords = attendanceRecords.map(record =>
      record.employeeId === employeeId ? { ...record, status: checked ? 'Present' : 'Absent' } : record
    );
    setAttendanceRecords(updatedRecords);
    onAttendanceChange(updatedRecords);
  };

  const handleTimeChange = (employeeId: string, field: 'timeIn' | 'timeOut', value: string) => {
    const updatedRecords = attendanceRecords.map(record =>
      record.employeeId === employeeId ? { ...record, [field]: value } : record
    );
    setAttendanceRecords(updatedRecords);
    onAttendanceChange(updatedRecords);
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Employee Name</TableHead>
          <TableHead className="text-center">Status (Present)</TableHead>
          <TableHead>Time In</TableHead>
          <TableHead>Time Out</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {attendanceRecords.map((record) => (
          <TableRow key={record.id}>
            <TableCell className="font-medium">{record.employeeName}</TableCell>
            <TableCell className="text-center">
              <Switch
                id={`status-${record.employeeId}`}
                checked={record.status === 'Present'}
                onCheckedChange={(checked) => handleStatusChange(record.employeeId, checked)}
                aria-label={`Mark ${record.employeeName} as present`}
              />
            </TableCell>
            <TableCell>
              <Input
                type="time"
                id={`timeIn-${record.employeeId}`}
                value={record.timeIn}
                onChange={(e) => handleTimeChange(record.employeeId, 'timeIn', e.target.value)}
                disabled={record.status === 'Absent'}
                className="max-w-[120px]"
              />
            </TableCell>
            <TableCell>
              <Input
                type="time"
                id={`timeOut-${record.employeeId}`}
                value={record.timeOut}
                onChange={(e) => handleTimeChange(record.employeeId, 'timeOut', e.target.value)}
                disabled={record.status === 'Absent'}
                className="max-w-[120px]"
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
