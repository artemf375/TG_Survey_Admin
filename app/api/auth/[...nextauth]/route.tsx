import AzureADProvider from "next-auth/providers/azure-ad"
import { Account, JWT } from "next-auth/jwt"
import NextAuth, { Session } from "next-auth"

const authConfig = NextAuth({
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID || "",
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET || "",
      tenantId: process.env.AZURE_AD_TENANT_ID,
    }),
  ],
  callbacks: {
    async jwt({ token, account }: { token: JWT, account: Account }) {
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token }: { session: Session, token: JWT }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken
      return session
    }
  },
})

export { authConfig as GET, authConfig as POST, authConfig }