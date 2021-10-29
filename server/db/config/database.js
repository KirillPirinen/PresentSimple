const { HOST, DB_NAME, DB_PASS, DB_USER } = process.env;

module.exports = {
  development: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    host: HOST,
    dialect: "postgres",
  },
  test: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    host: HOST,
    dialect: "postgres",
  },
  production: {
    username: DB_USER,
    password: DB_PASS,
    database: DB_NAME,
    host: HOST,
    dialect: "postgres",
  },
};
