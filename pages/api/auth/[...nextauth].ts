import NextAuth, { NextAuthOptions } from "next-auth"
import GitlabProvider from "next-auth/providers/gitlab"

export const authOptions: NextAuthOptions = {
  providers: [
    GitlabProvider({
      clientId: process.env.GITLAB_CLIENT_ID,
      clientSecret: process.env.GITLAB_CLIENT_SECRET,
      authorization: { params: { scope: process.env.PUBLIC_URL_GITLAB_SCOPE } },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
      }
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken
      // session.user?.name = token.

      console.log({session, token})
      
      return session
    },
  },
}


export default NextAuth(authOptions)
