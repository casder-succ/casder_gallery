import { z } from 'zod';

import schema from './allowed-email.schema';

export type AllowedEmail = z.infer<typeof schema>;
