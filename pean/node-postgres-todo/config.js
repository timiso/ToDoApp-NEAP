var connectionString = process.env.DATABASE_URL || 'postgres://todo:dbpass@localhost:5432/todo';

module.exports = connectionString;
