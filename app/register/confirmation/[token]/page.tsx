"use client";

import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, ArrowRight } from "lucide-react";
import { Section } from "@/components/ui/section";
import { useState, useEffect } from "react";

interface ConfirmationData {
  applicationNumber: string;
  name: string;
  email: string;
  category: string;
  amount_paise: number;
  amountInr: string;
  currency: string;
  paymentStatus: string;
  paymentId: string | null;
  orderId: string | null;
  paidAt: string | null;
  createdAt: string | null;
  guardianConsentStatus: string | null;
}

export default function ConfirmationPage({ params }: { params: { token: string } }) {
  const [data, setData] = useState<ConfirmationData | null>(null);
  const [status, setStatus] = useState<"loading" | "success" | "pending" | "error">("loading");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchApplication() {
      try {
        const res = await fetch(`/api/application/${params.token}`, {
          headers: { Accept: "application/json" },
        });

        if (!res.ok) {
          setStatus("error");
          setError("Application not found");
          return;
        }

        const appData = await res.json();
        setData(appData);

        if (appData.paymentStatus === "paid") {
          setStatus("success");
        } else {
          setStatus("pending");
        }
      } catch {
        setStatus("error");
        setError("Failed to load application");
      }
    }

    fetchApplication();
  }, [params.token]);

  return (
    <main className="relative bg-[#FAFAF9] min-h-screen">
      <Header />

      <section className="py-24">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          {status === "loading" && (
            <div className="text-center py-20">
              <div className="flex justify-center">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
              </div>
              <p className="mt-4 text-muted-foreground">Loading your application...</p>
            </div>
          )}

          {status === "error" && (
            <div className="text-center py-20">
              <div className="flex justify-center">
                <Clock className="h-16 w-16 text-destructive mx-auto mb-6" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Application Not Found</h2>
              <p className="text-muted-foreground">{error}</p>
              <Button asChild>
                <Link href="/register/model">Start New Application</Link>
              </Button>
            </div>
          )}

          {status === "success" && data && (
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
              <h1 className="text-4xl font-bold tracking-tight mb-4">Registration Confirmed</h1>
              <p className="text-lg text-muted-foreground mb-10">
                Thank you for registering for Bihar Fashion League 2026
              </p>

              <div className="bg-white p-8 rounded-2xl border border-border mb-10 shadow-sm">
                <h3 className="font-bold mb-6 text-foreground">Application Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">Applicant Name</p>
                      <p className="font-medium text-foreground">{data.name}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Category</p>
                      <p className="font-medium text-primary">
                        {data.category === "kids" ? "👶 Kids Category" : "👤 All Other Categories"}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">Application Reference</p>
                      <p className="font-mono font-medium text-foreground">{data.applicationNumber}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Amount Paid</p>
                      <p className="font-mono font-bold text-primary">
                        ₹{data.amountInr}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-muted-foreground">Payment Reference</p>
                      <p className="font-mono font-medium text-foreground">
                        {data.paymentId || "—"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Payment Status</p>
                      <p className="font-medium">
                        <Badge variant="default" className="text-xs">
                          {data.paymentStatus.charAt(0).toUpperCase() + data.paymentStatus.slice(1)}
                        </Badge>
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between items-start pt-4 border-t border-border">
                    <div>
                      <p className="text-sm text-muted-foreground">Submitted On</p>
                      <p className="font-medium text-foreground">
                        {new Date(data.createdAt!).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Currency</p>
                      <p className="font-medium text-foreground">{data.currency}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white p-8 rounded-2xl border border-border mb-10 shadow-sm">
                <h3 className="font-bold mb-4 text-foreground">Next Steps</h3>
                <ul className="space-y-3 text-left text-muted-foreground max-w-xl mx-auto">
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>Your application is under review by the BFL team.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>You will receive instructions for document submission via email.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span>Keep your application reference number for future correspondence.</span>
                  </li>
                </ul>
              </div>

              <div className="text-left">
                <h3 className="font-bold mb-4 text-foreground">Support</h3>
                <p className="text-sm text-muted-foreground">
                  Email: piyush@biharfashionleague.com<br />
                  Phone: 6207330072, 8709363167, 8210501502<br />
                  Instagram: @Biharfashionleague
                </p>
              </div>
            </div>
          )}

          {status === "pending" && data && (
            <div className="text-center py-20">
              <div className="flex justify-center">
                <Clock className="h-16 w-16 text-yellow-600 mx-auto mb-6 animate-spin" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Payment Pending</h2>
              <p className="text-muted-foreground mb-6">
                Your application has been submitted but payment has not been verified yet.
              </p>
              <div className="bg-white p-6 rounded-xl border border-border">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Application Reference</span>
                    <p className="font-mono font-medium">{data.applicationNumber}</p>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Amount Due</span>
                    <p className="font-bold text-primary">₹{data.amountInr}</p>
                  </div>
                </div>
              </div>
              <div className="mt-8">
                <Button asChild>
                  <Link href="/register/model/apply">Start New Application</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
