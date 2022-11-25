type EnvConfig = {
  NODE_ENV: string | undefined
  NODE_PORT: number | string | undefined
  REDIS_HOST: string | undefined
  REDIS_PORT: number | undefined
}

export const ENV: EnvConfig = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  NODE_PORT: process.env.NODE_PORT || process.env.PORT || 5000,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: Number(process.env.REDIS_PORT),
}
