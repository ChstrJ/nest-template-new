export default () => ({
    port: process.env.APP_PORT || 3000,
    env: process.env.APP_ENV || 'development',
});