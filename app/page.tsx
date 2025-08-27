"use client"

import { useState } from "react"
import { LoginForm } from "@/components/auth/login-form"
import { AdminDashboard } from "@/components/dashboards/admin-dashboard"
import { EmployeeDashboard } from "@/components/dashboards/employee-dashboard"
import { CustomerDashboard } from "@/components/dashboards/customer-dashboard"
import type { User } from "@/lib/auth"

export default function HomePage() {
  const [user, setUser] = useState<User | null>(null)

  if (!user) {
    return <LoginForm onLogin={setUser} />
  }

  switch (user.role) {
    case "admin":
      return <AdminDashboard user={user} onLogout={() => setUser(null)} />
    case "employee":
      return <EmployeeDashboard user={user} onLogout={() => setUser(null)} />
    case "customer":
      return <CustomerDashboard user={user} onLogout={() => setUser(null)} />
    default:
      return <LoginForm onLogin={setUser} />
  }
}
