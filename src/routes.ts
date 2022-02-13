import { FastifyPluginAsync } from "fastify";
import { Static, Type } from "@sinclair/typebox";
import axios from "axios";

const UrlCheck = Type.Object({
  url: Type.String(),
});
type UrlCheckType = Static<typeof UrlCheck>;

export const routes: FastifyPluginAsync<{}> = async (fastify) => {
  fastify.get("/", async () => ({ hello: "world" }));

  fastify.put<{ Body: UrlCheckType }>(
    "/api/healthchecks/check",
    {
      schema: {
        body: UrlCheck,
      },
    },
    async (request) => {
      try {
        const { status, statusText, headers, data } = await axios.get(
          request.body.url
        );

        return { status, statusText, headers, data };
      } catch (error) {
        console.log(error);
      }
    }
  );
};
