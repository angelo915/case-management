"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Search, Plus, Edit, RefreshCw, AlertTriangle, Users, Calendar, Key } from "lucide-react"
import { mockLicenses, getLicenseStatusColor, getDaysUntilExpiry, type License } from "@/lib/services"

interface LicenseManagementProps {
  onEditLicense: (license: License) => void
  onAddLicense: () => void
  onRenewLicense: (license: License) => void
}

export function LicenseManagement({ onEditLicense, onAddLicense, onRenewLicense }: LicenseManagementProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [licenses] = useState<License[]>(mockLicenses)

  const filteredLicenses = licenses.filter((license) =>
    license.licenseKey.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getExpiryWarning = (license: License) => {
    const daysLeft = getDaysUntilExpiry(license.endDate)
    if (daysLeft <= 30 && daysLeft > 0) return "warning"
    if (daysLeft <= 0) return "expired"
    return "normal"
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-card-foreground">License Management</h2>
        <Button onClick={onAddLicense} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add License
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search licenses..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="grid gap-6">
        {filteredLicenses.map((license) => {
          const daysLeft = getDaysUntilExpiry(license.endDate)
          const expiryWarning = getExpiryWarning(license)
          const usagePercentage = (license.currentUsers / license.maxUsers) * 100

          return (
            <Card key={license.id} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Key className="h-5 w-5 text-muted-foreground" />
                    <CardTitle className="text-lg">{license.licenseKey}</CardTitle>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getLicenseStatusColor(license.status)}>{license.status}</Badge>
                    {expiryWarning === "warning" && (
                      <Badge variant="outline" className="text-orange-600 border-orange-600">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Expires in {daysLeft} days
                      </Badge>
                    )}
                    {expiryWarning === "expired" && (
                      <Badge variant="destructive">
                        <AlertTriangle className="h-3 w-3 mr-1" />
                        Expired
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">Valid Until</p>
                      <p className="text-sm text-muted-foreground">{new Date(license.endDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">User Usage</p>
                      <p className="text-sm text-muted-foreground">
                        {license.currentUsers} / {license.maxUsers} users
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Annual Cost</p>
                    <p className="text-lg font-semibold text-secondary">${license.cost.toFixed(2)}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>License Usage</span>
                    <span>{usagePercentage.toFixed(0)}%</span>
                  </div>
                  <Progress value={usagePercentage} className="h-2" />
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <Badge variant={license.autoRenew ? "default" : "outline"}>
                      {license.autoRenew ? "Auto-Renew ON" : "Auto-Renew OFF"}
                    </Badge>
                    <span className="text-sm text-muted-foreground">Customer {license.customerId}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEditLicense(license)}
                      className="bg-transparent"
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button size="sm" onClick={() => onRenewLicense(license)}>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Renew
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredLicenses.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <p className="text-muted-foreground">No licenses found matching your search.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
