"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, UploadCloud, BellRing, Save } from 'lucide-react';
import type { Employee } from '@/types';
import { mockEmployees } from '@/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function SettingsPage() {
  const { toast } = useToast();
  const [users, setUsers] = useState<Employee[]>(mockEmployees);
  const [newUserName, setNewUserName] = useState('');
  const [newUserRole, setNewUserRole] = useState<'Worker' | 'Admin'>('Worker');

  const [notifications, setNotifications] = useState({
    dailySummary: true,
    incompleteLogs: false,
    lowStock: true,
  });

  const handleAddUser = () => {
    if (!newUserName) {
      toast({ variant: 'destructive', title: 'Error', description: 'User name cannot be empty.' });
      return;
    }
    const newUser: Employee = {
      id: `emp-${Date.now()}`,
      name: newUserName,
      role: newUserRole,
    };
    setUsers([...users, newUser]);
    setNewUserName('');
    toast({ title: 'User Added', description: `${newUserName} has been added.` });
  };
  
  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    toast({ title: 'Settings Updated', description: 'Notification preferences saved.'});
  };

  const handleBackup = () => {
    toast({ title: 'Backup Started', description: 'Data backup to cloud is in progress.' });
  };

  const handleRestore = () => {
    toast({ title: 'Restore Initiated', description: 'Data restore process has started.' });
  };


  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage application settings and user preferences.</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><UserPlus /> User Management</CardTitle>
          <CardDescription>Add or remove workers and manage roles.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button><UserPlus className="mr-2 h-4 w-4" /> Add New User</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
                <DialogDescription>Enter the details for the new user.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <Input id="name" value={newUserName} onChange={(e) => setNewUserName(e.target.value)} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="role" className="text-right">Role</Label>
                  <select 
                    id="role" 
                    value={newUserRole} 
                    onChange={(e) => setNewUserRole(e.target.value as 'Worker' | 'Admin')}
                    className="col-span-3 block w-full rounded-md border-input bg-background px-3 py-2 text-sm shadow-sm focus:border-ring focus:ring-ring"
                  >
                    <option value="Worker">Worker</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" onClick={handleAddUser}>Add User</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <div className="rounded-md border mt-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map(user => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell><span className={`px-2 py-1 text-xs rounded-full ${user.role === 'Admin' ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary-foreground'}`}>{user.role}</span></TableCell>
                    <TableCell className="text-right">
                      <Button variant="ghost" size="sm" onClick={() => toast({description: `Edit action for ${user.name}`})}>Edit</Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive" onClick={() => {
                        setUsers(users.filter(u => u.id !== user.id));
                        toast({description: `${user.name} removed.`});
                      }}>Remove</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><UploadCloud /> Data Backup & Restore</CardTitle>
          <CardDescription>Manage your application data backups.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-4">
          <Button onClick={handleBackup} className="flex-1"><UploadCloud className="mr-2 h-4 w-4" /> Backup Data to Cloud</Button>
          <Button onClick={handleRestore} variant="outline" className="flex-1">Restore Data from Cloud</Button>
        </CardContent>
      </Card>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><BellRing /> Notification Settings</CardTitle>
          <CardDescription>Configure your notification preferences.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between space-x-2 p-3 border rounded-md">
            <Label htmlFor="daily-summary" className="flex flex-col space-y-1">
              <span>Daily Summary Email</span>
              <span className="font-normal leading-snug text-muted-foreground">
                Receive a summary of daily operations.
              </span>
            </Label>
            <Switch id="daily-summary" checked={notifications.dailySummary} onCheckedChange={() => handleNotificationChange('dailySummary')} />
          </div>
          <div className="flex items-center justify-between space-x-2 p-3 border rounded-md">
            <Label htmlFor="incomplete-logs" className="flex flex-col space-y-1">
              <span>Incomplete Log Reminders</span>
               <span className="font-normal leading-snug text-muted-foreground">
                Get notified about pending or incomplete work logs.
              </span>
            </Label>
            <Switch id="incomplete-logs" checked={notifications.incompleteLogs} onCheckedChange={() => handleNotificationChange('incompleteLogs')} />
          </div>
           <div className="flex items-center justify-between space-x-2 p-3 border rounded-md">
            <Label htmlFor="low-stock" className="flex flex-col space-y-1">
              <span>Low Stock Alerts</span>
               <span className="font-normal leading-snug text-muted-foreground">
                Receive alerts for timber stock running low.
              </span>
            </Label>
            <Switch id="low-stock" checked={notifications.lowStock} onCheckedChange={() => handleNotificationChange('lowStock')} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
