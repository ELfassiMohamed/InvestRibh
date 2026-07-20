import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as projects from '@/server-fns/projects';
import * as users from '@/server-fns/users';
import * as submissions from '@/server-fns/submissions';
import * as data from '@/server-fns/data';

// ─── Projects ───

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => projects.getProjects(),
  });
}

export function useProject(id: string | undefined) {
  return useQuery({
    queryKey: ['projects', id],
    queryFn: () => projects.getProject({ data: id! }),
    enabled: !!id,
  });
}

export function useCreateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: any) => projects.createProject({ data: input }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['projects'] }),
  });
}

export function useUpdateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { id: string; data: any }) => projects.updateProject({ data: input }),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ['projects'] });
      qc.invalidateQueries({ queryKey: ['projects', vars.id] });
    },
  });
}

export function useDeleteProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => projects.deleteProject({ data: id }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['projects'] }),
  });
}

// ─── Users ───

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => users.getUsers(),
  });
}

export function useCreateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: any) => users.createUser({ data: input }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
  });
}

export function useUpdateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { id: string; data: any }) => users.updateUser({ data: input }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
  });
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => users.deleteUser({ data: id }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
  });
}

export function useToggleUserStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => users.toggleUserStatus({ data: id }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
  });
}

// ─── Submissions / Drafts ───

export function useSubmissionDrafts() {
  return useQuery({
    queryKey: ['submissionDrafts'],
    queryFn: () => submissions.getSubmissionDrafts(),
  });
}

export function useCreateDraft() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: any) => submissions.createDraft({ data: input }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['submissionDrafts'] }),
  });
}

export function useSubmitForReview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => submissions.submitForReview({ data: id }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['submissionDrafts'] });
      qc.invalidateQueries({ queryKey: ['aiValidationQueue'] });
    },
  });
}

export function useUpdateDraft() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { id: string; data: any }) => submissions.updateDraft({ data: input }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['submissionDrafts'] }),
  });
}

// ─── AI Validation ───

export function useAiValidationQueue() {
  return useQuery({
    queryKey: ['aiValidationQueue'],
    queryFn: () => submissions.getAiValidationQueue(),
  });
}

export function useSubmitDecision() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { submissionId: string; action: string; commentaire: string }) =>
      submissions.submitDecision({ data: input }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['aiValidationQueue'] });
      qc.invalidateQueries({ queryKey: ['submissionDrafts'] });
    },
  });
}

// ─── Investor Dashboard ───

export function useInvestorDashboard(userId = 'U-1042') {
  return useQuery({
    queryKey: ['investorDashboard', userId],
    queryFn: () => data.getInvestorDashboard({ data: userId }),
  });
}

// ─── Site Data ───

export function useSiteData(projectId = 'casa-anfa-residences') {
  return useQuery({
    queryKey: ['siteData', projectId],
    queryFn: () => data.getSiteData({ data: projectId }),
  });
}

// ─── Audit Logs ───

export function useAuditLogs() {
  return useQuery({
    queryKey: ['auditLogs'],
    queryFn: () => data.getAuditLogs(),
  });
}
