'use client';

import { useState, useMemo } from 'react';
import {
  Briefcase,
  Search,
  Filter,
  Download,
  Grid3x3,
  List,
  SortAsc,
  SortDesc,
  FileText,
  Folder,
  Link,
  Star,
  Clock,
  TrendingUp,
  ChevronDown,
  Plus,
  X,
  FileSpreadsheet,
  Presentation,
  Files,
  Image,
  File,
  Minimize2,
  Settings
} from 'lucide-react';

interface ProjectResource {
  id: string;
  name: string;
  description: string;
  link: string;
  type: 'doc' | 'sheet' | 'slide' | 'pdf' | 'other';
  category: 'Tools' | 'Branding' | 'Security' | 'Documentation' | 'Analytics' | 'UX/UI' | 'Marketing' | 'Other';
  lastAccessed: Date;
  isFavorite: boolean;
  accessCount: number;
  tags: string[];
}

type ViewMode = 'grid' | 'list' | 'minimalist';
type SortBy = 'name' | 'lastAccessed' | 'accessCount';
type SortOrder = 'asc' | 'desc';
type ResourceCategory = ProjectResource['category'] | 'All';

interface FilterState {
  search: string;
  showFavorites: boolean;
  tags: string[];
}

interface CustomCategory {
  id: string;
  label: string;
  icon: string;
  color: string;
  bgColor: string;
}

const tabs = [
  { id: 'All', label: 'All Resources', icon: Files, color: 'text-gray-600', bgColor: 'bg-gray-100' },
  { id: 'Tools', label: 'Tools', icon: Briefcase, color: 'text-indigo-600', bgColor: 'bg-indigo-50' },
  { id: 'Branding', label: 'Branding', icon: Image, color: 'text-purple-600', bgColor: 'bg-purple-50' },
  { id: 'Security', label: 'Security', icon: FileText, color: 'text-red-600', bgColor: 'bg-red-50' },
  { id: 'Documentation', label: 'Documentation', icon: FileText, color: 'text-blue-600', bgColor: 'bg-blue-50' },
  { id: 'Analytics', label: 'Analytics', icon: TrendingUp, color: 'text-green-600', bgColor: 'bg-green-50' },
  { id: 'UX/UI', label: 'UX/UI', icon: Image, color: 'text-pink-600', bgColor: 'bg-pink-50' },
  { id: 'Marketing', label: 'Marketing', icon: Star, color: 'text-orange-600', bgColor: 'bg-orange-50' }
];

const availableTags = ['handbook', 'tools', 'guidelines', 'security', 'protocols', 'template', 'communication', 'presentation', 'branding', 'jira', 'figma', 'analytics', 'metrics', 'dashboard', 'ux', 'ui', 'design', 'wireframes', 'prototypes', 'marketing', 'campaigns', 'social-media'];

const mockProjectResources = [
  {
    id: 'res-1',
    name: 'Manual de Herramientas del Proyecto',
    description: 'Guía de uso para las principales herramientas de software del equipo, incluyendo Jira y Figma.',
    link: 'https://docs.google.com/document/d/res1_tools',
    type: 'doc' as const,
    category: 'Tools' as const,
    lastAccessed: new Date('2025-10-01T10:00:00'),
    isFavorite: true,
    accessCount: 45,
    tags: ['tools', 'jira', 'figma', 'handbook']
  },
  {
    id: 'res-2',
    name: 'Guía de Estilo de la Marca',
    description: 'Lineamientos oficiales para el uso de la marca, colores y tipografía del proyecto Alpha.',
    link: 'https://docs.google.com/document/d/res2_styleguide',
    type: 'pdf' as const,
    category: 'Branding' as const,
    lastAccessed: new Date('2025-09-28T14:30:00'),
    isFavorite: false,
    accessCount: 88,
    tags: ['branding', 'guidelines', 'template']
  },
  {
    id: 'res-3',
    name: 'Procedimientos de Seguridad y Datos',
    description: 'Protocolos obligatorios para la gestión de datos sensibles.',
    link: 'https://docs.google.com/document/d/res3_security',
    type: 'doc' as const,
    category: 'Security' as const,
    lastAccessed: new Date('2025-10-03T09:15:00'),
    isFavorite: true,
    accessCount: 62,
    tags: ['security', 'protocols', 'handbook']
  },
  {
    id: 'res-4',
    name: 'Plan de Comunicación Semanal (Q4)',
    description: 'Hoja de cálculo para el seguimiento y planificación de comunicaciones.',
    link: 'https://docs.google.com/spreadsheets/d/res4_comms',
    type: 'sheet' as const,
    category: 'Documentation' as const,
    lastAccessed: new Date('2025-10-03T11:45:00'),
    isFavorite: false,
    accessCount: 21,
    tags: ['communication', 'template']
  },
  {
    id: 'res-5',
    name: 'Presentación de Avance del Proyecto',
    description: 'Presentación clave para la próxima reunión con los stakeholders.',
    link: 'https://docs.google.com/presentation/d/res5_status',
    type: 'slide' as const,
    category: 'Documentation' as const,
    lastAccessed: new Date('2025-09-20T16:00:00'),
    isFavorite: true,
    accessCount: 30,
    tags: ['presentation', 'template']
  },
  {
    id: 'res-6',
    name: 'Dashboard de Métricas del Proyecto',
    description: 'Panel analítico con KPIs principales y métricas de rendimiento del equipo.',
    link: 'https://docs.google.com/spreadsheets/d/res6_analytics',
    type: 'sheet' as const,
    category: 'Analytics' as const,
    lastAccessed: new Date('2025-10-02T14:20:00'),
    isFavorite: true,
    accessCount: 72,
    tags: ['analytics', 'metrics', 'dashboard']
  },
  {
    id: 'res-7',
    name: 'Wireframes y Prototipos UI',
    description: 'Diseños de interfaz y flujos de usuario para la nueva plataforma.',
    link: 'https://www.figma.com/file/ux-ui-wireframes',
    type: 'other' as const,
    category: 'UX/UI' as const,
    lastAccessed: new Date('2025-10-04T09:30:00'),
    isFavorite: false,
    accessCount: 56,
    tags: ['ux', 'ui', 'design', 'wireframes', 'prototypes']
  },
  {
    id: 'res-8',
    name: 'Estrategia de Marketing Q4 2025',
    description: 'Plan de marketing y campañas para el último trimestre del año.',
    link: 'https://docs.google.com/presentation/d/res8_marketing',
    type: 'slide' as const,
    category: 'Marketing' as const,
    lastAccessed: new Date('2025-09-30T16:45:00'),
    isFavorite: true,
    accessCount: 41,
    tags: ['marketing', 'campaigns', 'template']
  },
  {
    id: 'res-9',
    name: 'Guía de Investigación de Usuarios',
    description: 'Metodologías y plantillas para realizar investigación UX efectiva.',
    link: 'https://docs.google.com/document/d/res9_ux_research',
    type: 'doc' as const,
    category: 'UX/UI' as const,
    lastAccessed: new Date('2025-09-25T11:00:00'),
    isFavorite: false,
    accessCount: 38,
    tags: ['ux', 'guidelines', 'handbook']
  },
  {
    id: 'res-10',
    name: 'Reporte de Análisis de Datos Mensuales',
    description: 'Informe detallado con análisis de datos y tendencias del mes.',
    link: 'https://docs.google.com/document/d/res10_data_analysis',
    type: 'pdf' as const,
    category: 'Analytics' as const,
    lastAccessed: new Date('2025-10-01T08:15:00'),
    isFavorite: false,
    accessCount: 52,
    tags: ['analytics', 'metrics', 'template']
  }
];

const formatDate = (date: Date): string => {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }).format(date);
};

const getResourceIcon = (type: ProjectResource['type'], size: 'sm' | 'md' = 'md') => {
  const iconClass = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
  switch (type) {
    case 'doc': return <FileText className={`${iconClass} text-blue-500`} />;
    case 'sheet': return <FileSpreadsheet className={`${iconClass} text-green-500`} />;
    case 'slide': return <Presentation className={`${iconClass} text-orange-500`} />;
    case 'pdf': return <FileText className={`${iconClass} text-red-500`} />;
    default: return <File className={`${iconClass} text-gray-500`} />;
  }
};

const StatsCard = ({ icon: Icon, label, value, trend, color = 'indigo' }: { 
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    value: string | number;
    trend?: string;
    color?: string;
  }) => (
    <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <Icon className={`w-5 h-5 text-${color}-500`} />
        {trend && (
          <span className="text-xs font-medium text-green-600 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            {trend}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-sm text-gray-600">{label}</p>
    </div>
  );

const ResourceCard = ({ resource, onToggleFavorite, onOpenResource }: {
  resource: ProjectResource;
  onToggleFavorite: (id: string) => void;
  onOpenResource: (link: string, id: string) => void;
}) => (
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group">
    <div className="p-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-transparent">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="p-2 bg-white rounded-lg shadow-sm">
            {getResourceIcon(resource.type)}
          </div>
          <div className="flex-1 min-w-0">
            <h3 
              className="font-semibold text-gray-900 truncate group-hover:text-indigo-600 transition-colors cursor-pointer"
              onClick={() => onOpenResource(resource.link, resource.id)}
            >
              {resource.name}
            </h3>
            <p className="text-xs text-indigo-500 mt-1">{resource.category}</p>
          </div>
        </div>
        <button onClick={() => onToggleFavorite(resource.id)} className="p-1 hover:bg-gray-100 rounded transition-colors">
          <Star className={`w-5 h-5 ${resource.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
        </button>
      </div>
    </div>
    <div className="p-4">
      <p className="text-sm text-gray-600 mb-3 line-clamp-2">{resource.description}</p>
      <div className="flex flex-wrap gap-1 mb-3">
        {resource.tags.slice(0, 3).map(tag => (
          <span key={tag} className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-xs rounded-full">{tag}</span>
        ))}
        {resource.tags.length > 3 && (
          <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">+{resource.tags.length - 3}</span>
        )}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-gray-500 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{formatDate(resource.lastAccessed)}</span>
        </div>
        <div className="flex items-center gap-1">
          <TrendingUp className="w-3 h-3 text-green-500" />
          <span>{resource.accessCount} accesos</span>
        </div>
      </div>
    </div>
    <div className="p-4 bg-gray-50 border-t border-gray-100 flex gap-2">
      <a
        href={resource.link}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => onOpenResource(resource.link, resource.id)}
        className="flex-1 px-3 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
      >
        <Link className="w-4 h-4" />
        Abrir
      </a>
      <button className="px-3 py-2 bg-white border border-gray-200 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colors">
        <Download className="w-4 h-4" />
      </button>
    </div>
  </div>
);

const ResourceListItem = ({ resource, onToggleFavorite, onOpenResource }: {
  resource: ProjectResource;
  onToggleFavorite: (id: string) => void;
  onOpenResource: (link: string, id: string) => void;
}) => (
  <div className="bg-white rounded-xl border border-gray-200 hover:shadow-md transition-all duration-200 p-4">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-gray-50 rounded-lg">{getResourceIcon(resource.type)}</div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h3 
              className="font-semibold text-gray-900 mb-1 hover:text-indigo-600 transition-colors cursor-pointer line-clamp-1"
              onClick={() => onOpenResource(resource.link, resource.id)}
            >
              {resource.name}
            </h3>
            <p className="text-sm text-gray-600 mb-2 line-clamp-1">{resource.description}</p>
            <div className="flex flex-wrap gap-1 mb-2">
              {resource.tags.slice(0, 4).map(tag => (
                <span key={tag} className="px-2 py-0.5 bg-indigo-50 text-indigo-600 text-xs rounded-full">{tag}</span>
              ))}
            </div>
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
              <span className="flex items-center gap-1 text-indigo-500">
                <Folder className="w-3 h-3" />
                {resource.category}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {formatDate(resource.lastAccessed)}
              </span>
              <span className="flex items-center gap-1 text-green-600">
                <TrendingUp className="w-3 h-3" />
                {resource.accessCount} accesos
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <button onClick={() => onToggleFavorite(resource.id)} className="p-2 hover:bg-gray-100 rounded transition-colors">
              <Star className={`w-5 h-5 ${resource.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
            </button>
            <a
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => onOpenResource(resource.link, resource.id)}
              className="px-4 py-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors flex items-center gap-2"
            >
              <Link className="w-4 h-4" />
              Abrir
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const ResourceMinimalistItem = ({ resource, onToggleFavorite, onOpenResource }: {
  resource: ProjectResource;
  onToggleFavorite: (id: string) => void;
  onOpenResource: (link: string, id: string) => void;
}) => (
  <div className="bg-white rounded-lg border border-gray-200 hover:border-indigo-400 hover:shadow-sm transition-all duration-150 p-3">
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {getResourceIcon(resource.type, 'sm')}
        <h3 
          className="font-medium text-gray-800 text-sm truncate hover:text-indigo-600 transition-colors cursor-pointer"
          onClick={() => onOpenResource(resource.link, resource.id)}
        >
          {resource.name}
        </h3>
        <span className="text-xs text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-full whitespace-nowrap hidden sm:inline-flex">
          {resource.category}
        </span>
      </div>
      <div className="flex items-center gap-3 flex-shrink-0">
        <div className="flex items-center gap-1 text-xs text-gray-500 hidden lg:flex">
          <Clock className="w-3 h-3" />
          <span>{formatDate(resource.lastAccessed)}</span>
        </div>
        <button onClick={() => onToggleFavorite(resource.id)} className="p-1 hover:bg-gray-100 rounded transition-colors">
          <Star className={`w-4 h-4 ${resource.isFavorite ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400'}`} />
        </button>
        <a
          href={resource.link}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => onOpenResource(resource.link, resource.id)}
          className="p-2 bg-indigo-600 text-white text-sm rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center"
        >
          <Link className="w-4 h-4" />
        </a>
      </div>
    </div>
  </div>
);

const TabSettingsModal = ({ isOpen, onClose, visibleTabs, onToggleTab, customCategories, onAddCategory, onDeleteCategory }: {
  isOpen: boolean;
  onClose: () => void;
  visibleTabs: string[];
  onToggleTab: (tabId: string) => void;
  customCategories: CustomCategory[];
  onAddCategory: (category: CustomCategory) => void;
  onDeleteCategory: (categoryId: string) => void;
}) => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newCategory, setNewCategory] = useState({
    label: '',
    icon: 'Briefcase',
    color: 'indigo',
    bgColor: 'bg-indigo-50'
  });

  const availableIcons = [
    { name: 'Briefcase', component: Briefcase },
    { name: 'FileText', component: FileText },
    { name: 'Star', component: Star },
    { name: 'TrendingUp', component: TrendingUp },
    { name: 'Image', component: Image },
    { name: 'Files', component: Files }
  ];

  const availableColors = [
    { name: 'indigo', color: 'text-indigo-600', bgColor: 'bg-indigo-50' },
    { name: 'purple', color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { name: 'pink', color: 'text-pink-600', bgColor: 'bg-pink-50' },
    { name: 'blue', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { name: 'green', color: 'text-green-600', bgColor: 'bg-green-50' },
    { name: 'yellow', color: 'text-yellow-600', bgColor: 'bg-yellow-50' },
    { name: 'orange', color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { name: 'red', color: 'text-red-600', bgColor: 'bg-red-50' }
  ];

  const handleCreateCategory = () => {
    if (!newCategory.label.trim()) return;
    
    const colorConfig = availableColors.find(c => c.name === newCategory.color);
    const category: CustomCategory = {
      id: `custom-${Date.now()}`,
      label: newCategory.label,
      icon: newCategory.icon,
      color: colorConfig?.color || 'text-indigo-600',
      bgColor: colorConfig?.bgColor || 'bg-indigo-50'
    };
    
    onAddCategory(category);
    setNewCategory({ label: '', icon: 'Briefcase', color: 'indigo', bgColor: 'bg-indigo-50' });
    setShowCreateForm(false);
  };

  const allTabs = [...tabs, ...customCategories.map(cat => ({
    id: cat.id,
    label: cat.label,
    icon: availableIcons.find(i => i.name === cat.icon)?.component || Briefcase,
    color: cat.color,
    bgColor: cat.bgColor
  }))];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Settings className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Personalizar Categorías</h2>
              <p className="text-sm text-gray-600">Selecciona y crea categorías personalizadas</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>
        
        <div className="p-6 overflow-y-auto max-h-[calc(80vh-140px)]">
          {showCreateForm ? (
            <div className="mb-6 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Crear Nueva Categoría</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de la Categoría</label>
                  <input
                    type="text"
                    value={newCategory.label}
                    onChange={(e) => setNewCategory(prev => ({ ...prev, label: e.target.value }))}
                    placeholder="Ej: Recursos Humanos, Finanzas..."
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Icono</label>
                  <div className="flex flex-wrap gap-2">
                    {availableIcons.map(icon => {
                      const IconComponent = icon.component;
                      return (
                        <button
                          key={icon.name}
                          onClick={() => setNewCategory(prev => ({ ...prev, icon: icon.name }))}
                          className={`p-3 rounded-lg border-2 transition-all ${
                            newCategory.icon === icon.name
                              ? 'border-indigo-500 bg-indigo-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <IconComponent className="w-5 h-5" />
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                  <div className="flex flex-wrap gap-2">
                    {availableColors.map(colorOption => (
                      <button
                        key={colorOption.name}
                        onClick={() => setNewCategory(prev => ({ ...prev, color: colorOption.name, bgColor: colorOption.bgColor }))}
                        className={`w-10 h-10 rounded-lg border-2 transition-all ${colorOption.bgColor} ${
                          newCategory.color === colorOption.name
                            ? 'border-gray-900 scale-110'
                            : 'border-gray-200 hover:scale-105'
                        }`}
                      >
                        <div className={`w-full h-full rounded-md ${colorOption.color.replace('text-', 'bg-')}`}></div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={handleCreateCategory}
                    disabled={!newCategory.label.trim()}
                    className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
                  >
                    Crear Categoría
                  </button>
                  <button
                    onClick={() => {
                      setShowCreateForm(false);
                      setNewCategory({ label: '', icon: 'Briefcase', color: 'indigo', bgColor: 'bg-indigo-50' });
                    }}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              onClick={() => setShowCreateForm(true)}
              className="w-full mb-6 p-4 border-2 border-dashed border-indigo-300 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 transition-all text-indigo-600 font-medium flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Crear Nueva Categoría
            </button>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {allTabs.map(tab => {
              if (tab.id === 'All') return null;
              const isVisible = visibleTabs.includes(tab.id);
              const isCustom = tab.id.startsWith('custom-');
              const TabIcon = tab.icon;
              
              return (
                <div key={tab.id} className="relative">
                  <button
                    onClick={() => onToggleTab(tab.id)}
                    className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                      isVisible 
                        ? `${tab.bgColor} border-current ${tab.color}` 
                        : 'bg-gray-50 border-gray-200 text-gray-400 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isVisible ? 'bg-white shadow-sm' : 'bg-gray-200'}`}>
                        <TabIcon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{tab.label}</h3>
                        <p className="text-xs opacity-75">
                          {isCustom && '(Personalizada) '}{isVisible ? 'Visible' : 'Oculta'}
                        </p>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isVisible ? 'bg-current border-current' : 'border-gray-300'
                      }`}>
                        {isVisible && (
                          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                    </div>
                  </button>
                  {isCustom && (
                    <button
                      onClick={() => onDeleteCategory(tab.id)}
                      className="absolute top-2 right-2 p-1 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                      title="Eliminar categoría"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex gap-2">
              <div className="flex-shrink-0">
                <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-semibold text-blue-900">Nota:</h4>
                <p className="text-sm text-blue-800 mt-1">
                  Puedes crear categorías personalizadas para organizar mejor tus recursos. Las categorías personalizadas se pueden eliminar haciendo clic en la X.
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-6 border-t border-gray-200 bg-gray-50 flex gap-3">
          <button
            onClick={() => {
              const allTabIds = allTabs.filter(t => t.id !== 'All').map(t => t.id);
              allTabIds.forEach(id => {
                if (!visibleTabs.includes(id)) {
                  onToggleTab(id);
                }
              });
            }}
            className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            Seleccionar Todas
          </button>
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default function VolunteerProjectResourcesPage() {
  const [resources, setResources] = useState(mockProjectResources);
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState('minimalist');
  const [sortBy, setSortBy] = useState('lastAccessed');
  const [sortOrder, setSortOrder] = useState('desc');
  const [filters, setFilters] = useState<FilterState>({ search: '', showFavorites: false, tags: [] });
  const [showFilters, setShowFilters] = useState(false);
  const [showTabSettings, setShowTabSettings] = useState(false);
  const [visibleTabs, setVisibleTabs] = useState(['Tools', 'Branding', 'Security', 'Documentation', 'Analytics', 'UX/UI', 'Marketing']);
  const [customCategories, setCustomCategories] = useState<CustomCategory[]>([]);

  const resourceCounts = useMemo(() => {
    const allCategories = [...tabs.map(t => t.id), ...customCategories.map(c => c.id)];
    const counts: Record<string, number> = {};
    
    allCategories.forEach(catId => {
      if (catId === 'All') {
        counts[catId] = resources.length;
      } else {
        counts[catId] = resources.filter(r => r.category === catId).length;
      }
    });
    
    return counts;
  }, [resources, customCategories]);

  const filteredResources = useMemo(() => {
    let filtered = [...resources];
    if (activeCategory !== 'All') filtered = filtered.filter(r => r.category === activeCategory);
    if (filters.search) filtered = filtered.filter(r => r.name.toLowerCase().includes(filters.search.toLowerCase()) || r.description.toLowerCase().includes(filters.search.toLowerCase()));
    if (filters.showFavorites) filtered = filtered.filter(r => r.isFavorite);
    if (filters.tags.length > 0) filtered = filtered.filter(r => filters.tags.some(tag => r.tags.includes(tag)));
    filtered.sort((a, b) => {
      let comparison = 0;
      if (sortBy === 'name') comparison = a.name.localeCompare(b.name);
      else if (sortBy === 'lastAccessed') comparison = a.lastAccessed.getTime() - b.lastAccessed.getTime();
      else if (sortBy === 'accessCount') comparison = a.accessCount - b.accessCount;
      return sortOrder === 'asc' ? comparison : -comparison;
    });
    return filtered;
  }, [resources, activeCategory, sortBy, sortOrder, filters]);

  const handleToggleFavorite = (id: string) => {
    setResources(res => res.map(r => r.id === id ? { ...r, isFavorite: !r.isFavorite } : r));
  };

  const handleOpenResource = (link: string, id: string) => {
    setResources(res => res.map(r => r.id === id ? { ...r, lastAccessed: new Date(), accessCount: r.accessCount + 1 } : r));
  };

  const toggleTag = (tag: string) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) ? prev.tags.filter(t => t !== tag) : [...prev.tags, tag]
    }));
  };

  const toggleVisibleTab = (tabId: string) => {
    setVisibleTabs(prev => 
      prev.includes(tabId) 
        ? prev.filter(id => id !== tabId)
        : [...prev, tabId]
    );
  };

  const handleAddCategory = (category: CustomCategory) => {
    setCustomCategories(prev => [...prev, category]);
    setVisibleTabs(prev => [...prev, category.id]);
  };

  const handleDeleteCategory = (categoryId: string) => {
    setCustomCategories(prev => prev.filter(c => c.id !== categoryId));
    setVisibleTabs(prev => prev.filter(id => id !== categoryId));
    if (activeCategory === categoryId) {
      setActiveCategory('All');
    }
  };

  const clearFilters = () => {
    setActiveCategory('All');
    setFilters({ search: '', showFavorites: false, tags: [] });
  };

  const stats = {
    totalResources: resources.length,
    favorites: resources.filter(r => r.isFavorite).length,
    totalAccesses: resources.reduce((sum, r) => sum + r.accessCount, 0),
    mostAccessed: resources.reduce((max, r) => Math.max(max, r.accessCount), 0)
  };

  const isFilterActive = filters.search || filters.showFavorites || filters.tags.length > 0;

  const availableIcons = [
    { name: 'Briefcase', component: Briefcase },
    { name: 'FileText', component: FileText },
    { name: 'Star', component: Star },
    { name: 'TrendingUp', component: TrendingUp },
    { name: 'Image', component: Image },
    { name: 'Files', component: Files }
  ];

  const visibleTabsList = useMemo(() => {
    const customTabs = customCategories.map(cat => ({
      id: cat.id,
      label: cat.label,
      icon: availableIcons.find(i => i.name === cat.icon)?.component || Briefcase,
      color: cat.color,
      bgColor: cat.bgColor
    }));
    
    const allTabs = [...tabs, ...customTabs];
    return allTabs.filter(tab => tab.id === 'All' || visibleTabs.includes(tab.id));
  }, [visibleTabs, customCategories, availableIcons]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <TabSettingsModal 
        isOpen={showTabSettings} 
        onClose={() => setShowTabSettings(false)}
        visibleTabs={visibleTabs}
        onToggleTab={toggleVisibleTab}
        customCategories={customCategories}
        onAddCategory={handleAddCategory}
        onDeleteCategory={handleDeleteCategory}
      />
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl shadow-lg">
              <Briefcase className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Recursos del Proyecto</h1>
              <p className="text-gray-600 mt-1">Guías esenciales y manuales de referencia para la operación del proyecto.</p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            <StatsCard icon={Files} label="Recursos Totales" value={stats.totalResources} color="indigo" />
            <StatsCard icon={Star} label="Favoritos" value={stats.favorites} color="yellow" />
            <StatsCard icon={TrendingUp} label="Total Accesos" value={stats.totalAccesses} trend="+15%" color="green" />
            <StatsCard icon={Clock} label="Más Popular" value={stats.mostAccessed} color="blue" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-gray-50">
            <h3 className="text-sm font-semibold text-gray-700">Categorías</h3>
            <button
              onClick={() => setShowTabSettings(true)}
              className="flex items-center gap-2 px-3 py-1.5 text-sm bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Settings className="w-4 h-4" />
              Personalizar
            </button>
          </div>
          <div className="flex overflow-x-auto scrollbar-hide">
            {visibleTabsList.map((tab) => {
              const count = resourceCounts[tab.id];
              const isActive = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategory(tab.id)}
                  className={`flex items-center gap-2 px-6 py-4 font-medium transition-all whitespace-nowrap border-b-2 flex-shrink-0 ${isActive ? `${tab.color} border-current ${tab.bgColor}` : 'text-gray-500 border-transparent hover:text-gray-700 hover:bg-gray-50'}`}
                >
                  <tab.icon className="w-5 h-5" />
                  <span>{tab.label}</span>
                  <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${isActive ? 'bg-white shadow-sm' : 'bg-gray-100 text-gray-600'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-wrap items-center gap-4 mb-4">
            <div className="flex-1 min-w-[300px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar recursos..."
                  value={filters.search}
                  onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                <List className="w-5 h-5" />
              </button>
              <button onClick={() => setViewMode('minimalist')} className={`p-2 rounded-lg transition-colors ${viewMode === 'minimalist' ? 'bg-indigo-100 text-indigo-600' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                <Minimize2 className="w-5 h-5" />
              </button>
            </div>
            <button onClick={() => setShowFilters(!showFilters)} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filtros
              <ChevronDown className={`w-4 h-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
            <button className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Añadir
            </button>
          </div>

          {showFilters && (
            <div className="pt-4 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ordenar por</label>
                  <div className="flex gap-2">
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500">
                      <option value="lastAccessed">Último Acceso</option>
                      <option value="name">Nombre</option>
                      <option value="accessCount">Popularidad</option>
                    </select>
                    <button onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')} className="px-3 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
                      {sortOrder === 'asc' ? <SortAsc className="w-5 h-5" /> : <SortDesc className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Filtrar por Tags</label>
                <div className="flex flex-wrap gap-2">
                  {availableTags.slice(0, 10).map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 rounded-full text-sm transition-colors ${filters.tags.includes(tag) ? 'bg-indigo-100 text-indigo-700 border-2 border-indigo-500' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                    >
                      {tag}
                      {filters.tags.includes(tag) && <X className="inline w-3 h-3 ml-1" />}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.showFavorites}
                    onChange={(e) => setFilters(prev => ({ ...prev, showFavorites: e.target.checked }))}
                    className="w-4 h-4 text-indigo-600 rounded focus:ring-2 focus:ring-indigo-500"
                  />
                  <Star className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium text-gray-700">Solo Favoritos</span>
                </label>
                <button onClick={clearFilters} className="text-sm text-indigo-600 hover:text-indigo-700 font-medium">
                  Limpiar
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Mostrando <span className="font-semibold">{filteredResources.length}</span> de <span className="font-semibold">{resourceCounts[activeCategory]}</span> recursos
          </p>
          {(isFilterActive || activeCategory !== 'All') && (
            <button onClick={clearFilters} className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1">
              <X className="w-4 h-4" />
              Limpiar Filtros
            </button>
          )}
        </div>

        {filteredResources.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
            <div className="max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto mb-4 flex items-center justify-center bg-gray-100 rounded-full">
                <FileText className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No se encontraron recursos</h3>
              <p className="text-gray-600 mb-6">Intenta ajustar los filtros o búsqueda.</p>
              <button onClick={clearFilters} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
                Limpiar Filtros
              </button>
            </div>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map(r => (
              <ResourceCard key={r.id} resource={r} onToggleFavorite={handleToggleFavorite} onOpenResource={handleOpenResource} />
            ))}
          </div>
        ) : viewMode === 'list' ? (
          <div className="space-y-3">
            {filteredResources.map(r => (
              <ResourceListItem key={r.id} resource={r} onToggleFavorite={handleToggleFavorite} onOpenResource={handleOpenResource} />
            ))}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredResources.map(r => (
              <ResourceMinimalistItem key={r.id} resource={r} onToggleFavorite={handleToggleFavorite} onOpenResource={handleOpenResource} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}