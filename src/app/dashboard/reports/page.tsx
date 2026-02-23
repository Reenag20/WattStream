'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Loader2, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const reports = [
  {
    id: 'rev-01',
    title: 'Monthly Revenue Report',
    description: 'A detailed breakdown of revenue collected for the last month, including tax segments.',
    period: 'Monthly',
  },
  {
    id: 'cons-01',
    title: 'Consumer Analytics',
    description: 'Insights into consumer consumption patterns, demographics, and peak usage hours.',
    period: 'Quarterly',
  },
  {
    id: 'bill-01',
    title: 'Billing Data Export (CSV)',
    description: 'Complete raw billing data for auditing, reconciliation, or external system analysis.',
    period: 'All Time',
  },
  {
    id: 'def-01',
    title: 'Defaulter List',
    description: 'Real-time list of consumers with overdue payments exceeding 30 days.',
    period: 'Real-time',
  },
  {
    id: 'perf-01',
    title: 'Monthly Performance Report',
    description: 'Key performance indicators for utility operations, including response times and resolution rates.',
    period: 'Monthly',
  },
  {
    id: 'pay-01',
    title: 'Payment History Log',
    description: 'A comprehensive log of all payment transactions, including payment modes and reference IDs.',
    period: 'All Time',
  },
];

export default function ReportsPage() {
  const { toast } = useToast();
  const [generating, setGenerating] = React.useState<Record<string, boolean>>({});
  const [completed, setCompleted] = React.useState<Record<string, boolean>>({});

  const handleGenerateReport = (id: string, title: string) => {
    // Set loading state for this specific report
    setGenerating((prev) => ({ ...prev, [id]: true }));
    setCompleted((prev) => ({ ...prev, [id]: false }));

    toast({
      title: "Generating Report",
      description: `Your ${title} is being prepared...`,
    });

    // Simulate a generation process
    setTimeout(() => {
      setGenerating((prev) => ({ ...prev, [id]: false }));
      setCompleted((prev) => ({ ...prev, [id]: true }));
      
      toast({
        title: "Report Ready",
        description: `${title} has been generated and is ready for download.`,
      });

      // Clear the "completed" checkmark after a few seconds
      setTimeout(() => {
        setCompleted((prev) => ({ ...prev, [id]: false }));
      }, 3000);
    }, 2000);
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Reports & Exports</h1>
        <p className="text-muted-foreground">
          Generate and download operational intelligence reports for your utility management.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <Card key={report.id} className="flex flex-col h-full shadow-md hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                  {report.period}
                </span>
              </div>
              <CardTitle className="text-xl">{report.title}</CardTitle>
              <CardDescription className="line-clamp-2">{report.description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto flex justify-end pt-6">
              <Button 
                size="sm" 
                variant={completed[report.id] ? "default" : "outline"}
                className={`gap-2 min-w-[120px] ${completed[report.id] ? 'bg-green-600 hover:bg-green-700' : ''}`}
                onClick={() => handleGenerateReport(report.id, report.title)}
                disabled={generating[report.id]}
              >
                {generating[report.id] ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : completed[report.id] ? (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Generated
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Generate
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
