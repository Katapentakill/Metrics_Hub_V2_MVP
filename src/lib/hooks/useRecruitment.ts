// src/lib/hooks/useRecruitment.ts
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { MockCandidate, getMockRecruitmentData } from '@/lib/data/mockRecruitmentData';
import { User, RecruitmentFilters, RECRUITMENT_PERMISSIONS } from '@/lib/types';

interface UseRecruitmentProps {
  userRole: User['role'];
  userId?: string;
  initialData?: MockCandidate[];
}

export function useRecruitment({ userRole, userId, initialData = [] }: UseRecruitmentProps) {
  const [candidates, setCandidates] = useState<MockCandidate[]>(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<RecruitmentFilters>({
    searchTerm: '',
    status: [],
    role: [],
    volunteerType: [],
    dateRange: { start: '', end: '' },
    team: [],
  });

  const permissions = RECRUITMENT_PERMISSIONS[userRole];

  // Cargar candidatos según rol
  const loadCandidates = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      let data: MockCandidate[] = [];
      switch (userRole) {
        case 'admin':
          data = getMockRecruitmentData(100);
          break;
        case 'hr':
          data = getMockRecruitmentData(50);
          break;
        case 'lead_project':
          data = getMockRecruitmentData(15);
          break;
        case 'volunteer':
          data = getMockRecruitmentData(1);
          break;
        default:
          data = [];
      }
      setCandidates(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load candidates');
    } finally {
      setLoading(false);
    }
  }, [userRole]);

  // Filtrado de candidatos
  const filteredCandidates = useMemo(() => {
    let result = candidates;

    // Filtro por texto
    if (filters.searchTerm?.trim()) {
      const searchLower = filters.searchTerm.toLowerCase();
      result = result.filter(candidate =>
        candidate.name.toLowerCase().includes(searchLower) ||
        candidate.email.toLowerCase().includes(searchLower) ||
        candidate.appliedRole.toLowerCase().includes(searchLower)
      );
    }

    // Filtro por estados
    if (filters.status?.length) {
      result = result.filter(candidate =>
        filters.status.includes(candidate.applicationStatus)
      );
    }

    // Filtro por roles
    if (filters.role?.length) {
      result = result.filter(candidate =>
        filters.role.includes(candidate.appliedRole)
      );
    }

    // Filtro por tipo de voluntario
    if (filters.volunteerType?.length) {
      result = result.filter(candidate =>
        filters.volunteerType.includes(candidate.volunteerType)
      );
    }

    // Filtro por equipo
    if (filters.team?.length) {
      result = result.filter(candidate =>
        filters.team.includes(candidate.team)
      );
    }

    // Filtro por rango de fechas
    if (filters.dateRange.start || filters.dateRange.end) {
      result = result.filter(candidate => {
        const candidateDate = new Date(candidate.lastContact);
        const startDate = filters.dateRange.start ? new Date(filters.dateRange.start) : null;
        const endDate = filters.dateRange.end ? new Date(filters.dateRange.end) : null;

        if (startDate && candidateDate < startDate) return false;
        if (endDate && candidateDate > endDate) return false;
        return true;
      });
    }

    return result;
  }, [candidates, filters]);

  // Actualizar candidato
  const updateCandidate = useCallback(async (id: string, field: keyof MockCandidate, value: any) => {
    if (!permissions.canEdit) {
      setError('No tienes permisos para editar candidatos');
      return;
    }

    setCandidates(prev =>
      prev.map(candidate =>
        candidate.id === id
          ? { ...candidate, [field]: value }
          : candidate
      )
    );

    try {
      // await updateCandidateAPI(id, field, value);
    } catch (err) {
      setError('Error al actualizar candidato');
      loadCandidates();
    }
  }, [permissions.canEdit, loadCandidates]);

  // Eliminar candidato
  const deleteCandidate = useCallback(async (id: string) => {
    if (!permissions.canDelete) {
      setError('No tienes permisos para eliminar candidatos');
      return;
    }

    setCandidates(prev => prev.filter(candidate => candidate.id !== id));

    try {
      // await deleteCandidateAPI(id);
    } catch (err) {
      setError('Error al eliminar candidato');
      loadCandidates();
    }
  }, [permissions.canDelete, loadCandidates]);

  // Agregar candidato
  const addCandidate = useCallback(async (candidateData: Partial<MockCandidate>) => {
    if (!permissions.canCreate) {
      setError('No tienes permisos para crear candidatos');
      return;
    }

    const newCandidate: MockCandidate = {
      id: `candidate-${Date.now()}`,
      name: candidateData.name || '',
      email: candidateData.email || '',
      phone: candidateData.phone || '',
      role: candidateData.role || '',
      team: candidateData.team || '',
      applicationStatus: candidateData.applicationStatus || 'Application Received',
      toDo: candidateData.toDo || [],
      cvLink: candidateData.cvLink || '',
      timezone: candidateData.timezone || '',
      hrsWk: candidateData.hrsWk || 10,
      cptOptStatus: candidateData.cptOptStatus || 'No Required',
      appliedRole: candidateData.appliedRole || '',
      projectPreferences: candidateData.projectPreferences || [],
      linkedinUrl: candidateData.linkedinUrl || '',
      portfolioUrl: candidateData.portfolioUrl || '',
      githubUrl: candidateData.githubUrl || '',
      recruitmentStage: candidateData.recruitmentStage || 'Screening',
      lastContact: new Date(),
      interviewDate: candidateData.interviewDate || null,
      notes: candidateData.notes || '',
      volunteerType: candidateData.volunteerType || 'Regular',
      interviewAssigned: candidateData.interviewAssigned || null,
      supervisor: candidateData.supervisor || null,
      hrInterviewDate: candidateData.hrInterviewDate || null,
      pmInterviewDate: candidateData.pmInterviewDate || null,
      startDate: candidateData.startDate || null,
      endDate: candidateData.endDate || null,
      duration: candidateData.duration || '3 months',
      offerLetterStatus: candidateData.offerLetterStatus || 'Not Sent',
      offerLetterLink: candidateData.offerLetterLink || null,
      vaStatus: candidateData.vaStatus || 'Not Sent',
      vaLink: candidateData.vaLink || null,
      wlStatus: candidateData.wlStatus || 'Not Sent',
      wlLink: candidateData.wlLink || null,
    };

    setCandidates(prev => [newCandidate, ...prev]);

    try {
      // await addCandidateAPI(newCandidate);
    } catch (err) {
      setError('Error al agregar candidato');
      loadCandidates();
    }
  }, [permissions.canCreate, loadCandidates]);

  // Actualizar filtros
  const updateFilters = useCallback((newFilters: Partial<RecruitmentFilters>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Limpiar filtros
  const clearFilters = useCallback(() => {
    setFilters({
      searchTerm: '',
      status: [],
      role: [],
      volunteerType: [],
      dateRange: { start: '', end: '' },
      team: [],
    });
  }, []);

  // Cargar datos al montar
  useEffect(() => {
    if (initialData.length === 0) {
      loadCandidates();
    }
  }, [loadCandidates, initialData.length]);

  return {
    // Data
    candidates: filteredCandidates,
    allCandidates: candidates,
    loading,
    error,
    filters,
    permissions,

    // Actions
    updateCandidate,
    deleteCandidate,
    addCandidate,
    updateFilters,
    clearFilters,
    refetch: loadCandidates,

    // Computed
    totalCandidates: candidates.length,
    filteredCount: filteredCandidates.length,
  };
}
