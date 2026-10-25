"use client";

import { useState, useEffect } from "react";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

export default function ConfirmationPage({ params }: { params: { token: string } }) {
  const [status, setStatus] = useState<"loading" | "success" | "pending">("loading");
  const [data, setData] = useState<any>(null);
  
  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setStatus("success");
      setData({
        name: "Applicant Name",
        applicationNumber: "BFL251024-1234",
        amount: 50000,
        paymentId: "pay_123456",
      });
    }, 1000);
  }, []);
  
  return (
    <main className="relative bg-white">
      <Header />
      
      <section className="py-32">
        <div className="mx-auto max-w-2xl px-4">
          {status === "loading" && (
            <div className="text-center">
              <p>Loading...</p>
            </div>
          )}
          
          {status === "success" && (
            <div className="text-center">
              <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-6" />
              <h1 className="text-4xl font-bold mb-4">Registration Confirmed</h1>
              <p className="text-muted-foreground mb-8">Thank you for registering for Bihar Fashion League 2026</p>
              
              <div className="bg-gray-50 p-6 rounded-lg text-left mb-8">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Applicant Name</span>
                    <span className="font-medium">{data.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Application Reference</span>
                    <span className="font-medium">{data.applicationNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Amount Paid</span>
                    <span className="font-medium">₹{(data.amount / 100).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Payment Reference</span>
                    <span className="font-medium">{data.paymentId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Event</span>
                    <span className="font-medium">BFL 2026</span>
                  </div>
                </div>
              </div>
              
              <div className="text-left mb-8">
                <h2 className="text-xl font-bold mb-4">Next Steps</h2>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Your application is under review</li>
                  <li>• You will receive instructions for document submission via email</li>
                  <li>• Keep your application reference number for future correspondence</li>
                </ul>
              </div>
              
              <div className="text-left">
                <h2 className="text-xl font-bold mb-4">Support</h2>
                <p className="text-muted-foreground">
                  Email: piyush@biharfashionleague.com<br />
                  Phone: 6207330072, 8709363167, 8210501502<br />
                  Instagram: @Biharfashionleague
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
