const envConfig =  {
      host: "localhost",
      username: "sa",
      password: "MyPassword123#",
      database: "Tenant",
      dialect: "mssql",
      seederStorage: 'sequelize',
      seederStorageTableName: 'SequelizeData',
      archiveTimePeriod: 30,
      databaseVersion: '11.0.0',

      define: {
        timestamps: true
    },
      dialectOptions: {
        options: {
            requestTimeout: 300000,
            cancelTimeout: 10000,
            packetSize: 16368, // To avoid ECONNRESET
            maxRetriesOnTransientErrors: 5 // More breathing space before getting ETIMEOUT
        }
    },
      pool: {
        max: 250,
        min: 0,
        acquire: 60000,
        idle: 10000
      }
    }
module.exports = {envConfig}