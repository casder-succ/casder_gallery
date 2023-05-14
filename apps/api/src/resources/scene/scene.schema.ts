import { z } from 'zod';

const schema = z.object({
  _id: z.string(),

  text: z.string(),
  pictureId: z.string(),
  zoom: z.number(),
  coordinates: z.object({
    coordinates: z.object({
      x: z.number(),
      y: z.number(),
    }),
    fullCoordinates: z.object({
      x: z.number(),
      y: z.number(),
    }),
    convertedCoordinates: z.object({
      x: z.number(),
      y: z.number(),
    }),
  }),

  createdOn: z.date().optional(),
  updatedOn: z.date().optional(),
  lastRequest: z.date().optional(),
  deletedOn: z.date().optional().nullable(),
}).strict();

export default schema;
