import db from 'db';
import { DATABASE_DOCUMENTS } from 'app.constants';

import schema from './scene.schema';
import { Scene } from './scene.types';

const service = db.createService<Scene>(DATABASE_DOCUMENTS.SCENES, {
  schemaValidator: (obj) => schema.parseAsync(obj),
});

export default Object.assign(service, {});
