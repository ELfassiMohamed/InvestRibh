import { createServerFn } from '@tanstack/react-start';
import * as db from '@/db';

export const getProjects = createServerFn({ method: 'GET' })
  .handler(async () => {
    return db.getAllProjects();
  });

export const getProject = createServerFn({ method: 'GET' })
  .validator((input: unknown) => input as string)
  .handler(async ({ data: id }) => {
    return db.getProjectById(id);
  });

export const createProject = createServerFn({ method: 'POST' })
  .validator((input: unknown) => input as db.ProjectInput)
  .handler(async ({ data }) => {
    return db.createProject(data);
  });

export const updateProject = createServerFn({ method: 'POST' })
  .validator((input: unknown) => input as { id: string; data: any })
  .handler(async ({ data }) => {
    return db.updateProject(data.id, data.data);
  });

export const deleteProject = createServerFn({ method: 'POST' })
  .validator((input: unknown) => input as string)
  .handler(async ({ data: id }) => {
    db.deleteProject(id);
    return { success: true };
  });
