import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import * as demo from '@/lib/local-demo-store';

// ─── Projects ───

export function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: demo.getAllProjects,
  });
}

export function useProject(id: string | undefined) {
  return useQuery({
    queryKey: ['projects', id],
    queryFn: () => demo.getProjectById(id!),
    enabled: !!id,
  });
}

export function useCreateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: demo.createProject,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['projects'] });
      qc.invalidateQueries({ queryKey: ['investorDashboard'] });
    },
  });
}

export function useUpdateProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { id: string; data: any }) => demo.updateProject(input.id, input.data),
    onSuccess: (_, vars) => {
      qc.invalidateQueries({ queryKey: ['projects'] });
      qc.invalidateQueries({ queryKey: ['projects', vars.id] });
      qc.invalidateQueries({ queryKey: ['investorDashboard'] });
      qc.invalidateQueries({ queryKey: ['siteData', vars.id] });
    },
  });
}

export function useDeleteProject() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: demo.deleteProject,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['projects'] });
      qc.invalidateQueries({ queryKey: ['investorDashboard'] });
      qc.invalidateQueries({ queryKey: ['siteData'] });
    },
  });
}

// ─── Users ───

export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: demo.getAllUsers,
  });
}

export function useCreateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: demo.createUser,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
  });
}

export function useUpdateUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { id: string; data: any }) => demo.updateUser(input.id, input.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
  });
}

export function useDeleteUser() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: demo.deleteUser,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
  });
}

export function useToggleUserStatus() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: demo.toggleUserStatus,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
  });
}

// ─── Submissions / Drafts ───

export function useSubmissionDrafts() {
  return useQuery({
    queryKey: ['submissionDrafts'],
    queryFn: () => demo.getSubmissionDrafts(),
  });
}

export function useCreateDraft() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: demo.createSubmissionDraft,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['submissionDrafts'] }),
  });
}

export function useSubmitForReview() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: demo.submitDraftToAi,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['submissionDrafts'] });
      qc.invalidateQueries({ queryKey: ['aiValidationQueue'] });
    },
  });
}

export function useUpdateDraft() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { id: string; data: any }) => demo.updateSubmissionDraft(input.id, input.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['submissionDrafts'] }),
  });
}

// ─── AI Validation ───

export function useAiValidationQueue() {
  return useQuery({
    queryKey: ['aiValidationQueue'],
    queryFn: demo.getAiValidationQueue,
  });
}

export function useSubmitDecision() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (input: { submissionId: string; action: string; commentaire: string }) =>
      demo.submitDecision(input.submissionId, input.action, input.commentaire),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['aiValidationQueue'] });
      qc.invalidateQueries({ queryKey: ['submissionDrafts'] });
      qc.invalidateQueries({ queryKey: ['auditLogs'] });
    },
  });
}

// ─── Investor Dashboard ───

export function useInvestorDashboard(userId = 'U-1042') {
  return useQuery({
    queryKey: ['investorDashboard', userId],
    queryFn: () => demo.getInvestorDashboardData(userId).then((data) => ({
      holdings: data.holdings,
      transactions: data.transactions,
      portfolioEvolution: data.portfolio,
      upcomingDistributions: data.distributions,
    })),
  });
}

// ─── Site Data ───

export function useSiteData(projectId = 'casa-anfa-residences') {
  return useQuery({
    queryKey: ['siteData', projectId],
    queryFn: () => demo.getSiteData(projectId),
  });
}

export function useCreateSiteUpdate() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: demo.createSiteUpdate,
    onSuccess: (_, vars) => qc.invalidateQueries({ queryKey: ['siteData', vars.projectId] }),
  });
}

// ─── Audit Logs ───

export function useAuditLogs() {
  return useQuery({
    queryKey: ['auditLogs'],
    queryFn: demo.getAuditLogs,
  });
}
