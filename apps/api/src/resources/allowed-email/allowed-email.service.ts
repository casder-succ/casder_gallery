import db from 'db';
import { DATABASE_DOCUMENTS } from 'app.constants';

import schema from './allowed-email.schema';
import { AllowedEmail } from './allowed-email.types';

const service = db.createService<AllowedEmail>(DATABASE_DOCUMENTS.ALLOWED_EMAILS, {
  schemaValidator: (obj) => schema.parseAsync(obj),
});

export default Object.assign(service, {});
