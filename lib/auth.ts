export interface User {
  id: string
  email: string
  name: string
  role: "admin" | "employee" | "customer"
  avatar?: string
}

export interface Customer {
  id: string
  name: string
  email: string
  phone: string
  address: string
  status: "active" | "inactive"
  createdAt: string
  prepaymentBalance: number
}

export interface Service {
  id: string
  name: string
  description: string
  price: number
  requiresLicense: boolean
  category: string
}

export interface Task {
  id: string
  title: string
  description: string
  customerId: string
  serviceId: string
  assignedTo: string
  status: "pending" | "in-progress" | "completed" | "cancelled"
  priority: "low" | "medium" | "high"
  dueDate: string
  createdAt: string
  subtasks: SubTask[]
  progress: number
}

export interface SubTask {
  id: string
  title: string
  completed: boolean
  assignedTo: string
}

export interface BoxFile {
  id: string
  name: string
  type: string
  size: number
  customerId: string
  taskId?: string
  uploadedBy: string
  uploadedAt: string
  url: string
}

// Mock data
export const mockUsers: User[] = [
  { id: "1", email: "admin@company.com", name: "Admin User", role: "admin" },
  { id: "2", email: "employee@company.com", name: "John Employee", role: "employee" },
  { id: "3", email: "customer@example.com", name: "Jane Customer", role: "customer" },
]

export const mockCustomers: Customer[] = [
  {
    id: "1",
    name: "Acme Corporation",
    email: "contact@acme.com",
    phone: "+1-555-0123",
    address: "123 Business St, City, State 12345",
    status: "active",
    createdAt: "2024-01-15",
    prepaymentBalance: 2500.0,
  },
  {
    id: "2",
    name: "Tech Solutions Inc",
    email: "info@techsolutions.com",
    phone: "+1-555-0456",
    address: "456 Innovation Ave, Tech City, TC 67890",
    status: "active",
    createdAt: "2024-02-20",
    prepaymentBalance: 1200.0,
  },
]

export const mockServices: Service[] = [
  {
    id: "1",
    name: "Website Development",
    description: "Custom website development and design",
    price: 2500.0,
    requiresLicense: false,
    category: "Development",
  },
  {
    id: "2",
    name: "Software Licensing",
    description: "Annual software license management",
    price: 500.0,
    requiresLicense: true,
    category: "Licensing",
  },
]

export const mockTasks: Task[] = [
  {
    id: "1",
    title: "Website Redesign Project",
    description: "Complete redesign of company website with modern UI/UX",
    customerId: "1",
    serviceId: "1",
    assignedTo: "2",
    status: "in-progress",
    priority: "high",
    dueDate: "2024-03-15",
    createdAt: "2024-02-01",
    progress: 65,
    subtasks: [
      { id: "1", title: "Design mockups", completed: true, assignedTo: "2" },
      { id: "2", title: "Frontend development", completed: false, assignedTo: "2" },
      { id: "3", title: "Backend integration", completed: false, assignedTo: "2" },
    ],
  },
]

export const mockFiles: BoxFile[] = [
  {
    id: "1",
    name: "project-requirements.pdf",
    type: "application/pdf",
    size: 2048000,
    customerId: "1",
    taskId: "1",
    uploadedBy: "1",
    uploadedAt: "2024-02-05",
    url: "/files/project-requirements.pdf",
  },
  {
    id: "2",
    name: "design-mockups.zip",
    type: "application/zip",
    size: 15360000,
    customerId: "1",
    taskId: "1",
    uploadedBy: "2",
    uploadedAt: "2024-02-10",
    url: "/files/design-mockups.zip",
  },
  {
    id: "3",
    name: "contract-signed.pdf",
    type: "application/pdf",
    size: 1024000,
    customerId: "1",
    uploadedBy: "1",
    uploadedAt: "2024-01-20",
    url: "/files/contract-signed.pdf",
  },
  {
    id: "4",
    name: "logo-assets.png",
    type: "image/png",
    size: 512000,
    customerId: "2",
    uploadedBy: "3",
    uploadedAt: "2024-02-15",
    url: "/files/logo-assets.png",
  },
]

// Simple auth state management
let currentUser: User | null = null

export const login = (email: string, password: string): User | null => {
  const user = mockUsers.find((u) => u.email === email)
  if (user && password === "password") {
    currentUser = user
    return user
  }
  return null
}

export const logout = () => {
  currentUser = null
}

export const getCurrentUser = (): User | null => {
  return currentUser
}

export const mockNotifications = [
  {
    id: "1",
    type: "urgent",
    title: "Document Submission Required",
    message: "Please submit your ID documents to our physical branch by Friday",
    timestamp: "2 hours ago",
    read: false,
  },
  {
    id: "2",
    type: "payment",
    title: "Service Payment Due",
    message: "Payment of $250 required for Website Development service",
    timestamp: "1 day ago",
    read: false,
  },
  {
    id: "3",
    type: "task",
    title: "Project Update",
    message: "Your website redesign project is 65% complete",
    timestamp: "2 days ago",
    read: true,
  },
  {
    id: "4",
    type: "document",
    title: "New Document Available",
    message: "Design mockups have been uploaded to your Box File",
    timestamp: "3 days ago",
    read: true,
  },
  {
    id: "5",
    type: "payment",
    title: "Outstanding Balance",
    message: "You owe $150 after completion of Logo Design service",
    timestamp: "1 week ago",
    read: false,
  },
]
