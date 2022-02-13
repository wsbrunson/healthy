import { build } from "./src/app";

export const app = build({ logger: true });

app.listen(3000, "0.0.0.0", (error) => {
  if (error) {
    app.log.error(error);
    process.exit(1);
  }
});
