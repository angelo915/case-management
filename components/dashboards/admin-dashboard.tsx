"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CustomerManagement } from "@/components/customers/customer-management"
import { ServiceManagement } from "@/components/services/service-management"
import { TaskManagement } from "@/components/tasks/task-management"
import { AnalyticsCharts } from "@/components/reports/analytics-charts"
import { SalesReport } from "@/components/reports/sales-report"
import { PerformanceReport } from "@/components/reports/performance-report"
import { BoxFileManagement } from "@/components/files/box-file-management"
import { EmployeeManagement } from "@/components/employees/employee-management"
import {
  Users,
  Building,
  CheckCircle2,
  FileText,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  LogOut,
  Settings,
  Bell,
} from "lucide-react"
import type { User } from "@/lib/auth"

interface AdminDashboardProps {
  user: User
  onLogout: () => void
}

export function AdminDashboard({ user, onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")

  // Mock analytics data
  const stats = {
    totalCustomers: 25,
    activeServices: 12,
    pendingTasks: 8,
    totalFiles: 156,
    monthlyRevenue: 45000,
    growthRate: 12.5,
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold text-card-foreground">Admin Dashboard</h1>
            <Badge variant="secondary">Administrator</Badge>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="bg-transparent">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <Button variant="outline" size="sm" className="bg-transparent">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Welcome, {user.name}</span>
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
          <TabsList className="grid w-full grid-cols-9">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="boxfiles">Box Files</TabsTrigger>
            <TabsTrigger value="employees">Employees</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="sales">Sales</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{stats.totalCustomers}</div>
                  <p className="text-xs text-muted-foreground">+2 from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Services</CardTitle>
                  <Building className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-secondary">{stats.activeServices}</div>
                  <p className="text-xs text-muted-foreground">Across all customers</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pending Tasks</CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-orange-600">{stats.pendingTasks}</div>
                  <p className="text-xs text-muted-foreground">Require attention</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Files</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{stats.totalFiles}</div>
                  <p className="text-xs text-muted-foreground">Documents stored</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-secondary">${stats.monthlyRevenue.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">+{stats.growthRate}% from last month</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Growth Rate</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-secondary">+{stats.growthRate}%</div>
                  <p className="text-xs text-muted-foreground">Month over month</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity & Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New customer registered</p>
                      <p className="text-xs text-muted-foreground">Tech Solutions Inc - 2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Task completed</p>
                      <p className="text-xs text-muted-foreground">Website Redesign Project - 4 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Payment received</p>
                      <p className="text-xs text-muted-foreground">$2,500 from Acme Corporation - 1 day ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-600" />
                    Alerts & Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-4 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-orange-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">License expiring soon</p>
                      <p className="text-xs text-muted-foreground">Software license expires in 15 days</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Overdue task</p>
                      <p className="text-xs text-muted-foreground">Website maintenance task is 3 days overdue</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <AlertTriangle className="h-4 w-4 text-yellow-600" />
                    <div className="flex-1">
                      <p className="text-sm font-medium">Low prepayment balance</p>
                      <p className="text-xs text-muted-foreground">Customer balance below $500</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="customers">
            <CustomerManagement />
          </TabsContent>

          <TabsContent value="services">
            <ServiceManagement />
          </TabsContent>

          <TabsContent value="tasks">
            <TaskManagement showCustomerInfo={true} allowSubtaskCreation={true} />
          </TabsContent>

          <TabsContent value="boxfiles">
            <BoxFileManagement />
          </TabsContent>

          <TabsContent value="employees">
            <EmployeeManagement />
          </TabsContent>

          <TabsContent value="analytics">
            <AnalyticsCharts />
          </TabsContent>

          <TabsContent value="sales">
            <SalesReport />
          </TabsContent>

          <TabsContent value="performance">
            <PerformanceReport />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
