"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { CheckCircle2, Clock, TrendingUp, Target, Award } from "lucide-react"

// Mock performance data
const employeePerformance = [
  {
    id: "2",
    name: "John Employee",
    tasksCompleted: 15,
    tasksInProgress: 3,
    avgCompletionTime: 4.2,
    customerSatisfaction: 4.8,
    efficiency: 92,
  },
  {
    id: "1",
    name: "Admin User",
    tasksCompleted: 8,
    tasksInProgress: 2,
    avgCompletionTime: 3.8,
    customerSatisfaction: 4.9,
    efficiency: 95,
  },
]

const teamMetrics = {
  totalTasksCompleted: 23,
  avgCompletionTime: 4.0,
  customerSatisfactionAvg: 4.85,
  teamEfficiency: 93.5,
  onTimeDelivery: 87,
}

export function PerformanceReport() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-card-foreground">Performance Report</h2>
      </div>

      {/* Team Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tasks Completed</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{teamMetrics.totalTasksCompleted}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Completion</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{teamMetrics.avgCompletionTime}d</div>
            <p className="text-xs text-muted-foreground">Per task</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Satisfaction</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{teamMetrics.customerSatisfactionAvg}/5</div>
            <p className="text-xs text-muted-foreground">Customer rating</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Efficiency</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-secondary">{teamMetrics.teamEfficiency}%</div>
            <p className="text-xs text-muted-foreground">Overall performance</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On-Time Delivery</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">{teamMetrics.onTimeDelivery}%</div>
            <p className="text-xs text-muted-foreground">Tasks delivered on time</p>
          </CardContent>
        </Card>
      </div>

      {/* Employee Performance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Employee Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Employee</TableHead>
                <TableHead>Completed Tasks</TableHead>
                <TableHead>In Progress</TableHead>
                <TableHead>Avg Completion Time</TableHead>
                <TableHead>Customer Rating</TableHead>
                <TableHead>Efficiency</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {employeePerformance.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell className="font-medium">{employee.name}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{employee.tasksCompleted}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{employee.tasksInProgress}</Badge>
                  </TableCell>
                  <TableCell>{employee.avgCompletionTime} days</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <span>{employee.customerSatisfaction}/5</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <span
                            key={i}
                            className={`text-xs ${
                              i < Math.floor(employee.customerSatisfaction) ? "text-yellow-500" : "text-gray-300"
                            }`}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Progress value={employee.efficiency} className="w-16 h-2" />
                      <span className="text-sm font-medium">{employee.efficiency}%</span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Performance Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {employeePerformance
              .sort((a, b) => b.efficiency - a.efficiency)
              .map((employee, index) => (
                <div key={employee.id} className="flex items-center gap-4 p-3 bg-muted rounded-lg">
                  <div className="flex items-center justify-center w-8 h-8 bg-secondary text-secondary-foreground rounded-full text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{employee.name}</p>
                    <p className="text-sm text-muted-foreground">{employee.efficiency}% efficiency</p>
                  </div>
                  <Badge variant="secondary">{employee.tasksCompleted} tasks</Badge>
                </div>
              ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-800">Excellent Team Performance</span>
              </div>
              <p className="text-sm text-green-700">Team efficiency is above 90% with high customer satisfaction.</p>
            </div>

            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-800">Customer Satisfaction</span>
              </div>
              <p className="text-sm text-blue-700">Average rating of 4.8/5 shows excellent service quality.</p>
            </div>

            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-orange-600" />
                <span className="font-medium text-orange-800">Improvement Opportunity</span>
              </div>
              <p className="text-sm text-orange-700">On-time delivery can be improved from 87% to 95%.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
