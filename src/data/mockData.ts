import { MenuItem, Table, Order, Alert, DailyStats } from '@/types/restaurant';

// Mock Menu Items
export const mockMenuItems: MenuItem[] = [
  // Appetizers
  {
    id: 'app-1',
    name: 'Truffle Arancini',
    description: 'Crispy risotto balls with black truffle and fontina cheese',
    price: 14,
    category: 'appetizers',
    available: true,
    preparationTime: 12,
    tags: ['vegetarian', 'popular']
  },
  {
    id: 'app-2',
    name: 'Tuna Tartare',
    description: 'Fresh ahi tuna with avocado, sesame, and citrus ponzu',
    price: 18,
    category: 'appetizers',
    available: true,
    preparationTime: 8,
    tags: ['gluten-free', 'seafood']
  },
  {
    id: 'app-3',
    name: 'Burrata Caprese',
    description: 'Creamy burrata with heirloom tomatoes and aged balsamic',
    price: 16,
    category: 'appetizers',
    available: true,
    preparationTime: 5,
    tags: ['vegetarian', 'gluten-free']
  },
  {
    id: 'app-4',
    name: 'Crispy Calamari',
    description: 'Lightly battered calamari with spicy aioli and lemon',
    price: 15,
    category: 'appetizers',
    available: true,
    preparationTime: 10,
    tags: ['seafood']
  },
  // Mains
  {
    id: 'main-1',
    name: 'Filet Mignon',
    description: '8oz prime beef tenderloin with truffle butter and roasted vegetables',
    price: 48,
    category: 'mains',
    available: true,
    preparationTime: 25,
    tags: ['signature', 'gluten-free']
  },
  {
    id: 'main-2',
    name: 'Pan-Seared Salmon',
    description: 'Atlantic salmon with lemon caper sauce and asparagus',
    price: 34,
    category: 'mains',
    available: true,
    preparationTime: 18,
    tags: ['seafood', 'healthy']
  },
  {
    id: 'main-3',
    name: 'Wild Mushroom Risotto',
    description: 'Arborio rice with porcini, shiitake, and parmesan foam',
    price: 28,
    category: 'mains',
    available: true,
    preparationTime: 20,
    tags: ['vegetarian', 'popular']
  },
  {
    id: 'main-4',
    name: 'Lobster Linguine',
    description: 'Fresh Maine lobster with cherry tomatoes in garlic white wine sauce',
    price: 42,
    category: 'mains',
    available: true,
    preparationTime: 22,
    tags: ['seafood', 'signature']
  },
  {
    id: 'main-5',
    name: 'Herb-Crusted Lamb',
    description: 'New Zealand lamb rack with mint pesto and potato gratin',
    price: 44,
    category: 'mains',
    available: true,
    preparationTime: 28,
    tags: ['signature']
  },
  // Desserts
  {
    id: 'des-1',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with molten center and vanilla gelato',
    price: 12,
    category: 'desserts',
    available: true,
    preparationTime: 15,
    tags: ['popular']
  },
  {
    id: 'des-2',
    name: 'Tiramisu',
    description: 'Classic Italian dessert with mascarpone and espresso',
    price: 11,
    category: 'desserts',
    available: true,
    preparationTime: 5,
    tags: ['vegetarian']
  },
  {
    id: 'des-3',
    name: 'Crème Brûlée',
    description: 'Vanilla custard with caramelized sugar crust',
    price: 10,
    category: 'desserts',
    available: true,
    preparationTime: 5,
    tags: ['gluten-free', 'vegetarian']
  },
  // Beverages
  {
    id: 'bev-1',
    name: 'Signature Sangria',
    description: 'Red wine with fresh fruits and brandy',
    price: 12,
    category: 'beverages',
    available: true,
    preparationTime: 3,
    tags: ['alcoholic']
  },
  {
    id: 'bev-2',
    name: 'Fresh Lemonade',
    description: 'House-made lemonade with mint',
    price: 6,
    category: 'beverages',
    available: true,
    preparationTime: 2,
    tags: ['non-alcoholic']
  },
  {
    id: 'bev-3',
    name: 'Espresso Martini',
    description: 'Vodka, coffee liqueur, and fresh espresso',
    price: 14,
    category: 'beverages',
    available: true,
    preparationTime: 4,
    tags: ['alcoholic', 'popular']
  },
  // Specials
  {
    id: 'spec-1',
    name: "Chef's Tasting Menu",
    description: 'Five-course seasonal tasting experience',
    price: 95,
    category: 'specials',
    available: true,
    preparationTime: 90,
    tags: ['signature', 'chef-special']
  },
];

// Mock Tables
export const mockTables: Table[] = [
  { id: 'table-1', number: 1, capacity: 2, status: 'occupied', section: 'Patio' },
  { id: 'table-2', number: 2, capacity: 2, status: 'available', section: 'Patio' },
  { id: 'table-3', number: 3, capacity: 4, status: 'occupied', section: 'Main' },
  { id: 'table-4', number: 4, capacity: 4, status: 'available', section: 'Main' },
  { id: 'table-5', number: 5, capacity: 4, status: 'needs-attention', section: 'Main' },
  { id: 'table-6', number: 6, capacity: 6, status: 'occupied', section: 'Main' },
  { id: 'table-7', number: 7, capacity: 6, status: 'reserved', section: 'Private' },
  { id: 'table-8', number: 8, capacity: 8, status: 'available', section: 'Private' },
  { id: 'table-9', number: 9, capacity: 2, status: 'occupied', section: 'Bar' },
  { id: 'table-10', number: 10, capacity: 2, status: 'available', section: 'Bar' },
];

// Mock Orders
export const mockOrders: Order[] = [
  {
    id: 'order-1',
    tableId: 'table-1',
    items: [
      { menuItem: mockMenuItems[0], quantity: 2 },
      { menuItem: mockMenuItems[4], quantity: 1 },
      { menuItem: mockMenuItems[13], quantity: 2 },
    ],
    status: 'preparing',
    createdAt: new Date(Date.now() - 15 * 60000),
    updatedAt: new Date(Date.now() - 5 * 60000),
    totalAmount: 90,
    priority: false,
    estimatedTime: 15,
  },
  {
    id: 'order-2',
    tableId: 'table-3',
    items: [
      { menuItem: mockMenuItems[2], quantity: 1 },
      { menuItem: mockMenuItems[6], quantity: 2 },
      { menuItem: mockMenuItems[9], quantity: 2 },
    ],
    status: 'pending',
    createdAt: new Date(Date.now() - 5 * 60000),
    updatedAt: new Date(Date.now() - 5 * 60000),
    totalAmount: 96,
    priority: true,
    estimatedTime: 25,
  },
  {
    id: 'order-3',
    tableId: 'table-6',
    items: [
      { menuItem: mockMenuItems[1], quantity: 2 },
      { menuItem: mockMenuItems[5], quantity: 3 },
      { menuItem: mockMenuItems[10], quantity: 3 },
    ],
    status: 'ready',
    createdAt: new Date(Date.now() - 35 * 60000),
    updatedAt: new Date(Date.now() - 2 * 60000),
    totalAmount: 171,
    priority: false,
  },
  {
    id: 'order-4',
    tableId: 'table-9',
    items: [
      { menuItem: mockMenuItems[14], quantity: 2 },
      { menuItem: mockMenuItems[3], quantity: 1 },
    ],
    status: 'preparing',
    createdAt: new Date(Date.now() - 10 * 60000),
    updatedAt: new Date(Date.now() - 8 * 60000),
    totalAmount: 43,
    priority: false,
    estimatedTime: 8,
  },
];

// Mock Alerts
export const mockAlerts: Alert[] = [
  {
    id: 'alert-1',
    type: 'order-ready',
    tableId: 'table-6',
    message: 'Order ready for Table 6',
    timestamp: new Date(Date.now() - 2 * 60000),
    acknowledged: false,
  },
  {
    id: 'alert-2',
    type: 'help-requested',
    tableId: 'table-5',
    message: 'Table 5 requested assistance',
    timestamp: new Date(Date.now() - 1 * 60000),
    acknowledged: false,
  },
  {
    id: 'alert-3',
    type: 'new-order',
    tableId: 'table-3',
    message: 'New priority order from Table 3',
    timestamp: new Date(Date.now() - 5 * 60000),
    acknowledged: true,
  },
];

// Mock Daily Stats
export const mockDailyStats: DailyStats = {
  totalOrders: 47,
  totalRevenue: 4250.00,
  avgOrderValue: 90.43,
  peakHour: '7:00 PM - 8:00 PM',
  topItems: [
    { name: 'Filet Mignon', count: 12 },
    { name: 'Wild Mushroom Risotto', count: 9 },
    { name: 'Chocolate Lava Cake', count: 8 },
    { name: 'Lobster Linguine', count: 7 },
    { name: 'Truffle Arancini', count: 6 },
  ],
};

// Generate unique ID
export const generateId = (prefix: string): string => {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};
