import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { useChatStore } from '@/store/chatStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { 
  Users, 
  FileText, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Search,
  Filter,
  MessageSquare
} from 'lucide-react';

const DoctorDashboard = () => {
  const { user } = useAuthStore();
  const { getUserConversations } = useChatStore();
  const [searchQuery, setSearchQuery] = useState('');

  const unreadCount = (user && (user.role === 'patient' || user.role === 'doctor'))
    ? getUserConversations(user.id, user.role).reduce((sum, conv) => sum + conv.unreadCount, 0)
    : 0;

  // Mock data - replace with real API calls
  const stats = {
    pendingReviews: 8,
    reviewedToday: 12,
    totalPatients: 145,
    urgentCases: 3
  };

  const pendingReports = [
    {
      id: '1',
      patientName: 'Sarah Johnson',
      patientId: 'P-2024-001',
      reportType: 'Complete Blood Count',
      uploadDate: '2024-05-15',
      status: 'pending',
      priority: 'urgent',
      aiConfidence: 95
    },
    {
      id: '2',
      patientName: 'Michael Chen',
      patientId: 'P-2024-002',
      reportType: 'Lipid Profile',
      uploadDate: '2024-05-14',
      status: 'pending',
      priority: 'normal',
      aiConfidence: 88
    },
    {
      id: '3',
      patientName: 'Emma Davis',
      patientId: 'P-2024-003',
      reportType: 'Thyroid Function',
      uploadDate: '2024-05-14',
      status: 'pending',
      priority: 'normal',
      aiConfidence: 92
    },
  ];

  const recentlyReviewed = [
    {
      id: '4',
      patientName: 'James Wilson',
      patientId: 'P-2024-004',
      reportType: 'Complete Blood Count',
      reviewDate: '2024-05-15',
      status: 'approved',
    },
    {
      id: '5',
      patientName: 'Lisa Anderson',
      patientId: 'P-2024-005',
      reportType: 'Liver Function Test',
      reviewDate: '2024-05-14',
      status: 'approved',
    },
  ];

  const filteredPending = pendingReports.filter(report =>
    report.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.patientId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gradient-hero opacity-5 rounded-3xl -z-10"></div>
          <div className="p-6 flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-display font-bold mb-2 text-gradient">
                Doctor Review Panel
              </h1>
              <p className="text-muted-foreground text-lg">
                Review patient reports and validate AI-generated insights
              </p>
            </div>
            <Button asChild className="gradient-hero shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
              <Link to="/messages">
                <MessageSquare className="mr-2 h-4 w-4" />
                Messages
                {unreadCount > 0 && (
                  <Badge variant="destructive" className="ml-2 px-1.5 py-0 text-xs animate-pulse">
                    {unreadCount}
                  </Badge>
                )}
              </Link>
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="border-2 border-warning/20 hover:border-warning/40 transition-all hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
              <div className="p-2 rounded-lg bg-warning/10">
                <Clock className="h-5 w-5 text-warning" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-warning">{stats.pendingReviews}</div>
              <p className="text-xs text-muted-foreground">Awaiting your review</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-secondary/20 hover:border-secondary/40 transition-all hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Reviewed Today</CardTitle>
              <div className="p-2 rounded-lg bg-secondary/10">
                <CheckCircle2 className="h-5 w-5 text-secondary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary">{stats.reviewedToday}</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <CheckCircle2 className="w-3 h-3 text-secondary" />
                Completed reviews
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <div className="p-2 rounded-lg bg-primary/10">
                <Users className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">{stats.totalPatients}</div>
              <p className="text-xs text-muted-foreground">Under your care</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-destructive/20 hover:border-destructive/40 transition-all hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Urgent Cases</CardTitle>
              <div className="p-2 rounded-lg bg-destructive/10 animate-pulse-glow">
                <AlertCircle className="h-5 w-5 text-destructive" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-destructive">{stats.urgentCases}</div>
              <p className="text-xs text-muted-foreground">Require immediate attention</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Card className="border-2 border-primary/10">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-gradient-hero">
                    <FileText className="w-5 h-5 text-white" />
                  </div>
                  Patient Reports
                </CardTitle>
                <CardDescription>Review and approve AI-analyzed reports</CardDescription>
              </div>
              <div className="flex gap-2">
                <div className="relative flex-1 md:w-64">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Search patients..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 border-2 focus:border-primary"
                  />
                </div>
                <Button variant="outline" size="icon" className="border-2 hover:border-primary hover:bg-primary/5">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="pending" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6 p-1 h-auto">
                <TabsTrigger value="pending" className="data-[state=active]:bg-warning data-[state=active]:text-warning-foreground">
                  Pending ({pendingReports.length})
                </TabsTrigger>
                <TabsTrigger value="reviewed" className="data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground">
                  Recently Reviewed
                </TabsTrigger>
              </TabsList>

              <TabsContent value="pending" className="space-y-4">
                {filteredPending.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="p-4 rounded-full bg-secondary/10 w-fit mx-auto mb-4">
                      <CheckCircle2 className="h-12 w-12 text-secondary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">All caught up!</h3>
                    <p className="text-muted-foreground">No pending reports to review</p>
                  </div>
                ) : (
                  filteredPending.map((report) => (
                    <Card key={report.id} className="border-2 border-border hover:border-primary/40 hover:shadow-lg transition-all">
                      <CardContent className="p-6">
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="text-lg font-semibold">{report.patientName}</h3>
                              {report.priority === 'urgent' && (
                                <Badge variant="destructive" className="gap-1">
                                  <AlertCircle className="h-3 w-3" />
                                  Urgent
                                </Badge>
                              )}
                              <Badge variant="outline" className="text-xs">
                                {report.patientId}
                              </Badge>
                            </div>
                            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <FileText className="h-4 w-4" />
                                {report.reportType}
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {report.uploadDate}
                              </div>
                            </div>
                            <div className="mt-3 flex items-center gap-2">
                              <div className="text-sm font-medium">AI Confidence:</div>
                              <div className="flex-1 max-w-xs">
                                <div className="h-2.5 rounded-full bg-muted overflow-hidden border border-border">
                                  <div 
                                    className={`h-full rounded-full transition-all ${
                                      report.aiConfidence >= 90 
                                        ? 'bg-gradient-to-r from-secondary to-accent' 
                                        : report.aiConfidence >= 70 
                                        ? 'bg-gradient-to-r from-primary to-secondary'
                                        : 'bg-gradient-to-r from-warning to-primary'
                                    }`}
                                    style={{ width: `${report.aiConfidence}%` }}
                                  />
                                </div>
                              </div>
                              <span className="text-sm font-bold min-w-[3rem] text-right">
                                {report.aiConfidence}%
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" asChild className="border-2 hover:border-primary hover:bg-primary/5">
                              <Link to={`/doctor/review/${report.id}`}>
                                View Details
                              </Link>
                            </Button>
                            <Button asChild className="gradient-hero shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5">
                              <Link to={`/doctor/review/${report.id}`}>
                                Review Report
                              </Link>
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </TabsContent>

              <TabsContent value="reviewed" className="space-y-4">
                {recentlyReviewed.map((report) => (
                  <Card key={report.id} className="border-border">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold">{report.patientName}</h3>
                            <Badge className="bg-secondary/10 text-secondary border-secondary/20">
                              <CheckCircle2 className="h-3 w-3 mr-1" />
                              Approved
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {report.patientId}
                            </Badge>
                          </div>
                          <div className="flex gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <FileText className="h-4 w-4" />
                              {report.reportType}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              Reviewed on {report.reviewDate}
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" asChild>
                          <Link to={`/doctor/review/${report.id}`}>
                            View Report
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DoctorDashboard;
