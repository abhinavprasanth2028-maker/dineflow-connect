import React from 'react';
import { useRestaurant } from '@/context/RestaurantContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, ShoppingCart, TrendingUp, Clock, ArrowUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['hsl(24, 85%, 45%)', 'hsl(38, 92%, 50%)', 'hsl(142, 55%, 40%)', 'hsl(199, 89%, 48%)', 'hsl(150, 30%, 50%)'];

const AnalyticsDashboard: React.FC = () => {
  const { dailyStats, orders } = useRestaurant();

  // Calculate hourly data for bar chart
  const hourlyData = [
    { hour: '11AM', orders: 3 },
    { hour: '12PM', orders: 8 },
    { hour: '1PM', orders: 12 },
    { hour: '2PM', orders: 6 },
    { hour: '5PM', orders: 4 },
    { hour: '6PM', orders: 9 },
    { hour: '7PM', orders: 15 },
    { hour: '8PM', orders: 11 },
    { hour: '9PM', orders: 7 },
  ];

  const pieData = dailyStats.topItems.map((item, index) => ({
    name: item.name,
    value: item.count,
    color: COLORS[index % COLORS.length],
  }));

  // Order status distribution
  const statusData = [
    { name: 'Pending', value: orders.filter(o => o.status === 'pending').length, color: 'hsl(38, 92%, 50%)' },
    { name: 'Preparing', value: orders.filter(o => o.status === 'preparing').length, color: 'hsl(199, 89%, 48%)' },
    { name: 'Ready', value: orders.filter(o => o.status === 'ready').length, color: 'hsl(142, 55%, 40%)' },
    { name: 'Delivered', value: orders.filter(o => o.status === 'delivered').length, color: 'hsl(215, 20%, 65%)' },
  ].filter(s => s.value > 0);

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
            <DollarSign className="w-4 h-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-display font-bold">${dailyStats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <ArrowUp className="w-3 h-3 text-success" />
              <span className="text-success">12.5%</span> vs yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Orders
            </CardTitle>
            <ShoppingCart className="w-4 h-4 text-info" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-display font-bold">{dailyStats.totalOrders}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {orders.filter(o => o.status !== 'delivered').length} currently active
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Order Value
            </CardTitle>
            <TrendingUp className="w-4 h-4 text-warning" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-display font-bold">${dailyStats.avgOrderValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <ArrowUp className="w-3 h-3 text-success" />
              <span className="text-success">3.2%</span> vs last week
            </p>
          </CardContent>
        </Card>

        <Card className="glass-card">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Peak Hour
            </CardTitle>
            <Clock className="w-4 h-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-display font-bold">{dailyStats.peakHour.split('-')[0]}</div>
            <p className="text-xs text-muted-foreground mt-1">
              15 orders in peak
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hourly Orders Chart */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="font-display">Orders by Hour</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={hourlyData}>
                  <XAxis 
                    dataKey="hour" 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis 
                    stroke="hsl(var(--muted-foreground))"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'hsl(var(--card))',
                      border: '1px solid hsl(var(--border))',
                      borderRadius: '8px',
                    }}
                  />
                  <Bar 
                    dataKey="orders" 
                    fill="hsl(var(--primary))"
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Top Items Pie Chart */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="font-display">Top Selling Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center">
              <ResponsiveContainer width="50%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex-1 space-y-2">
                {pieData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm flex-1 truncate">{item.name}</span>
                    <span className="text-sm font-medium">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Orders */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="font-display">Recent Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orders.slice(0, 5).map((order) => (
              <div 
                key={order.id}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
              >
                <div className="flex items-center gap-4">
                  <span className="font-medium">
                    Order #{order.id.split('-')[1]}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    Table {order.tableId.split('-')[1]}
                  </span>
                  <span className="text-sm text-muted-foreground">
                    {order.items.length} items
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-semibold">${order.totalAmount.toFixed(2)}</span>
                  <span className={`text-xs px-2 py-1 rounded-full capitalize ${
                    order.status === 'pending' ? 'status-pending' :
                    order.status === 'preparing' ? 'status-preparing' :
                    order.status === 'ready' ? 'status-ready' : 'status-delivered'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AnalyticsDashboard;
