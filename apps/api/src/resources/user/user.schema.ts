import { z } from 'zod';

const schema = z.object({
  _id: z.string(),

  firstName: z.string(),
  lastName: z.string(),
  fullName: z.string(),
  email: z.string().email(),
  avatarUrl: z.string().nullable().optional(),

  createdOn: z.date().optional(),
  updatedOn: z.date().optional(),
  lastRequest: z.date().optional(),
  deletedOn: z.date().optional().nullable(),
}).strict();

export default schema;
