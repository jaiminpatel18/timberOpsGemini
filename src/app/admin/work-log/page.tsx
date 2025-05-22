"use client";

import { useState } from 'react';
import { WorkLogForm } from '@/components/work-log/WorkLogForm';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import type { WorkLogEntry } from '@/types';
import { format } from 'date-fns';
import { Edit2, Trash2, PlusCircle } from 'lucide-react';

// Mock data for recent entries
const initialRecentEntries: WorkLogEntry[] = [
  { id: '1', date: '2024-07-21', typeOfWork: 'Pine Cutting', quantity: 120, unit: 'cubic meters', notes: 'Morning shift' },
  { id: '2', date: '2024-07-21', typeOfWork: 'Oak Loading', quantity: 50, unit: 'cubic meters', notes: 'Afternoon delivery' },
  { id: '3', date: '2024-07-20', typeOfWork: 'Equipment Maintenance', quantity: 3, unit: 'tasks', notes: 'Saws A1, A2, B1' },
];

export default function WorkLogPage() {
  const [recentEntries, setRecentEntries] = useState<WorkLogEntry[]>(initialRecentEntries);
  const [editingEntry, setEditingEntry] = useState<WorkLogEntry | undefined>(undefined);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleFormSubmit = (entry: WorkLogEntry) => {
    if (editingEntry) {
      setRecentEntries(recentEntries.map(e => e.id === entry.id ? entry : e));
      setEditingEntry(undefined);
    } else {
      setRecentEntries([entry, ...recentEntries]);
    }
    setIsFormVisible(false); // Hide form after submit
  };

  const handleEdit = (entry: WorkLogEntry) => {
    setEditingEntry(entry);
    setIsFormVisible(true);
  };
  
  const handleDelete = (id: string) => {
    setRecentEntries(recentEntries.filter(e => e.id !== id));
  };

  const toggleFormVisibility = () => {
    setIsFormVisible(!isFormVisible);
    if (isFormVisible) setEditingEntry(undefined); // Clear editing state if hiding form
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Daily Work Log</h1>
          <p className="text-muted-foreground">Record and manage daily sawmill operations.</p>
        </div>
        <Button onClick={toggleFormVisibility} size="lg">
          <PlusCircle className="mr-2 h-5 w-5" /> {isFormVisible && !editingEntry ? 'Cancel' : editingEntry ? 'Cancel Edit' : 'Add New Log'}
        </Button>
      </div>

      {isFormVisible && (
        <WorkLogForm onSubmit={handleFormSubmit} initialData={editingEntry} />
      )}

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle>Recent Work Log Entries</CardTitle>
          <CardDescription>Overview of the latest recorded activities.</CardDescription>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[400px] w-full">
            {recentEntries.length > 0 ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Type of Work</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead>Unit</TableHead>
                    <TableHead>Notes</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentEntries.map((entry) => (
                    <TableRow key={entry.id}>
                      <TableCell>{format(new Date(entry.date), 'MMM dd, yyyy')}</TableCell>
                      <TableCell className="font-medium">{entry.typeOfWork}</TableCell>
                      <TableCell className="text-right">{entry.quantity}</TableCell>
                      <TableCell>{entry.unit}</TableCell>
                      <TableCell className="max-w-[200px] truncate">{entry.notes || '-'}</TableCell>
                      <TableCell className="text-right space-x-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(entry)}>
                          <Edit2 className="h-4 w-4 text-blue-600" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(entry.id)}>
                          <Trash2 className="h-4 w-4 text-red-600" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No work logs found. Click "Add New Log" to get started.
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
