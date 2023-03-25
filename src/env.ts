export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    dialect: 'postgres',
    host: process.env.POSTGRES_HOST || 5432,
    port: Number(process.env.POSTGRES_PORT),
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    database: process.env.POSTGRES_DB,
  },
});
