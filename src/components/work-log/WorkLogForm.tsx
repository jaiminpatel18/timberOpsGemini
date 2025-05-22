
"use client";

import { useState, type FormEvent, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
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
  
  const [lengthStr, setLengthStr] = useState(initialData?.length?.toString() || '');
  const [widthStr, setWidthStr] = useState(initialData?.width?.toString() || '');
  const [thicknessStr, setThicknessStr] = useState(initialData?.thickness?.toString() || '');
  const [quantityStr, setQuantityStr] = useState(initialData?.quantity?.toString() || ''); // Number of Pieces
  
  const [unit, setUnit] = useState(initialData?.unit || '');
  const [notes, setNotes] = useState(initialData?.notes || '');
  const { toast } = useToast();

  useEffect(() => {
    const L = parseFloat(lengthStr);
    const W = parseFloat(widthStr);
    const T = parseFloat(thicknessStr);
    const Q = parseFloat(quantityStr);

    if (!isNaN(L) && L > 0 && !isNaN(W) && W > 0 && !isNaN(T) && T > 0 && !isNaN(Q) && Q > 0) {
      const calculatedValue = (L * W * T * Q) / 144;
      setUnit(`${calculatedValue.toFixed(2)} BF`);
    }
    // If inputs are not valid for calculation, unit remains as is (allowing manual input or previous value)
  }, [lengthStr, widthStr, thicknessStr, quantityStr]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    const numQuantity = parseFloat(quantityStr);

    if (!date || !typeOfWork || isNaN(numQuantity) || numQuantity <=0 || !unit) {
      toast({
        variant: 'destructive',
        title: 'Missing Information',
        description: 'Please fill in Date, Type of Work, a valid Number of Pieces, and Unit.',
      });
      return;
    }

    const numLength = lengthStr ? parseFloat(lengthStr) : undefined;
    const numWidth = widthStr ? parseFloat(widthStr) : undefined;
    const numThickness = thicknessStr ? parseFloat(thicknessStr) : undefined;

    const newEntry: WorkLogEntry = {
      id: initialData?.id || new Date().toISOString(),
      date: format(date, 'yyyy-MM-dd'),
      typeOfWork,
      length: numLength,
      width: numWidth,
      thickness: numThickness,
      quantity: numQuantity,
      unit,
      notes,
    };
    onSubmit(newEntry);
    toast({
      title: 'Work Log Saved',
      description: `Entry for ${typeOfWork} on ${format(date, 'PPP')} has been saved.`,
    });
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <Label htmlFor="length">Length (in)</Label>
              <Input
                id="length"
                type="number"
                step="any"
                value={lengthStr}
                onChange={(e) => setLengthStr(e.target.value)}
                placeholder="e.g., 120"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="width">Width (in)</Label>
              <Input
                id="width"
                type="number"
                step="any"
                value={widthStr}
                onChange={(e) => setWidthStr(e.target.value)}
                placeholder="e.g., 6"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="thickness">Thickness (in)</Label>
              <Input
                id="thickness"
                type="number"
                step="any"
                value={thicknessStr}
                onChange={(e) => setThicknessStr(e.target.value)}
                placeholder="e.g., 2"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="quantity">Number of Pieces</Label>
              <Input
                id="quantity"
                type="number"
                step="1"
                value={quantityStr}
                onChange={(e) => setQuantityStr(e.target.value)}
                placeholder="e.g., 10"
                className="mt-1"
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="unit">Unit</Label>
            <Input
              id="unit"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="e.g., 12.34 BF or tasks"
              className="mt-1"
              required
            />
            <p className="text-xs text-muted-foreground mt-1">
              Unit is auto-calculated as Board Feet (BF) if L, W, T, and Pieces are valid. Otherwise, enter manually.
            </p>
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
