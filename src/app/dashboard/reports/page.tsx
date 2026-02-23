'use client';

import * as React from 'react';
import { 
  Download, 
  Loader2, 
  CheckCircle2, 
  FileText, 
  Calendar as CalendarIcon, 
  Settings2,
  FileSpreadsheet,
  FileJson,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle,
  CardFooter
} from '@/components/ui/card';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

const reports = [
  {
    id: 'rev-01',
    title: 'Monthly Revenue Report',
    description: 'A detailed breakdown of revenue collected for the last month, including tax segments.',
    period: 'Monthly',
    icon: BarChart3,
  },
  {
    id: 'cons-01',
    title: 'Consumer Analytics',
    description: 'Insights into consumer consumption patterns, demographics, and peak usage hours.',
    period: 'Quarterly',
    icon: FileText,
  },
  {
    id: 'bill-01',
    title: 'Billing Data Export (CSV)',
    description: 'Complete raw billing data for auditing, reconciliation, or external system analysis.',
    period: 'All Time',
    icon: FileSpreadsheet,
  },
  {
    id: 'def-01',
    title: 'Defaulter List',
    description: 'Real-time list of consumers with overdue payments exceeding 30 days.',
    period: 'Real-time',
    icon: FileText,
  },
  {
    id: 'perf-01',
    title: 'Monthly Performance Report',
    description: 'Key performance indicators for utility operations, including response times.',
    period: 'Monthly',
    icon: BarChart3,
  },
  {
    id: 'pay-01',
    title: 'Payment History Log',
    description: 'A comprehensive log of all payment transactions, including payment modes.',
    period: 'All Time',
    icon: FileJson,
  },
];

export default function ReportsPage() {
  const { toast } = useToast();
  const [generating, setGenerating] = React.useState<Record<string, boolean>>({});
  const [completed, setCompleted] = React.useState<Record<string, boolean>>({});
  const [selectedReport, setSelectedReport] = React.useState<string | null>(null);

  const handleGenerateReport = (id: string, title: string) => {
    setGenerating((prev) => ({ ...prev, [id]: true }));
    setCompleted((prev) => ({ ...prev, [id]: false }));

    toast({
      title: "Generation Started",
      description: `Preparing ${title}...`,
    });

    // Simulate report generation
    setTimeout(() => {
      setGenerating((prev) => ({ ...prev, [id]: false }));
      setCompleted((prev) => ({ ...prev, [id]: true }));
      
      toast({
        title: "Report Ready",
        description: `${title} is now available for download.`,
      });
    }, 3000);
  };

  const handleDownload = (title: string) => {
    toast({
      title: "Download Started",
      description: `${title} is downloading to your device.`,
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports & Exports</h1>
        <p className="text-muted-foreground mt-1">
          Generate, customize, and download operational intelligence reports.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => {
          const Icon = report.icon;
          const isGenerating = generating[report.id];
          const isCompleted = completed[report.id];

          return (
            <Card key={report.id} className="flex flex-col h-full shadow-sm hover:shadow-md transition-all border-l-4 border-l-primary">
              <CardHeader>
                <div className="flex justify-between items-start mb-2">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                    {report.period}
                  </span>
                </div>
                <CardTitle className="text-xl">{report.title}</CardTitle>
                <CardDescription className="min-h-[40px]">{report.description}</CardDescription>
              </CardHeader>
              <CardContent className="mt-auto flex flex-col gap-4">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CalendarIcon className="h-3 w-3" />
                  <span>Last generated: {isCompleted ? 'Just now' : 'Never'}</span>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2 pt-2 border-t mt-4 bg-muted/20">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" size="sm" className="h-8" disabled={isGenerating}>
                      <Settings2 className="h-3.5 w-3.5 mr-1" />
                      Settings
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Report Settings: {report.title}</DialogTitle>
                      <DialogDescription>
                        Customize the parameters for this report before generation.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid gap-2">
                        <Label>Date Range</Label>
                        <Select defaultValue="30">
                          <SelectTrigger>
                            <SelectValue placeholder="Select range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="7">Last 7 Days</SelectItem>
                            <SelectItem value="30">Last 30 Days</SelectItem>
                            <SelectItem value="90">Last 90 Days</SelectItem>
                            <SelectItem value="custom">Custom Range</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label>Output Format</Label>
                        <Select defaultValue="pdf">
                          <SelectTrigger>
                            <SelectValue placeholder="Select format" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pdf">PDF Document</SelectItem>
                            <SelectItem value="csv">CSV Spreadsheet</SelectItem>
                            <SelectItem value="xlsx">Excel Workbook</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => {}}>Save Preferences</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                {isCompleted ? (
                  <Button 
                    size="sm" 
                    className="ml-auto h-8 gap-1 bg-green-600 hover:bg-green-700"
                    onClick={() => handleDownload(report.title)}
                  >
                    <Download className="h-3.5 w-3.5" />
                    Download
                  </Button>
                ) : (
                  <Button 
                    size="sm" 
                    variant="default"
                    className="ml-auto h-8 gap-1"
                    onClick={() => handleGenerateReport(report.id, report.title)}
                    disabled={isGenerating}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        Generate
                      </>
                    )}
                  </Button>
                )}
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
