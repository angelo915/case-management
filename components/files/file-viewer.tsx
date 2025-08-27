"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Download, Share, Trash2, Calendar, User, FileText, Eye } from "lucide-react"
import { formatFileSize, getFileIcon, isImageFile } from "@/lib/file-utils"
import type { BoxFile } from "@/lib/auth"

interface FileViewerProps {
  file: BoxFile
  onBack: () => void
  onDelete: () => void
}

export function FileViewer({ file, onBack, onDelete }: FileViewerProps) {
  const handleDownload = () => {
    console.log("[v0] Downloading file:", file.name)
  }

  const handleShare = () => {
    console.log("[v0] Sharing file:", file.name)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={onBack} className="flex items-center gap-2 bg-transparent">
            <ArrowLeft className="h-4 w-4" />
            Back to Files
          </Button>
          <h2 className="text-2xl font-bold text-card-foreground">File Details</h2>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={handleShare} className="bg-transparent">
            <Share className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button variant="outline" onClick={handleDownload} className="bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
          <Button
            variant="outline"
            onClick={onDelete}
            className="bg-transparent text-destructive hover:text-destructive"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* File Preview */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <span className="text-2xl">{getFileIcon(file.type)}</span>
                {file.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {isImageFile(file.type) ? (
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <img
                    src={file.url || "/placeholder.svg"}
                    alt={file.name}
                    className="max-w-full max-h-full object-contain rounded-lg"
                  />
                </div>
              ) : (
                <div className="aspect-video bg-muted rounded-lg flex flex-col items-center justify-center">
                  <div className="text-6xl mb-4">{getFileIcon(file.type)}</div>
                  <p className="text-muted-foreground text-center">Preview not available for this file type</p>
                  <Button variant="outline" onClick={handleDownload} className="mt-4 bg-transparent">
                    <Eye className="h-4 w-4 mr-2" />
                    Open File
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* File Information */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>File Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">File Size</p>
                    <p className="text-sm text-muted-foreground">{formatFileSize(file.size)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Upload Date</p>
                    <p className="text-sm text-muted-foreground">{new Date(file.uploadedAt).toLocaleDateString()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm font-medium">Uploaded By</p>
                    <p className="text-sm text-muted-foreground">User {file.uploadedBy}</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <p className="text-sm font-medium">Associated With</p>
                <div className="space-y-2">
                  <Badge variant="outline">Customer {file.customerId}</Badge>
                  {file.taskId && (
                    <Badge variant="outline" className="ml-2">
                      Task {file.taskId}
                    </Badge>
                  )}
                </div>
              </div>

              <Separator />

              <div>
                <p className="text-sm font-medium mb-2">File Type</p>
                <Badge variant="secondary">{file.type}</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
