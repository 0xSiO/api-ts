import 'reflect-metadata';
import { DataSource } from 'typeorm';

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    database: 'api',
    applicationName: 'api',
    entities: [],
    useUTC: true,
    installExtensions: true,
    synchronize: true,
});
