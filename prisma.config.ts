import type { Config } from "@prisma/cli";

const config: Config = {
  schema: "./prisma/schema.prisma",
  datasource: {
    db: {
      provider: "sqlite",
      url: "file:./dev.db",
    },
  },
};

export default config;