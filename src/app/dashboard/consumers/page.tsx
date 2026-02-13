'use client';

import * as React from 'react';
import {
  File,
  ListFilter,
  MoreHorizontal,
  PlusCircle,
  FileText,
  MessageSquareWarning,
  BarChart,
  User,
  Users,
} from 'lucide-react';
import type { Consumer, Bill, Complaint, PaymentStatus } from '@/lib/types';
import { consumers, bills as allBills, complaints as allComplaints } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { Bar, BarChart as RechartsBarChart, XAxis, YAxis } from "recharts"

const chartData = [
  { month: "January", consumed: 186 },
  { month: "February", consumed: 305 },
  { month: "March", consumed: 237 },
  { month: "April", consumed: 173 },
  { month: "May", consumed: 209 },
]

const chartConfig = {
  consumed: {
    label: "Units Consumed",
    color: "hsl(var(--primary))",
  },
}

export default function ConsumersPage() {
  const [selectedConsumer, setSelectedConsumer] = React.useState<Consumer | null>(consumers[0]);
  const [consumerBills, setConsumerBills] = React.useState<Bill[]>([]);
  const [consumerComplaints, setConsumerComplaints] = React.useState<Complaint[]>([]);

  React.useEffect(() => {
    if (selectedConsumer) {
      setConsumerBills(allBills.filter(b => b.consumerId === selectedConsumer.id));
      setConsumerComplaints(allComplaints.filter(c => c.consumerId === selectedConsumer.id));
    } else {
      setConsumerBills([]);
      setConsumerComplaints([]);
    }
  }, [selectedConsumer]);

  const StatusBadge = ({ status }: { status: PaymentStatus }) => {
    const variant = status === 'Paid' ? 'default' : status === 'Pending' ? 'secondary' : 'destructive';
    const className = status === 'Paid' ? 'bg-green-600' : '';
    return <Badge variant={variant} className={className}>{status}</Badge>;
  }

  return (
    <div className="grid flex-1 items-start gap-4 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-1">
        <Card>
          <CardHeader className="flex flex-row items-center">
            <CardTitle>Consumers</CardTitle>
            <div className="ml-auto flex items-center gap-1">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="h-7 gap-1 text-sm">
                    <ListFilter className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Filter</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuCheckboxItem checked>Active</DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem>Disconnected</DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" variant="outline" className="h-7 gap-1 text-sm">
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Export</span>
              </Button>
              <Button size="sm" className="h-7 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Add Consumer</span>
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 h-[70vh] overflow-y-auto">
              {consumers.map(consumer => (
                <Card 
                  key={consumer.id} 
                  className={`cursor-pointer hover:bg-muted/50 ${selectedConsumer?.id === consumer.id ? 'border-primary' : ''}`}
                  onClick={() => setSelectedConsumer(consumer)}
                >
                  <CardHeader className="p-4">
                    <CardTitle className="text-base">{consumer.name}</CardTitle>
                    <CardDescription>{consumer.consumerId} - {consumer.address}</CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        {selectedConsumer ? (
          <Tabs defaultValue="details">
            <div className="flex items-center">
              <TabsList>
                <TabsTrigger value="details"><User className="h-4 w-4 mr-2"/>Details</TabsTrigger>
                <TabsTrigger value="billing"><FileText className="h-4 w-4 mr-2"/>Billing</TabsTrigger>
                <TabsTrigger value="analytics"><BarChart className="h-4 w-4 mr-2"/>Analytics</TabsTrigger>
                <TabsTrigger value="complaints"><MessageSquareWarning className="h-4 w-4 mr-2"/>Complaints</TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="details">
              <Card>
                <CardHeader>
                  <CardTitle>{selectedConsumer.name}</CardTitle>
                  <CardDescription>
                    Consumer ID: {selectedConsumer.consumerId}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2 text-sm">
                    <div><strong>Address:</strong> {selectedConsumer.address}</div>
                    <div><strong>Email:</strong> {selectedConsumer.email}</div>
                    <div><strong>Phone:</strong> {selectedConsumer.phone}</div>
                    <div><strong>Meter No:</strong> {selectedConsumer.meterNumber}</div>
                    <div><strong>Tariff:</strong> <Badge variant="secondary">{selectedConsumer.tariff}</Badge></div>
                    <div><strong>Status:</strong> <Badge variant={selectedConsumer.status === 'Active' ? 'default' : 'destructive'}>{selectedConsumer.status}</Badge></div>
                    <div><strong>Joined:</strong> {new Date(selectedConsumer.joinedDate).toLocaleDateString()}</div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="billing">
               <Card>
                <CardHeader className="px-7">
                  <CardTitle>Billing History</CardTitle>
                  <CardDescription>Recent bills for {selectedConsumer.name}.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Period</TableHead>
                        <TableHead className="hidden sm:table-cell">Units</TableHead>
                        <TableHead className="hidden sm:table-cell">Amount</TableHead>
                        <TableHead className="hidden md:table-cell">Due Date</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {consumerBills.map(bill => (
                        <TableRow key={bill.id}>
                          <TableCell>
                            <div className="font-medium">{bill.period}</div>
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">{bill.units} kWh</TableCell>
                          <TableCell className="hidden sm:table-cell">${bill.amount.toFixed(2)}</TableCell>
                          <TableCell className="hidden md:table-cell">{new Date(bill.dueDate).toLocaleDateString()}</TableCell>
                          <TableCell className="text-right"><StatusBadge status={bill.status} /></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Usage Analytics</CardTitle>
                  <CardDescription>Monthly electricity consumption.</CardDescription>
                </CardHeader>
                <CardContent>
                   <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
                    <RechartsBarChart accessibilityLayer data={chartData}>
                      <XAxis
                        dataKey="month"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                      />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <ChartLegend content={<ChartLegendContent />} />
                      <Bar dataKey="consumed" fill="var(--color-consumed)" radius={4} />
                    </RechartsBarChart>
                  </ChartContainer>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="complaints">
              <Card>
                <CardHeader>
                  <CardTitle>Complaint History</CardTitle>
                  <CardDescription>Complaints filed by {selectedConsumer.name}.</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Issue</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {consumerComplaints.map(complaint => (
                        <TableRow key={complaint.id}>
                          <TableCell>{new Date(complaint.date).toLocaleDateString()}</TableCell>
                          <TableCell>{complaint.issue}</TableCell>
                          <TableCell className="text-right"><Badge variant="outline">{complaint.status}</Badge></TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        ) : (
          <Card className="flex h-[80vh] items-center justify-center">
            <CardContent className="text-center">
              <Users className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold">No Consumer Selected</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Please select a consumer from the list to view their details.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
