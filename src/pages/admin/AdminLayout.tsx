import { useEffect, useState } from 'react';
import { useNavigate, Outlet, Link } from 'react-router-dom';
import { auth } from '@/services/api';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  Image as ImageIcon, 
  Dumbbell, 
  Users, 
  CreditCard, 
  MessageSquare, 
  Settings,
  LogOut
} from 'lucide-react';

const AdminLayout = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await auth.checkAuth();
        setLoading(false);
      } catch (error) {
        navigate('/admin/login');
      }
    };
    verifyAuth();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await auth.logout();
      navigate('/admin/login');
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
    { label: 'Hero Section', icon: ImageIcon, path: '/admin/hero' },
    { label: 'Features', icon: Settings, path: '/admin/features' },
    { label: 'Programs', icon: Dumbbell, path: '/admin/programs' },
    { label: 'Coaches', icon: Users, path: '/admin/coaches' },
    { label: 'Pricing', icon: CreditCard, path: '/admin/pricing' },
    { label: 'Testimonials', icon: MessageSquare, path: '/admin/testimonials' },
    { label: 'Blog', icon: MessageSquare, path: '/admin/blog' },
    { label: 'Contact Submissions', icon: MessageSquare, path: '/admin/contact-submissions' },
    { label: 'Footer & Contact', icon: Settings, path: '/admin/footer' },
  ];

  return (
    <div className="min-h-screen flex bg-muted/20">
      {/* Sidebar */}
      <aside className="w-64 bg-card border-r border-border fixed h-full overflow-y-auto">
        <div className="p-6">
          <h2 className="text-xl font-bold text-primary">Gym CMS</h2>
        </div>
        <nav className="px-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg hover:bg-muted transition-colors"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </Link>
          ))}
          <Button
            variant="destructive"
            className="w-full mt-8 flex items-center gap-2"
            onClick={handleLogout}
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
