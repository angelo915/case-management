"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageCircle, FileText, Send, Search, Download, Eye, Calendar, ArrowLeft, Bell, LogOut } from "lucide-react"
import { mockFiles } from "@/lib/auth"

interface CustomerPageProps {
  user?: any
  onLogout?: () => void
  onBack?: () => void
}

const CustomerPage = ({ user, onLogout, onBack }: CustomerPageProps) => {
  const [activeTab, setActiveTab] = useState("chat")
  const [chatMessage, setChatMessage] = useState("")
  const [searchTerm, setSearchTerm] = useState("")

  // Mock chat messages
  const [messages, setMessages] = useState([
    {
      id: "1",
      sender: "support",
      message: "Hello! How can I help you today?",
      timestamp: new Date(Date.now() - 3600000),
      avatar: "/placeholder.svg",
    },
    {
      id: "2",
      sender: "customer",
      message: "I need help with my recent service request.",
      timestamp: new Date(Date.now() - 3000000),
      avatar: user?.avatar || "/placeholder.svg",
    },
    {
      id: "3",
      sender: "support",
      message: "I'd be happy to help! Let me check your account details.",
      timestamp: new Date(Date.now() - 2400000),
      avatar: "/placeholder.svg",
    },
  ])

  // Get customer's files
  const customerFiles = mockFiles.filter((file) => file.customerId === user?.id)

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        sender: "customer",
        message: chatMessage.trim(),
        timestamp: new Date(),
        avatar: user?.avatar || "/placeholder.svg",
      }
      setMessages((prev) => [...prev, newMessage])
      setChatMessage("")

      // Simulate support response
      setTimeout(() => {
        const supportResponse = {
          id: (Date.now() + 1).toString(),
          sender: "support",
          message: "Thank you for your message. I'm looking into this for you.",
          timestamp: new Date(),
          avatar: "/placeholder.svg",
        }
        setMessages((prev) => [...prev, supportResponse])
      }, 2000)
    }
  }

  const filteredFiles = customerFiles.filter(
    (file) =>
      file.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      file.type.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i]
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={onBack} className="bg-transparent">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <h1 className="text-2xl font-bold text-card-foreground">Customer Portal</h1>
            <Badge variant="secondary">Customer</Badge>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" className="bg-transparent">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </Button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Welcome, {user?.name || "Customer"}</span>
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
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chat" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              Chat Support
            </TabsTrigger>
            <TabsTrigger value="boxfile" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              My Box File
            </TabsTrigger>
          </TabsList>

          <TabsContent value="chat" className="space-y-6">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Live Chat Support
                </CardTitle>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <ScrollArea className="flex-1 pr-4 mb-4">
                  <div className="space-y-4">
                    {messages.map((msg) => (
                      <div key={msg.id} className={`flex gap-3 ${msg.sender === "customer" ? "flex-row-reverse" : ""}`}>
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={msg.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{msg.sender === "customer" ? "C" : "S"}</AvatarFallback>
                        </Avatar>
                        <div className={`max-w-[70%] ${msg.sender === "customer" ? "text-right" : ""}`}>
                          <div
                            className={`p-3 rounded-lg ${
                              msg.sender === "customer" ? "bg-primary text-primary-foreground ml-auto" : "bg-muted"
                            }`}
                          >
                            <p className="text-sm">{msg.message}</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{msg.timestamp.toLocaleTimeString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
                <Separator className="mb-4" />
                <div className="flex gap-2">
                  <Input
                    placeholder="Type your message..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} size="sm">
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="boxfile" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    My Box File
                  </CardTitle>
                  <Badge variant="outline">{customerFiles.length} Files</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
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

                <div className="space-y-3">
                  {filteredFiles.map((file) => (
                    <div
                      key={file.id}
                      className="flex items-center gap-4 p-4 bg-muted rounded-lg hover:bg-muted/80 transition-colors"
                    >
                      <div className="flex-shrink-0">
                        <FileText className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-card-foreground truncate">{file.name}</h4>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <span>{file.type.toUpperCase()}</span>
                          <span>{formatFileSize(file.size)}</span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(file.uploadedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        <Button variant="outline" size="sm" className="bg-transparent">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                {filteredFiles.length === 0 && (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      {searchTerm ? "No files match your search." : "No files in your box file yet."}
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default CustomerPage
