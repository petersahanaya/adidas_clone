import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import { AuthOptions } from "next-auth";
import { prisma } from "@/lib/config/prisma.config";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    session({ session, token }) {
      if (!session.user.id) {
        session.user.id = token.sub;
        return session;
      }

      return session;
    },
    async signIn({ user, account }) {
      try {
        const duplicate = await prisma.user.findFirst({
          where: { id: account?.providerAccountId as string },
        });

        if (!duplicate) {
          await prisma.user.create({
            data: {
              id: account?.providerAccountId as string,
              email: user.email as string,
              profile: user.image as string,
              username: user.name as string,
            },
          });

          return true;
        }

        return true;
      } catch (e) {
        throw new Error("error when try to signing");
      }
    },
  },
  pages: {
    signIn: "/signIn",
    error: "/signIn",
  },
  secret: process.env.NEXTAUTH_SECRET as string,
  debug: process.env.NODE_ENV === "development",
};

export default NextAuth(authOptions);
