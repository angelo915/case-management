"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Search, UserPlus, MoreVertical, Star, TrendingUp, Clock, CheckCircle2, AlertTriangle } from "lucide-react"
import { mockUsers, mockTasks } from "@/lib/auth"

export function EmployeeManagement() {
  const [searchTerm, setSearchTerm] = useState("")

  // Get employee users only
  const employees = mockUsers.filter((user) => user.role === "employee")

  // Calculate employee statistics
  const getEmployeeStats = (employeeId: string) => {
    const assignedTasks = mockTasks.filter((task) => task.assignedTo === employeeId)
    const completedTasks = assignedTasks.filter((task) => task.status === "completed")
    const inProgressTasks = assignedTasks.filter((task) => task.status === "in-progress")
    const overdueTasks = assignedTasks.filter(
      (task) => task.status !== "completed" && new Date(task.dueDate) < new Date(),
    )

    // Calculate average rating from completed tasks
    const ratingsSum = completedTasks.reduce((sum, task) => sum + (task.customerRating || 0), 0)
    const averageRating = completedTasks.length > 0 ? ratingsSum / completedTasks.length : 0

    return {
      totalTasks: assignedTasks.length,
      completedTasks: completedTasks.length,
      inProgressTasks: inProgressTasks.length,
      overdueTasks: overdueTasks.length,
      averageRating,
      completionRate: assignedTasks.length > 0 ? (completedTasks.length / assignedTasks.length) * 100 : 0,
    }
  }

  const filteredEmployees = employees.filter(
    (employee) =>
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-card-foreground">Employee Management</h2>
          <p className="text-muted-foreground">Manage team members and track performance</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Employee
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Full Name" />
              <Input placeholder="Email Address" type="email" />
              <Input placeholder="Phone Number" />
              <Input placeholder="Department" />
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Add Employee</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search employees..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Badge variant="outline" className="text-sm">
          {filteredEmployees.length} Employees
        </Badge>
      </div>

      {/* Employee Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEmployees.map((employee) => {
          const stats = getEmployeeStats(employee.id)
          return (
            <Card key={employee.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={employee.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {employee.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg">{employee.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{employee.email}</p>
                    </div>
                  </div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View Profile</DropdownMenuItem>
                      <DropdownMenuItem>Edit Details</DropdownMenuItem>
                      <DropdownMenuItem>View Tasks</DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">Deactivate</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Performance Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      <span className="text-lg font-bold">{stats.averageRating.toFixed(1)}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Avg Rating</p>
                  </div>
                  <div className="text-center p-3 bg-muted rounded-lg">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <TrendingUp className="h-4 w-4 text-secondary" />
                      <span className="text-lg font-bold">{stats.completionRate.toFixed(0)}%</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Completion</p>
                  </div>
                </div>

                {/* Task Statistics */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-secondary" />
                      <span>Completed</span>
                    </div>
                    <Badge variant="secondary">{stats.completedTasks}</Badge>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-primary" />
                      <span>In Progress</span>
                    </div>
                    <Badge variant="outline">{stats.inProgressTasks}</Badge>
                  </div>
                  {stats.overdueTasks > 0 && (
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-600" />
                        <span>Overdue</span>
                      </div>
                      <Badge variant="destructive">{stats.overdueTasks}</Badge>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    View Tasks
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                    Assign Task
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
