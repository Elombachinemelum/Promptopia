import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import mongoose, { Query } from "mongoose";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
const { model } = mongoose;

const handler: typeof NextAuth = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.CLIENT_ID!,
      clientSecret: process.env.CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      // we just need to update the sessions object to the signed in users details
      const [existingUser] = await User.find({ email: session.user?.email });
      session.user!["id" as keyof typeof session.user] =
        existingUser._id?.toString() as never;
      return session;
    },
    async signIn({ profile, email }) {
      // once sign in occures we then need to add the user to our db if it's a first time user
      // Or just update session if this is a returning user.
      // but we need to connect to the db to read and write to it....

      await connectToDB();
      const existingUser = await User.exists({
        email: profile?.email,
      });
      if (!existingUser) {
        await User.create({
          email: profile?.email,
          username: profile?.name?.replace(/ /gi, "")?.toLowerCase(),
          image: profile?.["picture" as keyof typeof profile],
        });
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };
