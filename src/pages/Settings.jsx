import { useState } from "react";
import { Card, CardContent, CardTitle } from "../components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";
import AdminDetails from "../pages/AdminDetails";
import BillingPage from "../pages/BillingPage";
import SecurityPage from "../pages/SecurityPage";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("admin");

  return (
    <div className="flex-1 p-6 md:p-10 bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-500 mt-1">Manage your admin details, billing, and security settings</p>
      </header>

      <Card className="shadow-lg rounded-xl overflow-hidden">
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Tabs */}
            <TabsList className="flex border-b border-gray-200 bg-white rounded-xl shadow-sm">
              <TabsTrigger value="admin">Admin Details</TabsTrigger>
              <TabsTrigger value="billing">Billing</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            {/* Tab Contents */}
            <TabsContent value="admin" className="mt-6 p-6 bg-white rounded-xl shadow-inner">
              <CardTitle className="text-xl font-semibold mb-4">Admin Details</CardTitle>
              <AdminDetails />
            </TabsContent>

            <TabsContent value="billing" className="mt-6 p-6 bg-white rounded-xl shadow-inner">
              <CardTitle className="text-xl font-semibold mb-4">Billing Information</CardTitle>
              <BillingPage />
            </TabsContent>

            <TabsContent value="security" className="mt-6 p-6 bg-white rounded-xl shadow-inner">
              <CardTitle className="text-xl font-semibold mb-4">Security Settings</CardTitle>
              <SecurityPage />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
