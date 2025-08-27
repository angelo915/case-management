"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Eye } from "lucide-react"
import { mockCustomers, type Customer } from "@/lib/auth"

interface CustomerListProps {
  onViewCustomer: (customer: Customer) => void
  onEditCustomer: (customer: Customer) => void
  onAddCustomer: () => void
}

export function CustomerList({ onViewCustomer, onEditCustomer, onAddCustomer }: CustomerListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [customers] = useState<Customer[]>(mockCustomers)

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-card-foreground">Customer Management</h2>
        <Button onClick={onAddCustomer} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Customer
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {filteredCustomers.map((customer) => (
          <Card key={customer.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-card-foreground">{customer.name}</h3>
                    <Badge variant={customer.status === "active" ? "default" : "secondary"}>{customer.status}</Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm text-muted-foreground">
                    <div>
                      <span className="font-medium">Email:</span> {customer.email}
                    </div>
                    <div>
                      <span className="font-medium">Phone:</span> {customer.phone}
                    </div>
                    <div>
                      <span className="font-medium">Balance:</span> ${customer.prepaymentBalance.toFixed(2)}
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    <span className="font-medium">Address:</span> {customer.address}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewCustomer(customer)}
                    className="flex items-center gap-1"
                  >
                    <Eye className="h-4 w-4" />
                    View
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEditCustomer(customer)}
                    className="flex items-center gap-1"
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredCustomers.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No customers found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
