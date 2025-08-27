"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Plus, Eye, Edit, Calendar, User, AlertCircle, CheckCircle2 } from "lucide-react"
import { mockTasks, type Task } from "@/lib/auth"

interface TaskListProps {
  onViewTask: (task: Task) => void
  onEditTask: (task: Task) => void
  onAddTask: () => void
  showCustomerInfo?: boolean
}

export function TaskList({ onViewTask, onEditTask, onAddTask, showCustomerInfo = true }: TaskListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [priorityFilter, setPriorityFilter] = useState<string>("all")
  const [tasks] = useState<Task[]>(mockTasks)

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || task.status === statusFilter
    const matchesPriority = priorityFilter === "all" || task.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  const getStatusColor = (status: Task["status"]) => {
    switch (status) {
      case "completed":
        return "bg-secondary text-secondary-foreground"
      case "in-progress":
        return "bg-primary text-primary-foreground"
      case "pending":
        return "bg-yellow-500 text-white"
      case "cancelled":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  const getPriorityColor = (priority: Task["priority"]) => {
    switch (priority) {
      case "high":
        return "text-red-600 border-red-600"
      case "medium":
        return "text-orange-600 border-orange-600"
      case "low":
        return "text-green-600 border-green-600"
      default:
        return "text-muted-foreground border-muted-foreground"
    }
  }

  const getDaysUntilDue = (dueDate: string): number => {
    const today = new Date()
    const due = new Date(dueDate)
    const diffTime = due.getTime() - today.getTime()
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-card-foreground">Task Management</h2>
        <Button onClick={onAddTask} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Task
        </Button>
      </div>

      <div className="flex items-center gap-4 flex-wrap">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in-progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Priority" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Priority</SelectItem>
            <SelectItem value="high">High</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="low">Low</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {filteredTasks.map((task) => {
          const daysUntilDue = getDaysUntilDue(task.dueDate)
          const isOverdue = daysUntilDue < 0
          const isDueSoon = daysUntilDue <= 3 && daysUntilDue >= 0

          return (
            <Card key={task.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold text-card-foreground">{task.title}</h3>
                      <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                      <Badge variant="outline" className={getPriorityColor(task.priority)}>
                        {task.priority}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onViewTask(task)}
                      className="flex items-center gap-1 bg-transparent"
                    >
                      <Eye className="h-4 w-4" />
                      View
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEditTask(task)}
                      className="flex items-center gap-1 bg-transparent"
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </Button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs font-medium">Due Date</p>
                      <p className="text-sm text-muted-foreground">{new Date(task.dueDate).toLocaleDateString()}</p>
                      {isOverdue && (
                        <p className="text-xs text-red-600 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          {Math.abs(daysUntilDue)} days overdue
                        </p>
                      )}
                      {isDueSoon && (
                        <p className="text-xs text-orange-600 flex items-center gap-1">
                          <AlertCircle className="h-3 w-3" />
                          Due in {daysUntilDue} days
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs font-medium">Assigned To</p>
                      <p className="text-sm text-muted-foreground">Employee {task.assignedTo}</p>
                    </div>
                  </div>
                  {showCustomerInfo && (
                    <div>
                      <p className="text-xs font-medium">Customer</p>
                      <p className="text-sm text-muted-foreground">Customer {task.customerId}</p>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs font-medium">Subtasks</p>
                      <p className="text-sm text-muted-foreground">
                        {task.subtasks.filter((st) => st.completed).length} / {task.subtasks.length} completed
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{task.progress}%</span>
                  </div>
                  <Progress value={task.progress} className="h-2" />
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredTasks.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No tasks found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
