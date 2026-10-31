import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

import { db, client } from "@/lib/db";

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),

  baseURL: process.env.BETTER_AUTH_URL,

  secret: process.env.BETTER_AUTH_SECRET,

  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
  },

  socialProviders: {
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    scope: ["email", "profile"],
    mapProfileToUser: (profile) => ({
      name: profile.name,
      image: profile.picture,
    }),
    overrideUserInfoOnSignIn: true,
  },

  github: {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    mapProfileToUser: (profile) => ({
      name: profile.name || profile.login,
      image: profile.avatar_url,
    }),
    overrideUserInfoOnSignIn: true,
  },
},
});