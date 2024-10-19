import AzureADProvider from "next-auth/providers/azure-ad"
import GitHubProvider from "next-auth/providers/github"
import { Account, JWT } from "next-auth/jwt"
import NextAuth, { Session } from "next-auth"

const authConfig = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        AzureADProvider({
            clientId: process.env.AZURE_AD_CLIENT_ID,
            clientSecret: process.env.AZURE_AD_CLIENT_SECRET,
            tenantId: process.env.AZURE_AD_TENANT_ID,
        }),
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET
        })
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

export default authConfig;