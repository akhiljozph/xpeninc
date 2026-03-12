// db.ts
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize({
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 5432,
    database: process.env.DB_NAME || 'kanakkpusthakam',
    username: process.env.DB_USER || 'kanakk',
    password: process.env.DB_PASS || 'root@kanakkpusthakam',
    dialect: 'postgres',
    logging: false, // set to console.log to debug queries
});

export default sequelize;