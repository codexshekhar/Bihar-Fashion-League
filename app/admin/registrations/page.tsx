"use client";
export const dynamic = "force-dynamic";

import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export default function AdminRegistrationsPage() {
  return (
    <section className="bg-white min-h-screen py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Registration Applications</h1>
            <p className="text-muted-foreground">Review and manage participant applications.</p>
          </div>
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="sm"
              className="px-3 py-2 text-xs"
            >
              All Categories
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="px-3 py-2 text-xs"
            >
              All Payment Statuses
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl border border-border">
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Total Applications</p>
            <p className="text-2xl font-bold text-foreground">0</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-border">
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Total Collected</p>
            <p className="text-2xl font-bold text-primary">₹0</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-border">
            <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Pending Payments</p>
            <p className="text-2xl font-bold text-yellow-600">0</p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border text-sm font-medium text-muted-foreground">
                <th className="pb-4 pr-4">Applicant</th>
                <th className="pb-4 pr-4">Category</th>
                <th className="pb-4 pr-4">Fee</th>
                <th className="pb-4 pr-4">Payment Status</th>
                <th className="pb-4 pr-4">Application Status</th>
                <th className="pb-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-border hover:bg-gray-50/50 transition-colors">
                <td className="pb-4 pr-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium">
                      AS
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Aarav Sharma</p>
                      <p className="text-xs text-muted-foreground">aarav@example.com</p>
                    </div>
                  </div>
                </td>
                <td className="pb-4 pr-4">
                  <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    All Other Categories
                  </span>
                </td>
                <td className="pb-4 pr-4">
                  <span className="font-medium text-foreground">₹3,000</span>
                </td>
                <td className="pb-4 pr-4">
                  <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">
                    Pending
                  </span>
                </td>
                <td className="pb-4 pr-4">
                  <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">
                    Awaiting Payment
                  </span>
                </td>
                <td className="pb-4 text-right">
                  <Button size="sm" variant="outline" className="h-8 px-3">
                    Review
                  </Button>
                </td>
              </tr>
              <tr className="border-b border-border hover:bg-gray-50/50 transition-colors">
                <td className="pb-4 pr-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium">
                      IV
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Ishaan Verma</p>
                      <p className="text-xs text-muted-foreground">ishaan@example.com</p>
                    </div>
                  </div>
                </td>
                <td className="pb-4 pr-4">
                  <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    Kids Category
                  </span>
                </td>
                <td className="pb-4 pr-4">
                  <span className="font-medium text-foreground">₹2,500</span>
                </td>
                <td className="pb-4 pr-4">
                  <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                    Paid
                  </span>
                </td>
                <td className="pb-4 pr-4">
                  <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                    Submitted
                  </span>
                </td>
                <td className="pb-4 text-right">
                  <Button size="sm" variant="outline" className="h-8 px-3">
                    View
                  </Button>
                </td>
              </tr>
              <tr className="border-b border-border hover:bg-gray-50/50 transition-colors">
                <td className="pb-4 pr-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium">
                      PM
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Priya Mehta</p>
                      <p className="text-xs text-muted-foreground">priya@example.com</p>
                    </div>
                  </div>
                </td>
                <td className="pb-4 pr-4">
                  <span className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
                    All Other Categories
                  </span>
                </td>
                <td className="pb-4 pr-4">
                  <span className="font-medium text-foreground">₹3,000</span>
                </td>
                <td className="pb-4 pr-4">
                  <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                    Paid
                  </span>
                </td>
                <td className="pb-4 pr-4">
                  <span className="px-2 py-1 rounded-full bg-green-100 text-green-700 text-xs font-medium">
                    Approved
                  </span>
                </td>
                <td className="pb-4 text-right">
                  <Button size="sm" variant="outline" className="h-8 px-3">
                    View
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-8 flex justify-end">
          <Button size="sm" variant="outline" className="h-8 px-3">
            Export CSV
          </Button>
        </div>
      </div>
    </section>
  );
}
