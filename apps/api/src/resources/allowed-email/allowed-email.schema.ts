import { z } from 'zod';

const schema = z.object({
  _id: z.string(),

  email: z.string(),
  isRegistered: z.boolean().default(false),

  createdOn: z.date().optional(),
  updatedOn: z.date().optional(),
  deletedOn: z.date().optional().nullable(),
}).strict();

export default schema;
