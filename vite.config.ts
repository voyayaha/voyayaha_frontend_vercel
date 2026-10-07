// Vercel deployment configuration for the Voyayaha TanStack Start app.
// The Lovable wrapper provides TanStack Start, React, Tailwind, path aliases,
// and Nitro. On Vercel we explicitly select Nitro's Vercel preset so the
// server routes are emitted as Vercel-compatible functions.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const isVercel = Boolean(process.env.VERCEL && process.env.VERCEL !== "0") || Boolean(process.env.VERCEL_URL);

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  // Keep Lovable/local preview behavior intact, but use Vercel Functions
  // when this project is built by Vercel.
  nitro: isVercel ? { preset: "vercel" } : true,
});
