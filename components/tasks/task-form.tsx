"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockCustomers, mockServices, mockUsers, type Task } from "@/lib/auth"
import { Plus, X } from "lucide-react"

interface TaskFormProps {
  task?: Task
  onSave: (task: Partial<Task>) => void
  onCancel: () => void
}

export function TaskForm({ task, onSave, onCancel }: TaskFormProps) {
  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    customerId: task?.customerId || "",
    serviceId: task?.serviceId || "",
    assignedTo: task?.assignedTo || "",
    status: task?.status || "pending",
    priority: task?.priority || "medium",
    dueDate: task?.dueDate || "",
  })

  const [subtasks, setSubtasks] = useState(task?.subtasks || [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...formData,
      id: task?.id || Date.now().toString(),
      createdAt: task?.createdAt || new Date().toISOString().split("T")[0],
      subtasks: subtasks, // Include subtasks in the saved task
      progress: task?.progress || 0,
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addSubtask = () => {
    const newSubtask = {
      id: Date.now().toString(),
      title: "",
      description: "",
      completed: false,
      requiresProof: false,
      additionalCost: 0,
      costComment: "",
    }
    setSubtasks([...subtasks, newSubtask])
  }

  const removeSubtask = (index: number) => {
    setSubtasks(subtasks.filter((_, i) => i !== index))
  }

  const updateSubtask = (index: number, field: string, value: any) => {
    const updatedSubtasks = subtasks.map((subtask, i) => (i === index ? { ...subtask, [field]: value } : subtask))
    setSubtasks(updatedSubtasks)
  }

  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>{task ? "Edit Task" : "Create New Task"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Task Title *</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              placeholder="Enter task title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange("description", e.target.value)}
              placeholder="Enter task description"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customerId">Customer *</Label>
              <Select value={formData.customerId} onValueChange={(value) => handleInputChange("customerId", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select customer" />
                </SelectTrigger>
                <SelectContent>
                  {mockCustomers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="serviceId">Service</Label>
              <Select value={formData.serviceId} onValueChange={(value) => handleInputChange("serviceId", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select service" />
                </SelectTrigger>
                <SelectContent>
                  {mockServices.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="assignedTo">Assigned To *</Label>
              <Select value={formData.assignedTo} onValueChange={(value) => handleInputChange("assignedTo", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  {mockUsers
                    .filter((user) => user.role === "employee" || user.role === "admin")
                    .map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <Select value={formData.priority} onValueChange={(value) => handleInputChange("priority", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate">Due Date *</Label>
            <Input
              id="dueDate"
              type="date"
              value={formData.dueDate}
              onChange={(e) => handleInputChange("dueDate", e.target.value)}
              required
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-base font-medium">Subtasks</Label>
              <Button type="button" onClick={addSubtask} variant="outline" size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Subtask
              </Button>
            </div>

            {subtasks.length > 0 && (
              <div className="space-y-3">
                {subtasks.map((subtask, index) => (
                  <Card key={subtask.id} className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="flex-1 space-y-2">
                          <Input
                            placeholder="Subtask title"
                            value={subtask.title}
                            onChange={(e) => updateSubtask(index, "title", e.target.value)}
                          />
                          <Textarea
                            placeholder="Subtask description"
                            value={subtask.description}
                            onChange={(e) => updateSubtask(index, "description", e.target.value)}
                            rows={2}
                          />
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => removeSubtask(index)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 text-sm">
                          <input
                            type="checkbox"
                            checked={subtask.requiresProof}
                            onChange={(e) => updateSubtask(index, "requiresProof", e.target.checked)}
                            className="rounded"
                          />
                          Requires Proof of Work
                        </label>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center gap-4 pt-4">
            <Button type="submit" className="flex-1">
              {task ? "Update Task" : "Create Task"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
