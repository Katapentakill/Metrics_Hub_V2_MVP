// src/modules/recruitment/shared/CandidateEditForm.tsx
import React, { useState } from 'react';
import { MockCandidate } from '@/lib/data/mockRecruitmentData';
import { FormField } from './FormField';
import { validateCandidateUpdate, CandidateUpdateData } from '@/lib/validation/recruitmentValidation';
import { Save, X } from 'lucide-react';

interface CandidateEditFormProps {
  candidate: MockCandidate;
  onSave: (data: Partial<MockCandidate>) => Promise<void>;
  onCancel: () => void;
  isSubmitting?: boolean;
}

export function CandidateEditForm({ 
  candidate, 
  onSave, 
  onCancel, 
  isSubmitting = false 
}: CandidateEditFormProps) {
  const [formData, setFormData] = useState<Partial<CandidateUpdateData>>({
    name: candidate.name,
    email: candidate.email,
    phone: candidate.phone,
    timezone: candidate.timezone,
    team: candidate.team,
    hrsWk: candidate.hrsWk,
    duration: candidate.duration,
    notes: candidate.notes,
    hrInterviewDate: candidate.hrInterviewDate,
    pmInterviewDate: candidate.pmInterviewDate,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const handleFieldChange = (field: keyof CandidateUpdateData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
    
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: keyof CandidateUpdateData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    
    // Validate single field
    const fieldData = { [field]: formData[field] };
    const validation = validateCandidateUpdate(fieldData);
    
    if (!validation.success && validation.errors[field]) {
      setErrors(prev => ({ ...prev, [field]: validation.errors[field] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateCandidateUpdate(formData);
    
    if (!validation.success) {
      setErrors(validation.errors);
      // Mark all fields as touched to show errors
      const touchedFields = Object.keys(formData).reduce((acc, key) => ({
        ...acc,
        [key]: true
      }), {});
      setTouched(touchedFields);
      return;
    }

    try {
      await onSave(validation.data as Partial<MockCandidate>);
    } catch (error) {
      setErrors({ general: 'Failed to save changes. Please try again.' });
    }
  };

  const formatDateTimeLocal = (date: Date | null): string => {
    if (!date) return '';
    return new Date(date).toISOString().slice(0, 16);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-slate-50 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormField 
          label="Name" 
          required 
          error={touched.name ? errors.name : ''}
        >
          <input
            type="text"
            value={formData.name || ''}
            onChange={(e) => handleFieldChange('name', e.target.value)}
            onBlur={() => handleBlur('name')}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isSubmitting}
          />
        </FormField>

        <FormField 
          label="Email" 
          required 
          error={touched.email ? errors.email : ''}
        >
          <input
            type="email"
            value={formData.email || ''}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            onBlur={() => handleBlur('email')}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isSubmitting}
          />
        </FormField>

        <FormField 
          label="Phone" 
          error={touched.phone ? errors.phone : ''}
        >
          <input
            type="tel"
            value={formData.phone || ''}
            onChange={(e) => handleFieldChange('phone', e.target.value)}
            onBlur={() => handleBlur('phone')}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isSubmitting}
          />
        </FormField>

        <FormField 
          label="Hours per Week" 
          error={touched.hrsWk ? errors.hrsWk : ''}
        >
          <input
            type="number"
            min="1"
            max="40"
            value={formData.hrsWk || ''}
            onChange={(e) => handleFieldChange('hrsWk', parseInt(e.target.value) || 0)}
            onBlur={() => handleBlur('hrsWk')}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isSubmitting}
          />
        </FormField>

        <FormField 
          label="HR Interview Date" 
          error={touched.hrInterviewDate ? errors.hrInterviewDate : ''}
        >
          <input
            type="datetime-local"
            value={formatDateTimeLocal(formData.hrInterviewDate || null)}
            onChange={(e) => handleFieldChange('hrInterviewDate', e.target.value ? new Date(e.target.value) : null)}
            onBlur={() => handleBlur('hrInterviewDate')}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isSubmitting}
          />
        </FormField>

        <FormField 
          label="PM Interview Date" 
          error={touched.pmInterviewDate ? errors.pmInterviewDate : ''}
        >
          <input
            type="datetime-local"
            value={formatDateTimeLocal(formData.pmInterviewDate || null)}
            onChange={(e) => handleFieldChange('pmInterviewDate', e.target.value ? new Date(e.target.value) : null)}
            onBlur={() => handleBlur('pmInterviewDate')}
            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isSubmitting}
          />
        </FormField>
      </div>

      <FormField 
        label="Notes" 
        error={touched.notes ? errors.notes : ''}
      >
        <textarea
          rows={3}
          value={formData.notes || ''}
          onChange={(e) => handleFieldChange('notes', e.target.value)}
          onBlur={() => handleBlur('notes')}
          className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          disabled={isSubmitting}
        />
      </FormField>

      {errors.general && (
        <div className="text-red-600 text-sm bg-red-50 p-3 rounded-md border border-red-200">
          {errors.general}
        </div>
      )}

      <div className="flex justify-end space-x-3 pt-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          disabled={isSubmitting}
        >
          <X className="h-4 w-4 mr-2 inline" />
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
          disabled={isSubmitting}
        >
          <Save className="h-4 w-4 mr-2 inline" />
          {isSubmitting ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </form>
  );
}