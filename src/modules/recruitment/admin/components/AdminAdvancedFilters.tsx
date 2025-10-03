// src/modules/recruitment/admin/components/AdminAdvancedFilters.tsx
import { useState } from 'react';
import { Filter, X, Calendar, Users, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface FilterOption {
  key: string;
  label: string;
  type: 'select' | 'date' | 'text' | 'multiselect';
  options?: { value: string; label: string }[];
  placeholder?: string;
}

interface AdminAdvancedFiltersProps {
  filters: FilterOption[];
  onFiltersChange: (filters: Record<string, any>) => void;
  onClearFilters: () => void;
  activeFilters: Record<string, any>;
}

export default function AdminAdvancedFilters({
  filters,
  onFiltersChange,
  onClearFilters,
  activeFilters
}: AdminAdvancedFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleFilterChange = (key: string, value: any) => {
    const newFilters = { ...activeFilters, [key]: value };
    if (!value || value === '') {
      delete newFilters[key];
    }
    onFiltersChange(newFilters);
  };

  const activeFilterCount = Object.keys(activeFilters).length;

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-600" />
            <CardTitle className="text-lg">Filtros Avanzados</CardTitle>
            {activeFilterCount > 0 && (
              <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                {activeFilterCount} activo{activeFilterCount !== 1 ? 's' : ''}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {activeFilterCount > 0 && (
              <Button variant="outline" size="sm" onClick={onClearFilters}>
                <X className="w-4 h-4 mr-1" />
                Limpiar
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Ocultar' : 'Mostrar'} Filtros
            </Button>
          </div>
        </div>
      </CardHeader>
      
      {isExpanded && (
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filters.map((filter) => (
              <div key={filter.key} className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  {filter.label}
                </label>
                
                {filter.type === 'text' && (
                  <Input
                    placeholder={filter.placeholder || `Buscar por ${filter.label.toLowerCase()}`}
                    value={activeFilters[filter.key] || ''}
                    onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                  />
                )}
                
                {filter.type === 'select' && (
                  <select
                    value={activeFilters[filter.key] || ''}
                    onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Todos</option>
                    {filter.options?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                )}
                
                {filter.type === 'date' && (
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      type="date"
                      value={activeFilters[filter.key] || ''}
                      onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                      className="pl-10"
                    />
                  </div>
                )}
                
                {filter.type === 'multiselect' && (
                  <div className="space-y-2">
                    {filter.options?.map((option) => (
                      <label key={option.value} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={(activeFilters[filter.key] || []).includes(option.value)}
                          onChange={(e) => {
                            const currentValues = activeFilters[filter.key] || [];
                            const newValues = e.target.checked
                              ? [...currentValues, option.value]
                              : currentValues.filter((v: string) => v !== option.value);
                            handleFilterChange(filter.key, newValues.length > 0 ? newValues : null);
                          }}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className="text-sm text-gray-700">{option.label}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Active Filters Summary */}
          {activeFilterCount > 0 && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-700">Filtros activos:</span>
                {Object.entries(activeFilters).map(([key, value]) => {
                  const filter = filters.find(f => f.key === key);
                  if (!filter || !value) return null;
                  
                  let displayValue = value;
                  if (filter.type === 'select' && filter.options) {
                    const option = filter.options.find(o => o.value === value);
                    displayValue = option?.label || value;
                  } else if (Array.isArray(value)) {
                    displayValue = value.length > 1 ? `${value.length} seleccionados` : value[0];
                  }
                  
                  return (
                    <span
                      key={key}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      <span className="font-medium">{filter.label}:</span>
                      <span>{displayValue}</span>
                      <button
                        onClick={() => handleFilterChange(key, null)}
                        className="ml-1 hover:bg-blue-200 rounded-full p-0.5"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </CardContent>
      )}
    </Card>
  );
}