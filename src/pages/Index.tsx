import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { 
  ChefHat, 
  Utensils, 
  Users, 
  LayoutDashboard, 
  ArrowRight,
  QrCode,
  Clock,
  BarChart3,
  Bell
} from 'lucide-react';

const Index: React.FC = () => {
  const interfaces = [
    {
      title: 'Customer Menu',
      description: 'Browse menu, add items to cart, and place orders from your table',
      icon: <Utensils className="w-8 h-8" />,
      href: '/menu?table=table-1',
      gradient: 'from-primary to-accent',
    },
    {
      title: 'Kitchen Display',
      description: 'Real-time order queue with status management and priority tracking',
      icon: <ChefHat className="w-8 h-8" />,
      href: '/kitchen',
      gradient: 'from-info to-primary',
    },
    {
      title: 'Waiter Dashboard',
      description: 'Monitor tables, track deliveries, and respond to customer alerts',
      icon: <Users className="w-8 h-8" />,
      href: '/waiter',
      gradient: 'from-success to-info',
    },
    {
      title: 'Admin Panel',
      description: 'Manage menu items, view analytics, and oversee operations',
      icon: <LayoutDashboard className="w-8 h-8" />,
      href: '/admin',
      gradient: 'from-accent to-warning',
    },
  ];

  const features = [
    {
      icon: <QrCode className="w-6 h-6" />,
      title: 'QR-Based Ordering',
      description: 'Customers scan table QR codes for instant menu access',
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Real-Time Sync',
      description: 'Orders flow seamlessly from table to kitchen to delivery',
    },
    {
      icon: <Bell className="w-6 h-6" />,
      title: 'Smart Alerts',
      description: 'Instant notifications for ready orders and assistance requests',
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: 'Live Analytics',
      description: 'Track revenue, orders, and peak hours in real-time',
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-95" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_hsl(24_85%_45%/0.15),_transparent_50%)]" />
        
        <div className="relative max-w-6xl mx-auto px-6 py-20 md:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary-foreground/80 text-sm mb-6">
              <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
              Smart Restaurant Management
            </div>
            
            <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground leading-tight">
              DineFlow
            </h1>
            <p className="text-xl md:text-2xl text-primary-foreground/70 mt-4 mb-8 leading-relaxed">
              AI-Assisted Restaurant Workflow System. Streamline ordering, 
              enhance kitchen coordination, and unlock operational insights.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <Link to="/menu?table=table-1">
                <Button variant="hero" size="xl">
                  Try Customer View
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link to="/admin">
                <Button variant="glass" size="xl">
                  Open Admin Panel
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Interfaces Section */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Four Interconnected Interfaces
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Each interface is designed for its specific users, working together 
            to create a seamless restaurant operation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {interfaces.map((item) => (
            <Link
              key={item.title}
              to={item.href}
              className="group glass-card rounded-2xl p-6 hover:shadow-elevated transition-all duration-300"
            >
              <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-primary-foreground mb-4 group-hover:scale-110 transition-transform`}>
                {item.icon}
              </div>
              
              <h3 className="font-display text-xl font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-muted-foreground">
                {item.description}
              </p>
              
              <div className="flex items-center gap-2 mt-4 text-primary font-medium">
                <span>Open Interface</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-muted/50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Designed for Efficiency
            </h2>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              Every feature is built to reduce wait times, improve coordination, 
              and enhance the dining experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div 
                key={feature.title}
                className="text-center p-6 rounded-xl bg-card border border-border"
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-semibold text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground">
            Ready to Transform Your Restaurant?
          </h2>
          <p className="text-muted-foreground mt-4 mb-8">
            Experience the complete workflow by exploring each interface. 
            This demo runs entirely in your browser with simulated data.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/menu?table=table-1">
              <Button size="lg">
                Start with Customer View
              </Button>
            </Link>
            <Link to="/kitchen">
              <Button variant="outline" size="lg">
                View Kitchen Display
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-6xl mx-auto px-6 text-center text-sm text-muted-foreground">
          <p>DineFlow — Smart AI-Assisted Restaurant Workflow System</p>
          <p className="mt-2">Built with React, Tailwind CSS, and ❤️</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
