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
import '../../../styles/dashboard-admin.css';

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
        return 'health-status-good';
      case 'warning':
        return 'health-status-warning';
      case 'critical':
      case 'offline':
        return 'health-status-critical';
      case 'maintenance':
        return 'health-status-maintenance';
      default:
        return 'health-status-default';
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

  const getProgressBarColor = (status: string) => {
    switch (status) {
      case 'good':
        return 'health-progress-good';
      case 'warning':
        return 'health-progress-warning';
      case 'critical':
        return 'health-progress-critical';
      default:
        return 'health-progress-default';
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLastUpdate(new Date());
    setIsRefreshing(false);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="admin-health-card">
      <div className="admin-health-header">
        <h3 className="admin-health-title">
          <Activity className="admin-health-title-icon" />
          Estado del Sistema
        </h3>
        <div className="admin-health-update-info">
          <span className="admin-health-update-time">
            Actualizado: {lastUpdate.toLocaleTimeString('es-ES')}
          </span>
          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="admin-health-refresh-btn"
          >
            <RefreshCw className={`admin-health-refresh-icon ${isRefreshing ? 'admin-spin' : ''}`} />
          </button>
        </div>
      </div>

      {/* Estado general */}
      <div className="admin-health-status-banner">
        <CheckCircle className="admin-health-banner-icon" />
        <div>
          <p className="admin-health-banner-title">Sistema Operativo</p>
          <p className="admin-health-banner-subtitle">Todos los servicios funcionando correctamente</p>
        </div>
      </div>

      {/* Métricas del sistema */}
      <div className="admin-health-section">
        <h4 className="admin-health-section-title">Métricas del Servidor</h4>
        <div className="admin-health-metrics-grid">
          {systemMetrics.map((metric) => (
            <div key={metric.name} className="admin-health-metric-card">
              <div className="admin-health-metric-header">
                <div className="admin-health-metric-name">
                  <metric.icon className="admin-health-metric-icon" />
                  <span className="admin-health-metric-label">{metric.name}</span>
                </div>
                <span className={`admin-health-metric-badge ${getStatusColor(metric.status)}`}>
                  {metric.value}{metric.unit}
                </span>
              </div>
              <div className="admin-health-progress-track">
                <div 
                  className={`admin-health-progress-bar ${getProgressBarColor(metric.status)}`}
                  style={{ width: `${Math.min(metric.value, 100)}%` }}
                ></div>
              </div>
              <p className="admin-health-metric-description">{metric.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Estado de servicios */}
      <div className="admin-health-section">
        <h4 className="admin-health-section-title">Estado de Servicios</h4>
        <div className="admin-health-services-list">
          {services.map((service) => {
            const StatusIcon = getStatusIcon(service.status);
            return (
              <div key={service.name} className="admin-health-service-item">
                <div className="admin-health-service-info">
                  <service.icon className="admin-health-service-icon" />
                  <div>
                    <p className="admin-health-service-name">{service.name}</p>
                    <p className="admin-health-service-uptime">Uptime: {service.uptime}</p>
                  </div>
                </div>
                <div className="admin-health-service-status">
                  <span className="admin-health-response-time">{service.responseTime}ms</span>
                  <div className={`admin-health-status-badge ${getStatusColor(service.status)}`}>
                    <StatusIcon className="admin-health-status-icon" />
                    <span className="admin-health-status-text">{service.status}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Información adicional */}
      <div className="admin-health-footer">
        <div className="admin-health-footer-grid">
          <div className="admin-health-footer-item">
            <p className="admin-health-footer-value">24/7</p>
            <p className="admin-health-footer-label">Monitoreo activo</p>
          </div>
          <div className="admin-health-footer-item">
            <p className="admin-health-footer-value">99.9%</p>
            <p className="admin-health-footer-label">Uptime promedio</p>
          </div>
        </div>
      </div>

      {/* Acciones rápidas */}
      <div className="admin-health-actions">
        <button className="admin-health-action-btn">
          Ver logs detallados
        </button>
        <button className="admin-health-action-btn">
          Configurar alertas
        </button>
        <button className="admin-health-action-btn">
          Historial de incidentes
        </button>
      </div>
    </div>
  );
}