import { createServerFn } from '@tanstack/react-start';
import * as db from '@/db';

export const getInvestorDashboard = createServerFn({ method: 'POST' })
  .validator((input: unknown) => (input as string) || 'U-1042')
  .handler(async ({ data: userId }) => {
    const data = await db.getInvestorDashboardData(userId);
    return {
      holdings: data.holdings,
      transactions: data.transactions,
      portfolioEvolution: data.portfolio,
      upcomingDistributions: data.distributions,
    };
  });

export const getSiteData = createServerFn({ method: 'POST' })
  .validator((input: unknown) => (input as string) || 'casa-anfa-residences')
  .handler(async ({ data: projectId }) => {
    const [phases, updates] = await Promise.all([
      db.getSitePhases(projectId),
      db.getSiteUpdates(projectId),
    ]);
    return { phases, updates };
  });

export const getAuditLogs = createServerFn({ method: 'GET' })
  .handler(async () => {
    return await db.getAuditLogs();
  });

export const getUserByEmail = createServerFn({ method: 'POST' })
  .validator((input: unknown) => input as string)
  .handler(async ({ data: email }) => {
    return await db.getUserByEmail(email);
  });
