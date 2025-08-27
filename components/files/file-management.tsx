"use client"

import { useState } from "react"
import { FileUpload } from "./file-upload"
import { FileList } from "./file-list"
import { FileViewer } from "./file-viewer"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"
import type { BoxFile } from "@/lib/auth"

type ViewMode = "list" | "upload" | "view"

interface FileManagementProps {
  customerId?: string
  taskId?: string
  showCustomerInfo?: boolean
}

export function FileManagement({ customerId, taskId, showCustomerInfo = true }: FileManagementProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("list")
  const [selectedFile, setSelectedFile] = useState<BoxFile | null>(null)

  const handleViewFile = (file: BoxFile) => {
    setSelectedFile(file)
    setViewMode("view")
  }

  const handleDeleteFile = (fileId: string) => {
    console.log("[v0] Deleting file:", fileId)
    // In a real app, this would delete from the database
  }

  const handleUploadComplete = (files: File[]) => {
    console.log("[v0] Upload completed:", files)
    setViewMode("list")
  }

  const handleBackToList = () => {
    setSelectedFile(null)
    setViewMode("list")
  }

  switch (viewMode) {
    case "upload":
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-card-foreground">Upload Files</h2>
            <Button variant="outline" onClick={() => setViewMode("list")} className="bg-transparent">
              Back to Files
            </Button>
          </div>
          <FileUpload customerId={customerId} taskId={taskId} onUploadComplete={handleUploadComplete} />
        </div>
      )
    case "view":
      return (
        <FileViewer
          file={selectedFile!}
          onBack={handleBackToList}
          onDelete={() => {
            handleDeleteFile(selectedFile!.id)
            handleBackToList()
          }}
        />
      )
    default:
      return (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-card-foreground">File Management</h2>
            <Button onClick={() => setViewMode("upload")} className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload Files
            </Button>
          </div>
          <FileList
            customerId={customerId}
            taskId={taskId}
            showCustomerInfo={showCustomerInfo}
            onViewFile={handleViewFile}
            onDeleteFile={handleDeleteFile}
          />
        </div>
      )
  }
}
