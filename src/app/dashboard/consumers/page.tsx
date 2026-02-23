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
import type { Consumer, Bill, Complaint, PaymentStatus, ConnectionStatus, Tariff } from '@/lib/types';
import { consumers as initialConsumers, bills as allBills, complaints as allComplaints } from '@/lib/mock-data';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem
} from '@/components/ui/dropdown-menu';
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
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
  const { toast } = useToast();
  const [consumers, setConsumers] = React.useState<Consumer[]>(initialConsumers);
  const [selectedConsumer, setSelectedConsumer] = React.useState<Consumer | null>(initialConsumers[0]);
  const [consumerBills, setConsumerBills] = React.useState<Bill[]>([]);
  const [consumerComplaints, setConsumerComplaints] = React.useState<Complaint[]>([]);
  const [filterStatus, setFilterStatus] = React.useState<string>('All');
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);

  // New Consumer Form State
  const [newConsumer, setNewConsumer] = React.useState<Partial<Consumer>>({
    name: '',
    email: '',
    phone: '',
    address: '',
    tariff: 'Domestic',
    status: 'Active',
  });

  React.useEffect(() => {
    if (selectedConsumer) {
      setConsumerBills(allBills.filter(b => b.consumerId === selectedConsumer.id));
      setConsumerComplaints(allComplaints.filter(c => c.consumerId === selectedConsumer.id));
    } else {
      setConsumerBills([]);
      setConsumerComplaints([]);
    }
  }, [selectedConsumer]);

  const filteredConsumers = consumers.filter(c => 
    filterStatus === 'All' ? true : c.status === filterStatus
  );

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "The consumer list is being prepared for download.",
    });
  };

  const handleAddConsumer = (e: React.FormEvent) => {
    e.preventDefault();
    const id = (consumers.length + 1).toString();
    const consumerId = `C-${1000 + consumers.length + 1}`;
    const entry: Consumer = {
      ...newConsumer as Consumer,
      id,
      consumerId,
      meterNumber: `M-${Math.floor(10000 + Math.random() * 90000)}`,
      joinedDate: new Date().toISOString().split('T')[0],
    };

    setConsumers([...consumers, entry]);
    setIsAddDialogOpen(false);
    setNewConsumer({
      name: '',
      email: '',
      phone: '',
      address: '',
      tariff: 'Domestic',
      status: 'Active',
    });
    
    toast({
      title: "Consumer Added",
      description: `${entry.name} has been successfully registered.`,
    });
  };

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
                  <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuRadioGroup value={filterStatus} onValueChange={setFilterStatus}>
                    <DropdownMenuRadioItem value="All">All</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Active">Active</DropdownMenuRadioItem>
                    <DropdownMenuRadioItem value="Disconnected">Disconnected</DropdownMenuRadioItem>
                  </DropdownMenuRadioGroup>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="sm" variant="outline" className="h-7 gap-1 text-sm" onClick={handleExport}>
                <File className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Export</span>
              </Button>
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="h-7 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only">Add</span>
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <form onSubmit={handleAddConsumer}>
                    <DialogHeader>
                      <DialogTitle>Add New Consumer</DialogTitle>
                      <DialogDescription>
                        Enter details to register a new consumer in the system.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input 
                          id="name" 
                          required 
                          value={newConsumer.name}
                          onChange={e => setNewConsumer({...newConsumer, name: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          required 
                          value={newConsumer.email}
                          onChange={e => setNewConsumer({...newConsumer, email: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          required 
                          value={newConsumer.phone}
                          onChange={e => setNewConsumer({...newConsumer, phone: e.target.value})}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="address">Address</Label>
                        <Input 
                          id="address" 
                          required 
                          value={newConsumer.address}
                          onChange={e => setNewConsumer({...newConsumer, address: e.target.value})}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="tariff">Tariff</Label>
                          <Select 
                            value={newConsumer.tariff}
                            onValueChange={v => setNewConsumer({...newConsumer, tariff: v as Tariff})}
                          >
                            <SelectTrigger id="tariff">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Domestic">Domestic</SelectItem>
                              <SelectItem value="Commercial">Commercial</SelectItem>
                              <SelectItem value="Industrial">Industrial</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="status">Status</Label>
                          <Select 
                            value={newConsumer.status}
                            onValueChange={v => setNewConsumer({...newConsumer, status: v as ConnectionStatus})}
                          >
                            <SelectTrigger id="status">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Active">Active</SelectItem>
                              <SelectItem value="Disconnected">Disconnected</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit">Save Consumer</Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 h-[70vh] overflow-y-auto">
              {filteredConsumers.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">
                  No consumers found matching criteria.
                </div>
              ) : (
                filteredConsumers.map(consumer => (
                  <Card 
                    key={consumer.id} 
                    className={`cursor-pointer hover:bg-muted/50 transition-all ${selectedConsumer?.id === consumer.id ? 'border-primary ring-1 ring-primary' : ''}`}
                    onClick={() => setSelectedConsumer(consumer)}
                  >
                    <CardHeader className="p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-base">{consumer.name}</CardTitle>
                          <CardDescription>{consumer.consumerId}</CardDescription>
                        </div>
                        <Badge variant={consumer.status === 'Active' ? 'default' : 'destructive'} className="text-[10px] h-5">
                          {consumer.status}
                        </Badge>
                      </div>
                    </CardHeader>
                  </Card>
                ))
              )}
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
                  <div className="grid gap-4 text-sm md:grid-cols-2">
                    <div className="space-y-2">
                      <div><strong>Address:</strong> <span className="text-muted-foreground">{selectedConsumer.address}</span></div>
                      <div><strong>Email:</strong> <span className="text-muted-foreground">{selectedConsumer.email}</span></div>
                      <div><strong>Phone:</strong> <span className="text-muted-foreground">{selectedConsumer.phone}</span></div>
                    </div>
                    <div className="space-y-2">
                      <div><strong>Meter No:</strong> <span className="text-muted-foreground">{selectedConsumer.meterNumber}</span></div>
                      <div><strong>Tariff:</strong> <Badge variant="secondary" className="ml-1">{selectedConsumer.tariff}</Badge></div>
                      <div><strong>Status:</strong> <Badge variant={selectedConsumer.status === 'Active' ? 'default' : 'destructive'} className="ml-1">{selectedConsumer.status}</Badge></div>
                      <div><strong>Joined:</strong> <span className="text-muted-foreground">{new Date(selectedConsumer.joinedDate).toLocaleDateString()}</span></div>
                    </div>
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
                      {consumerBills.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                            No billing history available.
                          </TableCell>
                        </TableRow>
                      ) : (
                        consumerBills.map(bill => (
                          <TableRow key={bill.id}>
                            <TableCell>
                              <div className="font-medium">{bill.period}</div>
                            </TableCell>
                            <TableCell className="hidden sm:table-cell">{bill.units} kWh</TableCell>
                            <TableCell className="hidden sm:table-cell">₹{bill.amount.toFixed(2)}</TableCell>
                            <TableCell className="hidden md:table-cell">{new Date(bill.dueDate).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right"><StatusBadge status={bill.status} /></TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Usage Analytics</CardTitle>
                  <CardDescription>Monthly electricity consumption (kWh).</CardDescription>
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
                      {consumerComplaints.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={3} className="text-center py-10 text-muted-foreground">
                            No complaints reported.
                          </TableCell>
                        </TableRow>
                      ) : (
                        consumerComplaints.map(complaint => (
                          <TableRow key={complaint.id}>
                            <TableCell>{new Date(complaint.date).toLocaleDateString()}</TableCell>
                            <TableCell>{complaint.issue}</TableCell>
                            <TableCell className="text-right"><Badge variant="outline">{complaint.status}</Badge></TableCell>
                          </TableRow>
                        ))
                      )}
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
