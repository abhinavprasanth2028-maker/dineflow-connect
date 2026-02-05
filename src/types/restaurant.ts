// DineFlow Type Definitions

export type OrderStatus = 'pending' | 'preparing' | 'ready' | 'delivered';

export type TableStatus = 'available' | 'occupied' | 'needs-attention' | 'reserved';

export type MenuCategory = 'appetizers' | 'mains' | 'desserts' | 'beverages' | 'specials';

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image?: string;
  available: boolean;
  preparationTime: number; // in minutes
  tags?: string[];
}

export interface OrderItem {
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
}

export interface Order {
  id: string;
  tableId: string;
  items: OrderItem[];
  status: OrderStatus;
  createdAt: Date;
  updatedAt: Date;
  totalAmount: number;
  priority: boolean;
  estimatedTime?: number;
}

export interface Table {
  id: string;
  number: number;
  capacity: number;
  status: TableStatus;
  currentOrderId?: string;
  section: string;
}

export interface CartItem extends OrderItem {}

export interface DailyStats {
  totalOrders: number;
  totalRevenue: number;
  avgOrderValue: number;
  peakHour: string;
  topItems: { name: string; count: number }[];
}

export interface Alert {
  id: string;
  type: 'order-ready' | 'help-requested' | 'new-order' | 'delay';
  tableId: string;
  message: string;
  timestamp: Date;
  acknowledged: boolean;
}
