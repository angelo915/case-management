"use client"

import { useState } from "react"
import { CustomerList } from "./customer-list"
import { CustomerForm } from "./customer-form"
import { CustomerDetails } from "./customer-details"
import type { Customer } from "@/lib/auth"

type ViewMode = "list" | "add" | "edit" | "view"

export function CustomerManagement() {
  const [viewMode, setViewMode] = useState<ViewMode>("list")
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer)
    setViewMode("view")
  }

  const handleEditCustomer = (customer: Customer) => {
    setSelectedCustomer(customer)
    setViewMode("edit")
  }

  const handleAddCustomer = () => {
    setSelectedCustomer(null)
    setViewMode("add")
  }

  const handleSaveCustomer = (customerData: Partial<Customer>) => {
    // In a real app, this would save to the database
    console.log("[v0] Saving customer:", customerData)
    setViewMode("list")
  }

  const handleCancel = () => {
    setSelectedCustomer(null)
    setViewMode("list")
  }

  const handleBackToList = () => {
    setSelectedCustomer(null)
    setViewMode("list")
  }

  switch (viewMode) {
    case "add":
      return <CustomerForm onSave={handleSaveCustomer} onCancel={handleCancel} />
    case "edit":
      return <CustomerForm customer={selectedCustomer!} onSave={handleSaveCustomer} onCancel={handleCancel} />
    case "view":
      return (
        <CustomerDetails
          customer={selectedCustomer!}
          onEdit={() => handleEditCustomer(selectedCustomer!)}
          onBack={handleBackToList}
        />
      )
    default:
      return (
        <CustomerList
          onViewCustomer={handleViewCustomer}
          onEditCustomer={handleEditCustomer}
          onAddCustomer={handleAddCustomer}
        />
      )
  }
}
