const config = {
    port: 3000,
    database: {
        DATABASE: '002_mmall',
        USERNAME: 'yanle',
        PASSWORD: '123456',
        PORT: '3306',
        HOST: 'localhost'
    },
    redis: {
        PORT: '6379',
        HOST: '127.0.0.1',
        DB: 1
    },
    mock: false
};

module.exports = config;