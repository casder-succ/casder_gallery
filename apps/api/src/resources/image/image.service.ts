import db from 'db';
import { DATABASE_DOCUMENTS } from 'app.constants';

import schema from './image.schema';
import { Image } from './image.types';

const service = db.createService<Image>(DATABASE_DOCUMENTS.IMAGES, {
  schemaValidator: (obj) => schema.parseAsync(obj),
});

export default Object.assign(service, {});
