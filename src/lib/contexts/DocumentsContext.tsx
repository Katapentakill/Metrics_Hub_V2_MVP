// src/lib/contexts/DocumentsContext.tsx
'use client';

import React, { createContext, useContext, useReducer, useCallback } from 'react';
import { Document } from '@/lib/types';

// Extendemos el tipo Document existente para incluir campos adicionales del mock
interface MockDocument extends Omit<Document, 'type' | 'status'> {
  name: string;
  type: string;
  status: string;
  uploadDate: string;
  lastModifiedDate: string;
  version: string;
  uploadedBy: string;
}

interface DocumentsState {
  documents: MockDocument[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
}

type DocumentsAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_DOCUMENTS'; payload: DocumentsState['documents'] }
  | { type: 'ADD_DOCUMENT'; payload: DocumentsState['documents'][0] }
  | { type: 'UPDATE_DOCUMENT'; payload: { id: string; updates: Partial<DocumentsState['documents'][0]> } }
  | { type: 'DELETE_DOCUMENT'; payload: string }
  | { type: 'SET_SEARCH_TERM'; payload: string };

interface DocumentsContextType {
  state: DocumentsState;
  addDocument: (document: DocumentsState['documents'][0]) => void;
  updateDocument: (id: string, updates: Partial<DocumentsState['documents'][0]>) => void;
  deleteDocument: (id: string) => void;
  setSearchTerm: (term: string) => void;
  refreshDocuments: (allowedTypes: string[]) => Promise<void>;
}

const DocumentsContext = createContext<DocumentsContextType | undefined>(undefined);

const initialDocumentsState: DocumentsState = {
  documents: [],
  loading: false,
  error: null,
  searchTerm: '',
};

function documentsReducer(state: DocumentsState, action: DocumentsAction): DocumentsState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, loading: false };
    case 'SET_DOCUMENTS':
      return { ...state, documents: action.payload, loading: false, error: null };
    case 'ADD_DOCUMENT':
      return { ...state, documents: [action.payload, ...state.documents] };
    case 'UPDATE_DOCUMENT':
      return {
        ...state,
        documents: state.documents.map(doc =>
          doc.id === action.payload.id
            ? { ...doc, ...action.payload.updates }
            : doc
        ),
      };
    case 'DELETE_DOCUMENT':
      return {
        ...state,
        documents: state.documents.filter(doc => doc.id !== action.payload),
      };
    case 'SET_SEARCH_TERM':
      return { ...state, searchTerm: action.payload };
    default:
      return state;
  }
}

export function DocumentsProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(documentsReducer, initialDocumentsState);

  const addDocument = useCallback((document: DocumentsState['documents'][0]) => {
    dispatch({ type: 'ADD_DOCUMENT', payload: document });
  }, []);

  const updateDocument = useCallback((id: string, updates: Partial<DocumentsState['documents'][0]>) => {
    dispatch({ type: 'UPDATE_DOCUMENT', payload: { id, updates } });
  }, []);

  const deleteDocument = useCallback((id: string) => {
    dispatch({ type: 'DELETE_DOCUMENT', payload: id });
  }, []);

  const setSearchTerm = useCallback((term: string) => {
    dispatch({ type: 'SET_SEARCH_TERM', payload: term });
  }, []);

  const refreshDocuments = useCallback(async (allowedTypes: string[]) => {
    dispatch({ type: 'SET_LOADING', payload: true });
    
    try {
      const { mockDocuments } = await import('@/lib/data/mockDocuments');
      const filteredDocuments = mockDocuments.filter(doc => allowedTypes.includes(doc.type));
      dispatch({ type: 'SET_DOCUMENTS', payload: filteredDocuments });
    } catch (error) {
      dispatch({ 
        type: 'SET_ERROR', 
        payload: error instanceof Error ? error.message : 'Failed to load documents' 
      });
    }
  }, []);

  const value: DocumentsContextType = {
    state,
    addDocument,
    updateDocument,
    deleteDocument,
    setSearchTerm,
    refreshDocuments,
  };

  return (
    <DocumentsContext.Provider value={value}>
      {children}
    </DocumentsContext.Provider>
  );
}

export function useDocuments() {
  const context = useContext(DocumentsContext);
  if (context === undefined) {
    throw new Error('useDocuments must be used within a DocumentsProvider');
  }
  return context;
}