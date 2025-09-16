//src/modules/documents/volunteer/documents.tsx
// src/modules/documents/volunteer/documents.tsx
'use client';

import { useState } from 'react';
import { Upload, FileText, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface RequiredDocument {
  id: string;
  name: string;
  status: 'Pending' | 'Under Review' | 'Approved';
  fileUrl?: string;
}

const initialRequiredDocs: RequiredDocument[] = [
  { id: 'cv', name: 'Curriculum Vitae (CV)', status: 'Pending' },
  { id: 'opt', name: 'OPT/CPT Documentation', status: 'Pending' },
  { id: 'id', name: 'Identification (Passport/ID)', status: 'Pending' },
];

const resources = [
  { id: 'offer', name: 'Offer Letter', url: '/docs/offer-letter.pdf' },
  { id: 'agreement', name: 'Volunteer Agreement', url: '/docs/volunteer-agreement.pdf' },
  { id: 'welcome', name: 'Welcome Letter', url: '/docs/welcome-letter.pdf' },
  { id: 'guide', name: 'Onboarding Guide', url: '/docs/onboarding-guide.pdf' },
];

export default function VolunteerDocuments() {
  const [requiredDocs, setRequiredDocs] = useState<RequiredDocument[]>(initialRequiredDocs);

  const handleUpload = (docId: string) => {
    setRequiredDocs(prev =>
      prev.map(doc =>
        doc.id === docId ? { ...doc, status: 'Under Review', fileUrl: '/uploads/' + docId + '.pdf' } : doc
      )
    );
  };

  const getStatusIcon = (status: RequiredDocument['status']) => {
    switch (status) {
      case 'Pending':
        return <Clock className="text-gray-400" size={18} />;
      case 'Under Review':
        return <AlertCircle className="text-yellow-500" size={18} />;
      case 'Approved':
        return <CheckCircle className="text-green-500" size={18} />;
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* My Required Documents */}
      <Card>
        <CardHeader>
          <CardTitle>My Required Documents</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {requiredDocs.map(doc => (
            <div
              key={doc.id}
              className="flex items-center justify-between border-b pb-2 last:border-b-0"
            >
              <div className="flex items-center gap-2">
                {getStatusIcon(doc.status)}
                <span>{doc.name}</span>
              </div>
              <div className="flex items-center gap-2">
                {doc.fileUrl ? (
                  <a
                    href={doc.fileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:underline"
                  >
                    View
                  </a>
                ) : null}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleUpload(doc.id)}
                >
                  <Upload className="w-4 h-4 mr-1" />
                  Upload
                </Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* My Resources */}
      <Card>
        <CardHeader>
          <CardTitle>My Resources</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {resources.map(resource => (
            <div
              key={resource.id}
              className="flex items-center justify-between border-b pb-2 last:border-b-0"
            >
              <div className="flex items-center gap-2">
                <FileText className="text-blue-500" size={18} />
                <span>{resource.name}</span>
              </div>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                Download
              </a>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
