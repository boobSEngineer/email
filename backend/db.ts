import pgp from 'pg-promise';
const cn = {

    host: 'localhost', // server name or IP address;
    port: 5000,
    database: 'email_db',
    user: 'postgres',
    password: 'Kbyf290400'
};
//var cn = 'postgres://username:password@host:port/database';

const db = pgp()(cn); // database instance;

export default db;
