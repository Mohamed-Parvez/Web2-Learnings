import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/Client";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const handler: NextAuthOptions = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        Email: { label: "Email", type: "email", placeholder: "email" },
        Password: {
          label: "Password",
          type: "Password",
          placeholder: "Enter Password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.Email || !credentials?.Password) return null;
        const user = await prisma.user.findUnique({
          where: { email: credentials.Email },
        });

        if (!user) return null;
        const comparePassowrds = await bcrypt.compare(
          credentials.Password,
          user.encryptedPassword!
        );
        return comparePassowrds ? user : null;
      },
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "jwt",
  },
});

export { handler as GET, handler as POST };
