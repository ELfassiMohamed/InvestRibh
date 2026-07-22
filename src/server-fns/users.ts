import { createServerFn } from '@tanstack/react-start';
import * as db from '@/db';

export const getUsers = createServerFn({ method: 'GET' })
  .handler(async () => {
    return await db.getAllUsers();
  });

export const createUser = createServerFn({ method: 'POST' })
  .validator((input: unknown) => input as db.UserInput)
  .handler(async ({ data }) => {
    return await db.createUser(data);
  });

export const updateUser = createServerFn({ method: 'POST' })
  .validator((input: unknown) => input as { id: string; data: any })
  .handler(async ({ data }) => {
    return await db.updateUser(data.id, data.data);
  });

export const deleteUser = createServerFn({ method: 'POST' })
  .validator((input: unknown) => input as string)
  .handler(async ({ data: id }) => {
    await db.deleteUser(id);
    return { success: true };
  });

export const toggleUserStatus = createServerFn({ method: 'POST' })
  .validator((input: unknown) => input as string)
  .handler(async ({ data: id }) => {
    const user = await db.getUserById(id);
    if (!user) return null;
    const newStatus = user.statut === 'Actif' ? 'Suspendu' : 'Actif';
    return await db.updateUser(id, { statut: newStatus });
  });
