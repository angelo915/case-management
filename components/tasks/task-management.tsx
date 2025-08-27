"use client"

import { useState } from "react"
import { TaskList } from "./task-list"
import { TaskForm } from "./task-form"
import { TaskDetails } from "./task-details"
import type { Task } from "@/lib/auth"

type ViewMode = "list" | "add" | "edit" | "view"

interface TaskManagementProps {
  showCustomerInfo?: boolean
  allowSubtaskCreation?: boolean
}

export function TaskManagement({ showCustomerInfo = true, allowSubtaskCreation = false }: TaskManagementProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("list")
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)

  const handleViewTask = (task: Task) => {
    setSelectedTask(task)
    setViewMode("view")
  }

  const handleEditTask = (task: Task) => {
    setSelectedTask(task)
    setViewMode("edit")
  }

  const handleAddTask = () => {
    setSelectedTask(null)
    setViewMode("add")
  }

  const handleSaveTask = (taskData: Partial<Task>) => {
    console.log("[v0] Saving task:", taskData)
    setViewMode("list")
  }

  const handleCancel = () => {
    setSelectedTask(null)
    setViewMode("list")
  }

  const handleBackToList = () => {
    setSelectedTask(null)
    setViewMode("list")
  }

  switch (viewMode) {
    case "add":
      return <TaskForm onSave={handleSaveTask} onCancel={handleCancel} />
    case "edit":
      return <TaskForm task={selectedTask!} onSave={handleSaveTask} onCancel={handleCancel} />
    case "view":
      return (
        <TaskDetails
          task={selectedTask!}
          onEdit={() => handleEditTask(selectedTask!)}
          onBack={handleBackToList}
          allowSubtaskCreation={allowSubtaskCreation}
        />
      )
    default:
      return (
        <TaskList
          onViewTask={handleViewTask}
          onEditTask={handleEditTask}
          onAddTask={handleAddTask}
          showCustomerInfo={showCustomerInfo}
        />
      )
  }
}
