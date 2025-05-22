"use client";

import { useState, type FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarIcon, Save } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import type { WorkLogEntry } from '@/types';

interface WorkLogFormProps {
  onSubmit: (entry: WorkLogEntry) => void;
  initialData?: Partial<WorkLogEntry>;
}

export function WorkLogForm({ onSubmit, initialData }: WorkLogFormProps) {
  const [date, setDate] = useState<Date | undefined>(initialData?.date ? new Date(initialData.date) : new Date());
  const [typeOfWork, setTypeOfWork] = useState(initialData?.typeOfWork || '');
  const [quantity, setQuantity] = useState<number | string>(initialData?.quantity || '');
  const [unit, setUnit] = useState<WorkLogEntry['unit'] | undefined>(initialData?.unit || 'cubic meters');
  const [notes, setNotes] = useState(initialData?.notes || '');
  const { toast } = useToast();

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!date || !typeOfWork || !quantity || !unit) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please fill in all required fields.',
      });
      return;
    }

    const newEntry: WorkLogEntry = {
      id: initialData?.id || new Date().toISOString(), // Use existing ID or generate new
      date: format(date, 'yyyy-MM-dd'),
      typeOfWork,
      quantity: Number(quantity),
      unit,
      notes,
    };
    onSubmit(newEntry);
    toast({
      title: 'Work Log Saved',
      description: `Entry for ${typeOfWork} on ${format(date, 'PPP')} has been saved.`,
    });
    // Optionally reset form
    // setTypeOfWork(''); setQuantity(''); setNotes(''); setUnit('cubic meters');
  };

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle>{initialData?.id ? 'Edit Work Log' : 'Add New Work Log'}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="date">Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="w-full justify-start text-left font-normal mt-1"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, 'PPP') : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label htmlFor="typeOfWork">Type of Work</Label>
              <Input
                id="typeOfWork"
                value={typeOfWork}
                onChange={(e) => setTypeOfWork(e.target.value)}
                placeholder="e.g., Oak Cutting, Pine Loading"
                className="mt-1"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g., 150"
                className="mt-1"
                required
              />
            </div>
            <div>
              <Label htmlFor="unit">Unit</Label>
              <Select value={unit} onValueChange={(value) => setUnit(value as WorkLogEntry['unit'])} required>
                <SelectTrigger className="w-full mt-1">
                  <SelectValue placeholder="Select unit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cubic meters">Cubic Meters (m³)</SelectItem>
                  <SelectItem value="tons">Tons</SelectItem>
                  <SelectItem value="units">Units</SelectItem>
                  <SelectItem value="tasks">Tasks Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Notes/Remarks</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Optional notes about the work done"
              className="mt-1"
            />
          </div>

          <div className="flex justify-end">
            <Button type="submit">
              <Save className="mr-2 h-4 w-4" /> {initialData?.id ? 'Update Log' : 'Save Log'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
