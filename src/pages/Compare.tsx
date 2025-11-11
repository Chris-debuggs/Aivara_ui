import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

const Compare = () => {
  const comparisonData = [
    { parameter: 'Hemoglobin', previous: 13.5, current: 14.8, unit: 'g/dL', change: '+9.6%' },
    { parameter: 'WBC Count', previous: 7.2, current: 7.0, unit: '10³/µL', change: '-2.8%' },
    { parameter: 'Platelets', previous: 250, current: 265, unit: '10³/µL', change: '+6.0%' },
    { parameter: 'RBC Count', previous: 4.8, current: 5.1, unit: '10⁶/µL', change: '+6.3%' },
  ];

  const trendData = [
    { month: 'Jan', value: 13.5 },
    { month: 'Feb', value: 13.8 },
    { month: 'Mar', value: 14.2 },
    { month: 'Apr', value: 14.5 },
    { month: 'May', value: 14.8 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold mb-2">
              Compare Reports
            </h1>
            <p className="text-muted-foreground">
              Track your health progress over time
            </p>
          </div>

          {/* Report Selection */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Select Reports to Compare</CardTitle>
              <CardDescription>Choose two reports to see the differences</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Previous Report</label>
                  <Select defaultValue="april">
                    <SelectTrigger>
                      <SelectValue placeholder="Select report" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="april">April 2024 - Complete Blood Count</SelectItem>
                      <SelectItem value="march">March 2024 - Complete Blood Count</SelectItem>
                      <SelectItem value="feb">February 2024 - Complete Blood Count</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Current Report</label>
                  <Select defaultValue="may">
                    <SelectTrigger>
                      <SelectValue placeholder="Select report" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="may">May 2024 - Complete Blood Count</SelectItem>
                      <SelectItem value="april">April 2024 - Complete Blood Count</SelectItem>
                      <SelectItem value="march">March 2024 - Complete Blood Count</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comparison Results */}
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-6">
              {/* Parameters Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle>Parameter Comparison</CardTitle>
                  <CardDescription>Side-by-side comparison of key health metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {comparisonData.map((param, index) => {
                      const isPositive = param.current > param.previous;
                      return (
                        <div key={index} className="flex items-center justify-between rounded-lg border border-border p-4">
                          <div className="flex-1">
                            <p className="font-medium">{param.parameter}</p>
                            <p className="text-sm text-muted-foreground">{param.unit}</p>
                          </div>
                          <div className="flex items-center gap-6">
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">Previous</p>
                              <p className="font-semibold">{param.previous}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              {isPositive ? (
                                <TrendingUp className="h-5 w-5 text-secondary" />
                              ) : (
                                <TrendingDown className="h-5 w-5 text-destructive" />
                              )}
                              <span className={`font-medium ${
                                isPositive ? 'text-secondary' : 'text-destructive'
                              }`}>
                                {param.change}
                              </span>
                            </div>
                            <div className="text-right">
                              <p className="text-sm text-muted-foreground">Current</p>
                              <p className="font-semibold text-primary">{param.current}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Trend Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Hemoglobin Trend</CardTitle>
                  <CardDescription>5-month progression</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="value" 
                        stroke="hsl(var(--primary))" 
                        strokeWidth={3}
                        dot={{ fill: 'hsl(var(--primary))', r: 5 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* AI Summary */}
            <div className="space-y-6">
              <Card className="border-primary/20 bg-primary-light">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    AI Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="rounded-lg bg-card p-4 border border-border">
                    <h4 className="font-semibold text-secondary mb-2">Overall Improvement</h4>
                    <p className="text-sm text-muted-foreground">
                      Your health metrics show a positive trend with significant improvement in hemoglobin levels.
                    </p>
                  </div>

                  <div className="rounded-lg bg-card p-4 border border-border">
                    <h4 className="font-semibold mb-2">Key Changes</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Hemoglobin: +9.6% improvement</li>
                      <li>• RBC Count: +6.3% increase</li>
                      <li>• Platelets: Stable and healthy</li>
                    </ul>
                  </div>

                  <div className="rounded-lg bg-card p-4 border border-border">
                    <h4 className="font-semibold mb-2">Recommendations</h4>
                    <p className="text-sm text-muted-foreground">
                      Continue your current diet and exercise routine. Schedule a follow-up in 2 months.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Button className="w-full gradient-primary">
                Export Comparison Report
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compare;
