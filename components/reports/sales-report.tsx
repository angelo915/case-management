"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Download, TrendingUp, DollarSign, Users, Calendar } from "lucide-react"

// Mock sales data
const salesData = [
  {
    id: "1",
    customer: "Acme Corporation",
    service: "Website Development",
    amount: 2500,
    date: "2024-02-15",
    status: "paid",
    employee: "John Employee",
  },
  {
    id: "2",
    customer: "Tech Solutions Inc",
    service: "Software Licensing",
    amount: 500,
    date: "2024-02-20",
    status: "pending",
    employee: "John Employee",
  },
  {
    id: "3",
    customer: "Acme Corporation",
    service: "Maintenance",
    amount: 800,
    date: "2024-02-25",
    status: "paid",
    employee: "Admin User",
  },
]

export function SalesReport() {
  const [timeRange, setTimeRange] = useState("month")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredData = salesData.filter((sale) => {
    if (statusFilter === "all") return true
    return sale.status === statusFilter
  })

  const totalRevenue = filteredData.reduce((sum, sale) => sum + sale.amount, 0)
  const paidRevenue = filteredData.filter((sale) => sale.status === "paid").reduce((sum, sale) => sum + sale.amount, 0)
  const pendingRevenue = filteredData
    .filter((sale) => sale.status === "pending")
    .reduce((sum, sale) => sum + sale.amount, 0)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "paid":
        return "bg-secondary text-secondary-foreground"
      case "pending":
        return "bg-yellow-500 text-white"
      case "overdue":
        return "bg-destructive text-destructive-foreground"
      default:
        return "bg-muted text-muted-foreground"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-card-foreground">Sales Report</h2>
        <div className="flex items-center gap-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="quarter">This Quarter</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="bg-transparent">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">${totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Paid Revenue</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">${paidRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">{((paidRevenue / totalRevenue) * 100).toFixed(1)}% of total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Revenue</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">${pendingRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Awaiting payment</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{new Set(salesData.map((s) => s.customer)).size}</div>
            <p className="text-xs text-muted-foreground">Active this period</p>
          </CardContent>
        </Card>
      </div>

      {/* Sales Table */}
      <Card>
        <CardHeader>
          <CardTitle>Sales Transactions</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Employee</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredData.map((sale) => (
                <TableRow key={sale.id}>
                  <TableCell className="font-medium">{sale.customer}</TableCell>
                  <TableCell>{sale.service}</TableCell>
                  <TableCell>${sale.amount.toLocaleString()}</TableCell>
                  <TableCell>{new Date(sale.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(sale.status)}>{sale.status}</Badge>
                  </TableCell>
                  <TableCell>{sale.employee}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
