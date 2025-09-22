// src/app/lead/documents/candidate-files/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { getMockRecruitmentData, MockCandidate } from '@/lib/data/mockRecruitmentData';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Link as LinkIcon, User } from 'lucide-react';
import Link from 'next/link';

// Simula el equipo del líder actual
const mockLeadTeam = 'Vitalink';

export default function LeadCandidateFilesPage() {
  const allCandidates = useMemo(() => getMockRecruitmentData(15), []);

  const teamCandidatesWithFiles = useMemo(() => {
    return allCandidates
      .filter(candidate => candidate.team === mockLeadTeam && candidate.cvLink)
      .map(candidate => ({
        id: candidate.id,
        name: candidate.name,
        role: candidate.appliedRole,
        cvLink: candidate.cvLink,
      }));
  }, [allCandidates]);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Documentos de Candidatos de mi Equipo</h1>
      <p className="text-gray-600 mb-10">
        Revisa los documentos de postulación, como currículums y portafolios, de los candidatos que aplican a las vacantes de tu equipo.
      </p>

      {teamCandidatesWithFiles.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          <FileText className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <p>No hay documentos de candidatos en tu equipo en este momento.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {teamCandidatesWithFiles.map((file) => (
            <Card key={file.id}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="flex items-center gap-3">
                  <User className="w-6 h-6 text-gray-500" />
                  <CardTitle className="text-lg font-medium">{file.name}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-sm text-gray-500 mb-2">
                  <p><strong>Rol:</strong> {file.role}</p>
                  <p><strong>Documento:</strong> CV</p>
                </div>
                <div className="mt-4">
                  <a
                    href={file.cvLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
                  >
                    <LinkIcon className="mr-2 h-4 w-4" />
                    Ver Documento
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}