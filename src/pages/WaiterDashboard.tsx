import React, { useState, useMemo } from 'react';
import { useRestaurant } from '@/context/RestaurantContext';
import TableCard from '@/components/waiter/TableCard';
import AlertsPanel from '@/components/waiter/AlertsPanel';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Utensils, Users, CheckCircle, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

const WaiterDashboard: React.FC = () => {
  const { tables, alerts, orders } = useRestaurant();
  const [isAlertsOpen, setIsAlertsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | 'all'>('all');

  const unacknowledgedAlerts = alerts.filter(a => !a.acknowledged);
  
  const sections = useMemo(() => {
    const sectionSet = new Set(tables.map(t => t.section));
    return ['all', ...Array.from(sectionSet)];
  }, [tables]);

  const filteredTables = useMemo(() => {
    if (activeSection === 'all') return tables;
    return tables.filter(t => t.section === activeSection);
  }, [tables, activeSection]);

  const stats = useMemo(() => {
    const readyOrders = orders.filter(o => o.status === 'ready').length;
    const needsAttention = tables.filter(t => t.status === 'needs-attention').length;
    const occupied = tables.filter(t => t.status === 'occupied').length;
    return { readyOrders, needsAttention, occupied };
  }, [orders, tables]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Utensils className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold">Waiter Dashboard</h1>
                <p className="text-sm text-muted-foreground">
                  Manage tables and orders
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {/* Quick Stats */}
              <div className="hidden md:flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-success/10 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-success" />
                  <span className="text-sm font-medium">{stats.readyOrders} ready</span>
                </div>
                {stats.needsAttention > 0 && (
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-destructive/10 rounded-lg">
                    <AlertCircle className="w-4 h-4 text-destructive" />
                    <span className="text-sm font-medium">{stats.needsAttention} need help</span>
                  </div>
                )}
                <div className="flex items-center gap-2 px-3 py-1.5 bg-info/10 rounded-lg">
                  <Users className="w-4 h-4 text-info" />
                  <span className="text-sm font-medium">{stats.occupied} occupied</span>
                </div>
              </div>

              {/* Alerts Button */}
              <Button
                variant="glass"
                size="icon"
                className="relative"
                onClick={() => setIsAlertsOpen(true)}
              >
                <Bell className="w-5 h-5" />
                {unacknowledgedAlerts.length > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce-subtle">
                    {unacknowledgedAlerts.length}
                  </span>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Section Tabs */}
        <div className="px-6 pb-3 overflow-x-auto">
          <div className="flex gap-2">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all whitespace-nowrap",
                  activeSection === section
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                )}
              >
                {section === 'all' ? 'All Tables' : section}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Table Grid */}
      <main className="p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredTables.map((table) => (
            <TableCard key={table.id} table={table} />
          ))}
        </div>
      </main>

      {/* Alerts Panel */}
      <AlertsPanel 
        isOpen={isAlertsOpen}
        onClose={() => setIsAlertsOpen(false)}
      />
    </div>
  );
};

export default WaiterDashboard;
