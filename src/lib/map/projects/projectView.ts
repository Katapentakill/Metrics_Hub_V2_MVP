// src/lib/data/projectView.ts
import {
  Project,
  Team,
  TeamMember,
  ExtendedUserWithProfile,
  TeamWithMembers,
} from '@/lib/types';

export type ProjectView = {
  project: Project;
  lead?: ExtendedUserWithProfile;
  team?: TeamWithMembers;
  members?: ExtendedUserWithProfile[];
  // Campos útiles para la UI
  country?: string;
  city?: string;
  progressPct: number; // calculado
};

export function buildTeamsWithMembers(
  teams: Team[],
  members: TeamMember[],
): TeamWithMembers[] {
  return teams.map((t) => ({
    ...t,
    members: members
      .filter((m) => m.team_id === t.id)
      .map((m) => ({ ...m })),
  }));
}

export function buildProjectViews(
  projects: Project[],
  users: ExtendedUserWithProfile[],
  teams: Team[],
  members: TeamMember[],
): ProjectView[] {
  const teamsWithMembers = buildTeamsWithMembers(teams, members);

  return projects.map((p) => {
    const lead = users.find((u) => u.id === p.lead_id);
    const team = teamsWithMembers.find((t) => t.project_id === p.id);
    const memberUsers = (team?.members || [])
      .map((tm) => users.find((u) => u.id === tm.user_id))
      .filter(Boolean) as ExtendedUserWithProfile[];

    const country = lead?.profile?.country || memberUsers[0]?.profile?.country;
    const city = lead?.profile?.city || memberUsers[0]?.profile?.city;

    const progressPct = Math.round(
      (p.current_team_size / Math.max(p.max_team_size || 1, 1)) * 100,
    );

    return {
      project: p,
      lead,
      team,
      members: memberUsers,
      country,
      city,
      progressPct,
    };
  });
}
