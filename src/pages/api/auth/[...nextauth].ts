import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!!!!!!!,
      clientSecret: process.env.GITHUB_SECRET!!!!!!,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!!!!!!!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!!!!!!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!!!!!!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!!!!!,
    }),
  ],
  pages: {
    //サインインした後にリダイレクトされるページ
    signIn: "/auth/signin",
  },
});
