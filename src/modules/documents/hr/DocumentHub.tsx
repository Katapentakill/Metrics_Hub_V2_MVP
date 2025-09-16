//src/modules/documents/hr/documenthub.tsx
import Link from 'next/link';
import { FileText, Users, Briefcase, BookOpen } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';

const hrSections = [
  {
    title: 'Employee Onboarding',
    description: 'Access and manage documents for new employee induction.',
    href: '/hr/documents/onboarding',
    icon: Users,
    color: 'text-purple-600',
  },
  {
    title: 'HR Policies & Guides',
    description: 'Review internal HR policies and reference guides.',
    href: '/hr/documents/policies-guides',
    icon: FileText,
    color: 'text-green-600',
  },
  {
    title: 'Recruitment Documents',
    description: 'Manage documents related to job applications and hiring.',
    href: '/hr/documents/recruitment',
    icon: Briefcase,
    color: 'text-orange-600',
  },
  {
    title: 'Company Library',
    description: 'Access general company-wide documents and resources.',
    href: '/hr/documents/company-library',
    icon: BookOpen,
    color: 'text-blue-600',
  },
];

export default function HrDocumentHub() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">HR Document Hub</h1>
      <p className="text-gray-600 mb-10">
        Bienvenido al centro de documentos de RR. HH. Elige una sección para explorar y gestionar la información.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {hrSections.map((section) => (
          <Link key={section.title} href={section.href}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className={`flex items-center gap-3 ${section.color}`}>
                  <section.icon className="w-6 h-6" />
                  <CardTitle>{section.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500">{section.description}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}