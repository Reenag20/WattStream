'use client';

import * as React from 'react';
import { File, ListFilter, MoreHorizontal, PlusCircle } from 'lucide-react';
import { complaints as initialComplaints } from '@/lib/mock-data';
import type { ComplaintStatus, Complaint } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function ComplaintsPage() {
  const { toast } = useToast();
  const [complaints, setComplaints] = React.useState<Complaint[]>(initialComplaints);
  const [filterStatus, setFilterStatus] = React.useState<ComplaintStatus | 'All'>('All');
  const [isAddDialogOpen, setIsAddDialogOpen] = React.useState(false);

  // New Complaint Form State
  const [newComplaint, setNewComplaint] = React.useState({
    consumerName: '',
    consumerId: '',
    issue: '',
  });

  const handleAddComplaint = (e: React.FormEvent) => {
    e.preventDefault();
    const entry: Complaint = {
      id: `cmp${complaints.length + 1}`,
      consumerId: newComplaint.consumerId || 'C-Unknown',
      consumerName: newComplaint.consumerName,
      issue: newComplaint.issue,
      date: new Date().toISOString().split('T')[0],
      status: 'Registered',
    };

    setComplaints([entry, ...complaints]);
    setIsAddDialogOpen(false);
    setNewComplaint({ consumerName: '', consumerId: '', issue: '' });
    
    toast({
      title: "Complaint Registered",
      description: `A new ticket has been created for ${entry.consumerName}.`,
    });
  };

  const handleExport = () => {
    toast({
      title: "Exporting Data",
      description: "Preparing your complaints report for download...",
    });
  };

  const filteredComplaints = complaints.filter(c => 
    filterStatus === 'All' ? true : c.status === filterStatus
  );

  const StatusBadge = ({ status }: { status: ComplaintStatus }) => {
    let variant: 'default' | 'secondary' | 'outline' | 'destructive' = 'outline';
    if (status === 'Resolved') variant = 'default';
    if (status === 'In Progress') variant = 'secondary';
    
    const className = status === 'Resolved' ? 'bg-green-600' : '';
    return <Badge variant={variant} className={className}>{status}</Badge>;
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center">
        <div className="grid gap-2">
            <CardTitle>Complaints</CardTitle>
            <CardDescription>Manage and track all consumer complaints.</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">Filter</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem 
                checked={filterStatus === 'All'} 
                onClick={() => setFilterStatus('All')}
              >
                All
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem 
                checked={filterStatus === 'Registered'}
                onClick={() => setFilterStatus('Registered')}
              >
                Registered
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem 
                checked={filterStatus === 'In Progress'}
                onClick={() => setFilterStatus('In Progress')}
              >
                In Progress
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem 
                checked={filterStatus === 'Resolved'}
                onClick={() => setFilterStatus('Resolved')}
              >
                Resolved
              </DropdownMenuCheckboxItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button size="sm" variant="outline" className="h-8 gap-1" onClick={handleExport}>
            <File className="h-3.5 w-3.5" />
            <span className="sr-only sm:not-sr-only">Export</span>
          </Button>
          
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only">New Complaint</span>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleAddComplaint}>
                <DialogHeader>
                  <DialogTitle>Register New Complaint</DialogTitle>
                  <DialogDescription>
                    Fill in the details below to log a new consumer issue.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label htmlFor="consumerName">Consumer Name</Label>
                    <Input 
                      id="consumerName" 
                      placeholder="e.g. Rajesh Kumar" 
                      required 
                      value={newComplaint.consumerName}
                      onChange={e => setNewComplaint({...newComplaint, consumerName: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="consumerId">Consumer ID (Optional)</Label>
                    <Input 
                      id="consumerId" 
                      placeholder="e.g. C-1001" 
                      value={newComplaint.consumerId}
                      onChange={e => setNewComplaint({...newComplaint, consumerId: e.target.value})}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="issue">Issue Description</Label>
                    <Textarea 
                      id="issue" 
                      placeholder="Describe the complaint in detail..." 
                      required 
                      value={newComplaint.issue}
                      onChange={e => setNewComplaint({...newComplaint, issue: e.target.value})}
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Submit Complaint</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Consumer</TableHead>
              <TableHead className="hidden md:table-cell">Issue</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredComplaints.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-muted-foreground">
                  No complaints found.
                </TableCell>
              </TableRow>
            ) : (
              filteredComplaints.map(complaint => (
                <TableRow key={complaint.id}>
                  <TableCell>
                    <div className="font-medium">{complaint.consumerName}</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      {complaint.consumerId}
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell max-w-[300px] truncate">{complaint.issue}</TableCell>
                  <TableCell className="hidden md:table-cell">{new Date(complaint.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <StatusBadge status={complaint.status} />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Update Status</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-destructive">Close Ticket</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
