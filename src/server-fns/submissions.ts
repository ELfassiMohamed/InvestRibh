import { createServerFn } from '@tanstack/react-start';
import * as db from '@/db';

export const getSubmissionDrafts = createServerFn({ method: 'GET' })
  .handler(async () => {
    return db.getSubmissionDrafts();
  });

export const createDraft = createServerFn({ method: 'POST' })
  .validator((input: unknown) => input as db.DraftInput)
  .handler(async ({ data }) => {
    return db.createSubmissionDraft(data);
  });

export const updateDraft = createServerFn({ method: 'POST' })
  .validator((input: unknown) => input as { id: string; data: any })
  .handler(async ({ data }) => {
    db.updateSubmissionDraft(data.id, data.data);
    return { success: true };
  });

export const submitForReview = createServerFn({ method: 'POST' })
  .validator((input: unknown) => input as string)
  .handler(async ({ data: id }) => {
    return db.submitDraftToAi(id);
  });

export const getAiValidationQueue = createServerFn({ method: 'GET' })
  .handler(async () => {
    return db.getAiValidationQueue();
  });

export const submitDecision = createServerFn({ method: 'POST' })
  .validator((input: unknown) => input as { submissionId: string; action: string; commentaire: string })
  .handler(async ({ data }) => {
    db.submitDecision(data.submissionId, data.action, data.commentaire);
    return { success: true };
  });

export const getDecision = createServerFn({ method: 'GET' })
  .validator((input: unknown) => input as string)
  .handler(async ({ data: submissionId }) => {
    return db.getValidationDecisions(submissionId);
  });
