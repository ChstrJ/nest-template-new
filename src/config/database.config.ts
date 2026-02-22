export default () => ({
    database: {
        mysql: {
            host: process.env.DATABASE_HOST,
            port: parseInt(process.env.DATABASE_PORT ?? '3306', 10),
            username: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            name: process.env.DATABASE_NAME,
        }
    },
});