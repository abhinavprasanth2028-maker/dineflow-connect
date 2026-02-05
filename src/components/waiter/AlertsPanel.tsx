import React from 'react';
import { Alert } from '@/types/restaurant';
import { useRestaurant } from '@/context/RestaurantContext';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Bell, CheckCircle, AlertCircle, Clock, ChefHat, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

interface AlertsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const alertIcons = {
  'order-ready': <ChefHat className="w-4 h-4" />,
  'help-requested': <AlertCircle className="w-4 h-4" />,
  'new-order': <Bell className="w-4 h-4" />,
  'delay': <Clock className="w-4 h-4" />,
};

const alertColors = {
  'order-ready': 'border-success/30 bg-success/10',
  'help-requested': 'border-destructive/30 bg-destructive/10',
  'new-order': 'border-info/30 bg-info/10',
  'delay': 'border-warning/30 bg-warning/10',
};

const AlertsPanel: React.FC<AlertsPanelProps> = ({ isOpen, onClose }) => {
  const { alerts, acknowledgeAlert, getTableById } = useRestaurant();
  
  const unacknowledgedAlerts = alerts.filter(a => !a.acknowledged);
  const acknowledgedAlerts = alerts.filter(a => a.acknowledged).slice(0, 5);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />
      
      {/* Panel */}
      <div 
        className={cn(
          "fixed right-0 top-0 h-full w-full max-w-md bg-card border-l border-border z-50 flex flex-col transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="relative">
              <Bell className="w-5 h-5 text-primary" />
              {unacknowledgedAlerts.length > 0 && (
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />
              )}
            </div>
            <h2 className="font-display text-xl font-semibold">Alerts</h2>
            <Badge variant="secondary">{unacknowledgedAlerts.length} new</Badge>
          </div>
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Alert List */}
        <div className="flex-1 overflow-y-auto">
          {unacknowledgedAlerts.length > 0 && (
            <div className="p-4 space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Unread
              </h3>
              {unacknowledgedAlerts.map((alert) => {
                const table = getTableById(alert.tableId);
                return (
                  <div 
                    key={alert.id}
                    className={cn(
                      "p-4 rounded-xl border animate-slide-in-right",
                      alertColors[alert.type]
                    )}
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5">
                        {alertIcons[alert.type]}
                      </span>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">
                          {alert.message}
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Table {table?.number} · {table?.section} · {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
                        </p>
                      </div>
                      <Button
                        size="icon-sm"
                        variant="ghost"
                        onClick={() => acknowledgeAlert(alert.id)}
                      >
                        <CheckCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {acknowledgedAlerts.length > 0 && (
            <div className="p-4 space-y-3 opacity-60">
              <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
                Recent
              </h3>
              {acknowledgedAlerts.map((alert) => {
                const table = getTableById(alert.tableId);
                return (
                  <div 
                    key={alert.id}
                    className="p-3 rounded-lg bg-muted/50"
                  >
                    <div className="flex items-start gap-3">
                      <span className="mt-0.5 text-muted-foreground">
                        {alertIcons[alert.type]}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm text-foreground">
                          {alert.message}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {formatDistanceToNow(alert.timestamp, { addSuffix: true })}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {alerts.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <Bell className="w-12 h-12 opacity-30 mb-4" />
              <p>No alerts</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AlertsPanel;
