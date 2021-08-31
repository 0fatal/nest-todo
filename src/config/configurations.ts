const loadConfig = () => {
  const { env } = process
  return {
    db: {
      database: env.TYPEORM_DATABASE,
      host: env.TYPEORM_HOST,
      port: parseInt(env.TYPEORM_PORT, 10) || 3306,
      username: env.TYPEORM_USERNAME,
      password: env.TYPEORM_PASSWORD,
    },
    redis: {
      host: env.REDIS_HOST,
      port: env.REDIS_PORT,
    },
  }
}

export default loadConfig
