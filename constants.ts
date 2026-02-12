
import { UserRole, Patient, CareTask, TaskType, TaskStatus, User } from './types';

export const CURRENT_USER_KEY = 'careflow_user';
export const PATIENTS_KEY = 'careflow_patients';
export const TASKS_KEY = 'careflow_tasks';
export const ACTIVITIES_KEY = 'careflow_activities';
export const BILLING_KEY = 'careflow_bills';

export const USERS: User[] = [
  { id: 'u1', name: 'Dr. Sarah Wilson', role: UserRole.DOCTOR, avatar: 'https://picsum.photos/seed/doc1/100/100' },
  { id: 'u2', name: 'Nurse Michael Chen', role: UserRole.NURSE, avatar: 'https://picsum.photos/seed/nurse1/100/100' },
  { id: 'u3', name: 'James Carter (Lab)', role: UserRole.LAB, avatar: 'https://picsum.photos/seed/lab1/100/100' },
  { id: 'u4', name: 'Emma Watson (Pharm)', role: UserRole.PHARMACY, avatar: 'https://picsum.photos/seed/pharm1/100/100' },
  { id: 'u5', name: 'System Admin', role: UserRole.ADMIN, avatar: 'https://picsum.photos/seed/admin1/100/100' },
];

export const INITIAL_PATIENTS: Patient[] = [
  {
    id: 'p1',
    name: 'Robert J. Miller',
    age: 64,
    gender: 'Male',
    bloodGroup: 'A+',
    admissionDate: '2024-05-12T08:30:00Z',
    roomNumber: '402A',
    diagnosis: 'Acute Coronary Syndrome',
    condition: 'Stable',
  },
  {
    id: 'p2',
    name: 'Elena Rodriguez',
    age: 29,
    gender: 'Female',
    bloodGroup: 'O-',
    admissionDate: '2024-05-14T11:15:00Z',
    roomNumber: '305',
    diagnosis: 'Post-operative Appendectomy',
    condition: 'Stable',
  },
  {
    id: 'p3',
    name: 'Samuel Thompson',
    age: 72,
    gender: 'Male',
    bloodGroup: 'B+',
    admissionDate: '2024-05-15T02:00:00Z',
    roomNumber: 'ICU-02',
    diagnosis: 'Septic Shock',
    condition: 'Critical',
  }
];

export const INITIAL_TASKS: CareTask[] = [
  {
    id: 't1',
    patientId: 'p1',
    title: 'Stat CBC & Trop-I',
    type: TaskType.LAB_TEST,
    status: TaskStatus.COMPLETED,
    department: UserRole.LAB,
    description: 'Urgent cardiac enzymes requested',
    createdBy: 'u1',
    createdAt: '2024-05-12T09:00:00Z',
    updatedAt: '2024-05-12T10:15:00Z',
  },
  {
    id: 't2',
    patientId: 'p1',
    title: 'Atorvastatin 40mg',
    type: TaskType.PRESCRIPTION,
    status: TaskStatus.PENDING,
    department: UserRole.PHARMACY,
    description: 'Administer daily at bedtime',
    createdBy: 'u1',
    createdAt: '2024-05-12T09:05:00Z',
    updatedAt: '2024-05-12T09:05:00Z',
  }
];

import { Bill } from './types';

export const INITIAL_BILLS: Bill[] = [
  {
    id: 'b1',
    patientId: 'p1',
    patientName: 'Robert J. Miller',
    services: [
      { name: 'ECG', amount: 150 },
      { name: 'Trop-I', amount: 80 }
    ],
    totalAmount: 230,
    paidAmount: 230,
    dueAmount: 0,
    status: 'Paid',
    date: '2024-05-13T10:00:00Z',
    notes: 'Insurance covered'
  },
  {
    id: 'b2',
    patientId: 'p2',
    patientName: 'Elena Rodriguez',
    services: [
      { name: 'Appendectomy', amount: 1200 },
      { name: 'Anesthesia', amount: 300 }
    ],
    totalAmount: 1500,
    paidAmount: 500,
    dueAmount: 1000,
    status: 'Partial',
    date: '2024-05-15T14:30:00Z'
  }
];
