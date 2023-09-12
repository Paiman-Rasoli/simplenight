interface DatabaseConfig {
  host: string;
  port: number;
  password: string;
  username: string;
  database: string;
}

interface Config {
  port: number;
  database: DatabaseConfig;
}

export default (): Config => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    username: process.env.DB_USER,
  },
});
