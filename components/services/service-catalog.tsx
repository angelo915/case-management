"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Edit, Settings, DollarSign } from "lucide-react"
import { mockServices, type Service } from "@/lib/auth"

interface ServiceCatalogProps {
  onEditService: (service: Service) => void
  onAddService: () => void
  onAssignService: (service: Service) => void
}

export function ServiceCatalog({ onEditService, onAddService, onAssignService }: ServiceCatalogProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [services] = useState<Service[]>(mockServices)

  const filteredServices = services.filter(
    (service) =>
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-card-foreground">Service Catalog</h2>
        <Button onClick={onAddService} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Service
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search services..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <Card key={service.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{service.name}</CardTitle>
                <Badge variant="outline">{service.category}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">{service.description}</p>

              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-muted-foreground" />
                <span className="font-semibold text-lg">${service.price.toFixed(2)}</span>
              </div>

              {service.requiresLicense && (
                <Badge variant="secondary" className="w-fit">
                  Requires License
                </Badge>
              )}

              <div className="flex items-center gap-2 pt-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onEditService(service)}
                  className="flex-1 bg-transparent"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
                <Button size="sm" onClick={() => onAssignService(service)} className="flex-1">
                  <Settings className="h-4 w-4 mr-2" />
                  Assign
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredServices.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No services found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
