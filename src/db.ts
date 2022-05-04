import 'reflect-metadata';
import { DataSource } from 'typeorm';

export default new DataSource({
    type: 'postgres',
    host: 'localhost',
    database: 'api',
    entities: [],
    useUTC: true,
    synchronize: true,
});
