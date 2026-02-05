import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-4xl font-extrabold text-primary uppercase tracking-wider">Welcome Admin</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg font-semibold text-muted-foreground">Select a section from the sidebar to start editing your website content.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
