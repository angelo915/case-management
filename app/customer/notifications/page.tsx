"use client"

import { useState } from "react"
import { Bell, AlertTriangle, DollarSign, FileText, CheckCircle, Clock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockNotifications } from "@/lib/auth"

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(mockNotifications)

  const markAsRead = (id: string) => {
    setNotifications((prev) => prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif)))
  }

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const getIcon = (type: string) => {
    switch (type) {
      case "urgent":
        return <AlertTriangle className="h-5 w-5 text-red-500" />
      case "payment":
        return <DollarSign className="h-5 w-5 text-yellow-500" />
      case "document":
        return <FileText className="h-5 w-5 text-blue-500" />
      case "task":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <Bell className="h-5 w-5 text-gray-500" />
    }
  }

  const urgentNotifications = notifications.filter((n) => n.type === "urgent" && !n.read)
  const unreadCount = notifications.filter((n) => !n.read).length

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Bell className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
              <p className="text-gray-600">Stay updated with your account activity</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="secondary" className="text-sm">
              {unreadCount} unread
            </Badge>
            {unreadCount > 0 && (
              <Button onClick={markAllAsRead} variant="outline" size="sm">
                Mark all as read
              </Button>
            )}
          </div>
        </div>

        {/* Urgent Notifications */}
        {urgentNotifications.length > 0 && (
          <Card className="mb-6 border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-700 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Urgent Notifications ({urgentNotifications.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {urgentNotifications.map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start gap-3 p-3 bg-white rounded-lg border border-red-200"
                >
                  {getIcon(notification.type)}
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900">{notification.title}</h4>
                    <p className="text-gray-600 text-sm">{notification.message}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-xs text-gray-500">{notification.timestamp}</span>
                    </div>
                  </div>
                  <Button
                    onClick={() => markAsRead(notification.id)}
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700"
                  >
                    Mark as read
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* All Notifications */}
        <Card>
          <CardHeader>
            <CardTitle>All Notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`flex items-start gap-3 p-4 rounded-lg border transition-colors ${
                    notification.read ? "bg-gray-50 border-gray-200" : "bg-white border-blue-200 shadow-sm"
                  }`}
                >
                  {getIcon(notification.type)}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`font-semibold ${notification.read ? "text-gray-600" : "text-gray-900"}`}>
                        {notification.title}
                      </h4>
                      {!notification.read && (
                        <Badge variant="secondary" className="text-xs">
                          New
                        </Badge>
                      )}
                    </div>
                    <p className={`text-sm ${notification.read ? "text-gray-500" : "text-gray-600"}`}>
                      {notification.message}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-xs text-gray-500">{notification.timestamp}</span>
                    </div>
                  </div>
                  {!notification.read && (
                    <Button
                      onClick={() => markAsRead(notification.id)}
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      Mark as read
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
