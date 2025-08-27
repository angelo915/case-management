"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { mockCustomers, mockServices, type Service, type Customer } from "@/lib/auth"
import type { ServiceAssignment } from "@/lib/services"

interface ServiceAssignmentProps {
  service?: Service
  assignment?: ServiceAssignment
  onSave: (assignment: Partial<ServiceAssignment>) => void
  onCancel: () => void
}

export function ServiceAssignmentForm({ service, assignment, onSave, onCancel }: ServiceAssignmentProps) {
  const [formData, setFormData] = useState({
    serviceId: service?.id || assignment?.serviceId || "",
    customerId: assignment?.customerId || "",
    status: assignment?.status || "pending",
    notes: assignment?.notes || "",
    customPrice: assignment?.customPrice || service?.price || 0,
  })

  const [customers] = useState<Customer[]>(mockCustomers)
  const [services] = useState<Service[]>(mockServices)

  const selectedService = services.find((s) => s.id === formData.serviceId)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      ...formData,
      id: assignment?.id || Date.now().toString(),
      assignedDate: assignment?.assignedDate || new Date().toISOString().split("T")[0],
    })
  }

  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{assignment ? "Edit Service Assignment" : "Assign Service to Customer"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="serviceId">Service *</Label>
              <Select value={formData.serviceId} onValueChange={(value) => handleInputChange("serviceId", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a service" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((service) => (
                    <SelectItem key={service.id} value={service.id}>
                      {service.name} - ${service.price}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="customerId">Customer *</Label>
              <Select value={formData.customerId} onValueChange={(value) => handleInputChange("customerId", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a customer" />
                </SelectTrigger>
                <SelectContent>
                  {customers.map((customer) => (
                    <SelectItem key={customer.id} value={customer.id}>
                      {customer.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="customPrice">Custom Price ($)</Label>
              <Input
                id="customPrice"
                type="number"
                step="0.01"
                min="0"
                value={formData.customPrice}
                onChange={(e) => handleInputChange("customPrice", Number.parseFloat(e.target.value) || 0)}
                placeholder={selectedService ? selectedService.price.toString() : "0.00"}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={formData.notes}
              onChange={(e) => handleInputChange("notes", e.target.value)}
              placeholder="Add any notes about this service assignment..."
              rows={3}
            />
          </div>

          {selectedService && (
            <div className="p-4 bg-muted rounded-lg">
              <h4 className="font-medium mb-2">Service Details</h4>
              <p className="text-sm text-muted-foreground mb-2">{selectedService.description}</p>
              <div className="flex items-center gap-4 text-sm">
                <span>Category: {selectedService.category}</span>
                <span>Base Price: ${selectedService.price}</span>
                {selectedService.requiresLicense && <span className="text-orange-600">Requires License</span>}
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 pt-4">
            <Button type="submit" className="flex-1">
              {assignment ? "Update Assignment" : "Assign Service"}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
