import { useAuthStore } from '@/store/authStore';
import { useChatStore } from '@/store/chatStore';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Activity, FileUp, TrendingUp, AlertCircle, Brain, Calendar, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuthStore();
  const { getUserConversations } = useChatStore();

  const unreadCount = (user && (user.role === 'patient' || user.role === 'doctor'))
    ? getUserConversations(user.id, user.role).reduce((sum, conv) => sum + conv.unreadCount, 0)
    : 0;

  // Mock data for charts
  const trendData = [
    { month: 'Jan', hemoglobin: 13.5, wbc: 7.2, platelets: 250 },
    { month: 'Feb', hemoglobin: 13.8, wbc: 7.4, platelets: 260 },
    { month: 'Mar', hemoglobin: 14.2, wbc: 7.1, platelets: 255 },
    { month: 'Apr', hemoglobin: 14.5, wbc: 6.9, platelets: 270 },
    { month: 'May', hemoglobin: 14.8, wbc: 7.0, platelets: 265 },
  ];

  const recentReports = [
    { id: '1', date: '2024-05-15', type: 'Complete Blood Count', status: 'Normal' },
    { id: '2', date: '2024-04-10', type: 'Lipid Profile', status: 'Review' },
    { id: '3', date: '2024-03-05', type: 'Complete Blood Count', status: 'Normal' },
  ];

  const aiInsights = [
    {
      type: 'positive',
      title: 'Improving Trend',
      description: 'Your hemoglobin levels have shown steady improvement over the last 3 months.'
    },
    {
      type: 'attention',
      title: 'Attention Needed',
      description: 'Your LDL cholesterol is slightly elevated. Consider dietary modifications.'
    },
    {
      type: 'info',
      title: 'Recommendation',
      description: 'Based on your reports, consider scheduling a follow-up in 2 months.'
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8 relative">
          <div className="absolute inset-0 bg-gradient-hero opacity-5 rounded-3xl -z-10"></div>
          <div className="p-6">
            <h1 className="text-4xl font-display font-bold mb-2 text-gradient">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="text-muted-foreground text-lg">
              Here's your health analytics overview
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
              <div className="p-2 rounded-lg bg-primary/10">
                <Activity className="h-5 w-5 text-primary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-primary">12</div>
              <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3 text-secondary" />
                +2 from last month
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-secondary/20 hover:border-secondary/40 transition-all hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">AI Analyses</CardTitle>
              <div className="p-2 rounded-lg bg-secondary/10">
                <Brain className="h-5 w-5 text-secondary" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-secondary">8</div>
              <p className="text-xs text-muted-foreground">Completed this month</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-accent/20 hover:border-accent/40 transition-all hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Health Score</CardTitle>
              <div className="p-2 rounded-lg bg-accent/10">
                <TrendingUp className="h-5 w-5 text-accent" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-accent">92%</div>
              <p className="text-xs text-muted-foreground">Excellent condition</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-warning/20 hover:border-warning/40 transition-all hover:shadow-lg hover:-translate-y-1">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Next Checkup</CardTitle>
              <div className="p-2 rounded-lg bg-warning/10">
                <Calendar className="h-5 w-5 text-warning" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-warning">14</div>
              <p className="text-xs text-muted-foreground">days remaining</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Left Column - Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trends Chart */}
            <Card className="border-2 border-primary/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-gradient-hero">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  Health Trends
                </CardTitle>
                <CardDescription>Your health metrics over the past 5 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trendData}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="hemoglobin" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--primary))', r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="wbc" 
                      stroke="hsl(var(--secondary))" 
                      strokeWidth={3}
                      dot={{ fill: 'hsl(var(--secondary))', r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Recent Reports */}
            <Card className="border-2 border-secondary/10">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <div className="p-2 rounded-lg bg-secondary/10">
                      <FileUp className="w-5 h-5 text-secondary" />
                    </div>
                    Recent Reports
                  </CardTitle>
                  <CardDescription>Your latest medical reports</CardDescription>
                </div>
                <Button asChild size="sm" className="gradient-primary">
                  <Link to="/upload">
                    <FileUp className="mr-2 h-4 w-4" />
                    Upload New
                  </Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentReports.map((report) => (
                    <div key={report.id} className="flex items-center justify-between border-b border-border pb-4 last:border-0 last:pb-0 hover:bg-muted/50 p-3 rounded-lg transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          report.status === 'Normal' 
                            ? 'bg-secondary/10' 
                            : 'bg-warning/10'
                        }`}>
                          <FileUp className={`w-4 h-4 ${
                            report.status === 'Normal' 
                              ? 'text-secondary' 
                              : 'text-warning'
                          }`} />
                        </div>
                        <div>
                          <p className="font-medium">{report.type}</p>
                          <p className="text-sm text-muted-foreground">{report.date}</p>
                        </div>
                      </div>
                      <Badge variant={report.status === 'Normal' ? 'secondary' : 'outline'}>
                        {report.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - AI Insights */}
          <div className="space-y-6">
            <Card className="border-2 border-primary/20 bg-gradient-card overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
              <CardHeader className="relative">
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-gradient-hero animate-pulse-glow">
                    <Brain className="h-5 w-5 text-white" />
                  </div>
                  AI Insights
                </CardTitle>
                <CardDescription>Personalized recommendations from our AI</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 relative">
                {aiInsights.map((insight, index) => (
                  <div key={index} className="rounded-xl border-2 border-border bg-card p-4 hover:shadow-md transition-all hover:-translate-y-1">
                    <div className="flex items-start gap-3">
                      {insight.type === 'positive' && (
                        <div className="rounded-full bg-secondary/10 p-2.5">
                          <TrendingUp className="h-5 w-5 text-secondary" />
                        </div>
                      )}
                      {insight.type === 'attention' && (
                        <div className="rounded-full bg-warning/10 p-2.5">
                          <AlertCircle className="h-5 w-5 text-warning" />
                        </div>
                      )}
                      {insight.type === 'info' && (
                        <div className="rounded-full bg-primary/10 p-2.5">
                          <Activity className="h-5 w-5 text-primary" />
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1.5 text-foreground">{insight.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{insight.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border-2 border-accent/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-accent/10">
                    <Activity className="w-5 h-5 text-accent" />
                  </div>
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button asChild className="w-full gradient-hero text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
                  <Link to="/upload">
                    <FileUp className="mr-2 h-4 w-4" />
                    Upload Report
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full border-2 hover:border-primary hover:bg-primary/5">
                  <Link to="/compare">
                    <TrendingUp className="mr-2 h-4 w-4" />
                    Compare Reports
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full border-2 hover:border-secondary hover:bg-secondary/5 relative">
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
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
