// src/lib/hooks/useResource.ts
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';

type PermissionSet = {
  canView: boolean;
  canEdit: boolean;
  canDelete: boolean;
};

interface UseResourceOptions<T, F> {
  loader: () => Promise<T[]>;
  permissions: PermissionSet;
  filterFn?: (item: T, filters: F) => boolean;
  filters?: F;
}

export function useResource<T extends { id: string }, F = any>({
  loader,
  permissions,
  filterFn,
  filters,
}: UseResourceOptions<T, F>) {
  const [allItems, setAllItems] = useState<T[]>([]);
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // 🔄 cargar datos
  const loadItems = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await loader();
      setAllItems(data);
    } catch (err) {
      setError('Error al cargar datos');
    } finally {
      setLoading(false);
    }
  }, [loader]);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  // 🔍 filtrar datos
  useEffect(() => {
    if (filterFn && filters) {
      setItems(allItems.filter(item => filterFn(item, filters)));
    } else {
      setItems(allItems);
    }
  }, [allItems, filterFn, filters]);

  // ✏️ update genérico
  const updateItem = useCallback(
    async <K extends keyof T>(id: string, field: K, value: T[K]) => {
      if (!permissions.canEdit) {
        setError('No tienes permisos para editar');
        return;
      }
      setAllItems(prev =>
        prev.map(item => (item.id === id ? { ...item, [field]: value } : item))
      );
      try {
        // await apiUpdate(id, field, value); // <- implementar en cada caso
      } catch (err) {
        setError('Error al actualizar');
        loadItems(); // rollback
      }
    },
    [permissions.canEdit, loadItems]
  );

  return {
    items,
    allItems,
    loading,
    error,
    permissions,
    updateItem,
    reload: loadItems,
    total: allItems.length,
    filteredCount: items.length,
  };
}
