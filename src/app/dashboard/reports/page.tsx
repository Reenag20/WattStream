'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const reports = [
  {
    title: 'Monthly Revenue Report',
    description: 'A detailed breakdown of revenue collected for the last month.',
    period: 'Monthly',
  },
  {
    title: 'Consumer Analytics',
    description: 'Insights into consumer consumption patterns and demographics.',
    period: 'Quarterly',
  },
  {
    title: 'Billing Data Export (CSV)',
    description: 'Complete raw billing data for auditing or external analysis.',
    period: 'All Time',
  },
  {
    title: 'Defaulter List',
    description: 'List of consumers with overdue payments.',
    period: 'Real-time',
  },
  {
    title: 'Monthly Performance Report',
    description: 'Key performance indicators for the utility operations.',
    period: 'Monthly',
  },
  {
    title: 'Payment History Log',
    description: 'A complete log of all payment transactions.',
    period: 'All Time',
  },
];

export default function ReportsPage() {
  const { toast } = useToast();

  const handleGenerateReport = (title: string) => {
    toast({
      title: "Generating Report",
      description: `Your ${title} is being prepared and will be downloaded shortly.`,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Reports & Exports</h1>
        <p className="text-muted-foreground">
          Generate and download operational intelligence reports.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report, index) => (
          <Card key={index} className="flex flex-col h-full">
            <CardHeader>
              <CardTitle>{report.title}</CardTitle>
              <CardDescription>{report.description}</CardDescription>
            </CardHeader>
            <CardContent className="mt-auto flex justify-between items-center pt-6">
              <span className="text-xs text-muted-foreground font-medium">{report.period}</span>
              <Button 
                size="sm" 
                variant="outline" 
                className="gap-2"
                onClick={() => handleGenerateReport(report.title)}
              >
                <Download className="h-4 w-4" />
                Generate
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
