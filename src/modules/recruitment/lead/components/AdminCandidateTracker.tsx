// src/modules/recruitment/admin/components/AdminCandidateTracker.tsx
import { useState } from 'react';
import { 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle, 
  ArrowRight, 
  User,
  Calendar,
  MessageSquare,
  FileText,
  Phone,
  Mail
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AdminStatusBadge from './AdminStatusBadge';

interface Candidate {
  id: string;
  name: string;
  email: string;
  phone: string;
  position: string;
  stage: string;
  status: 'active' | 'pending' | 'approved' | 'rejected';
  appliedDate: string;
  lastActivity: string;
  score: number;
  notes: number;
  nextAction: string;
  recruiter: string;
  avatar?: string;
}

interface Stage {
  id: string;
  name: string;
  color: string;
  candidates: Candidate[];
  maxCandidates?: number;
}

interface AdminCandidateTrackerProps {
  stages: Stage[];
  onCandidateMove: (candidateId: string, fromStage: string, toStage: string) => void;
  onCandidateClick: (candidate: Candidate) => void;
}

export default function AdminCandidateTracker({
  stages,
  onCandidateMove,
  onCandidateClick
}: AdminCandidateTrackerProps) {
  const [draggedCandidate, setDraggedCandidate] = useState<string | null>(null);

  const handleDragStart = (candidateId: string) => {
    setDraggedCandidate(candidateId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, stageId: string) => {
    e.preventDefault();
    if (draggedCandidate) {
      const fromStage = stages.find(stage => 
        stage.candidates.some(c => c.id === draggedCandidate)
      )?.id;
      
      if (fromStage && fromStage !== stageId) {
        onCandidateMove(draggedCandidate, fromStage, stageId);
      }
      setDraggedCandidate(null);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Clock className="w-4 h-4 text-blue-600" />;
      case 'approved':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  return (
    <div className="space-y-6">
      {/* Pipeline Overview */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Pipeline de Candidatos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            {stages.map((stage, index) => (
              <div key={stage.id} className="flex items-center">
                <div className="text-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stage.color} text-white font-bold text-lg`}>
                    {stage.candidates.length}
                  </div>
                  <div className="text-sm font-medium mt-2">{stage.name}</div>
                </div>
                {index < stages.length - 1 && (
                  <ArrowRight className="w-6 h-6 text-gray-400 mx-4" />
                )}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-4 gap-4 text-center text-sm text-gray-600">
            <div>Total: {stages.reduce((sum, stage) => sum + stage.candidates.length, 0)}</div>
            <div>Activos: {stages.reduce((sum, stage) => sum + stage.candidates.filter(c => c.status === 'active').length, 0)}</div>
            <div>Aprobados: {stages.reduce((sum, stage) => sum + stage.candidates.filter(c => c.status === 'approved').length, 0)}</div>
            <div>Rechazados: {stages.reduce((sum, stage) => sum + stage.candidates.filter(c => c.status === 'rejected').length, 0)}</div>
          </div>
        </CardContent>
      </Card>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {stages.map((stage) => (
          <Card 
            key={stage.id}
            className="h-fit"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, stage.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${stage.color}`}></div>
                  {stage.name}
                </CardTitle>
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-sm font-medium">
                  {stage.candidates.length}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              {stage.candidates.map((candidate) => (
                <div
                  key={candidate.id}
                  draggable
                  onDragStart={() => handleDragStart(candidate.id)}
                  onClick={() => onCandidateClick(candidate)}
                  className="bg-white border border-gray-200 rounded-lg p-4 cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{candidate.name}</div>
                        <div className="text-sm text-gray-500">{candidate.position}</div>
                      </div>
                    </div>
                    {getStatusIcon(candidate.status)}
                  </div>
                  
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Mail className="w-3 h-3" />
                      {candidate.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Calendar className="w-3 h-3" />
                      Aplicó: {new Date(candidate.appliedDate).toLocaleDateString('es-ES')}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getScoreColor(candidate.score)}`}>
                        {candidate.score}%
                      </span>
                      <AdminStatusBadge
                        status={candidate.status === 'approved' ? 'success' : candidate.status === 'rejected' ? 'closed' : candidate.status}
                        size="sm"
                      >
                        {candidate.status}
                      </AdminStatusBadge>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <MessageSquare className="w-3 h-3" />
                      {candidate.notes}
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-gray-100">
                    <div className="text-xs text-gray-500 mb-2">
                      Próxima acción: {candidate.nextAction}
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Phone className="w-3 h-3 mr-1" />
                        Llamar
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1">
                        <Mail className="w-3 h-3 mr-1" />
                        Email
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
              
              {stage.candidates.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Users className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <div className="text-sm">No hay candidatos en esta etapa</div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}