import Link from 'next/link';
import { DollarSign, Users, CreditCard, Activity, ArrowUpRight, MessageSquareWarning } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { consumers, bills, complaints } from '@/lib/mock-data';

export default function DashboardPage() {
  const totalConsumers = consumers.length;
  const activeConnections = consumers.filter(c => c.status === 'Active').length;
  const monthlyRevenue = bills
    .filter(b => b.status === 'Paid')
    .reduce((sum, b) => sum + b.amount, 0);
  const pendingBills = bills.filter(b => b.status === 'Pending' || b.status === 'Overdue');
  const pendingPaymentsCount = pendingBills.length;
  const totalOutstanding = pendingBills.reduce((sum, b) => sum + b.amount, 0);

  const recentComplaints = complaints.slice(0, 5);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        <Link href="/dashboard/consumers">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Consumers
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalConsumers.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                Registered in the system
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/reports">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Revenue (Paid)
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${monthlyRevenue.toFixed(2)}</div>
              <p className="text-xs text-muted-foreground">
                Total collected from paid bills
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/consumers">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Payments</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingPaymentsCount}</div>
              <p className="text-xs text-muted-foreground">
                ${totalOutstanding.toFixed(2)} outstanding
              </p>
            </CardContent>
          </Card>
        </Link>
        <Link href="/dashboard/consumers">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Connections</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeConnections}</div>
              <p className="text-xs text-muted-foreground">Current active status</p>
            </CardContent>
          </Card>
        </Link>
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Recent Complaints</CardTitle>
              <CardDescription>
                Latest issues reported by consumers.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="/dashboard/complaints">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Consumer</TableHead>
                  <TableHead>Issue</TableHead>
                  <TableHead className="text-right">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentComplaints.map((complaint) => (
                  <TableRow key={complaint.id}>
                    <TableCell>
                      <div className="font-medium">{complaint.consumerName}</div>
                      <div className="text-xs text-muted-foreground">
                        {new Date(complaint.date).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-[300px] truncate">
                      {complaint.issue}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant={complaint.status === 'Resolved' ? 'default' : 'secondary'}>
                        {complaint.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>System Overview</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8">
            <div className="flex items-center gap-4">
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  Pending Complaints
                </p>
                <p className="text-sm text-muted-foreground">
                  Awaiting resolution
                </p>
              </div>
              <div className="ml-auto font-medium">
                {complaints.filter(c => c.status !== 'Resolved').length}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  Defaulter Rate
                </p>
                <p className="text-sm text-muted-foreground">
                  Overdue bills
                </p>
              </div>
              <div className="ml-auto font-medium">
                {((bills.filter(b => b.status === 'Overdue').length / bills.length) * 100).toFixed(1)}%
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  Average Consumption
                </p>
                <p className="text-sm text-muted-foreground">
                  Units per bill
                </p>
              </div>
              <div className="ml-auto font-medium">
                {(bills.reduce((sum, b) => sum + b.units, 0) / bills.length).toFixed(0)} kWh
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
