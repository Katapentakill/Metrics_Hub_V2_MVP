import { z, ZodError, ZodIssue } from 'zod';
import { CandidateStatus, CptOptStatus } from '@/lib/data/mockRecruitmentData';
import { CANDIDATE_STATUSES, VOLUNTEER_TYPES, CPT_OPT_OPTIONS } from '@/modules/recruitment/shared/constants';

export const candidateUpdateSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
  email: z.string().email('Invalid email format').optional(),
  phone: z.string().min(10, 'Phone must be at least 10 digits').optional(),
  timezone: z.string().min(1, 'Timezone is required').optional(),
  team: z.string().min(1, 'Team is required').optional(),
  hrsWk: z.preprocess(
    (val) => (typeof val === 'string' ? parseInt(val, 10) : val),
    z.number().min(1, 'Hours per week must be at least 1').max(40, 'Hours per week must be 40 or less')
  ).optional(),
  duration: z.string().min(1, 'Duration is required').optional(),
  notes: z.string().max(1000, 'Notes must be less than 1000 characters').optional(),
  hrInterviewDate: z.preprocess(
    (val) => (typeof val === 'string' ? new Date(val) : val),
    z.date().nullable()
  ).optional(),
  pmInterviewDate: z.preprocess(
    (val) => (typeof val === 'string' ? new Date(val) : val),
    z.date().nullable()
  ).optional(),
  applicationStatus: z.enum(CANDIDATE_STATUSES as [CandidateStatus, ...CandidateStatus[]]).optional(),
  volunteerType: z.enum(VOLUNTEER_TYPES).optional(),
  cptOptStatus: z.enum(CPT_OPT_OPTIONS as [CptOptStatus, ...CptOptStatus[]]).optional(),
});

export type CandidateUpdateData = z.infer<typeof candidateUpdateSchema>;

export function validateCandidateUpdate(data: Partial<CandidateUpdateData>): {
  success: boolean;
  errors: Record<string, string>;
  data?: CandidateUpdateData;
} {
  try {
    const validatedData = candidateUpdateSchema.parse(data);
    return { success: true, errors: {}, data: validatedData };
  } catch (error) {
    if (error instanceof ZodError) {
      const errors: Record<string, string> = {};
      error.issues.forEach((issue: ZodIssue) => {
        if (issue.path.length > 0) {
          errors[issue.path[0] as string] = issue.message;
        }
      });
      return { success: false, errors };
    }
    return { success: false, errors: { general: 'Validation failed' } };
  }
}
