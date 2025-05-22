
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
  { 
    id: '1', 
    date: '2024-07-21', 
    typeOfWork: 'Pine Cutting', 
    length: 144, // inches
    width: 12,  // inches
    thickness: 1, // inches
    quantity: 10, // pieces
    unit: '120.00 BF', // (144 * 12 * 1 * 10) / 144 = 120
    notes: 'Morning shift, premium grade' 
  },
  { 
    id: '2', 
    date: '2024-07-21', 
    typeOfWork: 'Oak Loading', 
    quantity: 2, // Assuming this refers to 2 loads or similar
    unit: 'loads', // Manually entered unit
    notes: 'Afternoon delivery to Smith Co.' 
  },
  { 
    id: '3', 
    date: '2024-07-20', 
    typeOfWork: 'Equipment Maintenance', 
    quantity: 3, // tasks completed
    unit: 'tasks', 
    notes: 'Saws A1, A2, B1 serviced' 
  },
    { 
    id: '4', 
    date: '2024-07-22', 
    typeOfWork: 'Cedar Planking', 
    length: 96, 
    width: 8,  
    thickness: 1.5, 
    quantity: 50, 
    unit: '400.00 BF', // (96 * 8 * 1.5 * 50) / 144 = 400
    notes: 'For custom order #C123' 
  },
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
      // Ensure new entries get a unique ID if not provided by form (though form should handle it)
      const newEntryWithId = { ...entry, id: entry.id || `new-${Date.now()}`};
      setRecentEntries([newEntryWithId, ...recentEntries]);
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
    if (isFormVisible && editingEntry) { // If form was visible and we are cancelling an edit
        setEditingEntry(undefined);
    } else if (!isFormVisible && editingEntry) { // If form was hidden but an edit was active (e.g. user submitted)
        // This case should be handled by handleFormSubmit clearing editingEntry
    } else if (isFormVisible && !editingEntry) { // If form was visible for new entry and cancelling
        // No specific action needed beyond toggling visibility
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Daily Work Log</h1>
          <p className="text-muted-foreground">Record and manage daily sawmill operations.</p>
        </div>
        <Button onClick={toggleFormVisibility} size="lg">
          <PlusCircle className="mr-2 h-5 w-5" /> 
          {isFormVisible ? (editingEntry ? 'Cancel Edit' : 'Cancel') : 'Add New Log'}
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
                    <TableHead className="text-right">L (in)</TableHead>
                    <TableHead className="text-right">W (in)</TableHead>
                    <TableHead className="text-right">T (in)</TableHead>
                    <TableHead className="text-right">Pieces</TableHead>
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
                      <TableCell className="text-right">{entry.length ?? '-'}</TableCell>
                      <TableCell className="text-right">{entry.width ?? '-'}</TableCell>
                      <TableCell className="text-right">{entry.thickness ?? '-'}</TableCell>
                      <TableCell className="text-right">{entry.quantity}</TableCell>
                      <TableCell>{entry.unit}</TableCell>
                      <TableCell className="max-w-[150px] truncate">{entry.notes || '-'}</TableCell>
                      <TableCell className="text-right space-x-1">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(entry)} aria-label="Edit log">
                          <Edit2 className="h-4 w-4 text-blue-600" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleDelete(entry.id)} aria-label="Delete log">
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
