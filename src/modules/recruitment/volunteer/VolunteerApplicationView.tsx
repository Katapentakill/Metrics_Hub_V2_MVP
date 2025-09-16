'use client';

import React, { useState, useMemo } from 'react';
import { User } from '@/lib/types';
import { ROLE_PERMISSIONS } from '@/modules/recruitment/shared/constants';
import { StatusBadge } from '@/modules/recruitment/shared/StatusBadge';
import {
  CheckCircleIcon,
  XCircleIcon,
  PaperClipIcon,
  CalendarIcon,
  GlobeAltIcon,
  DocumentTextIcon,
  LinkIcon,
  EnvelopeIcon,
  PhoneIcon,
  UserIcon,
  ArrowUpTrayIcon,
  ArrowRightCircleIcon,
  UserGroupIcon,
} from '@heroicons/react/24/outline';
import { DEFAULT_TEXTS, CANDIDATE_STATUSES } from '@/modules/recruitment/shared/constants';
import { teams, timezones, roles, MockCandidate } from '@/lib/data/mockRecruitmentData';

interface MockVolunteerApplication extends MockCandidate {
  // Add additional fields specific to volunteer applications
  appliedRoles: string[];
  appliedTeam: string;
  currentStage: string;
  status: 'submitted' | 'in_review' | 'accepted' | 'rejected';
  cptOptDocsUrl?: string;
  cptOptStatus?: 'No Required' | 'Pending Review' | 'Approved' | 'Rejected';
  interviewLink?: string;
  offerLetterAccepted?: boolean;
  offerLetterUrl?: string;
  welcomeLetterUrl?: string;
}

interface VolunteerApplicationViewProps {
  currentUser: User;
}

interface FormErrors {
  name?: string;
  email?: string;
  appliedRoles?: string;
  general?: string;
}

export default function VolunteerApplicationView({ currentUser }: VolunteerApplicationViewProps) {
  const [formData, setFormData] = useState<Partial<MockVolunteerApplication>>({
    appliedRoles: [],
    volunteerType: 'Regular',
    timezone: timezones[0],
  });
  const [applicationSubmitted, setApplicationSubmitted] = useState(false);
  const [applicationData, setApplicationData] = useState<MockVolunteerApplication | null>(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [showHRCalendar, setShowHRCalendar] = useState(false);
  const [showPMCalendar, setShowPMCalendar] = useState(false);

  const permissions = ROLE_PERMISSIONS[currentUser.role];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    if (!formData.name?.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.appliedRoles || formData.appliedRoles.length === 0) {
      newErrors.appliedRoles = 'Please select at least one role';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFieldChange = (field: keyof MockVolunteerApplication, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear specific field errors when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, field: keyof MockVolunteerApplication) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      
      // Validate file type and size
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      const maxSize = 10 * 1024 * 1024; // 10MB
      
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          general: 'Please upload a PDF or Word document'
        }));
        return;
      }
      
      if (file.size > maxSize) {
        setErrors(prev => ({
          ...prev,
          general: 'File size must be less than 10MB'
        }));
        return;
      }
      
      const mockUrl = `https://example.com/uploads/${field}-${Date.now()}-${file.name}`;
      setFormData(prev => ({
        ...prev,
        [field]: mockUrl,
      }));
      
      // Clear any file-related errors
      setErrors(prev => ({
        ...prev,
        general: undefined,
      }));
    }
  };

  const handleUploadCptOptDocs = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      const mockUrl = `https://example.com/uploads/cpt-opt-${Date.now()}-${file.name}`;
      
      if (applicationData) {
        setApplicationData(prev => ({
          ...prev!,
          cptOptDocsUrl: mockUrl,
          currentStage: 'CPT/OPT Docs Submitted',
          cptOptStatus: 'Pending Review',
        }));
      }
    }
  };

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    setErrors({});

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const randomTeam = teams[Math.floor(Math.random() * teams.length)];
      
      const newApplication: MockVolunteerApplication = {
        id: `vol-${Date.now()}`,
        name: formData.name!,
        email: formData.email!,
        phone: formData.phone || '',
        timezone: formData.timezone || timezones[0],
        currentStage: 'Application Received',
        status: 'submitted',
        appliedRoles: formData.appliedRoles || [],
        appliedTeam: randomTeam,
        volunteerType: formData.volunteerType || 'Regular',
        cvLink: formData.cvLink || '',
        cptOptDocsUrl: undefined,
        interviewDate: null,
        interviewLink: undefined,
        offerLetterAccepted: false,
        offerLetterUrl: undefined,
        welcomeLetterUrl: undefined,
        notes: '',
        hrsWk: 10,
        recruitmentStage: 'Screening',
        lastContact: new Date(),
        appliedRole: formData.appliedRoles?.[0] || '',
        projectPreferences: [],
        linkedinUrl: '',
        portfolioUrl: '',
        githubUrl: '',
        role: formData.appliedRoles?.[0] || '',
        team: randomTeam,
        applicationStatus: 'Application Received',
        toDo: ['HR Review'],
        cptOptStatus: formData.volunteerType === 'Regular' ? 'No Required' : 'Requested',
        interviewAssigned: null,
        supervisor: null,
        hrInterviewDate: null,
        pmInterviewDate: null,
        startDate: null,
        endDate: null,
        duration: '3 months',
        offerLetterStatus: 'Not Sent',
        offerLetterLink: null,
        vaStatus: 'Not Sent',
        vaLink: null,
        wlStatus: 'Not Sent',
        wlLink: null,
      };
      
      setApplicationData(newApplication);
      setApplicationSubmitted(true);
    } catch (err) {
      setErrors({ general: 'Failed to submit application. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleAcceptOffer = () => {
    if (applicationData) {
      setApplicationData({
        ...applicationData,
        offerLetterAccepted: true,
        status: 'accepted',
        currentStage: 'Accepted by Candidate',
        welcomeLetterUrl: 'https://example.com/welcome-letter.pdf',
      });
    }
  };

  const handleRejectOffer = () => {
    if (applicationData) {
      setApplicationData({
        ...applicationData,
        status: 'rejected',
        currentStage: 'Rejected by Candidate',
      });
    }
  };

  const handleSimulateHRApproval = () => {
    if (applicationData) {
      setApplicationData(prevData => ({
        ...prevData!,
        currentStage: 'Application Approved',
        status: 'in_review',
      }));
    }
  };

  const handleScheduleHRInterview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    if (applicationData && selectedDate > new Date()) {
      setApplicationData(prevData => ({
        ...prevData!,
        currentStage: 'HR Interview Scheduled',
        interviewDate: selectedDate,
        interviewLink: 'https://zoom.us/j/1234567890?pwd=example',
        hrInterviewDate: selectedDate,
      }));
      setShowHRCalendar(false);
    }
  };
  
  const handleMarkHRInterviewCompleted = () => {
    if (applicationData) {
      setApplicationData(prevData => ({
        ...prevData!,
        currentStage: 'HR Interview Completed',
      }));
    }
  };

  const handleSimulatePMApproval = () => {
    if (applicationData) {
      setApplicationData(prevData => ({
        ...prevData!,
        currentStage: 'Accepted by HR',
        status: 'in_review',
      }));
    }
  };
  
  const handleSchedulePMInterview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedDate = new Date(e.target.value);
    if (applicationData && selectedDate > new Date()) {
      setApplicationData(prevData => ({
        ...prevData!,
        currentStage: 'PM Interview Scheduled', 
        pmInterviewDate: selectedDate,
        interviewDate: selectedDate, 
        interviewLink: 'https://zoom.us/j/PM-1234567890?pwd=example', 
      }));
      setShowPMCalendar(false);
    }
  };

  const handleMarkPMInterviewCompleted = () => {
    if (applicationData) {
      setApplicationData(prevData => ({
        ...prevData!,
        currentStage: 'PM Interview Completed',
      }));
    }
  };

  const handleSimulateCptOptApproval = () => {
    if (applicationData) {
      setApplicationData(prevData => ({
        ...prevData!,
        currentStage: 'CPT/OPT Approved',
        cptOptStatus: 'Approved',
      }));
    }
  };

  const handleSimulateOfferSent = () => {
    if (applicationData) {
      setApplicationData(prevData => ({
        ...prevData!,
        currentStage: 'Offer Sent',
        offerLetterUrl: 'https://example.com/offer-letter.pdf',
      }));
    }
  };

  const statusContentMap = useMemo(() => {
    if (!applicationData) return {};
    
    const minDate = new Date();
    minDate.setDate(minDate.getDate() + 1); // Tomorrow
    const minDateString = minDate.toISOString().slice(0, 16);
    
    return {
      'Application Received': (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-slate-700">Thank you for your application! We are reviewing your profile and will contact you soon.</p>
        </div>
      ),
      'Application Approved': (
        <div className="p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm mt-2 text-green-700 font-semibold">
            Congratulations! Your application has been approved by our screening team. Please select a day and time for your HR interview.
          </p>
          {showHRCalendar ? (
            <div className="mt-4">
              <label htmlFor="hr-interview-date" className="block text-sm font-medium text-green-700">
                Select a day and time for your interview:
              </label>
              <input
                type="datetime-local"
                id="hr-interview-date"
                min={minDateString}
                onChange={handleScheduleHRInterview}
                className="mt-1 block w-full px-3 py-2 border border-green-300 rounded-md text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          ) : (
            <button
              onClick={() => setShowHRCalendar(true)}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <CalendarIcon className="h-5 w-5 mr-2" />
              Schedule Interview with HR
            </button>
          )}
        </div>
      ),
      'HR Interview Scheduled': (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <div className="flex items-center space-x-2 font-semibold text-yellow-800 mb-2">
            <CalendarIcon className="h-5 w-5" />
            <span>HR Interview Scheduled</span>
          </div>
          {applicationData.interviewDate && (
            <p className="text-sm mt-2 text-yellow-700">
              <strong>Date:</strong> {new Date(applicationData.interviewDate).toLocaleDateString()} at {new Date(applicationData.interviewDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </p>
          )}
          {applicationData.interviewLink && (
            <a
              href={applicationData.interviewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium"
            >
              <LinkIcon className="h-4 w-4 mr-1" /> Join Interview
            </a>
          )}
          <button
            onClick={handleMarkHRInterviewCompleted}
            className="mt-4 w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors flex items-center justify-center"
          >
            Mark Interview as Completed
          </button>
        </div>
      ),
      'HR Interview Completed': (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-700 font-semibold">
            Your HR interview has been completed. The HR team is reviewing the results and will notify you of the next steps.
          </p>
          <button
            onClick={handleSimulatePMApproval}
            className="mt-4 w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors flex items-center justify-center"
          >
            Simulate HR Approval
          </button>
        </div>
      ),
      'Accepted by HR': (
        <div className="p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm mt-2 text-green-700 font-semibold">
            Congratulations! You have been accepted for a technical interview. Please schedule your interview with the Project Manager.
          </p>
          {showPMCalendar ? (
            <div className="mt-4">
              <label htmlFor="pm-interview-date" className="block text-sm font-medium text-green-700">
                Select a day and time for your PM interview:
              </label>
              <input
                type="datetime-local"
                id="pm-interview-date"
                min={minDateString}
                onChange={handleSchedulePMInterview}
                className="mt-1 block w-full px-3 py-2 border border-green-300 rounded-md text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          ) : (
            <button
              onClick={() => setShowPMCalendar(true)}
              className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <CalendarIcon className="h-5 w-5 mr-2" />
              Schedule Technical Interview
            </button>
          )}
        </div>
      ),
      'PM Interview Scheduled': (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <div className="flex items-center space-x-2 font-semibold text-yellow-800 mb-2">
            <CalendarIcon className="h-5 w-5" />
            <span>Technical Interview Scheduled</span>
          </div>
          {applicationData.interviewDate && (
            <p className="text-sm mt-2 text-yellow-700">
              <strong>Date:</strong> {new Date(applicationData.interviewDate).toLocaleDateString()} at {new Date(applicationData.interviewDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </p>
          )}
          {applicationData.interviewLink && (
            <a
              href={applicationData.interviewLink}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium"
            >
              <LinkIcon className="h-4 w-4 mr-1" /> Join Technical Interview
            </a>
          )}
          <button
            onClick={handleMarkPMInterviewCompleted}
            className="mt-4 w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors flex items-center justify-center"
          >
            Mark Interview as Completed
          </button>
        </div>
      ),
      'PM Interview Completed': (
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
          <p className="text-sm text-blue-700 font-semibold">
            Your technical interview has been completed. The team is reviewing your performance and will notify you of the final decision.
          </p>
          <button
            onClick={() => setApplicationData(prev => ({...prev!, currentStage: 'Accepted by PM'}))}
            className="mt-4 w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors flex items-center justify-center"
          >
            Simulate PM Approval
          </button>
        </div>
      ),
      'Accepted by PM': (
        <div className="p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-700 font-semibold mb-4">
            Excellent! Your technical interview was successful and you have been accepted by the Project Manager.
          </p>
          {applicationData.volunteerType === 'Regular' ? (
            <div className="space-y-3">
              <p className="text-sm text-slate-700">
                Your application has been approved. An offer letter will be prepared and sent to you shortly.
              </p>
              <button
                onClick={handleSimulateOfferSent}
                className="w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors flex items-center justify-center"
              >
                Simulate Offer Letter Sent
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              <p className="text-sm text-slate-700">
                Before we can send your offer letter, please upload your CPT/OPT documents for review.
              </p>
              <p className="text-xs text-slate-500">
                Accepted formats: PDF, DOC, DOCX (Max 10MB)
              </p>
              <input
                type="file"
                accept=".pdf,.doc,.docx"
                onChange={handleUploadCptOptDocs}
                className="mt-1 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
              />
            </div>
          )}
        </div>
      ),
      'CPT/OPT Docs Submitted': (
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-sm text-yellow-700 font-semibold mb-2">
            Your CPT/OPT documents have been submitted and are under review by our compliance team.
          </p>
          <p className="text-xs text-yellow-600">
            This process typically takes 3-5 business days. We will notify you once the review is complete.
          </p>
          <button
            onClick={handleSimulateCptOptApproval}
            className="mt-4 w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors flex items-center justify-center"
          >
            Simulate Document Approval
          </button>
        </div>
      ),
      'CPT/OPT Approved': (
        <div className="p-4 bg-green-50 border border-green-200 rounded-md">
          <p className="text-sm text-green-700 font-semibold mb-2">
            Great news! Your CPT/OPT documents have been approved by our compliance team.
          </p>
          <p className="text-sm text-green-600">
            We will now prepare and send your official offer letter.
          </p>
          <button
            onClick={handleSimulateOfferSent}
            className="mt-4 w-full bg-indigo-500 text-white py-2 px-4 rounded-md hover:bg-indigo-600 transition-colors flex items-center justify-center"
          >
            Generate Offer Letter
          </button>
        </div>
      ),
      'Offer Sent': (
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-md">
          <p className="text-sm text-purple-700 font-semibold mb-4">
            🎉 Congratulations! Your official offer letter has been sent.
          </p>
          {applicationData.offerLetterUrl && (
            <a
              href={applicationData.offerLetterUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-4 inline-flex items-center text-purple-600 hover:text-purple-800 text-sm font-medium"
            >
              <DocumentTextIcon className="h-4 w-4 mr-1" /> View Offer Letter
            </a>
          )}
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 mt-4">
            <button
              onClick={handleAcceptOffer}
              disabled={applicationData.offerLetterAccepted}
              className="w-full md:w-1/2 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <CheckCircleIcon className="h-5 w-5 mr-2" /> Accept Offer
            </button>
            <button
              onClick={handleRejectOffer}
              disabled={applicationData.offerLetterAccepted}
              className="w-full md:w-1/2 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors flex items-center justify-center disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              <XCircleIcon className="h-5 w-5 mr-2" /> Decline Offer
            </button>
          </div>
        </div>
      ),
      'Accepted by Candidate': (
        <div className="p-6 bg-green-50 border border-green-200 rounded-md text-center">
          <div className="text-4xl mb-4">🎉</div>
          <p className="text-green-700 font-bold text-xl mb-2">Welcome to the Team!</p>
          <p className="text-slate-700 mb-4">
            Thank you for accepting our offer. Your onboarding process will begin shortly.
          </p>
          {applicationData.welcomeLetterUrl && (
            <a 
              href={applicationData.welcomeLetterUrl} 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 text-sm font-medium"
            >
              <DocumentTextIcon className="h-4 w-4 mr-1" /> Download Welcome Package
            </a>
          )}
        </div>
      ),
      'Rejected by Candidate': (
        <div className="p-4 bg-red-50 border border-red-200 rounded-md text-center">
          <p className="text-sm text-red-700 font-semibold mb-2">
            We understand your decision to decline our offer.
          </p>
          <p className="text-sm text-red-600">
            Thank you for your time and interest. We wish you the best in your future endeavors.
          </p>
        </div>
      ),
    };
  }, [applicationData, showHRCalendar, showPMCalendar]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        <span className="ml-3 text-slate-600">Submitting your application...</span>
      </div>
    );
  }

  if (applicationSubmitted) {
    if (!applicationData) {
      return (
        <div className="text-center p-8 text-slate-500">
          <p>{DEFAULT_TEXTS.noData.volunteer}</p>
        </div>
      );
    }
    
    return (
      <div className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto my-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">
            Application Status
          </h2>
          <p className="text-sm text-slate-500">
            Hello {applicationData.name}, here's the current status of your volunteer application.
          </p>
        </div>

        <div className="border-b pb-6 mb-6">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-700">
            <div className="flex items-center space-x-2">
              <UserIcon className="h-4 w-4 text-slate-500" />
              <span className="font-semibold">Name:</span>
              <span>{applicationData.name}</span>
            </div>
            <div className="flex items-center space-x-2">
              <EnvelopeIcon className="h-4 w-4 text-slate-500" />
              <span className="font-semibold">Email:</span>
              <span>{applicationData.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <PhoneIcon className="h-4 w-4 text-slate-500" />
              <span className="font-semibold">Phone:</span>
              <span>{applicationData.phone || 'Not provided'}</span>
            </div>
            <div className="flex items-center space-x-2">
              <GlobeAltIcon className="h-4 w-4 text-slate-500" />
              <span className="font-semibold">Time Zone:</span>
              <span>{applicationData.timezone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <UserIcon className="h-4 w-4 text-slate-500" />
              <span className="font-semibold">Volunteer Type:</span>
              <span>{applicationData.volunteerType}</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-slate-50 p-4 rounded-md">
            <div className="text-sm font-semibold text-slate-600 mb-2">Application Summary</div>
            <ul className="text-sm text-slate-700 space-y-2">
              <li className="flex items-center space-x-2">
                <DocumentTextIcon className="h-4 w-4 text-slate-500" />
                <span>Role(s): {applicationData.appliedRoles.join(', ')}</span>
              </li>
              <li className="flex items-center space-x-2">
                <UserGroupIcon className="h-4 w-4 text-slate-500" />
                <span>Team: {applicationData.appliedTeam}</span>
              </li>
            </ul>
          </div>
          <div className="bg-slate-50 p-4 rounded-md">
            <div className="text-sm font-semibold text-slate-600 mb-2">Current Status</div>
            <div className="flex flex-col items-center h-full justify-center">
              <StatusBadge status={applicationData.currentStage as any} />
              <p className="text-xs text-slate-500 mt-2 text-center">
                Status updated on {new Date(applicationData.lastContact).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Documents Section */}
        <div className="pt-6 mt-6 border-t">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Documents</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 rounded-md border border-slate-200">
              <h4 className="flex items-center text-base font-semibold text-slate-700 mb-2">
                <PaperClipIcon className="h-5 w-5 text-slate-500 mr-2" />
                <span>CV / Resume</span>
              </h4>
              {applicationData.cvLink ? (
                <a
                  href={applicationData.cvLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
                >
                  <LinkIcon className="h-4 w-4 mr-1" /> View Uploaded CV
                </a>
              ) : (
                <span className="text-sm text-slate-500">No file uploaded</span>
              )}
            </div>
            {applicationData.cptOptDocsUrl && (
              <div className="bg-white p-4 rounded-md border border-slate-200">
                <h4 className="flex items-center text-base font-semibold text-slate-700 mb-2">
                  <PaperClipIcon className="h-5 w-5 text-slate-500 mr-2" />
                  <span>CPT/OPT Documents</span>
                </h4>
                <div className="space-y-2">
                  <a
                    href={applicationData.cptOptDocsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
                  >
                    <LinkIcon className="h-4 w-4 mr-1" /> View Uploaded Documents
                  </a>
                  <p className="text-xs text-slate-500">
                    Status: <span className="font-medium">{applicationData.cptOptStatus}</span>
                  </p>
                </div>
              </div>
            )}
            {applicationData.offerLetterUrl && (
              <div className="bg-white p-4 rounded-md border border-slate-200">
                <h4 className="flex items-center text-base font-semibold text-slate-700 mb-2">
                  <DocumentTextIcon className="h-5 w-5 text-slate-500 mr-2" />
                  <span>Offer Letter</span>
                </h4>
                <a
                  href={applicationData.offerLetterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
                >
                  <LinkIcon className="h-4 w-4 mr-1" /> Download Offer Letter
                </a>
              </div>
            )}
          </div>
        </div>
        
        <div className="pt-6 mt-6 border-t">
          <h3 className="text-xl font-semibold text-slate-800 mb-4">Next Steps</h3>
          <div className="space-y-4">
            {statusContentMap[applicationData.currentStage] || (
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-md">
                <p className="text-slate-700">Status: {applicationData.currentStage}</p>
                <p className="text-sm text-slate-500 mt-1">Please wait for further updates from our team.</p>
              </div>
            )}
          </div>
        </div>
        
        {/* --- Simulation Controls --- */}
        {process.env.NODE_ENV === 'development' && (
          <div className="mt-8 pt-4 border-t border-dashed text-sm text-slate-500">
            <p className="mb-2 font-semibold">Demo Controls (Development Only):</p>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={handleSimulateHRApproval}
                className="bg-purple-100 text-purple-700 px-3 py-1 rounded-md hover:bg-purple-200 text-xs"
              >
                Approve Application
              </button>
              <button
                onClick={handleMarkHRInterviewCompleted}
                className="bg-purple-100 text-purple-700 px-3 py-1 rounded-md hover:bg-purple-200 text-xs"
              >
                Complete HR Interview
              </button>
              <button
                onClick={handleSimulatePMApproval}
                className="bg-purple-100 text-purple-700 px-3 py-1 rounded-md hover:bg-purple-200 text-xs"
              >
                HR Approve for PM
              </button>
              <button
                onClick={handleMarkPMInterviewCompleted}
                className="bg-purple-100 text-purple-700 px-3 py-1 rounded-md hover:bg-purple-200 text-xs"
              >
                Complete PM Interview
              </button>
              {applicationData?.cptOptStatus === 'Pending Review' && (
                <button
                  onClick={handleSimulateCptOptApproval}
                  className="bg-purple-100 text-purple-700 px-3 py-1 rounded-md hover:bg-purple-200 text-xs"
                >
                  Approve CPT/OPT
                </button>
              )}
              {(applicationData?.currentStage === 'CPT/OPT Approved' || applicationData?.currentStage === 'Accepted by PM') && (
                <button
                  onClick={handleSimulateOfferSent}
                  className="bg-purple-100 text-purple-700 px-3 py-1 rounded-md hover:bg-purple-200 text-xs"
                >
                  Send Offer
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  // Application Form View
  return (
    <form onSubmit={handleSubmitApplication} className="p-6 bg-white rounded-lg shadow-md max-w-4xl mx-auto my-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">
          Volunteer Application
        </h2>
        <p className="text-sm text-slate-500">
          Please fill out the form below to apply for a volunteer position with our organization.
        </p>
      </div>

      {errors.general && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
          <span className="block sm:inline">{errors.general}</span>
        </div>
      )}

      {/* Contact Information */}
      <div className="border-b pb-6 mb-6">
        <h3 className="text-xl font-semibold text-slate-800 mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-1">
              Full Name *
            </label>
            <input
              id="name"
              type="text"
              required
              value={formData.name || ''}
              onChange={(e) => handleFieldChange('name', e.target.value)}
              className={`mt-1 block w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.name ? 'border-red-500' : 'border-slate-300'
              }`}
              placeholder="Enter your full name"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1">
              Email Address *
            </label>
            <input
              id="email"
              type="email"
              required
              value={formData.email || ''}
              onChange={(e) => handleFieldChange('email', e.target.value)}
              className={`mt-1 block w-full border rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
                errors.email ? 'border-red-500' : 'border-slate-300'
              }`}
              placeholder="your.email@example.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-1">
              Phone Number
            </label>
            <input
              id="phone"
              type="tel"
              value={formData.phone || ''}
              onChange={(e) => handleFieldChange('phone', e.target.value)}
              className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="+1 (555) 123-4567"
            />
          </div>
          <div>
            <label htmlFor="timezone" className="block text-sm font-semibold text-slate-700 mb-1">
              Time Zone
            </label>
            <select
              id="timezone"
              value={formData.timezone || ''}
              onChange={(e) => handleFieldChange('timezone', e.target.value)}
              className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="" disabled>Select your time zone</option>
              {timezones.map(tz => (
                <option key={tz} value={tz}>
                  {tz.replace('_', ' ')}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label htmlFor="volunteerType" className="block text-sm font-semibold text-slate-700 mb-1">
              Volunteer Type
            </label>
            <select
              id="volunteerType"
              value={formData.volunteerType || 'Regular'}
              onChange={(e) => handleFieldChange('volunteerType', e.target.value)}
              className="mt-1 block w-full border border-slate-300 rounded-md shadow-sm p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="Regular">Regular Volunteer</option>
              <option value="CPT">CPT Student (Curricular Practical Training)</option>
              <option value="OPT">OPT Student (Optional Practical Training)</option>
            </select>
            <p className="text-xs text-slate-500 mt-1">
              {formData.volunteerType === 'CPT' || formData.volunteerType === 'OPT' 
                ? 'You will need to provide additional documentation if selected.' 
                : 'No additional documentation required.'}
            </p>
          </div>
        </div>
      </div>

      {/* Role Selection */}
      <div className="border-b pb-6 mb-6">
        <h3 className="text-xl font-semibold text-slate-800 mb-4">Role(s) of Interest</h3>
        <p className="text-sm text-slate-500 mb-4">
          Please select the role(s) you would like to apply for. You can select multiple roles. *
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {roles.map(role => (
            <label key={role} className="flex items-center space-x-3 p-3 border border-slate-200 rounded-md hover:bg-slate-50 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.appliedRoles?.includes(role) || false}
                onChange={(e) => {
                  if (e.target.checked) {
                    handleFieldChange('appliedRoles', [...(formData.appliedRoles || []), role]);
                  } else {
                    handleFieldChange('appliedRoles', formData.appliedRoles?.filter(r => r !== role));
                  }
                }}
                className="rounded text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-slate-700 font-medium">{role}</span>
            </label>
          ))}
        </div>
        {errors.appliedRoles && <p className="text-red-500 text-xs mt-2">{errors.appliedRoles}</p>}
      </div>

      {/* Documents Section */}
      <div className="border-b pb-6 mb-6">
        <h3 className="text-xl font-semibold text-slate-800 mb-4">Documents</h3>
        <div className="grid grid-cols-1 gap-4">
          <div className="bg-slate-50 p-4 rounded-md border border-slate-200">
            <h4 className="flex items-center text-base font-semibold text-slate-700 mb-3">
              <PaperClipIcon className="h-5 w-5 text-slate-500 mr-2" />
              <span>CV / Resume</span>
            </h4>
            {formData.cvLink ? (
              <div className="flex items-center justify-between">
                <a
                  href={formData.cvLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
                >
                  <LinkIcon className="h-4 w-4 mr-1" /> View Uploaded CV
                </a>
                <button
                  type="button"
                  onClick={() => handleFieldChange('cvLink', '')}
                  className="text-xs text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <label className="flex items-center px-4 py-2 bg-indigo-500 text-white text-sm rounded-md shadow-sm hover:bg-indigo-600 cursor-pointer w-fit">
                  <ArrowUpTrayIcon className="h-4 w-4 mr-2" /> Upload CV/Resume
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileUpload(e, 'cvLink')}
                  />
                </label>
                <p className="text-xs text-slate-500">
                  Accepted formats: PDF, DOC, DOCX (Max 10MB)
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={loading}
          className="bg-indigo-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-indigo-700 transition-colors flex items-center disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Submitting...
            </>
          ) : (
            <>
              Submit Application
              <ArrowRightCircleIcon className="h-5 w-5 ml-2" />
            </>
          )}
        </button>
      </div>
    </form>
  );
}