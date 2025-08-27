"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Checkbox } from "@/components/ui/checkbox"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Edit, Calendar, User, Building, Plus, Trash2, CheckCircle2, Clock, AlertCircle } from "lucide-react"
import type { Task, SubTask } from "@/lib/auth"

interface TaskDetailsProps {
  task: Task
  onEdit: () => void
  onBack: () => void
  allowSubtaskCreation?: boolean
}

export function TaskDetails({ task, onEdit, onBack, allowSubtaskCreation = false }: TaskDetailsProps) {
  const [subtasks, setSubtasks] = useState<SubTask[]>(task.subtasks)
  const [newSubtaskTitle, setNewSubtaskTitle] = useState("")

  const handleSubtaskToggle = (subtaskId: string) => {
    setSubtasks((prev) => prev.map((st) => (st.id === subtaskId ? { ...st, completed: !st.completed } : st)))
  }

  const handleAddSubtask = () => {
    if (newSubtaskTitle.trim()) {
      const newSubtask: SubTask = {
        id: Date.now().toString(),
        title: newSubtaskTitle.trim(),
        completed: false,
        assignedTo: task.assignedTo,
      }
      setSubtasks((prev) => [...prev, newSubtask])
      setNewSubtaskTitle("")
    }
  }

  const handleDeleteSubtask = (subtaskId: string) => {
    setSubtasks((prev) => prev.filter((st) => st.id !== subtaskId))
  }

  const completedSubtasks = subtasks.filter((st) => st.completed).length
  const totalSubtasks = subtasks.length
  const calculatedProgress = totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0

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

  const daysUntilDue = getDaysUntilDue(task.dueDate)
  const isOverdue = daysUntilDue < 0
  const isDueSoon = daysUntilDue <= 3 && daysUntilDue >= 0

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={onBack} className="flex items-center gap-2 bg-transparent">
            <ArrowLeft className="h-4 w-4" />
            Back to Tasks
          </Button>
          <h2 className="text-2xl font-bold text-card-foreground">Task Details</h2>
        </div>
        <Button onClick={onEdit} className="flex items-center gap-2">
          <Edit className="h-4 w-4" />
          Edit Task
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Task Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl">{task.title}</CardTitle>
                <div className="flex items-center gap-2">
                  <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                  <Badge variant="outline" className={getPriorityColor(task.priority)}>
                    {task.priority}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{task.description}</p>

              <Separator />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Due Date</p>
                    <p className="text-sm text-muted-foreground">{new Date(task.dueDate).toLocaleDateString()}</p>
                    {isOverdue && (
                      <p className="text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        {Math.abs(daysUntilDue)} days overdue
                      </p>
                    )}
                    {isDueSoon && (
                      <p className="text-sm text-orange-600 flex items-center gap-1">
                        <AlertCircle className="h-4 w-4" />
                        Due in {daysUntilDue} days
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Assigned To</p>
                    <p className="text-sm text-muted-foreground">Employee {task.assignedTo}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Building className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Customer</p>
                    <p className="text-sm text-muted-foreground">Customer {task.customerId}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Created</p>
                    <p className="text-sm text-muted-foreground">{new Date(task.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Subtasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Subtasks ({completedSubtasks}/{totalSubtasks})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {allowSubtaskCreation && (
                <div className="flex gap-2">
                  <Input
                    placeholder="Add new subtask..."
                    value={newSubtaskTitle}
                    onChange={(e) => setNewSubtaskTitle(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleAddSubtask()}
                  />
                  <Button onClick={handleAddSubtask} size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              )}

              <div className="space-y-3">
                {subtasks.map((subtask) => (
                  <div key={subtask.id} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <Checkbox checked={subtask.completed} onCheckedChange={() => handleSubtaskToggle(subtask.id)} />
                    <span className={`flex-1 ${subtask.completed ? "line-through text-muted-foreground" : ""}`}>
                      {subtask.title}
                    </span>
                    <span className="text-xs text-muted-foreground">Employee {subtask.assignedTo}</span>
                    {allowSubtaskCreation && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteSubtask(subtask.id)}
                        className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {subtasks.length === 0 && (
                <p className="text-center text-muted-foreground py-4">
                  {allowSubtaskCreation
                    ? "No subtasks yet. Add one above to get started."
                    : "No subtasks assigned to this task."}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Progress & Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Progress Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary mb-2">{calculatedProgress}%</div>
                <Progress value={calculatedProgress} className="h-3" />
              </div>

              <Separator />

              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span>Total Subtasks:</span>
                  <span className="font-medium">{totalSubtasks}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Completed:</span>
                  <span className="font-medium text-secondary">{completedSubtasks}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Remaining:</span>
                  <span className="font-medium">{totalSubtasks - completedSubtasks}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Task Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Task Created</p>
                    <p className="text-xs text-muted-foreground">{new Date(task.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                {task.status === "in-progress" && (
                  <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">In Progress</p>
                      <p className="text-xs text-muted-foreground">Currently active</p>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-3 p-3 bg-muted rounded-lg opacity-50">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Due Date</p>
                    <p className="text-xs text-muted-foreground">{new Date(task.dueDate).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
