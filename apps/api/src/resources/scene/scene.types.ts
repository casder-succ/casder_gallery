import { z } from 'zod';

import schema from './scene.schema';

export type Scene = z.infer<typeof schema>;
