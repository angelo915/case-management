"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  CheckCircle2,
  DollarSign,
  FileText,
  LogOut,
  Bell,
  Calendar,
  Building,
  CreditCard,
  MessageSquare,
  Send,
  Search,
  Download,
  Eye,
  Folder,
  ExternalLink,
} from "lucide-react"
import { mockTasks, mockCustomers, mockFiles, type User } from "@/lib/auth"
import { mockServiceAssignments } from "@/lib/services"
import Link from "next/link"

interface CustomerDashboardProps {
  user: User
  onLogout: () => void
}

const mockNotifications = [
  {
    id: 1,
    type: "task",
    title: "Document Submission Required",
    message: "Please submit your ID documents to our physical branch by Friday",
    date: new Date("2024-01-15"),
    urgent: true,
  },
  {
    id: 2,
    type: "payment",
    title: "Service Payment Due",
    message: "Payment of $250 required for Website Development service",
    date: new Date("2024-01-14"),
    urgent: false,
  },
  {
    id: 3,
    type: "balance",
    title: "Outstanding Balance",
    message: "You owe $150 after completion of Logo Design service",
    date: new Date("2024-01-13"),
    urgent: false,
  },
]

const mockChatMessages = [
  { id: 1, sender: "support", message: "Hello! How can I help you today?", timestamp: new Date("2024-01-15T10:00:00") },
  {
    id: 2,
    sender: "customer",
    message: "I have a question about my project status",
    timestamp: new Date("2024-01-15T10:05:00"),
  },
  {
    id: 3,
    sender: "support",
    message: "I'd be happy to help! Which project are you referring to?",
    timestamp: new Date("2024-01-15T10:06:00"),
  },
]

export function CustomerDashboard({ user, onLogout }: CustomerDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [showNotifications, setShowNotifications] = useState(false)
  const [chatMessage, setChatMessage] = useState("")
  const [chatMessages, setChatMessages] = useState(mockChatMessages)
  const [searchTerm, setSearchTerm] = useState("")

  // Find customer data (in real app, this would be based on user.customerId)
  const customer = mockCustomers[0] // Mock: assume first customer
  const customerTasks = mockTasks.filter((task) => task.customerId === customer.id)
  const customerServices = mockServiceAssignments.filter((service) => service.customerId === customer.id)
  const customerFiles = mockFiles.filter((file) => file.customerId === customer.id)

  const activeTasks = customerTasks.filter((task) => task.status === "in-progress")
  const completedTasks = customerTasks.filter((task) => task.status === "completed")
  const pendingTasks = customerTasks.filter((task) => task.status === "pending")

  const urgentNotifications = mockNotifications.filter((n) => n.urgent).length

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      setChatMessages([
        ...chatMessages,
        {
          id: chatMessages.length + 1,
          sender: "customer",
          message: chatMessage,
          timestamp: new Date(),
        },
      ])
      setChatMessage("")
      // Simulate support response
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            sender: "support",
            message: "Thank you for your message. We'll get back to you shortly!",
            timestamp: new Date(),
          },
        ])
      }, 2000)
    }
  }

  const filteredFiles = customerFiles.filter(
    (file) =>
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-card-foreground">Customer Portal</h1>
            <Badge variant="outline">Customer</Badge>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/customer/notifications">
              <Button variant="outline" size="sm" className="bg-transparent">
                <Bell className="h-4 w-4 mr-2" />
                Notifications
              </Button>
            </Link>

            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Welcome, {customer.name}</span>
              <Button variant="outline" size="sm" onClick={onLogout} className="bg-transparent">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="services">My Services</TabsTrigger>
            <TabsTrigger value="tasks">Project Status</TabsTrigger>
            <TabsTrigger value="files">Box Files</TabsTrigger>
            <TabsTrigger value="chat">Chat Support</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Account Summary */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Services</CardTitle>
                  <Building className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{customerServices.length}</div>
                  <p className="text-xs text-muted-foreground">Currently subscribed</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-secondary">{activeTasks.length}</div>
                  <p className="text-xs text-muted-foreground">In progress</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Prepayment Balance</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-secondary">${customer.prepaymentBalance.toFixed(2)}</div>
                  <p className="text-xs text-muted-foreground">Available credit</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Box Files</CardTitle>
                  <Folder className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">{customerFiles.length}</div>
                  <p className="text-xs text-muted-foreground">Total documents</p>
                </CardContent>
              </Card>
            </div>

            {/* Current Projects & Account Info */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Projects</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {activeTasks.length > 0 ? (
                    activeTasks.map((task) => (
                      <div key={task.id} className="p-4 bg-muted rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{task.title}</h4>
                          <Badge className="bg-primary text-primary-foreground">{task.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{task.progress}%</span>
                          </div>
                          <Progress value={task.progress} className="h-2" />
                        </div>
                        <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            Due: {new Date(task.dueDate).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="h-3 w-3" />
                            {task.subtasks.filter((st) => st.completed).length}/{task.subtasks.length} subtasks
                          </span>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-center text-muted-foreground py-8">No active projects</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Customer Since</p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(customer.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Account Status</p>
                      <Badge variant={customer.status === "active" ? "default" : "secondary"}>{customer.status}</Badge>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium">Contact Information</p>
                    <p className="text-sm text-muted-foreground">{customer.email}</p>
                    <p className="text-sm text-muted-foreground">{customer.phone}</p>
                  </div>

                  <div>
                    <p className="text-sm font-medium">Billing Address</p>
                    <p className="text-sm text-muted-foreground">{customer.address}</p>
                  </div>

                  <div className="pt-4">
                    <Button className="w-full">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Add Prepayment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <Button className="h-16 flex flex-col gap-1" onClick={() => setActiveTab("tasks")}>
                    <CheckCircle2 className="h-5 w-5" />
                    <span className="text-sm">View Projects</span>
                  </Button>
                  <Link href="/customer/chat" className="w-full">
                    <Button variant="outline" className="h-16 flex flex-col gap-1 bg-transparent w-full">
                      <MessageSquare className="h-5 w-5" />
                      <span className="text-sm">Chat Support</span>
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </Link>
                  <Link href="/customer/box-file" className="w-full">
                    <Button variant="outline" className="h-16 flex flex-col gap-1 bg-transparent w-full">
                      <FileText className="h-5 w-5" />
                      <span className="text-sm">My Box File</span>
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </Link>
                  <Link href="/customer/notifications" className="w-full">
                    <Button variant="outline" className="h-16 flex flex-col gap-1 bg-transparent w-full">
                      <Bell className="h-5 w-5" />
                      <span className="text-sm">Notifications</span>
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="services">
            <Card>
              <CardHeader>
                <CardTitle>My Services</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {customerServices.map((service) => (
                  <div key={service.id} className="p-4 bg-muted rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium">Service {service.serviceId}</h4>
                      <Badge variant={service.status === "active" ? "default" : "secondary"}>{service.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{service.notes}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>Assigned: {new Date(service.assignedDate).toLocaleDateString()}</span>
                      {service.customPrice && <span>Price: ${service.customPrice.toFixed(2)}</span>}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="tasks">
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Pending</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-orange-600 mb-2">{pendingTasks.length}</div>
                    <p className="text-sm text-muted-foreground">Projects waiting to start</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">In Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-primary mb-2">{activeTasks.length}</div>
                    <p className="text-sm text-muted-foreground">Currently active projects</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Completed</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-secondary mb-2">{completedTasks.length}</div>
                    <p className="text-sm text-muted-foreground">Successfully finished</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>All Projects</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {customerTasks.map((task) => (
                    <div key={task.id} className="p-4 bg-muted rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{task.title}</h4>
                        <Badge
                          variant={
                            task.status === "completed"
                              ? "default"
                              : task.status === "in-progress"
                                ? "secondary"
                                : "outline"
                          }
                        >
                          {task.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{task.progress}%</span>
                        </div>
                        <Progress value={task.progress} className="h-2" />
                      </div>
                      <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Due: {new Date(task.dueDate).toLocaleDateString()}
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle2 className="h-3 w-3" />
                          {task.subtasks.filter((st) => st.completed).length}/{task.subtasks.length} subtasks
                        </span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="files">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Folder className="h-5 w-5" />
                  My Box Files
                </CardTitle>
                <div className="flex items-center gap-2 mt-4">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search files..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredFiles.length > 0 ? (
                    filteredFiles.map((file) => (
                      <div key={file.id} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                        <div className="flex items-center gap-3">
                          <FileText className="h-8 w-8 text-primary" />
                          <div>
                            <p className="font-medium">{file.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {file.type} • {(file.size / 1024 / 1024).toFixed(2)} MB
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Uploaded: {new Date(file.uploadDate).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <Folder className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">
                        {searchTerm ? "No files found matching your search" : "No files uploaded yet"}
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="chat">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Chat Support
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ScrollArea className="flex-1 pr-4 mb-4">
                  <div className="space-y-4">
                    {chatMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === "customer" ? "justify-end" : "justify-start"}`}
                      >
                        <div className="flex items-start gap-2 max-w-[70%]">
                          {message.sender === "support" && (
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>S</AvatarFallback>
                            </Avatar>
                          )}
                          <div
                            className={`p-3 rounded-lg ${
                              message.sender === "customer" ? "bg-primary text-primary-foreground" : "bg-muted"
                            }`}
                          >
                            <p className="text-sm">{message.message}</p>
                            <p className="text-xs opacity-70 mt-1">{message.timestamp.toLocaleTimeString()}</p>
                          </div>
                          {message.sender === "customer" && (
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>C</AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
