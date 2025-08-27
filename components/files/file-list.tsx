"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Download, Eye, Trash2, Filter, Calendar, User, FileText } from "lucide-react"
import { formatFileSize, getFileIcon, mockBoxFiles } from "@/lib/file-utils"
import type { BoxFile } from "@/lib/auth"

interface FileListProps {
  customerId?: string
  taskId?: string
  showCustomerInfo?: boolean
  onViewFile: (file: BoxFile) => void
  onDeleteFile: (fileId: string) => void
}

export function FileList({ customerId, taskId, showCustomerInfo = true, onViewFile, onDeleteFile }: FileListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [files] = useState<BoxFile[]>(mockBoxFiles)

  const filteredFiles = files.filter((file) => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCustomer = !customerId || file.customerId === customerId
    const matchesTask = !taskId || file.taskId === taskId
    return matchesSearch && matchesCustomer && matchesTask
  })

  const handleDownload = (file: BoxFile) => {
    // In a real app, this would trigger file download
    console.log("[v0] Downloading file:", file.name)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-card-foreground">Document Storage</h3>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="bg-transparent">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {filteredFiles.map((file) => (
          <Card key={file.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="text-2xl">{getFileIcon(file.type)}</div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-card-foreground truncate">{file.name}</h4>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <FileText className="h-3 w-3" />
                        {formatFileSize(file.size)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(file.uploadedAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        Uploaded by User {file.uploadedBy}
                      </span>
                    </div>
                    {showCustomerInfo && (
                      <div className="mt-2">
                        <Badge variant="outline" className="text-xs">
                          Customer {file.customerId}
                        </Badge>
                        {file.taskId && (
                          <Badge variant="outline" className="text-xs ml-2">
                            Task {file.taskId}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => onViewFile(file)} className="bg-transparent">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => handleDownload(file)} className="bg-transparent">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDeleteFile(file.id)}
                    className="bg-transparent text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredFiles.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <FileText className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground">
              {searchTerm ? "No files found matching your search." : "No files uploaded yet."}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
