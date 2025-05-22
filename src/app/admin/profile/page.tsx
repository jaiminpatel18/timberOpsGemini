// src/app/admin/profile/page.tsx
"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Edit3, Mail, Phone, Save } from "lucide-react";
import { useState } from "react";

export default function ProfilePage() {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("Admin User");
  const [email, setEmail] = useState("admin@example.com");
  const [phone, setPhone] = useState("+1 (555) 123-4567");

  const handleSave = () => {
    // Simulate save
    toast({ title: "Profile Updated", description: "Your profile information has been saved." });
    setIsEditing(false);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">User Profile</h1>
        <p className="text-muted-foreground">View and manage your profile information.</p>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="items-center text-center">
          <Avatar className="w-24 h-24 mb-4 border-4 border-primary/30">
            <AvatarImage src="https://placehold.co/200x200.png" alt="Admin User" data-ai-hint="user avatar"/>
            <AvatarFallback className="text-3xl">AU</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl">{name}</CardTitle>
          <CardDescription>Administrator</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} disabled={!isEditing} />
          </div>
          <div>
            <Label htmlFor="email">Email Address</Label>
            <div className="flex items-center">
              <Mail className="h-5 w-5 text-muted-foreground mr-2"/>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={!isEditing} />
            </div>
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
             <div className="flex items-center">
              <Phone className="h-5 w-5 text-muted-foreground mr-2"/>
              <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} disabled={!isEditing} />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          {isEditing ? (
            <>
              <Button variant="outline" onClick={() => setIsEditing(false)}>Cancel</Button>
              <Button onClick={handleSave}><Save className="mr-2 h-4 w-4" /> Save Changes</Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}><Edit3 className="mr-2 h-4 w-4" /> Edit Profile</Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
