export const dynamic = "force-dynamic";
import Link from "next/link";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Section, SectionHeader } from "@/components/ui/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Image as ImageIcon, FileText, Mail, Shield, Clock, CreditCard } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  description: string;
  href?: string;
}

export const metadata = {
  title: "Dashboard | Bihar Fashion League Admin",
};

export default function AdminDashboardPage() {
  return (
    <main className="bg-white min-h-screen">
      <Header />
      
      <Section className="py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Dashboard"
            description="Manage content for Bihar Fashion League."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            <StatCard
              title="Total Participants"
              icon={Users}
              value="12"
              description="Published participant profiles"
              href="/admin/participants"
            />
            <StatCard
              title="Upcoming Events"
              icon={Calendar}
              value="2"
              description="Scheduled events"
              href="/admin/events"
            />
            <StatCard
              title="Published News"
              icon={FileText}
              value="5"
              description="Live news articles"
              href="/admin/news"
            />
            <StatCard
              title="Gallery Images"
              icon={ImageIcon}
              value="24"
              description="Published gallery items"
              href="/admin/gallery"
            />
            <StatCard
              title="Total Registration Fees"
              icon={CreditCard}
              value="₹0"
              description="Collected from verified payments"
              href="/admin/registrations"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Pending Registrations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-border">
                    <div>
                      <p className="font-medium text-foreground">Aarav Sharma</p>
                      <p className="text-sm text-muted-foreground">Runway Model</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">
                        Pending
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl border border-border">
                    <div>
                      <p className="font-medium text-foreground">Ishaan Verma</p>
                      <p className="text-sm text-muted-foreground">Showstopper</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-medium">
                        Pending
                      </span>
                    </div>
                  </div>
                </div>
                <div className="pt-4 flex justify-end">
                  <Button size="sm" asChild>
                    <Link href="/admin/registrations">View All</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Recent Partnership Inquiries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-xl border border-border">
                    <div>
                      <p className="font-medium text-foreground">Fabric House Co.</p>
                      <p className="text-sm text-muted-foreground">Title Sponsorship</p>
                    </div>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-xl border border-border">
                    <div>
                      <p className="font-medium text-foreground">Lens Studio</p>
                      <p className="text-sm text-muted-foreground">Media Partnership</p>
                    </div>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </div>
                </div>
                <div className="pt-4 flex justify-end">
                  <Button size="sm" asChild>
                    <Link href="/admin/inquiries">View All</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </Section>

      <Footer />
    </main>
  );
}

function StatCard({
  title,
  value,
  icon: Icon,
  description,
  href,
}: StatCardProps) {
  return (
    <Card className={href ? "hover:shadow-md transition-shadow cursor-pointer group" : ""}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}
