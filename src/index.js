import { env } from "./config/env.js";
import { app } from "./app.js";
import { connectDB } from "./config/db.js";

app.listen(env.PORT, async () => {
  await connectDB();
  console.log(`🟢 App running on port ${env.PORT}`);
});
