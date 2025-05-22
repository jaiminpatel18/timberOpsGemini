

export type UserRole = 'Admin' | 'Manager' | 'Worker';

export interface WorkLogEntry {
  id: string;
  date: string; // ISO string YYYY-MM-DD
  typeOfWork: string;
  length?: number; // Length in inches
  width?: number; // Width in inches
  thickness?: number; // Thickness in inches
  quantity: number; // Number of pieces
  unit: string; // Stores calculated value like "12.34 BF" or descriptive unit like "tasks"
  notes?: string;
  photoUrl?: string; // Data URI for preview or actual URL from storage
  photoFileName?: string;
}

export interface Employee {
  id: string;
  name: string;
  role: UserRole;
}

export interface AttendanceRecord {
  id: string; // employeeId-date
  employeeId: string;
  employeeName: string;
  date: string; // ISO string YYYY-MM-DD
  status: 'Present' | 'Absent';
  timeIn?: string; // HH:mm
  timeOut?: string; // HH:mm
}

export interface DashboardSummary {
  dailyProduction: { value: number; unit: string };
  employeesPresent: { present: number; total: number };
  pendingTasks: number;
}

export const mockEmployees: Employee[] = [
  { id: 'emp-001', name: 'John伐 Doe林', role: 'Worker' },
  { id: 'emp-002', name: 'Jane🌳 Smith', role: 'Worker' },
  { id: 'emp-003', name: 'Mike🪵 Johnson', role: 'Worker' },
  { id: 'emp-004', name: 'Sarah🌲 Williams', role: 'Worker' },
  { id: 'emp-005', name: 'David Brown⚙️', role: 'Admin' },
];

// Mock current user role - in a real app, this would come from auth state
export const getCurrentUserRole = (): UserRole => {
  // For demo purposes, assume if logged in as admin@example.com, role is Admin
  // This is a simplified check. In a real app, integrate with your auth system.
  if (typeof window !== "undefined") {
     //This is a placeholder, ideally email would be fetched from auth context
    const userEmail = "admin@example.com"; // Simulate admin user
    if (userEmail === "admin@example.com") {
      return 'Admin';
    }
  }
  return 'Worker'; // Default to Worker if not admin or email not available
};


export interface ReportData {
  period: string; // e.g., "2024-07-22", "Week 30, 2024", "July 2024"
  totalProduction: number;
  productionUnit: string;
  averageAttendance: number; // percentage
}
