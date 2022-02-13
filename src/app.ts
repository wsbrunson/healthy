import fastify, { FastifyInstance } from "fastify";
import fastifyCustomHealthcheck from "fastify-custom-healthcheck";
import { routes } from "./routes";

// pg.query('SELECT $1::text as status', ['ACK']);

export const build = (options: {}) => {
  const app: FastifyInstance = fastify(options);

  app.register(fastifyCustomHealthcheck, {
    info: {
      version: process.env.npm_package_version || "N/A",
      env: process.env.NODE_ENV || "N/A",
    },
    exposeFailure: true,
  });

  app.register(routes);

  return app;
};
