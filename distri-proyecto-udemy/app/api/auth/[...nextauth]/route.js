import NextAuth from "next-auth";
import CognitoProvider from "next-auth/providers/cognito";
import GoogleProvider from "next-auth/providers/google";

export const authOptions = {
  providers: [
    CognitoProvider({
      clientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_COGNITO_CLIENT_SECRET,
      issuer: process.env.NEXT_PUBLIC_COGNITO_DOMAIN,
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET,
    }),
  ],
  theme: {
    colorScheme: "light",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
