import React, { useState } from 'react';
import { useRestaurant } from '@/context/RestaurantContext';
import MenuManager from '@/components/admin/MenuManager';
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LayoutDashboard, UtensilsCrossed, BarChart3, Settings, ChefHat, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const AdminPanel: React.FC = () => {
  const { orders, tables, dailyStats } = useRestaurant();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center">
                <LayoutDashboard className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold">Admin Panel</h1>
                <p className="text-sm text-muted-foreground">
                  Manage your restaurant
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="hidden md:flex items-center gap-3">
              <Link to="/kitchen">
                <Button variant="outline" size="sm">
                  <ChefHat className="w-4 h-4 mr-2" />
                  Kitchen
                </Button>
              </Link>
              <Link to="/waiter">
                <Button variant="outline" size="sm">
                  <Users className="w-4 h-4 mr-2" />
                  Waiter
                </Button>
              </Link>
              <Link to="/menu">
                <Button variant="outline" size="sm">
                  <UtensilsCrossed className="w-4 h-4 mr-2" />
                  Customer View
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <Tabs defaultValue="analytics" className="space-y-6">
          <TabsList className="bg-muted p-1">
            <TabsTrigger value="analytics" className="gap-2">
              <BarChart3 className="w-4 h-4" />
              Analytics
            </TabsTrigger>
            <TabsTrigger value="menu" className="gap-2">
              <UtensilsCrossed className="w-4 h-4" />
              Menu
            </TabsTrigger>
          </TabsList>

          <TabsContent value="analytics" className="mt-6">
            <AnalyticsDashboard />
          </TabsContent>

          <TabsContent value="menu" className="mt-6">
            <MenuManager />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default AdminPanel;
