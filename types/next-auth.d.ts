import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      /** The user's postal address. */
      name: string,
      email: string,
      image?: string
    },
    accessToken?: string
  }
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    /** OpenID ID Token */
    name: string,
    email: string,
    picture?: string,
    sub: string,
    accessToken?: string,
    iat: number,
    exp: number,
    jti: string
  }
  interface Account {
    /** Access Token from the OAuth provider */
    access_token?: string,
  }
}