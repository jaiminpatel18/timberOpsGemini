
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
}

export interface Employee {
  id: string;
  name: string;
  role: 'Worker' | 'Admin';
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

export interface ReportData {
  period: string; // e.g., "2024-07-22", "Week 30, 2024", "July 2024"
  totalProduction: number;
  productionUnit: string;
  averageAttendance: number; // percentage
}
