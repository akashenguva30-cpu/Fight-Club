
import { 
  Patient, 
  CareTask, 
  ActivityEvent, 
  User, 
  UserRole, 
  TaskStatus 
} from '../types';
import { 
  INITIAL_PATIENTS, 
  INITIAL_TASKS, 
  PATIENTS_KEY, 
  TASKS_KEY, 
  ACTIVITIES_KEY 
} from '../constants';
import { BILLING_KEY, INITIAL_BILLS } from '../constants';
import { Bill } from '../types';

type Listener = () => void;

class StateService {
  private listeners: Set<Listener> = new Set();

  constructor() {
    this.init();
  }

  private init() {
    if (!localStorage.getItem(PATIENTS_KEY)) {
      localStorage.setItem(PATIENTS_KEY, JSON.stringify(INITIAL_PATIENTS));
    }
    if (!localStorage.getItem(TASKS_KEY)) {
      localStorage.setItem(TASKS_KEY, JSON.stringify(INITIAL_TASKS));
    }
    if (!localStorage.getItem(ACTIVITIES_KEY)) {
      localStorage.setItem(ACTIVITIES_KEY, JSON.stringify([]));
    }
    if (!localStorage.getItem(BILLING_KEY)) {
      localStorage.setItem(BILLING_KEY, JSON.stringify(INITIAL_BILLS));
    }
  }

  subscribe(listener: Listener) {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach(l => l());
  }

  // Patients
  getPatients(): Patient[] {
    const data = localStorage.getItem(PATIENTS_KEY);
    return data ? JSON.parse(data) : [];
  }

  getPatient(id: string): Patient | undefined {
    return this.getPatients().find(p => p.id === id);
  }

  addPatient(patient: Omit<Patient, 'id'>) {
    const patients = this.getPatients();
    const newPatient = { ...patient, id: `p-${Date.now()}` };
    localStorage.setItem(PATIENTS_KEY, JSON.stringify([...patients, newPatient]));
    this.notify();
    return newPatient;
  }

  // Tasks
  getTasks(): CareTask[] {
    const data = localStorage.getItem(TASKS_KEY);
    return data ? JSON.parse(data) : [];
  }

  getPatientTasks(patientId: string): CareTask[] {
    return this.getTasks().filter(t => t.patientId === patientId);
  }

  // Corrected the type signature: Omit 'createdBy' because it's populated from the user parameter inside the function
  addTask(task: Omit<CareTask, 'id' | 'createdAt' | 'updatedAt' | 'createdBy'>, user: User) {
    const tasks = this.getTasks();
    const newTask: CareTask = {
      ...task,
      id: `t-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      createdBy: user.id
    };
    localStorage.setItem(TASKS_KEY, JSON.stringify([...tasks, newTask]));
    
    this.logActivity({
      patientId: task.patientId,
      userId: user.id,
      userName: user.name,
      action: `Created new task: ${task.title}`,
      details: `Department: ${task.department}`
    });

    this.notify();
    return newTask;
  }

  updateTaskStatus(taskId: string, status: TaskStatus, user: User) {
    const tasks = this.getTasks();
    const index = tasks.findIndex(t => t.id === taskId);
    if (index === -1) return;

    const oldStatus = tasks[index].status;
    tasks[index].status = status;
    tasks[index].updatedAt = new Date().toISOString();
    
    localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));

    this.logActivity({
      patientId: tasks[index].patientId,
      userId: user.id,
      userName: user.name,
      action: `Updated status of "${tasks[index].title}"`,
      details: `Changed from ${oldStatus} to ${status}`
    });

    this.notify();
  }

  // Activities
  getActivities(patientId?: string): ActivityEvent[] {
    const data = localStorage.getItem(ACTIVITIES_KEY);
    const activities: ActivityEvent[] = data ? JSON.parse(data) : [];
    if (patientId) {
      return activities.filter(a => a.patientId === patientId).sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    }
    return activities.sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }

  // Billing
  getBills(): Bill[] {
    const data = localStorage.getItem(BILLING_KEY);
    return data ? JSON.parse(data) : [];
  }

  getBill(id: string): Bill | undefined {
    return this.getBills().find(b => b.id === id);
  }

  addBill(bill: Omit<Bill, 'id' | 'dueAmount'>) {
    const bills = this.getBills();
    const newBill: Bill = {
      ...bill,
      id: `b-${Date.now()}`,
      dueAmount: Math.max(0, bill.totalAmount - bill.paidAmount)
    };
    if (newBill.paidAmount >= newBill.totalAmount) newBill.status = 'Paid';
    else if (newBill.paidAmount === 0) newBill.status = 'Pending';
    else newBill.status = 'Partial';
    localStorage.setItem(BILLING_KEY, JSON.stringify([...bills, newBill]));
    this.notify();
    return newBill;
  }

  updateBill(id: string, updates: Partial<Bill>) {
    const bills = this.getBills();
    const idx = bills.findIndex(b => b.id === id);
    if (idx === -1) return;
    const updated = { ...bills[idx], ...updates } as Bill;
    updated.dueAmount = Math.max(0, updated.totalAmount - updated.paidAmount);
    if (updated.paidAmount >= updated.totalAmount) updated.status = 'Paid';
    else if (updated.paidAmount === 0) updated.status = 'Pending';
    else updated.status = 'Partial';
    bills[idx] = updated;
    localStorage.setItem(BILLING_KEY, JSON.stringify(bills));
    this.notify();
    return updated;
  }

  deleteBill(id: string) {
    const bills = this.getBills().filter(b => b.id !== id);
    localStorage.setItem(BILLING_KEY, JSON.stringify(bills));
    this.notify();
  }

  private logActivity(event: Omit<ActivityEvent, 'id' | 'timestamp'>) {
    const activities = this.getActivities();
    const newEvent: ActivityEvent = {
      ...event,
      id: `act-${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem(ACTIVITIES_KEY, JSON.stringify([...activities, newEvent]));
  }
}

export const stateService = new StateService();
