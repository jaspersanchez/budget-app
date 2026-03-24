const getEnv = (key: string) => {
  const env = process.env[key];

  if (!env) {
    throw new Error("Envrinoment variable doesn't exist");
  }

  return env;
};

export const env = {
  mongoURI: getEnv("MONGO_URI"),
  port: getEnv("PORT"),
  jwtSecret: getEnv("JWT_SECRET"),
};
