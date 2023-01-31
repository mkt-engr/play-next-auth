import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";

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
  ],
  pages: {
    //サインインした後にリダイレクトされるページ
    signIn: "/auth/signin",
  },
});
