import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { 
  ArrowLeft, 
  CheckCircle2, 
  XCircle, 
  Brain, 
  TrendingUp,
  AlertCircle,
  FileText,
  User,
  Calendar,
  Activity
} from 'lucide-react';
import { toast } from 'sonner';
import { z } from 'zod';

// Input validation schema
const reviewNotesSchema = z.object({
  notes: z.string()
    .trim()
    .min(10, { message: "Notes must be at least 10 characters" })
    .max(2000, { message: "Notes must be less than 2000 characters" })
});

const DoctorReview = () => {
  const { reportId } = useParams();
  const navigate = useNavigate();
  const [doctorNotes, setDoctorNotes] = useState('');
  const [validationError, setValidationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Mock patient and report data - replace with real API call
  const patientData = {
    name: 'Sarah Johnson',
    id: 'P-2024-001',
    age: 34,
    gender: 'Female',
    abhaId: 'ABHA-1234-5678-9012',
    uploadDate: '2024-05-15',
    reportType: 'Complete Blood Count'
  };

  const reportData = [
    { parameter: 'Hemoglobin', value: 12.8, unit: 'g/dL', normalRange: '12.0-16.0', status: 'normal' },
    { parameter: 'WBC Count', value: 11.5, unit: '10³/µL', normalRange: '4.0-11.0', status: 'high' },
    { parameter: 'RBC Count', value: 4.5, unit: '10⁶/µL', normalRange: '4.2-5.4', status: 'normal' },
    { parameter: 'Platelets', value: 240, unit: '10³/µL', normalRange: '150-400', status: 'normal' },
    { parameter: 'Neutrophils', value: 68, unit: '%', normalRange: '40-70', status: 'normal' },
    { parameter: 'Lymphocytes', value: 25, unit: '%', normalRange: '20-40', status: 'normal' },
  ];

  const aiInsights = {
    confidence: 95,
    summary: 'The patient\'s blood count shows slightly elevated WBC count, which may indicate a mild infection or inflammatory response. All other parameters are within normal ranges.',
    findings: [
      {
        type: 'attention',
        title: 'Elevated White Blood Cell Count',
        description: 'WBC count of 11.5 is slightly above the normal range (4.0-11.0). This could indicate an ongoing infection, inflammation, or stress response.',
        recommendation: 'Monitor for symptoms of infection. Consider follow-up test in 2-3 weeks if symptoms persist.'
      },
      {
        type: 'positive',
        title: 'Normal Hemoglobin Levels',
        description: 'Hemoglobin levels are within normal range, indicating good oxygen-carrying capacity.',
        recommendation: 'Continue current diet and lifestyle practices.'
      }
    ],
    trends: [
      { month: 'Jan', wbc: 8.2 },
      { month: 'Feb', wbc: 8.5 },
      { month: 'Mar', wbc: 9.1 },
      { month: 'Apr', wbc: 10.2 },
      { month: 'May', wbc: 11.5 },
    ]
  };

  const validateNotes = (notes: string): boolean => {
    try {
      reviewNotesSchema.parse({ notes });
      setValidationError('');
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setValidationError(error.errors[0].message);
      }
      return false;
    }
  };

  const handleApprove = async () => {
    if (!doctorNotes.trim()) {
      setValidationError('Please add review notes before approving');
      return;
    }

    if (!validateNotes(doctorNotes)) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In production, make API call: await api.post('/doctor/review', { reportId, notes: doctorNotes, status: 'approved' })
    
    toast.success('Report approved successfully');
    setIsSubmitting(false);
    navigate('/doctor');
  };

  const handleRequestRevision = async () => {
    if (!doctorNotes.trim()) {
      setValidationError('Please add notes explaining what needs revision');
      return;
    }

    if (!validateNotes(doctorNotes)) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In production: await api.post('/doctor/review', { reportId, notes: doctorNotes, status: 'revision_required' })
    
    toast.success('Revision requested');
    setIsSubmitting(false);
    navigate('/doctor');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Back Button */}
        <Button variant="ghost" onClick={() => navigate('/doctor')} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Patient Info */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-2xl">{patientData.name}</CardTitle>
                    <CardDescription className="mt-2 space-y-1">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4" />
                        Patient ID: {patientData.id}
                      </div>
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4" />
                        ABHA: {patientData.abhaId}
                      </div>
                    </CardDescription>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {patientData.uploadDate}
                    </div>
                    <Badge variant="outline" className="mt-2">
                      <FileText className="h-3 w-3 mr-1" />
                      {patientData.reportType}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Report Data */}
            <Card>
              <CardHeader>
                <CardTitle>Test Results</CardTitle>
                <CardDescription>Detailed parameter values and ranges</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {reportData.map((param, index) => (
                    <div key={index} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{param.parameter}</p>
                          {param.status === 'high' && (
                            <Badge variant="destructive" className="text-xs">
                              <TrendingUp className="h-3 w-3 mr-1" />
                              High
                            </Badge>
                          )}
                          {param.status === 'low' && (
                            <Badge variant="destructive" className="text-xs">
                              Low
                            </Badge>
                          )}
                          {param.status === 'normal' && (
                            <Badge className="bg-secondary/10 text-secondary border-secondary/20 text-xs">
                              Normal
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          Normal range: {param.normalRange} {param.unit}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-xl font-bold text-primary">{param.value}</p>
                        <p className="text-sm text-muted-foreground">{param.unit}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Doctor's Review */}
            <Card>
              <CardHeader>
                <CardTitle>Your Review</CardTitle>
                <CardDescription>Add your professional assessment and recommendations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="notes">Doctor's Notes *</Label>
                    <Textarea
                      id="notes"
                      placeholder="Enter your professional assessment, recommendations, and any additional notes for the patient..."
                      value={doctorNotes}
                      onChange={(e) => {
                        setDoctorNotes(e.target.value);
                        setValidationError('');
                      }}
                      className="min-h-[150px]"
                      maxLength={2000}
                    />
                    {validationError && (
                      <p className="text-sm text-destructive">{validationError}</p>
                    )}
                    <p className="text-xs text-muted-foreground">
                      {doctorNotes.length}/2000 characters
                    </p>
                  </div>

                  <Separator />

                  <div className="flex gap-3">
                    <Button 
                      onClick={handleApprove}
                      disabled={isSubmitting}
                      className="flex-1 bg-secondary hover:bg-secondary/90"
                    >
                      <CheckCircle2 className="mr-2 h-4 w-4" />
                      Approve Report
                    </Button>
                    <Button 
                      onClick={handleRequestRevision}
                      disabled={isSubmitting}
                      variant="outline"
                      className="flex-1 text-destructive hover:text-destructive"
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Request AI Revision
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* AI Insights Sidebar */}
          <div className="space-y-6">
            <Card className="border-primary/20 bg-primary-light">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5 text-primary" />
                  AI Analysis
                </CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-sm text-muted-foreground">Confidence Score:</span>
                  <span className="text-lg font-bold text-primary">{aiInsights.confidence}%</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-card border border-border p-4">
                  <h4 className="font-semibold mb-2">Summary</h4>
                  <p className="text-sm text-muted-foreground">{aiInsights.summary}</p>
                </div>

                <Separator />

                <div className="space-y-3">
                  <h4 className="font-semibold">Key Findings</h4>
                  {aiInsights.findings.map((finding, index) => (
                    <div key={index} className="rounded-lg bg-card border border-border p-4">
                      <div className="flex items-start gap-3">
                        {finding.type === 'attention' && (
                          <div className="rounded-full bg-yellow-500/10 p-2 mt-0.5">
                            <AlertCircle className="h-4 w-4 text-yellow-600" />
                          </div>
                        )}
                        {finding.type === 'positive' && (
                          <div className="rounded-full bg-secondary/10 p-2 mt-0.5">
                            <CheckCircle2 className="h-4 w-4 text-secondary" />
                          </div>
                        )}
                        <div className="flex-1">
                          <h5 className="font-semibold text-sm mb-1">{finding.title}</h5>
                          <p className="text-xs text-muted-foreground mb-2">
                            {finding.description}
                          </p>
                          <div className="bg-muted/50 rounded p-2 mt-2">
                            <p className="text-xs font-medium">Recommendation:</p>
                            <p className="text-xs text-muted-foreground">{finding.recommendation}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <FileText className="mr-2 h-4 w-4" />
                  View Previous Reports
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <User className="mr-2 h-4 w-4" />
                  Patient History
                </Button>
                <Button variant="outline" className="w-full justify-start" size="sm">
                  <Activity className="mr-2 h-4 w-4" />
                  Request Additional Tests
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorReview;
