import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

import { db, client } from "@/lib/db";

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  baseURL:
    process.env.BETTER_AUTH_URL || "http://localhost:3000",

  secret: process.env.BETTER_AUTH_SECRET,

  trustedOrigins: [
    "http://localhost:3000",
    "https://explore-my-book-nook-app.vercel.app",
  ],

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      scope: ["email", "profile"],
    },

    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },
});