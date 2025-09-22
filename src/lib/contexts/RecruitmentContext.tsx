// src/lib/contexts/RecruitmentContext.tsx
'use client';

import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { MockCandidate } from '@/lib/data/mockRecruitmentData';
import { User, RecruitmentFilters, Document } from '@/lib/types';

interface RecruitmentState {
  candidates: MockCandidate[];
  loading: boolean;
  error: string | null;
  filters: RecruitmentFilters;
}

type RecruitmentAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CANDIDATES'; payload: MockCandidate[] }
  | { type: 'UPDATE_CANDIDATE'; payload: { id: string; field: keyof MockCandidate; value: any } }
  | { type: 'DELETE_CANDIDATE'; payload: string }
  | { type: 'ADD_CANDIDATE'; payload: MockCandidate }
  | { type: 'UPDATE_FILTERS'; payload: Partial<RecruitmentState['filters']> };

interface RecruitmentContextType {
  state: RecruitmentState;
  updateCandidate: (id: string, field: keyof MockCandidate, value: any) => void;
  deleteCandidate: (id: string) => void;
  addCandidate: (candidate: MockCandidate) => void;
  updateFilters: (filters: Partial<RecruitmentState['filters']>) => void;
  refreshData: (userRole: User['role']) => Promise<void>;
}

const RecruitmentContext = createContext<RecruitmentContextType | undefined>(undefined);

const initialState: RecruitmentState = {
  candidates: [],
  loading: false,
  error: null,
  filters: {
    search: '',
    status: 'all',
    role: 'all',
    volunteerType: 'all',
  },
};

function recruitmentReducer(state: RecruitmentState, action: RecruitmentAction): RecruitmentState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_CANDIDATES':
      return { ...state, candidates: action.payload, loading: false, error: null };
    case 'UPDATE_CANDIDATE':
      return {
        ...state,
        candidates: state.candidates.map(candidate =>
          candidate.id === action.payload.id
            ? { ...candidate, [action.payload.field]: action.payload.value }
            : candidate
        ),
      };
    case 'DELETE_CANDIDATE':
      return {
        ...state,
        candidates: state.candidates.filter(candidate => candidate.id !== action.payload),
      };
    case 'ADD_CANDIDATE':
      return {
        ...state,
        candidates: [action.payload, ...state.candidates],
      };
    case 'UPDATE_FILTERS':
      return {
        ...state,
        filters: { ...state.filters, ...action.payload },
      };
    default:
      return state;
  }
}

export function RecruitmentProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(recruitmentReducer, initialState);

  const updateCandidate = useCallback((id: string, field: keyof MockCandidate, value: any) => {
    dispatch({ type: 'UPDATE_CANDIDATE', payload: { id, field, value } });
    
    // Here you would make an API call to persist the change
    // updateCandidateAPI(id, field, value).catch(error => {
    //   dispatch({ type: 'SET_ERROR', payload: 'Failed to update candidate' });
    // });
  }, []);

  const deleteCandidate = useCallback((id: string) => {
    dispatch({ type: 'DELETE_CANDIDATE', payload: id });
    
    // API call to delete
    // deleteCandidateAPI(id).catch(error => {
    //   dispatch({ type: 'SET_ERROR', payload: 'Failed to delete candidate' });
    // });
  }, []);

  const addCandidate = useCallback((candidate: MockCandidate) => {
    dispatch({ type: 'ADD_CANDIDATE', payload: candidate });
    
    // API call to add
    // addCandidateAPI(candidate).catch(error => {
    //   dispatch({ type: 'SET_ERROR', payload: 'Failed to add candidate' });
    // });
  }, []);

  const updateFilters = useCallback((filters: Partial<RecruitmentState['filters']>) => {
    dispatch({ type: 'UPDATE_FILTERS', payload: filters });
  }, []);

  const refreshData = useCallback(async (userRole: User['role']) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      // Simulate API call based on user role
      const { getMockRecruitmentData } = await import('@/lib/data/mockRecruitmentData');
      
      let candidates: MockCandidate[] = [];
      switch (userRole) {
        case 'admin':
          candidates = getMockRecruitmentData(100);
          break;
        case 'hr':
          candidates = getMockRecruitmentData(50);
          break;
        case 'lead_project':
          candidates = getMockRecruitmentData(15);
          break;
        case 'volunteer':
          candidates = getMockRecruitmentData(1);
          break;
        default:
          candidates = [];
      }
      
      dispatch({ type: 'SET_CANDIDATES', payload: candidates });
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to load candidates' 
      });
    }
  }, []);

  const value: RecruitmentContextType = {
    state,
    updateCandidate,
    deleteCandidate,
    addCandidate,
    updateFilters,
    refreshData,
  };

  return (
    <RecruitmentContext.Provider value={value}>
      {children}
    </RecruitmentContext.Provider>
  );
}

export function useRecruitment() {
  const context = useContext(RecruitmentContext);
  if (context === undefined) {
    throw new Error('useRecruitment must be used within a RecruitmentProvider');
  }
  return context;
}
