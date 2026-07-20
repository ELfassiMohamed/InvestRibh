import { createServerFn } from '@tanstack/react-start';
import * as db from '@/db';

export const getInvestorDashboard = createServerFn({ method: 'POST' })
  .validator((input: unknown) => (input as string) || 'U-1042')
  .handler(async ({ data: userId }) => {
    const data = db.getInvestorDashboardData(userId);
    return {
      holdings: data.holdings,
      transactions: data.transactions,
      portfolioEvolution: data.portfolio,
      upcomingDistributions: data.distributions,
    };
  });

export const getSiteData = createServerFn({ method: 'GET' })
  .validator((input: unknown) => (input as string) || 'casa-anfa-residences')
  .handler(async ({ data: projectId }) => {
    return {
      phases: db.getSitePhases(projectId),
      updates: db.getSiteUpdates(projectId),
    };
  });

export const getAuditLogs = createServerFn({ method: 'GET' })
  .handler(async () => {
    return db.getAuditLogs();
  });

export const getUserByEmail = createServerFn({ method: 'POST' })
  .validator((input: unknown) => input as string)
  .handler(async ({ data: email }) => {
    return db.getUserByEmail(email);
  });
