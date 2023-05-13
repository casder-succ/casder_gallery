import { Database, Service, ServiceOptions, IDocument } from '@paralect/node-mongo';

import config from 'config';

const database = new Database(config.mongo.connection, config.mongo.dbName);

database.connect();

function createService<T extends IDocument>(collectionName: string, options: ServiceOptions = {}) {
  return new Service<T>(collectionName, database, options);
}

export default {
  database,
  createService,
};
