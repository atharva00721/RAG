import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "../db/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  baseURL: process.env.BETTER_AUTH_URL,
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID!,
      clientSecret: process.env.GITHUB_CLIENT_SECRET!,
      mapProfileToUser: () => ({
        credits: 1500,
      }),
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      mapProfileToUser: () => ({
        credits: 1500,
      }),
    },
  },
  session: {
    cookieCache: { enabled: true, maxAge: 5 * 60 },
    cookieName: "better-auth.session",
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    },
  },
  user: {
    additionalFields: {
      credits: {
        type: "number",
        required: false,
        defaultValue: 1500,
        input: false, // users can't manually set credits on signup
      },
      // add other fields like profileUrl: { type: "string", required: false, defaultValue: "", input: true },
    },
  },
});
