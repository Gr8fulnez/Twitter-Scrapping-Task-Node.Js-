import { Sequelize } from 'sequelize';

const db = new Sequelize('postgres://default:aEZ7hAMBVLW2@ep-young-field-a4sxtk9e.us-east-1.postgres.vercel-storage.com:5432/verceldb',{
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

export default db;
