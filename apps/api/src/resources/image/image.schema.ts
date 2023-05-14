import { z } from 'zod';

const schema = z.object({
  _id: z.string(),

  image: z.string(),
  title: z.string(),
  description: z.string(),

  createdOn: z.date().optional(),
  updatedOn: z.date().optional(),
  lastRequest: z.date().optional(),
  deletedOn: z.date().optional().nullable(),
}).strict();

export default schema;
