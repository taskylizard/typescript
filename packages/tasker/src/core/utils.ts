import { createConsola, consola } from "consola";
import { isSymbol } from "util";

export const logger = createConsola({
  defaults: { tag: "tasker" },
  formatOptions: { date: false },
  async prompt(...params) {
    const response = await consola.prompt(...params);
    if (isSymbol(response) && response.toString() === "Symbol(clack:cancel)") {
      process.exit(10);
    }
    // types clash massivly. consider switching to clack directly
    return response as never;
  },
});
