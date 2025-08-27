export const getFileIcon = (fileType: string) => {
  const type = fileType.toLowerCase()
  if (type.includes("pdf")) return "📄"
  if (type.includes("image")) return "🖼️"
  if (type.includes("word") || type.includes("doc")) return "📝"
  if (type.includes("excel") || type.includes("sheet")) return "📊"
  if (type.includes("zip") || type.includes("rar")) return "🗜️"
  return "📁"
}

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes"
  const k = 1024
  const sizes = ["Bytes", "KB", "MB", "GB"]
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
}

export const isImageFile = (fileType: string): boolean => {
  return fileType.toLowerCase().includes("image")
}

// Mock file data
export const mockBoxFiles = [
  {
    id: "1",
    name: "project-requirements.pdf",
    type: "application/pdf",
    size: 2048576,
    customerId: "1",
    taskId: "1",
    uploadedBy: "2",
    uploadedAt: "2024-02-15T10:30:00Z",
    url: "/pdf-icon.png",
  },
  {
    id: "2",
    name: "design-mockups.zip",
    type: "application/zip",
    size: 15728640,
    customerId: "1",
    taskId: "1",
    uploadedBy: "2",
    uploadedAt: "2024-02-20T14:15:00Z",
    url: "/zip-archive-icon.png",
  },
  {
    id: "3",
    name: "contract-signed.pdf",
    type: "application/pdf",
    size: 1024000,
    customerId: "2",
    uploadedBy: "1",
    uploadedAt: "2024-02-25T09:45:00Z",
    url: "/signed-contract.png",
  },
]
