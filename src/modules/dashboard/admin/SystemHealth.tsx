// src/features/admin/SystemHealth.tsx
'use client';

import { 
  Activity, 
  Database, 
  Server, 
  Shield, 
  Wifi,
  HardDrive,
  Cpu,
  AlertCircle,
  CheckCircle,
  Clock,
  RefreshCw
} from 'lucide-react';
import { useState, useEffect } from 'react';

interface SystemMetric {
  name: string;
  value: number;
  status: 'good' | 'warning' | 'critical';
  unit: string;
  icon: any;
  description: string;
}

interface ServiceStatus {
  name: string;
  status: 'online' | 'offline' | 'maintenance';
  responseTime: number;
  uptime: string;
  icon: any;
}

export default function SystemHealth() {
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  const systemMetrics: SystemMetric[] = [
    {
      name: 'CPU',
      value: 45,
      status: 'good',
      unit: '%',
      icon: Cpu,
      description: 'Uso promedio del procesador'
    },
    {
      name: 'Memoria',
      value: 67,
      status: 'warning',
      unit: '%',
      icon: Server,
      description: 'Uso de memoria RAM'
    },
    {
      name: 'Disco',
      value: 34,
      status: 'good',
      unit: '%',
      icon: HardDrive,
      description: 'Espacio utilizado en disco'
    },
    {
      name: 'Base de Datos',
      value: 23,
      status: 'good',
      unit: 'MB',
      icon: Database,
      description: 'Tamaño actual de la BD'
    }
  ];

  const services: ServiceStatus[] = [
    {
      name: 'API Principal',
      status: 'online',
      responseTime: 45,
      uptime: '99.9%',
      icon: Server
    },
    {
      name: 'Base de Datos',
      status: 'online',
      responseTime: 12,
      uptime: '100%',
      icon: Database
    },
    {
      name: 'Sistema de Auth',
      status: 'online',
      responseTime: 23,
      uptime: '99.8%',
      icon: Shield
    },
    {
      name: 'Notificaciones',
      status: 'online',
      responseTime: 67,
      uptime: '98.5%',
      icon: Wifi
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good':
      case 'online':
        return 'text-green-600 bg-green-50';
      case 'warning':
        return 'text-yellow-600 bg-yellow-50';
      case 'critical':
      case 'offline':
        return 'text-red-600 bg-red-50';
      case 'maintenance':
        return 'text-blue-600 bg-blue-50';
      default:
        return 'text-slate-600 bg-slate-50';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good':
      case 'online':
        return CheckCircle;
      case 'warning':
        return AlertCircle;
      case 'critical':
      case 'offline':
        return AlertCircle;
      case 'maintenance':
        return Clock;
      default:
        return AlertCircle;
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simular actualización
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastUpdate(new Date());
    setIsRefreshing(false);
  };

  useEffect(() => {
    // Auto-refresh cada 30 segundos
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="card p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-800 flex items-center">
          <Activity className="w-5 h-5 mr-2 text-emerald-600" />
          Estado del Sistema
        </h3>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-500">
            Actualizado: {lastUpdate.toLocaleTimeString('es-ES')}
          </span>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-1 hover:bg-slate-100 rounded transition-colors"
          >
            <RefreshCw className={`w-4 h-4 text-slate-500 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Estado general */}
      <div className="flex items-center justify-center p-4 bg-green-50 rounded-lg border border-green-200">
        <CheckCircle className="w-6 h-6 text-green-600 mr-3" />
        <div>
          <p className="font-semibold text-green-800">Sistema Operativo</p>
          <p className="text-sm text-green-600">Todos los servicios funcionando correctamente</p>
        </div>
      </div>

      {/* Métricas del sistema */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-slate-700">Métricas del Servidor</h4>
        <div className="grid grid-cols-2 gap-4">
          {systemMetrics.map((metric) => (
            <div key={metric.name} className="p-3 bg-slate-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <metric.icon className="w-4 h-4 text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">{metric.name}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(metric.status)}`}>
                  {metric.value}{metric.unit}
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${
                    metric.status === 'good' ? 'bg-green-500' :
                    metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min(metric.value, 100)}%` }}
                ></div>
              </div>
              <p className="text-xs text-slate-500 mt-1">{metric.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Estado de servicios */}
      <div className="space-y-4">
        <h4 className="text-sm font-medium text-slate-700">Estado de Servicios</h4>
        <div className="space-y-2">
          {services.map((service) => {
            const StatusIcon = getStatusIcon(service.status);
            return (
              <div key={service.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <service.icon className="w-4 h-4 text-slate-600" />
                  <div>
                    <p className="text-sm font-medium text-slate-700">{service.name}</p>
                    <p className="text-xs text-slate-500">Uptime: {service.uptime}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-500">{service.responseTime}ms</span>
                  <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs ${getStatusColor(service.status)}`}>
                    <StatusIcon className="w-3 h-3" />
                    <span className="capitalize">{service.status}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Información adicional */}
      <div className="pt-4 border-t border-slate-200">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-sm font-semibold text-slate-800">24/7</p>
            <p className="text-xs text-slate-600">Monitoreo activo</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-800">99.9%</p>
            <p className="text-xs text-slate-600">Uptime promedio</p>
          </div>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="flex flex-wrap gap-2">
        <button className="px-3 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded-full transition-colors">
          Ver logs detallados
        </button>
        <button className="px-3 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded-full transition-colors">
          Configurar alertas
        </button>
        <button className="px-3 py-1 text-xs bg-slate-100 hover:bg-slate-200 rounded-full transition-colors">
          Historial de incidentes
        </button>
      </div>
    </div>
  );
}